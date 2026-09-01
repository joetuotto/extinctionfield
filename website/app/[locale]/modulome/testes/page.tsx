import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CitationLink } from "@/components/CitationLink";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "The Reproductive Target",
    subtitle:
      "Leydig cells (Cav3 → testosterone), spermatogonia (Cav1+Cav3), Sertoli cells (BTB), mature sperm (CatSper) — multiple EMF-sensitive components in parallel",
    backLink: "← Back to Modulome",

    /* 01 Hero */
    s1Title: "Multiple EMF-Sensitive Components",
    s1p1:
      "The testes contain at least four distinct EMF-sensitive cellular compartments operating in parallel. Leydig cells use T-type calcium channels (Cav3) for testosterone biosynthesis via StAR protein (Xiang 2025). Spermatogonia require BOTH Cav1 (L-type) and Cav3 (T-type) channels for normal spermatogenesis (Ma 2026). Sertoli cells maintain the blood-testis barrier (BTB) using the same tight junction proteins (occludin, ZO-1) as the blood-brain barrier. Mature sperm use CatSper channels for capacitation and the acrosome reaction.",
    s1p2:
      "This means EMF exposure attacks male reproductive function through multiple independent mechanisms simultaneously. Even if one mechanism is marginal, the convergence of several mechanisms on the same endpoint (reduced fertility) creates a robust effect that is difficult to attribute to any single pathway.",
    s1p3:
      "The testes occupy a unique position in the BERM framework: they are the only organ where both VGCC-mediated ion channel disruption (pathways A/B) and biological barrier disruption (pathway F) converge on the same functional outcome.",

    /* 02 Channel Profile */
    s2Title: "Channel Profile",
    s2Channels: [
      {
        name: "Cav3 (T-type) in Leydig cells",
        function: "Testosterone biosynthesis via StAR protein",
        mechanism: "Cav3 → Ca2+ → StAR phosphorylation → cholesterol transport → testosterone",
        evidence: "Xiang 2025 — Cav3 directly controls StAR-mediated steroidogenesis",
      },
      {
        name: "CatSper in mature sperm",
        function: "Capacitation, hyperactivated motility, acrosome reaction",
        mechanism: "pH-gated Ca2+ channel essential for fertilization competence",
        evidence: "CatSper knockout = male infertility (multiple studies)",
      },
      {
        name: "Cav1 + Cav3 in spermatogonia",
        function: "Both required for normal spermatogenesis",
        mechanism: "L-type (Cav1) and T-type (Cav3) cooperatively support cell proliferation and differentiation",
        evidence: "Ma 2026 — dual requirement demonstrated; neither alone sufficient",
      },
      {
        name: "BTB (Sertoli cell tight junctions)",
        function: "Immune-privileged spermatogenic microenvironment",
        mechanism: "Occludin + ZO-1 + claudins = same TJ proteins as BBB",
        evidence: "Yu 2019 — 4G 2605 MHz disrupts BTB via Spock3-MMP2 axis",
      },
    ],

    /* 03 Mechanism Chain */
    s3Title: "Mechanism Chain: Two Parallel Attacks",
    s3Attack1Title: "Attack 1: Hormonal (Cav3 → testosterone)",
    s3Attack1:
      "EMF → Schwan delta-Vm → Cav3 window current → Ca2+ dysregulation → StAR phosphorylation disruption → cholesterol transport impaired → testosterone ↓",
    s3Attack2Title: "Attack 2: Barrier (BTB disruption)",
    s3Attack2:
      "EMF → MMP2 upregulation (Spock3-MMP2 axis) → occludin/ZO-1 degradation → BTB opening → spermatogenic microenvironment compromised → immune exposure of developing sperm → spermatogenesis disrupted",
    s3p1:
      "These two attacks are independent mechanisms targeting the same organ. Attack 1 operates through Cav3 ion channels (pathway A). Attack 2 operates through biological barrier disruption (pathway F). They reinforce each other: testosterone is required for BTB maintenance (Sertoli cell function is testosterone-dependent), so Attack 1 weakens the defense against Attack 2.",
    s3p2:
      "The result is a positive feedback loop: EMF → testosterone ↓ → BTB weakens → microenvironment exposed → spermatogenesis further disrupted → more damage with cumulative exposure.",

    /* 04 Evidence */
    s4Title: "Key Evidence",
    s4Studies: [
      {
        citation: "Xiang et al.",
        year: 2025, referenceId: "xiang2025_clc2_ttype",
        finding: "Cav3 (T-type) calcium channels directly control testosterone biosynthesis via StAR protein in Leydig cells. T-type channel activity is required for cholesterol transport to the inner mitochondrial membrane.",
        level: "E",
      },
      {
        citation: "Ma et al.",
        year: 2026, referenceId: "ma2026_spermatogenesis_cav",
        finding: "Both Cav1 (L-type) and Cav3 (T-type) calcium channels are required for normal spermatogenesis. Neither channel type alone is sufficient — dual requirement creates dual vulnerability.",
        level: "E",
      },
      {
        citation: "Yu et al. (Sci Total Environ)",
        year: 2019, referenceId: "yu2019_btb",
        finding: "Long-term 4G exposure (2605 MHz) directly disrupts blood-testis barrier integrity via the Spock3-MMP2 axis. Time-dependent, progressive reproductive toxicity.",
        level: "E",
      },
      {
        citation: "23-28 VGCC blocker studies",
        year: "2018-2025", referenceId: "vgcc_blocker_studies_collection",
        finding: "Systematic evidence from 23-28 studies: VGCC blocker administration prevents or attenuates EMF-induced biological effects. Confirms that VGCC/Cav channels are the primary transduction pathway.",
        level: "M",
      },
    ],

    /* 05 Lindgren Analysis */
    s5Title: "Lindgren Analysis",
    s5p1:
      "The testes present a unique Lindgren analysis because the blood-testis barrier (BTB) creates a positive feedback vulnerability:",
    s5Criteria: [
      "chi_barrier (BTB) — uses same TJ proteins as BBB. EMF opens BTB → spermatogenic microenvironment exposed → more damage",
      "chi_channel — Cav3 in Leydig cells at bifurcation. Cav1+Cav3 dual requirement in spermatogonia doubles vulnerability surface",
      "chi_cumulative — BTB disruption is progressive (Yu 2019: time-dependent). Testosterone decline further weakens BTB. Positive feedback.",
      "chi_barrier amplifies with cumulative exposure — each cycle of BTB weakening + testosterone decline makes the next cycle worse",
    ],
    s5p2:
      "The positive feedback structure means that the testes chi does not reach a steady state — it increases with cumulative exposure duration. This predicts that testicular EMF effects should be progressive and irreversible beyond a certain exposure threshold, consistent with the age-dependent fertility decline observed in epidemiological data.",

    /* 06 Predictions */
    s6Title: "Predictions",
    s6Predictions: [
      {
        id: "TTYPE-1",
        text: "Selective T-type calcium channel blocker (TTA-P2) prevents EMF-induced testosterone decline in Leydig cell cultures. If EMF acts via Cav3, blocking the channel specifically should abolish the StAR-mediated steroidogenesis disruption.",
        discriminating: true,
      },
      {
        id: "BTB-1",
        text: "EMF-exposed testicular tissue shows occludin/ZO-1 degradation in the same spatial pattern as BBB disruption studies. If BTB and BBB share the same EMF-vulnerable tight junction mechanism, the molecular signature should be identical.",
        discriminating: true,
      },
    ],

    /* 07 CatSper Temperature */
    s7Title: "CatSper: Temperature-Gated at 33.5°C",
    s7p1: "Nature Communications 2025 revealed CatSper functions as a temperature-gated ion channel with thermal threshold 33.5°C and Q10 of 5.1. Premature activation impairs sperm function.",
    s7p2: "Connects to Blackman's temperature window (Ca2+ effects at 36–37°C only): both are narrow temperature windows near physiological temperature. Same χ_temperature that modulates Blackman's Ca2+ efflux also modulates CatSper-mediated capacitation.",
    s7p3: "BERM prediction: EMF perturbation via voltage-sensing domains could “pre-activate” CatSper at lower temperatures, causing premature capacitation → sperm exhaustion before reaching the egg. Reduces FUNCTIONAL fertility even if sperm count and morphology appear normal.",

    /* 08 Epigenetic Transgenerational Amplification */
    s8Title: "Epigenetic Transgenerational Amplification",
    s8Subtitle: "From Ca2+ to the Next Generation",
    s8Chain: [
      { step: 1, text: "EMF → VGCC → Ca2+ (Pall 2013, 23 studies)", level: "E", preprint: false },
      { step: 2, text: "Ca2+ → mitochondrial ROS (Scientific Reports 2019: mouse sperm, 905 MHz)", level: "E", preprint: false },
      { step: 3, text: "ROS → oxidative DNA damage in sperm: 8-OHdG as “carrier for next generation” (Cells 2023)", level: "E", preprint: false },
      { step: 4, text: "EMF → sperm DNA methylation changes IN HUMANS (Research Square 2025: radar-exposed men)", level: "E", preprint: true },
      { step: 5, text: "EMF → DNMT1/DNMT3b expression changes in spermatocytes (GC-2 cell line, 50 Hz ELF)", level: "E", preprint: false },
      { step: 6, text: "Non-monotonic methylation: decreased at 1 mT, INCREASED at 3 mT — same “window effect” as Blackman's Ca2+ efflux", level: "E", preprint: false },
      { step: 7, text: "Last link UNTESTED: Do EMF-induced sperm epigenetic changes persist in F3?", level: "U", preprint: false },
    ],
    s8FeedbackTitle: "If confirmed: Transgenerational amplification loop",
    s8FeedbackDesc: "EMF → sperm epigenome → offspring with altered χ_channel → increased EMF sensitivity → more epigenetic changes → F3 even more sensitive. This predicts ACCELERATING decline, consistent with Levine's meta-analysis: −1.16%/yr (1973–2000) → −2.64%/yr (2000–2018).",
    s8PreprintWarning: "Research Square 2025 is a PREPRINT, not peer-reviewed. Results should be treated as preliminary.",
    s8F3Warning: "The transgenerational F3 link is a DERIVED PREDICTION, not proven. It requires F3 animal studies to confirm.",

    seeAlso: "See also",
    modulomeOverview: "Modulome overview",
    evidencePortal: "Evidence register",
    bbbPage: "BBB & BTB barriers",
    citationLabel: "Citation",
    yearLabel: "Year",
    findingLabel: "Finding",
    levelLabel: "Level",
    channelLabel: "Channel",
    functionLabel: "Function",
    mechanismLabel: "Mechanism",
    evidenceLabel: "Evidence",
    discriminatingBadge: "Discriminating",
    allPredictions: "All predictions →",
    notTestedLabel: "NOT TESTED",
    warningLabel: "Warning",
  },
  fi: {
    title: "Lisääntymiskohde",
    subtitle:
      "Leydigin solut (Cav3 → testosteroni), spermatogoniat (Cav1+Cav3), Sertolin solut (BTB), kypsäät siittiöt (CatSper) — useita EMF-herkkiä komponentteja rinnakkain",
    backLink: "← Takaisin moduloomiin",

    s1Title: "Useita EMF-herkkiä komponentteja",
    s1p1:
      "Kivekset sisältävät vähintään neljä erillistä EMF-herkkää soluosastoa jotka toimivat rinnakkain. Leydigin solut käyttävät T-tyypin kalsiumkanavia (Cav3) testosteronibiosynteesiin StAR-proteiinin kautta (Xiang 2025). Spermatogoniat vaativat SEKÄ Cav1- (L-tyyppi) että Cav3-kanavia (T-tyyppi) normaaliin spermatogeneesiin (Ma 2026). Sertolin solut ylläpitävät veri-kivesestettä (BTB) käyttäen samoja tight junction -proteiineja (okkludiini, ZO-1) kuin veri-aivoeste. Kypsät siittiöt käyttävät CatSper-kanavia kapasitaatioon ja akrosomireaktioon.",
    s1p2:
      "Tämä tarkoittaa, että EMF-altistus hyökkää miehen lisääntymistoimintaa useilla riippumattomilla mekanismeilla samanaikaisesti. Vaikka yksittäinen mekanismi olisi marginaalinen, useiden mekanismien yhdentyminen samaan päätetapahtumaan (hedelmällisyyden heikkeneminen) luo robustin vaikutuksen jota on vaikea liittaa mihinkaan yksittäiseen polkuun.",
    s1p3:
      "Kivekset ovat ainutlaatuisessa asemassa BERM-kehyksessä: ne ovat ainoa elin jossa sekä VGCC-valitteinen ionikanavahäiriö (polut A/B) että biologisen esteen häiriö (polku F) yhtyvät samaan toiminnalliseen lopputulokseen.",

    s2Title: "Kanavaprofiili",
    s2Channels: [
      {
        name: "Cav3 (T-tyyppi) Leydigin soluissa",
        function: "Testosteronibiosynteesi StAR-proteiinin kautta",
        mechanism: "Cav3 → Ca2+ → StAR-fosforylaatio → kolesterolin kuljetus → testosteroni",
        evidence: "Xiang 2025 — Cav3 kontrolloi suoraan StAR-valitteista steroidogeneesia",
      },
      {
        name: "CatSper kypsissä siittiöissä",
        function: "Kapasitaatio, hyperaktivoitu motiliteetti, akrosomireaktio",
        mechanism: "pH-säädelty Ca2+-kanava joka on välttämätön hedelmöityskykyisyydelle",
        evidence: "CatSper-knockout = miehen infertiliteetti (useita tutkimuksia)",
      },
      {
        name: "Cav1 + Cav3 spermatogonioissa",
        function: "Molemmat vaaditaan normaaliin spermatogeneesiin",
        mechanism: "L-tyyppi (Cav1) ja T-tyyppi (Cav3) tukevat yhdessä solujen proliferaatiota ja erilaistumista",
        evidence: "Ma 2026 — kaksoisvaatimus osoitettu; kumpikaan yksin ei riita",
      },
      {
        name: "BTB (Sertolin solujen tight junctionit)",
        function: "Immuuniprivilegioitu spermatogeneettinen mikroympäristö",
        mechanism: "Okkludiini + ZO-1 + klaudiinit = samat TJ-proteiinit kuin BBB:ssa",
        evidence: "Yu 2019 — 4G 2605 MHz häiritsee BTB:ta Spock3-MMP2-akselin kautta",
      },
    ],

    s3Title: "Mekanismiketju: kaksi rinnakkaista hyökkäystä",
    s3Attack1Title: "Hyökkäys 1: Hormonaalinen (Cav3 → testosteroni)",
    s3Attack1:
      "EMF → Schwanin delta-Vm → Cav3-ikkunavirta → Ca2+-dysregulaatio → StAR-fosforylaation häiriö → kolesterolin kuljetus heikkenee → testosteroni ↓",
    s3Attack2Title: "Hyökkäys 2: Este (BTB-häiriö)",
    s3Attack2:
      "EMF → MMP2-ylisäätely (Spock3-MMP2-akseli) → okkludiini/ZO-1-degradaatio → BTB avautuu → spermatogeneettinen mikroympäristö vaarantuu → kehittyvät siittiöt altistuvat immuunijärjestelmälle → spermatogeneesi häiriintyy",
    s3p1:
      "Nämä kaksi hyökkäystä ovat riippumattomia mekanismeja jotka kohdistuvat samaan elimeen. Hyökkäys 1 toimii Cav3-ionikanavien kautta (polku A). Hyökkäys 2 toimii biologisen esteen häiriön kautta (polku F). Ne vahvistavat toisiaan: testosteroni vaaditaan BTB:n ylläpitoon (Sertolin solujen toiminta on testosteroniriippuvaista), joten Hyökkäys 1 heikentää puolustusta Hyökkäystä 2 vastaan.",
    s3p2:
      "Tuloksena on positiivinen takaisinkytkentäsilmukka: EMF → testosteroni ↓ → BTB heikkenee → mikroympäristö altistuu → spermatogeneesi häiriintyy edelleen → kumulatiivinen altistus lisää vahinkoa.",

    s4Title: "Keskeinen näyttö",
    s4Studies: [
      {
        citation: "Xiang ym.",
        year: 2025, referenceId: "xiang2025_clc2_ttype",
        finding: "Cav3 (T-tyyppi) kalsiumkanavat kontrolloivat suoraan testosteronibiosynteesiä StAR-proteiinin kautta Leydigin soluissa. T-tyypin kanava-aktiivisuus vaaditaan kolesterolin kuljetukseen sisemmalle mitokondriaalikalvolle.",
        level: "E",
      },
      {
        citation: "Ma ym.",
        year: 2026, referenceId: "ma2026_spermatogenesis_cav",
        finding: "Sekä Cav1- (L-tyyppi) että Cav3-kalsiumkanavat (T-tyyppi) vaaditaan normaaliin spermatogeneesiin. Kumpikaan kanavatyyppi yksin ei riita — kaksoisvaatimus luo kaksoishaavoittuvuuden.",
        level: "E",
      },
      {
        citation: "Yu ym. (Sci Total Environ)",
        year: 2019, referenceId: "yu2019_btb",
        finding: "Pitkäaikainen 4G-altistus (2605 MHz) häiritsee suoraan veri-kivesesteen eheyttä Spock3-MMP2-akselin kautta. Aikariippuvainen, etenevä lisääntymistoksisuus.",
        level: "E",
      },
      {
        citation: "23-28 VGCC-salpaajatutkimusta",
        year: "2018-2025", referenceId: "vgcc_blocker_studies_collection",
        finding: "Systemaattinen näyttö 23-28 tutkimuksesta: VGCC-salpaajan anto estää tai vaimentaa EMF-aiheutettuja biologisia vaikutuksia. Vahvistaa, että VGCC/Cav-kanavat ovat ensisijainen transduuktiopolku.",
        level: "M",
      },
    ],

    s5Title: "Lindgren-analyysi",
    s5p1:
      "Kivekset tarjoavat ainutlaatuisen Lindgren-analyysin koska veri-kiveseste (BTB) luo positiivisen takaisinkytkentähaavoittuvuuden:",
    s5Criteria: [
      "chi_barrier (BTB) — käyttää samoja TJ-proteiineja kuin BBB. EMF avaa BTB:n → spermatogeneettinen mikroympäristö altistuu → enemmän vahinkoa",
      "chi_channel — Cav3 Leydigin soluissa bifurkaatiossa. Cav1+Cav3-kaksoisvaatimus spermatogonioissa kaksinkertaistaa haavoittuvuuspinta-alan",
      "chi_cumulative — BTB-häiriö on etenevä (Yu 2019: aikariippuvainen). Testosteronin lasku heikentää BTB:ta edelleen. Positiivinen takaisinkytkentä.",
      "chi_barrier vahvistuu kumulatiivisen altistuksen myötä — jokainen BTB:n heikkenemisen + testosteronin laskun kierros tekee seuraavasta kierroksesta pahemman",
    ],
    s5p2:
      "Positiivinen takaisinkytkentärakenne tarkoittaa, että kivesten chi ei saavuta tasapainotilaa — se kasvaa kumulatiivisen altistuksen keston myötä. Tämä ennustaa, että kivesten EMF-vaikutusten tulisi olla progressiivisia ja peruuttamattomia tietyn altistuskynnyksen jälkeen, yhdenmukainen epidemiologisissa tiedoissa havaitun ikäriippuvaisen hedelmällisyyden laskun kanssa.",

    s6Title: "Ennusteet",
    s6Predictions: [
      {
        id: "TTYPE-1",
        text: "Selektiivinen T-tyypin kalsiumkanavan salpaaja (TTA-P2) estää EMF-indusoidun testosteronin laskun Leydigin soluviljelma. Jos EMF vaikuttaa Cav3:n kautta, kanavan tarkka salpaaminen tulisi kumota StAR-valitteisen steroidogeneesin häiriö.",
        discriminating: true,
      },
      {
        id: "BTB-1",
        text: "EMF-altistettu kiveskudos osoittaa okkludiini/ZO-1-degradaation samassa spatiaalisessa kuviossa kuin BBB-häiriöötutkimukset. Jos BTB ja BBB jakavat saman EMF-haavoittuvan tight junction -mekanismin, molekulaarisen allekirjoituksen tulisi olla identtinen.",
        discriminating: true,
      },
    ],

    /* 07 CatSper-lämpötila */
    s7Title: "CatSper: Lämpötilaohjattu 33,5 °C:ssa",
    s7p1: "Nature Communications 2025 paljasti, että CatSper toimii lämpötilaohjattuna ionikanavana termisella kynnyksellä 33,5 °C ja Q10-arvolla 5,1. Ennenaikainen aktivoituminen heikentää siittiöiden toimintaa.",
    s7p2: "Yhteys Blackmanin lämpötilaikkunaan (Ca2+-vaikutukset vain 36–37 °C:ssa): molemmat ovat kapeita lämpötilaikkunoita fysiologisen lämpötilan lähellä. Sama chi_temperature säätelee sekä Blackmanin Ca2+-effluksia että CatSper-valitteista kapasitaatiota.",
    s7p3: "BERM-ennuste: EMF-häiriö jänniteanturidomeenien kautta voisi \"esiaktivoida\" CatSperin matalammissa lämpötiloissa → ennenaikainen kapasitaatio → siittiöiden uupuminen ennen munasolun saavuttamista. Vahentaa TOIMINNALLISTA hedelmällisyyttä vaikka siittiomäärä ja morfologia näyttäisivät normaaleilta.",

    /* 08 Epigeneettinen ylisukupolvinen vahvistus */
    s8Title: "Epigeneettinen ylisukupolvinen vahvistus",
    s8Subtitle: "Ca2+:sta seuraavaan sukupolveen",
    s8Chain: [
      { step: 1, text: "EMF → VGCC → Ca2+ (Pall 2013, 23 tutkimusta)", level: "E", preprint: false },
      { step: 2, text: "Ca2+ → mitokondriaalinen ROS (Scientific Reports 2019: hiiren siittiöt, 905 MHz)", level: "E", preprint: false },
      { step: 3, text: "ROS → oksidatiivinen DNA-vaurio siittiöissä: 8-OHdG \"kantajana seuraavalle sukupolvelle\" (Cells 2023)", level: "E", preprint: false },
      { step: 4, text: "EMF → siittiöiden DNA-metylaatiomuutokset IHMISILLA (Research Square 2025: tutkasateille altistuneet miehet)", level: "E", preprint: true },
      { step: 5, text: "EMF → DNMT1/DNMT3b-ekspression muutokset spermatosyyteissa (GC-2-solulinja, 50 Hz ELF)", level: "E", preprint: false },
      { step: 6, text: "Ei-monotoninen metylaatio: laskenut 1 mT:ssa, NOUSSUT 3 mT:ssa — sama \"ikkunavaikutus\" kuin Blackmanin Ca2+-effluksissa", level: "E", preprint: false },
      { step: 7, text: "Viimeinen linkki TESTAAMATON: säilyvätkö EMF-indusoidut siittiöiden epigeneettiset muutokset F3-sukupolveen?", level: "U", preprint: false },
    ],
    s8FeedbackTitle: "Jos vahvistetaan: ylisukupolvinen vahvistussilmukka",
    s8FeedbackDesc: "EMF → siittiöiden epigenoomi → jalkela muuttuneella chi_channel → lisääntynyt EMF-herkkyys → enemmän epigeneettisia muutoksia → F3 entista herkempi. Ennustaa KIIHTYVAA laskua, yhdenmukainen Levinen meta-analyysin kanssa: −1,16 %/v (1973–2000) → −2,64 %/v (2000–2018).",
    s8PreprintWarning: "Research Square 2025 on PREPRINTTI, ei vertaisarvioitu. Tuloksia tulee käsitellä alustavina.",
    s8F3Warning: "Ylisukupolvinen F3-linkki on JOHDETTU ENNUSTE, ei todistettu. Se vaatii F3-elaintutkimuksia vahvistukseksi.",

    seeAlso: "Katso myös",
    modulomeOverview: "Moduloomin yleiskatsaus",
    evidencePortal: "Näyttörekisteri",
    bbbPage: "BBB- ja BTB-esteet",
    citationLabel: "Viite",
    yearLabel: "Vuosi",
    findingLabel: "Löydös",
    levelLabel: "Taso",
    channelLabel: "Kanava",
    functionLabel: "Toiminto",
    mechanismLabel: "Mekanismi",
    evidenceLabel: "Näyttö",
    discriminatingBadge: "Erotteleva",
    allPredictions: "Kaikki ennusteet →",
    notTestedLabel: "EI TESTATTU",
    warningLabel: "Varoitus",
  },
  ja: {
    title: "生殖標的",
    subtitle:
      "ライディッヒ細胞 (Cav3 → テストステロン)、精原細胞 (Cav1+Cav3)、セルトリ細胞 (BTB)、成熟精子 (CatSper) — 並列する複数のEMF感受性コンポーネント",
    backLink: "← モジュロームに戻る",

    s1Title: "複数のEMF感受性コンポーネント",
    s1p1:
      "精巣には少なくとも4つの異なるEMF感受性細胞区画が並列して存在する。ライディッヒ細胞はStARタンパク質を介したテストステロン生合成にT型カルシウムチャネル (Cav3) を使用する (Xiang 2025)。精原細胞は正常な精子形成にCav1 (L型) とCav3 (T型) の両チャネルを必要とする (Ma 2026)。セルトリ細胞は血液脳関門と同じタイトジャンクションタンパク質 (オクルディン、ZO-1) を使用して血液精巣関門 (BTB) を維持する。成熟精子はキャパシテーションと先体反応にCatSperチャネルを使用する。",
    s1p2:
      "これはEMF曝露が複数の独立メカニズムで男性生殖機能を同時に攻撃することを意味する。単一のメカニズムが限界的であっても、同じエンドポイント (生殖能力の低下) への複数メカニズムの収束が、いかなる単一経路にも帰属しにくいロバストな効果を生む。",
    s1p3:
      "精巣はBERMフレームワークにおいて独自の位置を占める：VGCC媒介イオンチャネル障害 (経路A/B) と生物学的バリア障害 (経路F) の両方が同じ機能的結果に収束する唯一の臓器である。",

    s2Title: "チャネルプロファイル",
    s2Channels: [
      {
        name: "ライディッヒ細胞のCav3 (T型)",
        function: "StARタンパク質を介したテストステロン生合成",
        mechanism: "Cav3 → Ca2+ → StARリン酸化 → コレステロール輸送 → テストステロン",
        evidence: "Xiang 2025 — Cav3 directly controls StAR-mediated steroidogenesis",
      },
      {
        name: "成熟精子のCatSper",
        function: "キャパシテーション、過活性化運動性、先体反応",
        mechanism: "受精能獲得に必須のpH依存性Ca2+チャネル",
        evidence: "CatSper knockout = male infertility (multiple studies)",
      },
      {
        name: "精原細胞のCav1 + Cav3",
        function: "正常な精子形成に両方が必要",
        mechanism: "L型 (Cav1) とT型 (Cav3) が協調して細胞増殖と分化を支持",
        evidence: "Ma 2026 — dual requirement demonstrated; neither alone sufficient",
      },
      {
        name: "BTB (セルトリ細胞タイトジャンクション)",
        function: "免疫特権的精子形成微小環境",
        mechanism: "オクルディン + ZO-1 + クローディン = BBBと同じTJタンパク質",
        evidence: "Yu 2019 — 4G 2605 MHz disrupts BTB via Spock3-MMP2 axis",
      },
    ],

    s3Title: "メカニズムチェーン：2つの並列攻撃",
    s3Attack1Title: "攻撃1：ホルモン性 (Cav3 → テストステロン)",
    s3Attack1:
      "EMF → Schwan delta-Vm → Cav3 window current → Ca2+ dysregulation → StAR phosphorylation disruption → cholesterol transport impaired → testosterone ↓",
    s3Attack2Title: "攻撃2：バリア (BTB障害)",
    s3Attack2:
      "EMF → MMP2 upregulation (Spock3-MMP2 axis) → occludin/ZO-1 degradation → BTB opening → spermatogenic microenvironment compromised → immune exposure of developing sperm → spermatogenesis disrupted",
    s3p1:
      "これら2つの攻撃は同じ臓器を標的とする独立メカニズムである。攻撃1はCav3イオンチャネルを介して作用 (経路A)。攻撃2は生物学的バリア障害を介して作用 (経路F)。両者は互いを強化する：テストステロンはBTB維持に必要であり (セルトリ細胞機能はテストステロン依存)、攻撃1は攻撃2に対する防御を弱める。",
    s3p2:
      "結果は正のフィードバックループである：EMF → テストステロン ↓ → BTB弱化 → 微小環境露出 → 精子形成がさらに障害 → 累積曝露でさらなる損傷。",

    s4Title: "主要なエビデンス",
    s4Studies: [
      {
        citation: "Xiang et al.",
        year: 2025, referenceId: "xiang2025_clc2_ttype",
        finding: "Cav3 (T型) カルシウムチャネルがライディッヒ細胞でStARタンパク質を介してテストステロン生合成を直接制御。T型チャネル活性がミトコンドリア内膜へのコレステロール輸送に必要。",
        level: "E",
      },
      {
        citation: "Ma et al.",
        year: 2026, referenceId: "ma2026_spermatogenesis_cav",
        finding: "正常な精子形成にCav1 (L型) とCav3 (T型) の両カルシウムチャネルが必要。どちらのチャネル型単独でも不十分 — 二重要件が二重脆弱性を生む。",
        level: "E",
      },
      {
        citation: "Yu et al. (Sci Total Environ)",
        year: 2019, referenceId: "yu2019_btb",
        finding: "長期4G曝露 (2605 MHz) がSpock3-MMP2軸を介して血液精巣関門の完全性を直接障害。時間依存的で進行性の生殖毒性。",
        level: "E",
      },
      {
        citation: "23-28 VGCC blocker studies",
        year: "2018-2025", referenceId: "vgcc_blocker_studies_collection",
        finding: "23-28研究からの体系的エビデンス：VGCC遮断薬投与がEMF誘導生物学的効果を防止または軽減。VGCC/Cavチャネルが主要変換経路であることを確認。",
        level: "M",
      },
    ],

    s5Title: "Lindgren解析",
    s5p1:
      "精巣は血液精巣関門 (BTB) が正のフィードバック脆弱性を生むため独自のLindgren解析を提示する：",
    s5Criteria: [
      "chi_barrier (BTB) — BBBと同じTJタンパク質を使用。EMFがBTBを開く → 精子形成微小環境が露出 → さらなる損傷",
      "chi_channel — 分岐点のライディッヒ細胞Cav3。精原細胞のCav1+Cav3二重要件が脆弱性表面を倍増",
      "chi_cumulative — BTB障害は進行性 (Yu 2019: 時間依存的)。テストステロン低下がBTBをさらに弱める。正のフィードバック。",
      "chi_barrier は累積曝露とともに増幅 — BTB弱化 + テストステロン低下の各サイクルが次のサイクルを悪化させる",
    ],
    s5p2:
      "正のフィードバック構造は精巣の chi が定常状態に達しないことを意味する — 累積曝露期間とともに増加する。これは精巣EMF効果が進行性であり、一定の曝露閾値を超えると不可逆的であることを予測し、疫学データで観察される年齢依存的生殖能力低下と一致する。",

    s6Title: "予測",
    s6Predictions: [
      {
        id: "TTYPE-1",
        text: "選択的T型カルシウムチャネル遮断薬 (TTA-P2) がライディッヒ細胞培養でEMF誘導テストステロン低下を防止する。EMFがCav3を介して作用するなら、チャネルを特異的に遮断すればStAR媒介ステロイド生合成障害を消失させるはずである。",
        discriminating: true,
      },
      {
        id: "BTB-1",
        text: "EMF曝露精巣組織がBBB障害研究と同じ空間パターンのオクルディン/ZO-1分解を示す。BTBとBBBが同じEMF脆弱タイトジャンクションメカニズムを共有するなら、分子シグネチャーは同一であるはずである。",
        discriminating: true,
      },
    ],

    s7Title: "CatSper：33.5°Cでの温度ゲート",
    s7p1: "Nature Communications 2025はCatSperが熱閾値33.5°C、Q10値5.1の温度ゲートイオンチャネルとして機能することを明らかにした。早期活性化は精子機能を損なう。",
    s7p2: "Blackmanの温度ウィンドウ (36–37°Cでのみのカルシウム効果) との関連：両方とも生理的温度付近の狭い温度ウィンドウである。BlackmanのCa2+排出を調節するのと同じ χ_temperature がCatSper媒介キャパシテーションも調節する。",
    s7p3: "BERM予測：電圧感知ドメインを介したEMF摂動がCatSperをより低い温度で「事前活性化」し、早期キャパシテーション → 卵子到達前の精子消耗を引き起こしうる。精子数と形態が正常に見えても機能的生殖能力を低下させる。",

    s8Title: "エピジェネティック世代間増幅",
    s8Subtitle: "Ca2+から次世代へ",
    s8Chain: [
      { step: 1, text: "EMF → VGCC → Ca2+ (Pall 2013, 23研究)", level: "E", preprint: false },
      { step: 2, text: "Ca2+ → ミトコンドリアROS (Scientific Reports 2019: マウス精子, 905 MHz)", level: "E", preprint: false },
      { step: 3, text: "ROS → 精子の酸化的DNA損傷: 8-OHdGが「次世代への担体」(Cells 2023)", level: "E", preprint: false },
      { step: 4, text: "EMF → ヒトにおける精子DNAメチル化変化 (Research Square 2025: レーダー曝露男性)", level: "E", preprint: true },
      { step: 5, text: "EMF → 精母細胞でのDNMT1/DNMT3b発現変化 (GC-2細胞株, 50 Hz ELF)", level: "E", preprint: false },
      { step: 6, text: "非単調メチル化: 1 mTで減少、3 mTで増加 — Blackmanの Ca2+排出と同じ「ウィンドウ効果」", level: "E", preprint: false },
      { step: 7, text: "最後のリンク未検証: EMF誘導精子エピジェネティック変化はF3世代まで持続するか？", level: "U", preprint: false },
    ],
    s8FeedbackTitle: "確認された場合：世代間増幅ループ",
    s8FeedbackDesc: "EMF → 精子エピゲノム → χ_channelが変化した子孫 → EMF感受性増加 → さらなるエピジェネティック変化 → F3世代はさらに感受性が高い。加速する低下を予測し、Levineのメタアナリシスと一致: −1.16%/年 (1973–2000) → −2.64%/年 (2000–2018)。",
    s8PreprintWarning: "Research Square 2025はプレプリントであり、査読を受けていない。結果は予備的として扱うべきである。",
    s8F3Warning: "世代間F3リンクは導出された予測であり、証明されていない。確認にはF3動物研究が必要。",

    seeAlso: "関連項目",
    modulomeOverview: "モジュローム概要",
    evidencePortal: "エビデンス登録",
    bbbPage: "BBBおよびBTBバリア",
    citationLabel: "引用",
    yearLabel: "年",
    findingLabel: "知見",
    levelLabel: "レベル",
    channelLabel: "チャネル",
    functionLabel: "機能",
    mechanismLabel: "メカニズム",
    evidenceLabel: "エビデンス",
    discriminatingBadge: "弁別的",
    allPredictions: "全ての予測 →",
    notTestedLabel: "未検証",
    warningLabel: "警告",
  },
  fr: {
    title: "La cible reproductive",
    subtitle:
      "Cellules de Leydig (Cav3 → testosterone), spermatogonies (Cav1+Cav3), cellules de Sertoli (BTB), spermatozoides matures (CatSper) — multiples composants sensibles aux EMF en parallele",
    backLink: "← Retour au Modulome",

    s1Title: "Multiples composants sensibles aux EMF",
    s1p1:
      "Les testicules contiennent au moins quatre compartiments cellulaires distincts sensibles aux EMF operant en parallele. Les cellules de Leydig utilisent des canaux calciques de type T (Cav3) pour la biosynthese de la testosterone via la proteine StAR (Xiang 2025). Les spermatogonies necessitent a la fois des canaux Cav1 (type L) et Cav3 (type T) pour une spermatogenese normale (Ma 2026). Les cellules de Sertoli maintiennent la barriere hemato-testiculaire (BTB) en utilisant les memes proteines de jonctions serrees (occludine, ZO-1) que la barriere hemato-encephalique. Les spermatozoides matures utilisent les canaux CatSper pour la capacitation et la reaction acrosomique.",
    s1p2:
      "Cela signifie que l'exposition aux EMF attaque la fonction reproductive masculine par de multiples mecanismes independants simultanement. Meme si un mecanisme est marginal, la convergence de plusieurs mecanismes sur le meme point final (fertilite reduite) cree un effet robuste difficile a attribuer a une seule voie.",
    s1p3:
      "Les testicules occupent une position unique dans le cadre BERM : ils sont le seul organe ou la perturbation des canaux ioniques mediee par VGCC (voies A/B) et la perturbation de la barriere biologique (voie F) convergent sur le meme resultat fonctionnel.",

    s2Title: "Profil des canaux",
    s2Channels: [
      {
        name: "Cav3 (type T) dans les cellules de Leydig",
        function: "Biosynthese de la testosterone via la proteine StAR",
        mechanism: "Cav3 → Ca2+ → phosphorylation de StAR → transport du cholesterol → testosterone",
        evidence: "Xiang 2025 — Cav3 directly controls StAR-mediated steroidogenesis",
      },
      {
        name: "CatSper dans les spermatozoides matures",
        function: "Capacitation, motilite hyperactivee, reaction acrosomique",
        mechanism: "Canal Ca2+ dependant du pH essentiel a la competence de fecondation",
        evidence: "CatSper knockout = male infertility (multiple studies)",
      },
      {
        name: "Cav1 + Cav3 dans les spermatogonies",
        function: "Les deux requis pour une spermatogenese normale",
        mechanism: "Type L (Cav1) et type T (Cav3) soutiennent cooperativement la proliferation et la differenciation cellulaire",
        evidence: "Ma 2026 — dual requirement demonstrated; neither alone sufficient",
      },
      {
        name: "BTB (jonctions serrees des cellules de Sertoli)",
        function: "Microenvironnement spermatogenique immunologiquement privilegie",
        mechanism: "Occludine + ZO-1 + claudines = memes proteines TJ que la BHE",
        evidence: "Yu 2019 — 4G 2605 MHz disrupts BTB via Spock3-MMP2 axis",
      },
    ],

    s3Title: "Chaine mecanistique : deux attaques paralleles",
    s3Attack1Title: "Attaque 1 : Hormonale (Cav3 → testosterone)",
    s3Attack1:
      "EMF → Schwan delta-Vm → Cav3 window current → Ca2+ dysregulation → StAR phosphorylation disruption → cholesterol transport impaired → testosterone ↓",
    s3Attack2Title: "Attaque 2 : Barriere (perturbation de la BTB)",
    s3Attack2:
      "EMF → MMP2 upregulation (Spock3-MMP2 axis) → occludin/ZO-1 degradation → BTB opening → spermatogenic microenvironment compromised → immune exposure of developing sperm → spermatogenesis disrupted",
    s3p1:
      "Ces deux attaques sont des mecanismes independants ciblant le meme organe. L'attaque 1 opere via les canaux ioniques Cav3 (voie A). L'attaque 2 opere via la perturbation de la barriere biologique (voie F). Elles se renforcent mutuellement : la testosterone est requise pour le maintien de la BTB (la fonction des cellules de Sertoli est testosterone-dependante), donc l'attaque 1 affaiblit la defense contre l'attaque 2.",
    s3p2:
      "Le resultat est une boucle de retroaction positive : EMF → testosterone ↓ → BTB s'affaiblit → microenvironnement expose → spermatogenese encore plus perturbee → plus de dommages avec l'exposition cumulative.",

    s4Title: "Preuves cles",
    s4Studies: [
      {
        citation: "Xiang et al.",
        year: 2025, referenceId: "xiang2025_clc2_ttype",
        finding: "Les canaux calciques Cav3 (type T) controlent directement la biosynthese de la testosterone via la proteine StAR dans les cellules de Leydig. L'activite des canaux de type T est requise pour le transport du cholesterol vers la membrane mitochondriale interne.",
        level: "E",
      },
      {
        citation: "Ma et al.",
        year: 2026, referenceId: "ma2026_spermatogenesis_cav",
        finding: "Les canaux calciques Cav1 (type L) et Cav3 (type T) sont tous deux requis pour une spermatogenese normale. Aucun type de canal seul n'est suffisant — la double exigence cree une double vulnerabilite.",
        level: "E",
      },
      {
        citation: "Yu et al. (Sci Total Environ)",
        year: 2019, referenceId: "yu2019_btb",
        finding: "L'exposition 4G a long terme (2605 MHz) perturbe directement l'integrite de la barriere hemato-testiculaire via l'axe Spock3-MMP2. Toxicite reproductive progressive et dependante du temps.",
        level: "E",
      },
      {
        citation: "23-28 VGCC blocker studies",
        year: "2018-2025", referenceId: "vgcc_blocker_studies_collection",
        finding: "Preuves systematiques de 23-28 etudes : l'administration de bloqueurs VGCC previent ou attenue les effets biologiques induits par les EMF. Confirme que les canaux VGCC/Cav sont la voie de transduction primaire.",
        level: "M",
      },
    ],

    s5Title: "Analyse de Lindgren",
    s5p1:
      "Les testicules presentent une analyse de Lindgren unique car la barriere hemato-testiculaire (BTB) cree une vulnerabilite par retroaction positive :",
    s5Criteria: [
      "chi_barrier (BTB) — utilise les memes proteines TJ que la BHE. Les EMF ouvrent la BTB → microenvironnement spermatogenique expose → plus de dommages",
      "chi_channel — Cav3 dans les cellules de Leydig a la bifurcation. La double exigence Cav1+Cav3 dans les spermatogonies double la surface de vulnerabilite",
      "chi_cumulative — la perturbation de la BTB est progressive (Yu 2019 : dependante du temps). La baisse de testosterone affaiblit davantage la BTB. Retroaction positive.",
      "chi_barrier s'amplifie avec l'exposition cumulative — chaque cycle d'affaiblissement de la BTB + baisse de testosterone aggrave le cycle suivant",
    ],
    s5p2:
      "La structure de retroaction positive signifie que le chi testiculaire n'atteint pas un etat stable — il augmente avec la duree d'exposition cumulative. Cela predit que les effets EMF testiculaires devraient etre progressifs et irreversibles au-dela d'un certain seuil d'exposition, coherent avec le declin de la fertilite dependant de l'age observe dans les donnees epidemiologiques.",

    s6Title: "Predictions",
    s6Predictions: [
      {
        id: "TTYPE-1",
        text: "Un bloqueur selectif des canaux calciques de type T (TTA-P2) previent le declin de la testosterone induit par les EMF dans les cultures de cellules de Leydig. Si les EMF agissent via Cav3, le blocage specifique du canal devrait abolir la perturbation de la steroidogenese mediee par StAR.",
        discriminating: true,
      },
      {
        id: "BTB-1",
        text: "Le tissu testiculaire expose aux EMF montre une degradation de l'occludine/ZO-1 dans le meme schema spatial que les etudes de perturbation de la BHE. Si la BTB et la BHE partagent le meme mecanisme de jonctions serrees vulnerable aux EMF, la signature moleculaire devrait etre identique.",
        discriminating: true,
      },
    ],

    s7Title: "CatSper : active par la temperature a 33,5 °C",
    s7p1: "Nature Communications 2025 a revele que CatSper fonctionne comme un canal ionique active par la temperature avec un seuil thermique de 33,5 °C et un Q10 de 5,1. L'activation prematuree altere la fonction des spermatozoides.",
    s7p2: "Connexion avec la fenetre de temperature de Blackman (effets Ca2+ a 36–37 °C uniquement) : les deux sont des fenetres de temperature etroites pres de la temperature physiologique. Le meme chi_temperature qui module l'efflux Ca2+ de Blackman module egalement la capacitation mediee par CatSper.",
    s7p3: "Prediction BERM : la perturbation EMF via les domaines senseurs de voltage pourrait « pre-activer » CatSper a des temperatures plus basses → capacitation prematuree → epuisement des spermatozoides avant d'atteindre l'ovule. Reduit la fertilite FONCTIONNELLE meme si le nombre et la morphologie des spermatozoides semblent normaux.",

    s8Title: "Amplification transgenerationnelle epigenetique",
    s8Subtitle: "Du Ca2+ a la generation suivante",
    s8Chain: [
      { step: 1, text: "EMF → VGCC → Ca2+ (Pall 2013, 23 etudes)", level: "E", preprint: false },
      { step: 2, text: "Ca2+ → ROS mitochondriaux (Scientific Reports 2019 : spermatozoides de souris, 905 MHz)", level: "E", preprint: false },
      { step: 3, text: "ROS → dommages oxydatifs a l'ADN des spermatozoides : 8-OHdG comme « porteur pour la generation suivante » (Cells 2023)", level: "E", preprint: false },
      { step: 4, text: "EMF → changements de methylation de l'ADN des spermatozoides CHEZ L'HOMME (Research Square 2025 : hommes exposes au radar)", level: "E", preprint: true },
      { step: 5, text: "EMF → changements d'expression de DNMT1/DNMT3b dans les spermatocytes (lignee cellulaire GC-2, 50 Hz ELF)", level: "E", preprint: false },
      { step: 6, text: "Methylation non monotone : diminuee a 1 mT, AUGMENTEE a 3 mT — meme « effet de fenetre » que l'efflux Ca2+ de Blackman", level: "E", preprint: false },
      { step: 7, text: "Dernier maillon NON TESTE : les changements epigenetiques des spermatozoides induits par les EMF persistent-ils en F3 ?", level: "U", preprint: false },
    ],
    s8FeedbackTitle: "Si confirme : boucle d'amplification transgenerationnelle",
    s8FeedbackDesc: "EMF → epigenome des spermatozoides → descendance avec chi_channel altere → sensibilite accrue aux EMF → plus de changements epigenetiques → F3 encore plus sensible. Predit un declin ACCELERANT, coherent avec la meta-analyse de Levine : −1,16 %/an (1973–2000) → −2,64 %/an (2000–2018).",
    s8PreprintWarning: "Research Square 2025 est un PREPRINT, non evalue par les pairs. Les resultats doivent etre traites comme preliminaires.",
    s8F3Warning: "Le lien transgenerationnel F3 est une PREDICTION DERIVEE, non prouvee. Il necessite des etudes animales F3 pour confirmation.",

    seeAlso: "Voir aussi",
    modulomeOverview: "Apercu du Modulome",
    evidencePortal: "Registre des preuves",
    bbbPage: "Barrieres BHE et BTB",
    citationLabel: "Citation",
    yearLabel: "Annee",
    findingLabel: "Resultat",
    levelLabel: "Niveau",
    channelLabel: "Canal",
    functionLabel: "Fonction",
    mechanismLabel: "Mecanisme",
    evidenceLabel: "Preuve",
    discriminatingBadge: "Discriminant",
    allPredictions: "Toutes les predictions →",
    notTestedLabel: "NON TESTE",
    warningLabel: "Avertissement",
  },
  ko: {
    title: "생식 표적",
    subtitle:
      "라이디히 세포 (Cav3 → 테스토스테론), 정원세포 (Cav1+Cav3), 세르톨리 세포 (BTB), 성숙 정자 (CatSper) — 병렬로 작동하는 다수의 EMF 감수성 구성요소",
    backLink: "← 모듈롬으로 돌아가기",

    s1Title: "다수의 EMF 감수성 구성요소",
    s1p1:
      "고환에는 최소 4개의 별개 EMF 감수성 세포 구획이 병렬로 존재한다. 라이디히 세포는 StAR 단백질을 통한 테스토스테론 생합성에 T형 칼슘 채널 (Cav3)을 사용한다 (Xiang 2025). 정원세포는 정상 정자형성에 Cav1 (L형)과 Cav3 (T형) 채널 모두를 필요로 한다 (Ma 2026). 세르톨리 세포는 혈액뇌장벽과 동일한 밀착연접 단백질 (오클루딘, ZO-1)을 사용하여 혈액고환장벽 (BTB)을 유지한다. 성숙 정자는 수정능 획득과 첨체반응에 CatSper 채널을 사용한다.",
    s1p2:
      "이것은 EMF 노출이 다수의 독립적 메커니즘을 통해 남성 생식 기능을 동시에 공격함을 의미한다. 단일 메커니즘이 한계적이더라도 동일한 종점 (감소된 생식력)에 대한 여러 메커니즘의 수렴이 어떤 단일 경로에도 귀속하기 어려운 견고한 효과를 생성한다.",
    s1p3:
      "고환은 BERM 프레임워크에서 독특한 위치를 차지한다: VGCC 매개 이온 채널 교란 (경로 A/B)과 생물학적 장벽 교란 (경로 F) 모두가 동일한 기능적 결과에 수렴하는 유일한 기관이다.",

    s2Title: "채널 프로파일",
    s2Channels: [
      {
        name: "라이디히 세포의 Cav3 (T형)",
        function: "StAR 단백질을 통한 테스토스테론 생합성",
        mechanism: "Cav3 → Ca2+ → StAR 인산화 → 콜레스테롤 수송 → 테스토스테론",
        evidence: "Xiang 2025 — Cav3 directly controls StAR-mediated steroidogenesis",
      },
      {
        name: "성숙 정자의 CatSper",
        function: "수정능 획득, 과활성화 운동성, 첨체반응",
        mechanism: "수정 능력에 필수적인 pH 의존 Ca2+ 채널",
        evidence: "CatSper knockout = male infertility (multiple studies)",
      },
      {
        name: "정원세포의 Cav1 + Cav3",
        function: "정상 정자형성에 둘 다 필요",
        mechanism: "L형 (Cav1)과 T형 (Cav3)이 협력하여 세포 증식과 분화를 지원",
        evidence: "Ma 2026 — dual requirement demonstrated; neither alone sufficient",
      },
      {
        name: "BTB (세르톨리 세포 밀착연접)",
        function: "면역 특권적 정자형성 미세환경",
        mechanism: "오클루딘 + ZO-1 + 클로딘 = BBB와 동일한 TJ 단백질",
        evidence: "Yu 2019 — 4G 2605 MHz disrupts BTB via Spock3-MMP2 axis",
      },
    ],

    s3Title: "메커니즘 체인: 두 개의 병렬 공격",
    s3Attack1Title: "공격 1: 호르몬성 (Cav3 → 테스토스테론)",
    s3Attack1:
      "EMF → Schwan delta-Vm → Cav3 window current → Ca2+ dysregulation → StAR phosphorylation disruption → cholesterol transport impaired → testosterone ↓",
    s3Attack2Title: "공격 2: 장벽 (BTB 교란)",
    s3Attack2:
      "EMF → MMP2 upregulation (Spock3-MMP2 axis) → occludin/ZO-1 degradation → BTB opening → spermatogenic microenvironment compromised → immune exposure of developing sperm → spermatogenesis disrupted",
    s3p1:
      "이 두 공격은 동일한 기관을 표적으로 하는 독립적 메커니즘이다. 공격 1은 Cav3 이온 채널을 통해 작용 (경로 A). 공격 2는 생물학적 장벽 교란을 통해 작용 (경로 F). 양자는 서로를 강화한다: 테스토스테론은 BTB 유지에 필요하며 (세르톨리 세포 기능은 테스토스테론 의존적), 따라서 공격 1이 공격 2에 대한 방어를 약화시킨다.",
    s3p2:
      "결과는 양의 피드백 루프이다: EMF → 테스토스테론 ↓ → BTB 약화 → 미세환경 노출 → 정자형성 추가 교란 → 누적 노출로 더 많은 손상.",

    s4Title: "핵심 증거",
    s4Studies: [
      {
        citation: "Xiang et al.",
        year: 2025, referenceId: "xiang2025_clc2_ttype",
        finding: "Cav3 (T형) 칼슘 채널이 라이디히 세포에서 StAR 단백질을 통해 테스토스테론 생합성을 직접 제어. T형 채널 활성이 미토콘드리아 내막으로의 콜레스테롤 수송에 필요.",
        level: "E",
      },
      {
        citation: "Ma et al.",
        year: 2026, referenceId: "ma2026_spermatogenesis_cav",
        finding: "정상 정자형성에 Cav1 (L형)과 Cav3 (T형) 칼슘 채널 모두 필요. 어느 채널 유형도 단독으로 충분하지 않음 — 이중 요건이 이중 취약성을 생성.",
        level: "E",
      },
      {
        citation: "Yu et al. (Sci Total Environ)",
        year: 2019, referenceId: "yu2019_btb",
        finding: "장기 4G 노출 (2605 MHz)이 Spock3-MMP2 축을 통해 혈액고환장벽 완전성을 직접 교란. 시간 의존적, 진행성 생식 독성.",
        level: "E",
      },
      {
        citation: "23-28 VGCC blocker studies",
        year: "2018-2025", referenceId: "vgcc_blocker_studies_collection",
        finding: "23-28개 연구의 체계적 증거: VGCC 차단제 투여가 EMF 유도 생물학적 효과를 방지 또는 감쇠. VGCC/Cav 채널이 주요 변환 경로임을 확인.",
        level: "M",
      },
    ],

    s5Title: "Lindgren 분석",
    s5p1:
      "고환은 혈액고환장벽 (BTB)이 양의 피드백 취약성을 생성하기 때문에 독특한 Lindgren 분석을 제시한다:",
    s5Criteria: [
      "chi_barrier (BTB) — BBB와 동일한 TJ 단백질 사용. EMF가 BTB를 열면 → 정자형성 미세환경 노출 → 더 많은 손상",
      "chi_channel — 분기점의 라이디히 세포 Cav3. 정원세포의 Cav1+Cav3 이중 요건이 취약성 표면을 두 배로",
      "chi_cumulative — BTB 교란은 진행성 (Yu 2019: 시간 의존적). 테스토스테론 감소가 BTB를 추가로 약화. 양의 피드백.",
      "chi_barrier는 누적 노출과 함께 증폭 — BTB 약화 + 테스토스테론 감소의 각 주기가 다음 주기를 악화",
    ],
    s5p2:
      "양의 피드백 구조는 고환 chi가 정상 상태에 도달하지 않음을 의미한다 — 누적 노출 기간과 함께 증가한다. 이것은 고환 EMF 효과가 진행성이며 특정 노출 역치를 넘으면 비가역적이어야 함을 예측하며, 역학 데이터에서 관찰된 연령 의존적 생식력 감소와 일치한다.",

    s6Title: "예측",
    s6Predictions: [
      {
        id: "TTYPE-1",
        text: "선택적 T형 칼슘 채널 차단제 (TTA-P2)가 라이디히 세포 배양에서 EMF 유도 테스토스테론 감소를 방지한다. EMF가 Cav3를 통해 작용한다면, 채널을 특이적으로 차단하면 StAR 매개 스테로이드 생성 교란을 소멸시켜야 한다.",
        discriminating: true,
      },
      {
        id: "BTB-1",
        text: "EMF 노출 고환 조직이 BBB 교란 연구와 동일한 공간 패턴의 오클루딘/ZO-1 분해를 보인다. BTB와 BBB가 동일한 EMF 취약 밀착연접 메커니즘을 공유한다면, 분자 서명은 동일해야 한다.",
        discriminating: true,
      },
    ],

    s7Title: "CatSper: 33.5°C에서의 온도 게이팅",
    s7p1: "Nature Communications 2025는 CatSper가 열 역치 33.5°C와 Q10값 5.1의 온도 게이트 이온 채널로 기능함을 밝혔다. 조기 활성화는 정자 기능을 손상시킨다.",
    s7p2: "Blackman의 온도 윈도우 (36–37°C에서만 Ca2+ 효과)와의 연결: 둘 다 생리적 온도 근처의 좁은 온도 윈도우이다. Blackman의 Ca2+ 유출을 조절하는 동일한 χ_temperature가 CatSper 매개 수정능 획득도 조절한다.",
    s7p3: "BERM 예측: 전압 감지 도메인을 통한 EMF 교란이 더 낮은 온도에서 CatSper를 \"사전 활성화\"하여 조기 수정능 획득 → 난자 도달 전 정자 소진을 유발할 수 있다. 정자 수와 형태가 정상으로 보이더라도 기능적 생식력을 감소시킨다.",

    s8Title: "후성유전적 세대간 증폭",
    s8Subtitle: "Ca2+에서 다음 세대로",
    s8Chain: [
      { step: 1, text: "EMF → VGCC → Ca2+ (Pall 2013, 23개 연구)", level: "E", preprint: false },
      { step: 2, text: "Ca2+ → 미토콘드리아 ROS (Scientific Reports 2019: 마우스 정자, 905 MHz)", level: "E", preprint: false },
      { step: 3, text: "ROS → 정자의 산화적 DNA 손상: 8-OHdG가 \"다음 세대를 위한 운반체\" (Cells 2023)", level: "E", preprint: false },
      { step: 4, text: "EMF → 인간에서 정자 DNA 메틸화 변화 (Research Square 2025: 레이더 노출 남성)", level: "E", preprint: true },
      { step: 5, text: "EMF → 정모세포에서 DNMT1/DNMT3b 발현 변화 (GC-2 세포주, 50 Hz ELF)", level: "E", preprint: false },
      { step: 6, text: "비단조적 메틸화: 1 mT에서 감소, 3 mT에서 증가 — Blackman의 Ca2+ 유출과 동일한 \"윈도우 효과\"", level: "E", preprint: false },
      { step: 7, text: "마지막 연결 미검증: EMF 유도 정자 후성유전적 변화가 F3 세대까지 지속하는가?", level: "U", preprint: false },
    ],
    s8FeedbackTitle: "확인된 경우: 세대간 증폭 루프",
    s8FeedbackDesc: "EMF → 정자 후성유전체 → 변경된 χ_channel을 가진 자손 → 증가된 EMF 감수성 → 더 많은 후성유전적 변화 → F3 세대는 더욱 감수성. 가속하는 감소를 예측하며, Levine의 메타분석과 일치: −1.16%/년 (1973–2000) → −2.64%/년 (2000–2018).",
    s8PreprintWarning: "Research Square 2025는 프리프린트이며 동료 심사를 받지 않았다. 결과는 예비적으로 취급해야 한다.",
    s8F3Warning: "세대간 F3 연결은 도출된 예측이지 증명된 것이 아니다. 확인을 위해 F3 동물 연구가 필요하다.",

    seeAlso: "참고 항목",
    modulomeOverview: "모듈롬 개요",
    evidencePortal: "증거 등록부",
    bbbPage: "BBB 및 BTB 장벽",
    citationLabel: "인용",
    yearLabel: "연도",
    findingLabel: "발견",
    levelLabel: "수준",
    channelLabel: "채널",
    functionLabel: "기능",
    mechanismLabel: "메커니즘",
    evidenceLabel: "증거",
    discriminatingBadge: "변별적",
    allPredictions: "모든 예측 →",
    notTestedLabel: "미검증",
    warningLabel: "경고",
  },
};

const LEVEL_BADGE: Record<string, string> = {
  E: "bg-green-500/10 text-green-600 dark:text-green-400",
  M: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "M|C": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "L*": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  U: "bg-red-500/10 text-red-600 dark:text-red-400",
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

export default async function TestesPage({
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

      <PageHeader icon={ShieldAlert} title={d.title} subtitle={d.subtitle} />

      {/* 01 — Hero: Multiple EMF-Sensitive Components */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <article id="components" className="scroll-mt-24">
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
                  {d.evidenceLabel}
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed italic">
                  {ch.evidence}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — Mechanism Chain: Two Parallel Attacks */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">03</span>
          {d.s3Title}
        </h3>

        <div className="space-y-4 mb-6">
          <div className="bg-card rounded-lg border border-card-border p-5">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
              {d.s3Attack1Title}
            </p>
            <p className="font-mono text-sm text-accent leading-relaxed">
              {d.s3Attack1}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-card-border p-5">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
              {d.s3Attack2Title}
            </p>
            <p className="font-mono text-sm text-accent leading-relaxed">
              {d.s3Attack2}
            </p>
          </div>
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

      {/* 07 — CatSper: Temperature-Gated */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-4">
          <span className="font-mono-num text-xs text-accent mr-2">07</span>
          {d.s7Title}
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p1}
            </p>
          </div>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p2}
            </p>
          </div>
          <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s7p3}
            </p>
          </div>
        </div>
      </section>

      {/* 08 — Epigenetic Transgenerational Amplification */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <h3 className="text-lg font-semibold mb-2">
          <span className="font-mono-num text-xs text-accent mr-2">08</span>
          {d.s8Title}
        </h3>
        <p className="text-sm text-foreground-muted italic mb-6">
          {d.s8Subtitle}
        </p>

        <div className="ml-4 mb-6">
          {d.s8Chain.map((item, i) => {
            const isLast = i === d.s8Chain.length - 1;
            const badgeClass =
              item.level === "E"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : item.level === "U"
                  ? "bg-red-500/10 text-red-600 dark:text-red-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400";
            return (
              <div
                key={item.step}
                className={`relative pl-8 pb-5 ${!isLast ? "border-l-2 border-accent/30" : ""}`}
              >
                <span className="absolute left-[-9px] top-0.5 w-[18px] h-[18px] rounded-full bg-background border-2 border-accent flex items-center justify-center">
                  <span className="text-[9px] font-bold text-accent">
                    {item.step}
                  </span>
                </span>
                <div className="flex items-start gap-2 flex-wrap">
                  <p className="text-sm text-foreground-muted leading-relaxed flex-1 min-w-0">
                    {item.text}
                  </p>
                  <span
                    className={`shrink-0 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded ${badgeClass}`}
                  >
                    {item.level === "U"
                      ? d.notTestedLabel
                      : item.level}
                  </span>
                </div>
                {item.preprint && (
                  <span className="inline-block mt-1 text-[0.65rem] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    PREPRINT
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-1">
              {d.warningLabel}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s8PreprintWarning}
            </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-1">
              {d.warningLabel}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.s8F3Warning}
            </p>
          </div>
        </div>

        <div className="border-l-4 border-accent/40 rounded-r-lg bg-card p-5">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
            {d.s8FeedbackTitle}
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.s8FeedbackDesc}
          </p>
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {d.seeAlso}
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            href={`/${locale}/modulome`}
            className="text-sm text-accent hover:underline"
          >
            {d.modulomeOverview} &rarr;
          </Link>
          <Link
            href={`/${locale}/evidence/bbb`}
            className="text-sm text-accent hover:underline"
          >
            {d.bbbPage} &rarr;
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
