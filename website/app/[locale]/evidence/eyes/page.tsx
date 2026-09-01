import type { Metadata } from "next";
import { Snowflake } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CautionBox } from "@/components/CautionBox";
import { DerivedPrediction } from "@/components/DerivedPrediction";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Northern Package: How Three Traits Optimized One Molecule",
    subtitle:
      "Three traits co-selected in Northern Europe 10,000–6,000 years ago optimize the same molecular system — cryptochrome (CRY).",
    backLink: "← Back to Evidence",
    cautionText:
      "The Northern Package is BERM’s evolutionary synthesis (M-level). Individual components — iris light transmission, FAD–CRY protein stability, geomagnetic field effects on biology — are established in peer-reviewed literature. The co-selection hypothesis linking all three to CRY optimization has not been directly tested.",

    // Section 1 — Introduction
    s1Title: "Three Traits, One Molecule",
    s1Text: [
      "In Northern Europe, three traits were co-selected between 10,000 and 6,000 years ago: blue/light eye color, lactose tolerance, and settlement at high geomagnetic latitudes.",
      "The conventional explanation for this cluster is vitamin D optimization. In low-UV environments, lighter skin and eyes permit more UVB penetration for cutaneous vitamin D synthesis, and dairy provides dietary vitamin D.",
      "BERM proposes an additional, more complete explanation: all three traits optimize the cryptochrome (CRY) system — the blue-light-sensitive protein responsible for magnetoreception and circadian regulation.",
      "Vitamin D explains 2 of 3 traits (eye color and lactose tolerance). CRY explains all 3.",
    ],

    // Section 2 — Eye Color & CRY
    s2Title: "Eye Color & CRY (χ_optical)",
    s2Points: [
      "Blue iris transmits ~100× more blue light to the retina than brown (van den Berg 1991)",
      "Eye color affects light-induced melatonin suppression (Higuchi et al. 2007)",
      "Brown-eyed people are significantly more depressed and fatigued in winter than blue-eyed (Workman 2018)",
      "CRY magnetoreception requires blue light (<500 nm) — the wavelength range where iris transmission differs most",
    ],
    s2Conclusion:
      "χ_optical: blue iris enables more efficient CRY activation in low-light, high-latitude conditions",

    // Section 3 — Lactose Tolerance & FAD
    s3Title: "Lactose Tolerance & FAD (χ_molecular)",
    s3Points: [
      "FAD (flavin adenine dinucleotide) is CRY’s essential cofactor — the chromophore that makes CRY light-sensitive",
      "FAD ← riboflavin (vitamin B2) ← dairy products are the primary dietary source",
      "LCT mutation → lifelong milk consumption → sustained high B2 intake across the lifespan",
      "Hirano et al. 2017 (Cell Reports): FAD STABILIZES CRY proteins in vivo — Rfk silencing combined with B2-deficient diet changed CRY levels in mouse liver",
      "PMC11817702 (2025): RFK silencing DAMPENED the PEMF response AND blocked magnetic field DIRECTION SELECTIVITY in mammalian cells",
      "CRITICAL: Low B2 makes CRY UNSTABLE (protein degrades faster), NOT merely ‘less sensitive.’ CRY protein level DROPS → magnetic signal WEAKENS",
    ],
    s3Conclusion:
      "χ_molecular: lactose tolerance maintains CRY protein STABILITY and thus magnetic sensitivity. B2/FAD is the 6th natural Ca²⁺ modulator/cofactor in BERM (alongside vitamin D, melatonin, magnesium, lithium, caffeine)",

    // Section 4 — Geomagnetic Location
    s4Title: "Geomagnetic Location (χ_geomagnetic)",
    s4Points: [
      "Fennoscandia: geomagnetic latitude 60–70°N, within the auroral oval where solar-terrestrial coupling is strongest",
      "Field strength ~50–53 μT — strong dipole region providing a robust baseline signal for CRY detection",
      "Dual-peak amplification: both CME peak (at solar maximum) and coronal hole peak (2–3 years after solar maximum) are strongest at high geomagnetic latitudes",
    ],
    s4Conclusion:
      "χ_geomagnetic: strongest solar cycle modulation at Northern Package latitudes — the geomagnetic environment where CRY signaling matters most",

    // Section 5 — Co-selection Argument
    s5Title: "The Co-selection Argument",
    s5Lead:
      "Two mutations, different chromosomes, same population, same timeframe:",
    s5Points: [
      "OCA2 (chromosome 15) controls iris pigmentation; LCT (chromosome 2) controls lactase persistence — genetically independent loci under parallel selection pressure",
      "Both are young mutations with unusually long haplotype blocks, indicating strong recent positive selection",
    ],
    s5CompareTitle: "Vitamin D vs. CRY: explanatory power",
    s5VitDLabel: "Vitamin D hypothesis",
    s5VitD: [
      "Explains blue eyes: more UVB penetration → cutaneous vitamin D synthesis",
      "Explains lactose tolerance: dairy provides dietary vitamin D",
      "Does NOT explain geomagnetic latitude preference — vitamin D synthesis depends on solar UV, not geomagnetic field strength",
    ],
    s5CRYLabel: "CRY hypothesis",
    s5CRY: [
      "Explains blue eyes: χ_optical — more blue light reaches retinal CRY",
      "Explains lactose tolerance: χ_molecular — dairy B2 stabilizes CRY protein",
      "Explains high-latitude settlement: χ_geomagnetic — strongest solar cycle CRY modulation",
    ],
    s5Conclusion:
      "CRY provides a single molecular explanation for all three co-selected traits. Vitamin D remains a contributing factor but cannot account for the geomagnetic component.",

    // Section 6 — Evolutionary Vulnerability
    s6Title: "Evolutionary Vulnerability",
    s6Points: [
      "The Northern Package MAXIMIZES all three χ components simultaneously — after electrification, the biological response to artificial EMF is STRONGEST in these populations",
      "Total fertility rate (TFR) fell below replacement level FIRST in Nordic countries — the very populations with the most complete Northern Package",
      "Analogy: populations that adapted to low-sugar environments are most vulnerable to the obesity epidemic when refined sugar becomes abundant",
      "The same traits that were reproductively advantageous for 10,000 years become a vulnerability in an electromagnetic environment that did not exist during the selection period",
    ],

    // Section 7 — SAMA
    s7Title: "SAMA — The Mirror Image",
    s7Lead:
      "The South Atlantic Magnetic Anomaly provides a natural control experiment for CRY-dependent biology.",
    s7Points: [
      "SAMA: geomagnetic field only ~24 μT (versus ~50 μT elsewhere at similar latitudes) — the Earth’s weakest surface field",
      "ESS 2026: the solar wind–violence correlation REVERSES in Brazil and Uruguay (under SAMA) — where the field is weakest, the biological response inverts",
      "SAMA represents the opposite extreme from the Northern Package: distorted, weakened CRY signal reading rather than optimized signal reading",
      "Highest anxiety disorder prevalence worldwide is in tropical Latin America (WHO/GBD data) — precisely where SAMA overlaps major population centers",
    ],
    s7Conclusion:
      "When geomagnetic geometry changes, the biological response inverts. SAMA is the mirror image of the Northern Package — both demonstrate that CRY-dependent biology tracks geomagnetic field structure.",

    predictionText:
      "Prediction NORTH-PKG-1: Blue-eyed, lactose-tolerant individuals at geomagnetic latitudes >55°N will show the largest melatonin suppression amplitude during geomagnetic storms (Kp ≥ 5), and the strongest seasonal mood variation, compared to brown-eyed, lactose-intolerant individuals at the same geographic latitude — because all three χ components (optical, molecular, geomagnetic) are maximized.",
    predictionLink: "See predictions →",
    predictionHref: "/predictions",
  },

  fi: {
    title:
      "Pohjoinen paketti: Miten kolme piirrettä optimoi yhtä molekyyliä",
    subtitle:
      "Kolme piirrettä valittiin yhdessä Pohjois-Euroopassa 10 000–6 000 vuotta sitten, ja ne kaikki optimoivat samaa molekulaarista järjestelmää — kryptokromia (CRY).",
    backLink: "← Takaisin näyttöön",
    cautionText:
      "Northern Package on BERM:n evoluutiosynteesi (M-taso). Yksittäiset komponentit — iiriksen valoläpäisevyys, FAD–CRY-proteiinin stabiilisuus, geomagneettisen kentän vaikutukset biologiaan — ovat vahvistettu vertaisarvioidussa kirjallisuudessa. Yhteisvalintahypoteesi, joka yhdistää kaikki kolme CRY-optimointiin, on testaamatta.",

    s1Title: "Kolme piirrettä, yksi molekyyli",
    s1Text: [
      "Pohjois-Euroopassa kolme piirrettä valittiin yhdessä 10 000–6 000 vuotta sitten: sininen/vaalea silmien väri, laktoosinsietokyky ja asutus korkeilla geomagneettisilla leveysasteilla.",
      "Perinteinen selitys tälle klusterille on D-vitamiinioptimointi. Matalassa UV-ympäristössä vaaleampi iho ja silmät päästävät enemmän UVB-säteilyä ihon D-vitamiinisynteesiin, ja maitotuotteet tarjoavat ravinnon D-vitamiinia.",
      "BERM ehdottaa lisäselitystä, joka on täydellisempi: kaikki kolme piirrettä optimoivat kryptokromi (CRY) -järjestelmän — sinivaloherkän proteiinin, joka vastaa magnetoreseptiosta ja sirkadiaanisesta säätelystä.",
      "D-vitamiini selitää 2 piirrettä kolmesta (silmien väri ja laktoosinsietokyky). CRY selitää kaikki 3.",
    ],

    s2Title: "Silmien väri ja CRY (χ_optical)",
    s2Points: [
      "Sininen iiris päästää ~100× enemmän sinistä valoa verkkokalvolle kuin ruskea (van den Berg 1991)",
      "Silmien väri vaikuttaa valon aiheuttamaan melatoniinin vaimentumiseen (Higuchi ym. 2007)",
      "Ruskeasilmäiset ovat merkitsevästi masentuneempia ja väsyneempiä talvella kuin sinisilmäiset (Workman 2018)",
      "CRY-magnetoreseptio vaatii sinistä valoa (<500 nm) — aallonpituusalue, jossa iiriksen transmissioero on suurin",
    ],
    s2Conclusion:
      "χ_optical: sininen iiris mahdollistaa tehokkaamman CRY-aktivaation vähävaloisissa, korkean leveysasteen olosuhteissa",

    s3Title: "Laktoositoleranssi ja FAD (χ_molecular)",
    s3Points: [
      "FAD (flaviiniadeniinidinukleotidi) on CRY:n välttämätön kofaktori — kromofori, joka tekee CRY:stä valoherkän",
      "FAD ← riboflaviini (B2-vitamiini) ← maitotuotteet ovat ensisijainen ravintolähde",
      "LCT-mutaatio → elinikäinen maidonkulutus → korkea B2-saanti koko elinkaaren ajan",
      "Hirano ym. 2017 (Cell Reports): FAD STABILOI CRY-proteiineja in vivo — Rfk-hiljennys yhdistettynä B2-puutosruokavalioon muutti CRY-tasoja hiiren maksassa",
      "PMC11817702 (2025): RFK-hiljennys VAIMENSI PEMF-vasteen JA esti magneettikentän SUUNTASELEKTIIVISYYDEN nisäkässoluissa",
      "KRIITTISTÄ: Matala B2 tekee CRY:stä EPÄVAKAAN (proteiini hajoaa nopeammin), EI pelkästään ‘vähemmän herkän.’ CRY-proteiinitaso LASKEE → magneettinen signaali HEIKKENEE",
    ],
    s3Conclusion:
      "χ_molecular: laktoosinsietokyky ylläpitää CRY-proteiinin VAKAUTTA ja siten magneettista herkkyytä. B2/FAD on BERM:n 6. luonnollinen Ca²⁺-modulaattori/kofaktori (D-vitamiinin, melatoniinin, magnesiumin, litiumin ja kofeiinin rinnalla)",

    s4Title: "Geomagneettinen sijainti (χ_geomagnetic)",
    s4Points: [
      "Fennoskandia: geomagneettinen leveysaste 60–70°N, revontulisoikion sisällä missä aurinko–maa-kytkentä on voimakkainta",
      "Kentän voimakkuus ~50–53 μT — vahva dipolialue, joka tarjoaa vakaan perussignaalin CRY:n havaitsemiselle",
      "Kaksoishippu-vahvistus: sekä CME-huippu (auringon maksiimissa) että koronaalisen aukon huippu (2–3 vuotta auringon maksimin jälkeen) ovat voimakkaimpia korkeilla geomagneettisilla leveysasteilla",
    ],
    s4Conclusion:
      "χ_geomagnetic: voimakkain aurinkosyklin modulaatio Northern Package -leveysasteilla — geomagneettinen ympäristö, jossa CRY-signaloinnilla on suurin merkitys",

    s5Title: "Yhteisvalinnan argumentti",
    s5Lead:
      "Kaksi mutaatiota, eri kromosomit, sama populaatio, sama aikakehys:",
    s5Points: [
      "OCA2 (kromosomi 15) kontrolloi iiriksen pigmentaatiota; LCT (kromosomi 2) kontrolloi laktaasin pysyvyyttä — geneettisesti itsenäiset lokukset rinnakkaisessa valintapaineessa",
      "Molemmat ovat nuoria mutaatioita epätavallisen pitkillä haplotyyppiblokkeilla, mikä osoittaa vahvaa viimeaikaista positiivista valintaa",
    ],
    s5CompareTitle: "D-vitamiini vs. CRY: selitysvoima",
    s5VitDLabel: "D-vitamiinihypoteesi",
    s5VitD: [
      "Selitää siniset silmät: enemmän UVB-läpäisyä → ihon D-vitamiinisynteesi",
      "Selitää laktoosinsietokyvyn: maitotuotteet tarjoavat ravinnon D-vitamiinia",
      "EI selitä geomagneettisen leveysasteen preferenssiä — D-vitamiinisynteesi riippuu auringon UV:stä, ei geomagneettisen kentän voimakkuudesta",
    ],
    s5CRYLabel: "CRY-hypoteesi",
    s5CRY: [
      "Selitää siniset silmät: χ_optical — enemmän sinistä valoa saavuttaa verkkokalvon CRY:n",
      "Selitää laktoosinsietokyvyn: χ_molecular — maidon B2 stabiloi CRY-proteiinia",
      "Selitää korkean leveysasteen asutuksen: χ_geomagnetic — voimakkain aurinkosyklin CRY-modulaatio",
    ],
    s5Conclusion:
      "CRY tarjoaa yhden molekulaarisen selityksen kaikille kolmelle yhdessä valitulle piirteelle. D-vitamiini pysyy myötävaikuttavana tekijänä, mutta ei voi selitää geomagneettista komponenttia.",

    s6Title: "Evoluutiollinen haavoittuvuus",
    s6Points: [
      "Northern Package MAKSIMOI kaikki kolme χ-komponenttia samanaikaisesti — sähköistyksen jälkeen biologinen vaste keinotekoiseen EMF:iin on VOIMAKKAIN näissä populaatioissa",
      "Kokonaishedelmällisyysluku (TFR) laski alle uusiutumistason ENSIMMÄISENÄ Pohjoismaissa — juuri populaatioissa, joissa Northern Package on täydellisin",
      "Analogia: populaatiot jotka sopeutuivat vähäsokerisiin ympäristöihin ovat haavoittuvimpia lihavuusepidemialle kun puhdistettu sokeri tulee saataville",
      "Samat piirteet jotka olivat lisääntymiselle edullisia 10 000 vuoden ajan muuttuvat haavoittuvuudeksi sähkömagneettisessa ympäristössä, jota ei ollut olemassa valintajakson aikana",
    ],

    s7Title: "SAMA — Peilikuva",
    s7Lead:
      "Etelä-Atlantin magneettinen anomalia tarjoaa luonnollisen kontrollikokeen CRY-riippuvaiselle biologialle.",
    s7Points: [
      "SAMA: geomagneettinen kenttä vain ~24 μT (verrattuna ~50 μT:iin muualla vastaavilla leveysasteilla) — Maan heikoin pintakenttä",
      "ESS 2026: aurinkotuulen ja väkivallan korrelaatio KÄÄNTYY Brasiliassa ja Uruguayssa (SAMAn alla) — missä kenttä on heikoin, biologinen vaste kääntyy",
      "SAMA edustaa Northern Packagen vastakkaista ääripäätä: vääristynyt, heikentynyt CRY-signaalin lukeminen optimoidun sijaan",
      "Korkein ahdistuneisuushäiriöiden esiintyvyys maailmassa on trooppisessa Latinalaisessa Amerikassa (WHO/GBD-data) — juuri missä SAMA päällekkäistyy suurten väestökeskusten kanssa",
    ],
    s7Conclusion:
      "Kun geomagneettinen geometria muuttuu, biologinen vaste kääntyy. SAMA on Northern Packagen peilikuva — molemmat osoittavat, että CRY-riippuvainen biologia seuraa geomagneettisen kentän rakennetta.",

    predictionText:
      "Ennuste NORTH-PKG-1: Sinisilmäiset, laktoositolerantit yksilöt geomagneettisilla leveysasteilla >55°N osoittavat suurimman melatoniinivaimennuksen amplitudin geomagneettisten myrskyjen aikana (Kp ≥ 5) ja voimakkaimman kausimielialavaihtelun, verrattuna ruskeasilmäisiin, laktoosi-intolerantteihin yksilöihin samalla maantieteellisellä leveysasteella — koska kaikki kolme χ-komponenttia (optinen, molekulaarinen, geomagneettinen) ovat maksimoituja.",
    predictionLink: "Katso ennusteet →",
    predictionHref: "/predictions",
  },

  ja: {
    title:
      "北部パッケージ：3つの形質が1つの分子を最適化した方法",
    subtitle:
      "10,000–6,000年前に北ヨーロッパで共選択された3つの形質が、同じ分子システムを最適化 — クリプトクロム（CRY）。",
    backLink: "← エビデンスに戻る",
    cautionText:
      "北部パッケージはBERMの進化的統合（Mレベル）です。個々の構成要素は査読付き文献で確立されていますが、共選択仮説は直接テストされていません。",
    s1Title: "3つの形質、1つの分子",
    s1Text: [] as string[],
    s2Title: "目の色とCRY（χ_optical）",
    s2Points: [] as string[],
    s2Conclusion: "",
    s3Title:
      "乳糖耐性とFAD（χ_molecular）",
    s3Points: [] as string[],
    s3Conclusion: "",
    s4Title:
      "地磁気的位置（χ_geomagnetic）",
    s4Points: [] as string[],
    s4Conclusion: "",
    s5Title: "共選択の論拠",
    s5Lead: "",
    s5Points: [] as string[],
    s5CompareTitle: "",
    s5VitDLabel: "ビタミンD仮説",
    s5VitD: [] as string[],
    s5CRYLabel: "CRY仮説",
    s5CRY: [] as string[],
    s5Conclusion: "",
    s6Title: "進化的脆弱性",
    s6Points: [] as string[],
    s7Title: "SAMA — 鏡像",
    s7Lead: "",
    s7Points: [] as string[],
    s7Conclusion: "",
    predictionText: "",
    predictionLink:
      "予測を見る →",
    predictionHref: "/predictions",
  },

  fr: {
    title:
      "Le Package Nordique : Comment trois traits ont optimisé une molécule",
    subtitle:
      "Trois traits co-sélectionnés en Europe du Nord il y a 10 000–6 000 ans optimisent le même système moléculaire — le cryptochrome (CRY).",
    backLink: "← Retour aux Preuves",
    cautionText:
      "Le Package Nordique est la synthèse évolutive de BERM (niveau M). Les composants individuels sont établis dans la littérature évaluée par les pairs. L’hypothèse de co-sélection n’a pas été directement testée.",
    s1Title: "Trois traits, une molécule",
    s1Text: [] as string[],
    s2Title: "Couleur des yeux et CRY (χ_optical)",
    s2Points: [] as string[],
    s2Conclusion: "",
    s3Title:
      "Tolérance au lactose et FAD (χ_molecular)",
    s3Points: [] as string[],
    s3Conclusion: "",
    s4Title:
      "Localisation géomagnétique (χ_geomagnetic)",
    s4Points: [] as string[],
    s4Conclusion: "",
    s5Title: "L’argument de co-sélection",
    s5Lead: "",
    s5Points: [] as string[],
    s5CompareTitle: "",
    s5VitDLabel: "Hypothèse vitamine D",
    s5VitD: [] as string[],
    s5CRYLabel: "Hypothèse CRY",
    s5CRY: [] as string[],
    s5Conclusion: "",
    s6Title: "Vulnérabilité évolutive",
    s6Points: [] as string[],
    s7Title: "SAMA — L’image miroir",
    s7Lead: "",
    s7Points: [] as string[],
    s7Conclusion: "",
    predictionText: "",
    predictionLink: "Voir les prédictions →",
    predictionHref: "/predictions",
  },

  ko: {
    title:
      "북부 패키지: 세 가지 형질이 하나의 분자를 최적화한 방법",
    subtitle:
      "10,000–6,000년 전 북유럽에서 공동 선택된 세 가지 형질이 동일한 분자 시스템을 최적화 — 크립토크롬(CRY).",
    backLink:
      "← 증거로 돌아가기",
    cautionText:
      "북부 패키지는 BERM의 진화적 통합(M 수준)입니다. 개별 구성 요소는 동료 심사 문헌에서 확립되었으나 공동 선택 가설은 직접 테스트되지 않았습니다.",
    s1Title:
      "세 가지 형질, 하나의 분자",
    s1Text: [] as string[],
    s2Title:
      "눈 색깔과 CRY (χ_optical)",
    s2Points: [] as string[],
    s2Conclusion: "",
    s3Title:
      "유당 내성과 FAD (χ_molecular)",
    s3Points: [] as string[],
    s3Conclusion: "",
    s4Title:
      "지자기적 위치 (χ_geomagnetic)",
    s4Points: [] as string[],
    s4Conclusion: "",
    s5Title: "공동 선택 논거",
    s5Lead: "",
    s5Points: [] as string[],
    s5CompareTitle: "",
    s5VitDLabel:
      "비타민 D 가설",
    s5VitD: [] as string[],
    s5CRYLabel: "CRY 가설",
    s5CRY: [] as string[],
    s5Conclusion: "",
    s6Title: "진화적 취약성",
    s6Points: [] as string[],
    s7Title: "SAMA — 거울상",
    s7Lead: "",
    s7Points: [] as string[],
    s7Conclusion: "",
    predictionText: "",
    predictionLink:
      "예측 보기 →",
    predictionHref: "/predictions",
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
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function NorthernPackagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  const cite = (text: string) => (
    <InlineReferenceText text={text} locale={locale} />
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
      <p className="mb-6">
        <a
          href={`${prefix}/evidence`}
          className="text-sm text-accent hover:underline"
        >
          {d.backLink}
        </a>
      </p>

      <PageHeader icon={Snowflake} title={d.title} subtitle={d.subtitle} />

      <div className="mt-8">
        <CautionBox locale={locale}>
          <p>{d.cautionText}</p>
        </CautionBox>
      </div>

      {/* Section 1: Introduction */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s1Title}</h2>
        {d.s1Text.length > 0 && (
          <div className="space-y-4">
            {d.s1Text.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === d.s1Text.length - 1
                    ? "text-accent font-semibold"
                    : "text-foreground-muted"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Eye Color & CRY */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s2Title}</h2>
        {d.s2Points.length > 0 && (
          <div className="space-y-3">
            {d.s2Points.map((pt) => (
              <div
                key={pt}
                className="flex gap-3 rounded-lg border border-border/50 p-4"
              >
                <span className="text-accent mt-0.5 shrink-0">{"●"}</span>
                <p className="text-sm text-foreground-muted">{cite(pt)}</p>
              </div>
            ))}
          </div>
        )}
        {d.s2Conclusion && (
          <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4">
            <p className="text-sm font-medium text-center">
              {d.s2Conclusion}
            </p>
          </div>
        )}
      </section>

      {/* Section 3: Lactose Tolerance & FAD */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s3Title}</h2>
        {d.s3Points.length > 0 && (
          <div className="space-y-3">
            {d.s3Points.map((pt) => (
              <div
                key={pt}
                className="flex gap-3 rounded-lg border border-border/50 p-4"
              >
                <span className="text-accent mt-0.5 shrink-0">{"●"}</span>
                <p className="text-sm text-foreground-muted">{cite(pt)}</p>
              </div>
            ))}
          </div>
        )}
        {d.s3Conclusion && (
          <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4">
            <p className="text-sm font-medium text-center">
              {d.s3Conclusion}
            </p>
          </div>
        )}
      </section>

      {/* Section 4: Geomagnetic Location */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s4Title}</h2>
        {d.s4Points.length > 0 && (
          <div className="space-y-3">
            {d.s4Points.map((pt) => (
              <div
                key={pt}
                className="flex gap-3 rounded-lg border border-border/50 p-4"
              >
                <span className="text-accent mt-0.5 shrink-0">{"●"}</span>
                <p className="text-sm text-foreground-muted">{cite(pt)}</p>
              </div>
            ))}
          </div>
        )}
        {d.s4Conclusion && (
          <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4">
            <p className="text-sm font-medium text-center">
              {d.s4Conclusion}
            </p>
          </div>
        )}
      </section>

      {/* Section 5: Co-selection Argument */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s5Title}</h2>
        {d.s5Lead && (
          <p className="text-foreground-muted mb-6">{d.s5Lead}</p>
        )}
        {d.s5Points.length > 0 && (
          <div className="space-y-3">
            {d.s5Points.map((pt) => (
              <div
                key={pt}
                className="flex gap-3 rounded-lg border border-border/50 p-4"
              >
                <span className="text-accent mt-0.5 shrink-0">{"●"}</span>
                <p className="text-sm text-foreground-muted">{cite(pt)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Vitamin D vs CRY comparison */}
        {d.s5CompareTitle && (
          <>
            <h3 className="text-lg font-semibold mt-8 mb-4">
              {d.s5CompareTitle}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 p-4">
                <h4 className="font-medium text-sm mb-3">{d.s5VitDLabel}</h4>
                <ul className="space-y-2">
                  {d.s5VitD.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-foreground-muted">
                      <span className="shrink-0 mt-1 text-xs">{"•"}</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                <h4 className="font-medium text-sm mb-3">{d.s5CRYLabel}</h4>
                <ul className="space-y-2">
                  {d.s5CRY.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-foreground-muted">
                      <span className="shrink-0 mt-1 text-xs text-accent">{"✓"}</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
        {d.s5Conclusion && (
          <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4">
            <p className="text-sm font-medium text-center">
              {d.s5Conclusion}
            </p>
          </div>
        )}
      </section>

      {/* Section 6: Evolutionary Vulnerability */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s6Title}</h2>
        {d.s6Points.length > 0 && (
          <div className="space-y-3">
            {d.s6Points.map((pt) => (
              <div
                key={pt}
                className="flex gap-3 rounded-lg border border-border/50 p-4"
              >
                <span className="text-accent mt-0.5 shrink-0">{"●"}</span>
                <p className="text-sm text-foreground-muted">{cite(pt)}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 7: SAMA */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">{d.s7Title}</h2>
        {d.s7Lead && (
          <p className="text-lg font-medium text-accent mb-4">{d.s7Lead}</p>
        )}
        {d.s7Points.length > 0 && (
          <div className="space-y-3">
            {d.s7Points.map((pt) => (
              <div
                key={pt}
                className="flex gap-3 rounded-lg border border-border/50 p-4"
              >
                <span className="text-accent mt-0.5 shrink-0">{"●"}</span>
                <p className="text-sm text-foreground-muted">{cite(pt)}</p>
              </div>
            ))}
          </div>
        )}
        {d.s7Conclusion && (
          <div className="mt-6 rounded-lg bg-accent/5 border border-accent/20 p-4">
            <p className="text-sm font-medium text-center">
              {d.s7Conclusion}
            </p>
          </div>
        )}
      </section>

      {/* Prediction */}
      {d.predictionText && (
        <div className="mt-10">
          <DerivedPrediction locale={locale}>
            <p className="text-sm leading-relaxed mb-3">
              {d.predictionText}
            </p>
            <a
              href={`${prefix}${d.predictionHref}`}
              className="text-sm text-accent hover:underline"
            >
              {d.predictionLink}
            </a>
          </DerivedPrediction>
        </div>
      )}
    </div>
  );
}
