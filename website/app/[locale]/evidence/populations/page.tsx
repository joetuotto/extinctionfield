import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  LOW_EMF_POPULATIONS,
  MODERN_COMPARISONS,
  CASCADE_COMPARISON,
  MYOPIA_GRADIENT,
} from "@/lib/populationData";
import { pickCopy, pickSuffix } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    title: "Natural Control Groups",
    subtitle:
      "Nine low-EMF populations compared to modern populations across seven health metrics. The Tsimane–Mosetén gradient, myopia dose-response, and BERM cascade test.",
    backLink: "← Back to Evidence",
    warningTitle: "Massive confounders",
    warningText:
      "Every population listed below differs from modern societies in diet, exercise, community structure, chemical exposure, and genetics. None of this is proof that EMF causes disease. It is a consistency check: do low-EMF populations show the health patterns BERM predicts? If they did not, BERM would be falsified. That they do is necessary but not sufficient.",
    s1Kicker: "SECTION 1",
    s1Title: "Why These Populations Matter",
    s1Text: [
      "BERM predicts that populations with near-zero anthropogenic EMF exposure should exhibit: high fertility (TFR > 4), low cardiovascular disease, low dementia, low obesity, low T2D, and low depression. These are not cherry-picked outcomes — they are the direct predictions of the seven disease cascades in the model.",
      "We cannot run a controlled experiment removing EMF from a modern city. But populations that never adopted electricity or personal technology provide a natural baseline. If the model is wrong, at least some of these populations should show modern disease patterns. None do.",
    ],
    s2Kicker: "SECTION 2",
    s2Title: "Population Comparison",
    tableHeaders: {
      population: "Population",
      location: "Location",
      emf: "EMF Level",
      tfr: "TFR",
      cvd: "CVD",
      dementia: "Dementia",
      obesity: "Obesity",
      t2d: "T2D",
      cancer: "Cancer",
      depression: "Depression",
    },
    s3Kicker: "SECTION 3",
    s3Title: "Tsimane → Mosetén → Modern Gradient",
    s3Text: [
      "This is the strongest single piece of population-level evidence for BERM. The Tsimane and Mosetén share genetic ancestry, geographic region, and base subsistence patterns. They differ primarily in degree of modernization: the Mosetén have more technology, more medicine, more infrastructure.",
      "On every measured health variable, the Mosetén fall BETWEEN Tsimane and Western populations. This is a dose-response gradient that controls for genetics — the most common confounder objection.",
    ],
    gradientLabels: [
      {
        name: "Tsimane",
        chi: "χ_env = 0",
        desc: "No electricity, no phones, no modern technology",
        health: "Lowest CVD ever recorded. Dementia 1.2%. Brain atrophy 70% slower.",
      },
      {
        name: "Mosetén",
        chi: "χ_env > 0",
        desc: "Shared ancestry with Tsimane but more technology and infrastructure",
        health: "CVD low. Dementia intermediate. Brain atrophy intermediate.",
      },
      {
        name: "Modern (USA)",
        chi: "χ_env = high",
        desc: "Full electrification, smartphones, dense RF environment",
        health: "CVD high. Dementia 8–11%. Obesity 42%. TFR 1.66.",
      },
    ],
    gradientPunchline:
      "Same genes. Same region. Same base diet. Different technology. Different health. On every variable.",
    tProfileKicker: "TESTOSTERONE PROFILE",
    tProfileTitle: "Tsimane: testosterone does not decline with age",
    tProfileLead: "If testosterone decline were biological inevitability, it should appear in every population. It does not. Tsimane men show no age-related testosterone decline despite 33% lower baseline levels — a natural experiment against the 'aging' explanation.",
    tProfileBaseline: "Baseline",
    tProfileAgeDecline: "Age decline",
    tProfileReactivity: "Reactivity",
    tProfileImplication: "Implication",
    tProfileParadox: "Paradox: by age 60, Tsimane men may have HIGHER testosterone than American men — despite starting 33% lower. The American trajectory (declining ~1.5%/year from a higher baseline) crosses the Tsimane level (stable) around age 55.",
    tGradientKicker: "TESTOSTERONE GRADIENT",
    tGradientTitle: "Tsimane → Mosetén → USA: dose-response in testosterone aging",
    tGradientLead: "Three populations sharing Amazonian ancestry but differing in technology adoption show a testosterone trajectory gradient that tracks EMF exposure — not genetics, diet, or latitude.",
    tGradientRows: [
      { pop: "Tsimane", emf: "Zero", baseline: "~400 pg/mL (salivary)", decline: "None", trajectory: "Flat across age" },
      { pop: "Mosetén", emf: "Low", baseline: "Intermediate", decline: "Modest", trajectory: "Slight decline with age" },
      { pop: "Modern USA", emf: "High", baseline: "~550 pg/mL → declining", decline: "~1.5%/year", trajectory: "Steep decline; crosses Tsimane by ~55" },
    ],
    tGradientNote: "This gradient controls for the strongest confounders: Tsimane and Mosetén share ancestry, geography, and subsistence base. Technology adoption is the primary variable that differs — and testosterone trajectory follows it. In BERM terms: Tsimane P=1.0, R=2.1 → EMF_eff ≈ 0. Mosetén P=1.2, R=1.5 → EMF_eff = low. USA P=2.2, R=1.0 → EMF_eff = high. Same RF exposure → different response because different priming history.",
    s4Kicker: "SECTION 4",
    s4Title: "Myopia Gradient",
    s4Text: [
      "Myopia prevalence follows a five-level gradient that tracks technology adoption, not genetics. This is measured by refractometry — an objective physical measurement, not self-report.",
      "The COVID-19 pandemic provided a temporal test: screen time increased dramatically during lockdowns, and a corresponding spike in childhood myopia was observed globally (meta-analyses report 1.5–3× increase in progression). This is consistent with the RF/screen-light channel in BERM’s three-channel model.",
    ],
    myopiaHeaders: { region: "Region", prevalence: "Myopia Prevalence", tech: "Technology Level" },
    s5Kicker: "SECTION 5",
    s5Title: "BERM Cascade Test",
    s5Text:
      "BERM predicts 16 disease cascades where VGCC-mediated Ca²⁺ dysregulation produces specific pathologies. For each cascade, we ask: do low-EMF populations show lower prevalence? Of 16 cascades, 11 are confirmed consistent (69%), 5 have no data, and 0 are contradicted.",
    cascadeHeaders: {
      cascade: "Cascade",
      lowEmf: "Low-EMF",
      modern: "Modern",
      mechanism: "BERM Mechanism",
      status: "Status",
    },
    cascadeSummary: "11/16 confirmed · 5/16 no data · 0/16 contradicted",
    preElecKicker: "RETRODICTION",
    preElecTitle: "Pre-electric Baselines",
    preElecLead: "BERM predicts that pre-electric populations should exhibit lower prevalence of ALL cascade outcomes. This is a retrodiction — the model predicts the PAST.",
    preElecRows: [
      { cascade: "Obesity", preElectric: "~5%", modern: "42% (USA)", change: "8×" },
      { cascade: "Type 2 Diabetes", preElectric: "Rare", modern: "~10% (global)", change: "10×+" },
      { cascade: "Autism", preElectric: "<3 / 10,000", modern: "320 / 10,000", change: "100×" },
      { cascade: "Depression", preElectric: "Low (est.)", modern: "~10% (global)", change: "?" },
      { cascade: "Sperm count", preElectric: "No data", modern: "−51.6% (1973→)", change: "—" },
      { cascade: "TFR", preElectric: "~5–6 (West)", modern: "1.66 (USA)", change: "−3×" },
    ],
    preElecAmish: "The Amish health profile — low obesity, low diabetes, low depression, high fertility (TFR 6.1) — resembles pre-electrification health data from the early 1900s. BERM interprets this as evidence that the difference between pre-modern and modern health profiles is substantially driven by the electromagnetic environment, not by genetics, diet, or lifestyle alone.",
    preElecHeaders: { cascade: "Cascade", preElectric: "Pre-electric (~1900)", modern: "Modern (2024)", change: "Change" },
    occKicker: "OCCUPATIONAL GRADIENT",
    occTitle: "Indoor vs. Outdoor Workers",
    occLead: "EMF exposure varies dramatically by occupation. Conventional indoor/outdoor comparisons focus on sedentary behavior and UV exposure. BERM adds: indoor workers’ metabolic risk is higher EVEN after controlling for physical activity, because their cumulative EMF load is greater.",
    occGradient: [
      { occupation: "Data center worker", stars: 5, sources: "ELF+IF+RF, multi-source, 8–12h" },
      { occupation: "Office worker", stars: 4, sources: "WiFi+LED+screen+phone, 8–10h" },
      { occupation: "Retail worker", stars: 3, sources: "LED+WiFi+POS system" },
      { occupation: "Factory worker", stars: 3, sources: "ELF+IF, industrial equipment" },
      { occupation: "Construction worker", stars: 2, sources: "ELF power tools, phone" },
      { occupation: "Farmer", stars: 1, sources: "Tractor ELF, phone, otherwise low" },
      { occupation: "Fisher / logger", stars: 1, sources: "Near EMF-free work environment" },
    ],
    occPrediction: "Testable: physically active indoor workers (gym-going office workers) vs. outdoor workers with the same physical activity level but different EMF environment — metabolic markers should differ.",
    s6Kicker: "SECTION 6",
    s6Title: "What This Does NOT Prove",
    s6Text: [
      "Every population above differs from modern societies in multiple ways simultaneously. Confounders include:",
    ],
    confounders: [
      "Diet — more whole foods, less processed sugar, different macronutrient ratios",
      "Exercise — Hadza walk ~17,000 steps/day vs USA ~4,000",
      "Community structure — extended families, social support, less isolation",
      "Chemical exposure — no pesticides, no microplastics, no industrial pollution",
      "Genetics — population-specific adaptations over millennia",
    ],
    s6Text2: [
      "This evidence is CONSISTENCY with BERM, not proof of it. Any of the confounders above could explain some or all of the observed differences. The Tsimane→Mosetén gradient is the strongest argument because it controls for genetics and geography, isolating technology adoption as the primary variable.",
      "To move from consistency to evidence, we need prospective studies in populations where EMF is the primary variable that changes. Two are proposed below.",
    ],
    proposedStudies: [
      {
        id: "DIFF-1",
        title: "AGD Measurement: Tsimane vs Urban Trinidadian Neonates",
        desc: "Anogenital distance (AGD) is a marker of prenatal androgen exposure and is reduced by endocrine disruptors. BERM predicts EMF-mediated testosterone suppression would reduce AGD. Comparing Tsimane neonates (zero EMF) with urban Trinidadian neonates (high EMF, similar latitude and genetic admixture) would test this prediction.",
      },
      {
        id: "AMISH-1",
        title: "Amish TFR vs Distance to Nearest Urban Area",
        desc: "The Amish reject personal technology but live surrounded by ambient EMF from nearby cities. If ambient exposure matters, Amish communities closer to urban centers should have lower TFR than remote ones. This is testable with existing demographic data and geospatial analysis.",
      },
    ],
    proposedTitle: "Proposed Studies",
    navPredictions: "Predictions →",
    navModel: "Model Specification →",
    tablePopulation: "Population",
    tableBaseline: "Baseline",
    tableDecline: "Decline",
    tableTrajectory: "Trajectory",
    tableOccupation: "Occupation",
    tableSources: "Sources",
  },
  fi: {
    title: "Luonnolliset kontrolliryhmät",
    subtitle:
      "Yhdeksän matalan EMF:n populaatiota verrattuna moderneihin väestöihin seitsemässä terveysmittarissa. Tsimane–Mosetén-gradientti, likitaitteisuuden annos-vaste ja BERM-kaskaditesti.",
    backLink: "← Takaisin näyttöön",
    warningTitle: "Massiiviset sekoittavat tekijät",
    warningText:
      "Jokainen alla listattu populaatio eroaa moderneista yhteiskunnista ruokavalion, liikunnan, yhteisörakenteen, kemikaalialtistuksen ja genetiikan osalta. Mikään tästä ei todista, että EMF aiheuttaa sairauksia. Kyseessä on yhteensopivuustarkistus: osoittavatko matalan EMF:n populaatiot BERM:n ennustamat terveyskuviot? Jos eivät osoittaisi, BERM olisi falsifioitu. Se, että osoittavat, on välttämätöntä mutta ei riittävää.",
    s1Kicker: "OSIO 1",
    s1Title: "Miksi nämä populaatiot ovat merkityksellisiä",
    s1Text: [
      "BERM ennustaa, että populaatioilla, joiden antropogeeninen EMF-altistus on lähes nolla, tulisi olla: korkea hedelmällisyys (TFR > 4), matala sydän- ja verisuonitauti, matala dementia, matala obesiteetti, matala T2D ja matala masennus. Nämä eivät ole valikoituja tuloksia — ne ovat mallin seitsemän tautikaskadin suorat ennusteet.",
      "Emme voi tehdä kontrolloitua koetta poistamalla EMF:n modernista kaupungista. Mutta populaatiot, jotka eivät koskaan omaksuneet sähköä tai henkilökohtaista teknologiaa, tarjoavat luonnollisen lähtötason. Jos malli on väärässä, ainakin joidenkin näiden populaatioiden pitäisi osoittaa moderneja tautikuvioita. Yksikään ei osoita.",
    ],
    s2Kicker: "OSIO 2",
    s2Title: "Populaatiovertailu",
    tableHeaders: {
      population: "Populaatio",
      location: "Sijainti",
      emf: "EMF-taso",
      tfr: "TFR",
      cvd: "CVD",
      dementia: "Dementia",
      obesity: "Obesiteetti",
      t2d: "T2D",
      cancer: "Syöpä",
      depression: "Masennus",
    },
    s3Kicker: "OSIO 3",
    s3Title: "Tsimane → Mosetén → Moderni -gradientti",
    s3Text: [
      "Tämä on vahvin yksittäinen populaatiotason näyttö BERM:lle. Tsimane ja Mosetén jakavat geneettisen taustan, maantieteellisen alueen ja peruselinkeinon. He eroavat ensisijaisesti modernisaation asteessa: Moseténilla on enemmän teknologiaa, enemmän lääketiedettä, enemmän infrastruktuuria.",
      "Jokaisessa mitatussa terveysmuuttujassa Mosetén sijoittuu Tsimanen ja länsimaisten populaatioiden VÄLIIN. Tämä on annos-vastegradientti, joka kontrolloi genetiikkaa — yleisin sekoittava tekijä -vastaväitteen.",
    ],
    gradientLabels: [
      {
        name: "Tsimane",
        chi: "χ_env = 0",
        desc: "Ei sähköä, ei puhelimia, ei modernia teknologiaa",
        health: "Matalin CVD koskaan mitattu. Dementia 1,2 %. Aivoatrofia 70 % hitaampi.",
      },
      {
        name: "Mosetén",
        chi: "χ_env > 0",
        desc: "Jaettu syntyperä Tsimanen kanssa mutta enemmän teknologiaa ja infrastruktuuria",
        health: "CVD matala. Dementia keskitaso. Aivoatrofia keskitaso.",
      },
      {
        name: "Moderni (USA)",
        chi: "χ_env = korkea",
        desc: "Täysi sähköistys, älypuhelimet, tiheä RF-ympäristö",
        health: "CVD korkea. Dementia 8–11 %. Obesiteetti 42 %. TFR 1,66.",
      },
    ],
    gradientPunchline:
      "Samat geenit. Sama alue. Sama perusruokavalio. Eri teknologia. Eri terveys. Jokaisessa muuttujassa.",
    tProfileKicker: "TESTOSTERONIPROFIILI",
    tProfileTitle: "Tsimane: testosteroni ei laske iän myötä",
    tProfileLead: "Jos testosteronin lasku olisi biologinen väistämättömyys, sen pitäisi ilmetä jokaisessa populaatiossa. Ei ilmene. Tsimane-miehillä ei ole ikään liittyvää testosteronilaskua 33 % matalammasta lähtötasosta huolimatta — luonnollinen koe 'ikääntymis'-selitystä vastaan.",
    tProfileBaseline: "Lähtötaso",
    tProfileAgeDecline: "Ikälasku",
    tProfileReactivity: "Reaktiivisuus",
    tProfileImplication: "Merkitys",
    tProfileParadox: "Paradoksi: 60-vuotiaana Tsimane-miesten testosteroni voi olla KORKEAMPI kuin amerikkalaismiesten — vaikka he aloittavat 33 % matalammalta. Amerikkalainen laskusuunta (~1,5 %/v korkeammasta lähtötasosta) leikkaa Tsimane-tason (vakio) noin 55 vuoden iässä.",
    tGradientKicker: "TESTOSTERONIGRADIENTTI",
    tGradientTitle: "Tsimane → Mosetén → USA: annos-vaste testosteronin ikääntymisessä",
    tGradientLead: "Kolme populaatiota, jotka jakavat amazonialaisen syntyperän mutta eroavat teknologian omaksumisessa, osoittavat testosteronitrajektorigradienttia joka seuraa EMF-altistusta — ei genetiikkaa, ruokavaliota tai leveysastetta.",
    tGradientRows: [
      { pop: "Tsimane", emf: "Nolla", baseline: "~400 pg/mL (sylki)", decline: "Ei", trajectory: "Tasainen iän yli" },
      { pop: "Mosetén", emf: "Matala", baseline: "Välitaso", decline: "Maltillinen", trajectory: "Lievä lasku iän myötä" },
      { pop: "Moderni USA", emf: "Korkea", baseline: "~550 pg/mL → laskussa", decline: "~1,5 %/v", trajectory: "Jyrkkä lasku; leikkaa Tsimanen ~55 v" },
    ],
    tGradientNote: "Tämä gradientti kontrolloi vahvimmat sekoittavat tekijät: Tsimane ja Mosetén jakavat syntyperän, maantieteen ja elinkeinopohjan. Teknologian omaksuminen on ensisijainen muuttuja joka eroaa — ja testosteronitrajektoria seuraa sitä. BERM-termeissä: Tsimane P=1,0, R=2,1 → EMF_eff ≈ 0. Mosetén P=1,2, R=1,5 → EMF_eff = matala. USA P=2,2, R=1,0 → EMF_eff = korkea. Sama RF-altistus → eri vaste, koska eri primaushistoria.",
    s4Kicker: "OSIO 4",
    s4Title: "Likitaitteisuusgradientti",
    s4Text: [
      "Likitaitteisuuden esiintyvyys seuraa viisitasoista gradienttia, joka seuraa teknologian omaksumista, ei genetiikkaa. Tämä mitataan refraktometrialla — objektiivinen fysikaalinen mittaus, ei itseraportointi.",
      "COVID-19-pandemia tarjosi ajallisen testin: ruutuaika kasvoi dramaattisesti lockdownien aikana, ja vastaava piikki lasten likitaitteisuudessa havaittiin maailmanlaajuisesti (meta-analyysit raportoivat 1,5–3× etenemisen kasvu). Tämä on yhdenmukainen BERM:n kolmikanavamallin RF/ruutuvalokanavan kanssa.",
    ],
    myopiaHeaders: { region: "Alue", prevalence: "Likitaitteisuus", tech: "Teknologiataso" },
    s5Kicker: "OSIO 5",
    s5Title: "BERM-kaskaditesti",
    s5Text:
      "BERM ennustaa 16 tautikaskadia, joissa VGCC-välitteinen Ca²⁺-dysregulaatio tuottaa tarkkoja patologioita. Jokaiselle kaskadille kysymme: osoittavatko matalan EMF:n populaatiot matalampaa esiintyvyyttä? 16 kaskadista 11 on vahvistettu yhteensopivaksi (69 %), 5:stä ei ole dataa ja 0 on ristiriidassa.",
    cascadeHeaders: {
      cascade: "Kaskadi",
      lowEmf: "Matala EMF",
      modern: "Moderni",
      mechanism: "BERM-mekanismi",
      status: "Tila",
    },
    cascadeSummary: "11/16 vahvistettu · 5/16 ei dataa · 0/16 ristiriidassa",
    preElecKicker: "RETRODIKTIO",
    preElecTitle: "Pre-elektriset lähtötasot",
    preElecLead: "BERM ennustaa, että pre-sähköisten populaatioiden tulisi osoittaa matalampi esiintyvyys KAIKISSA kaskadituloksissa. Tämä on retrodiktio — malli ennustaa MENNEISYYTTÄ.",
    preElecRows: [
      { cascade: "Obesiteetti", preElectric: "~5 %", modern: "42 % (USA)", change: "8×" },
      { cascade: "T2D", preElectric: "Harvinainen", modern: "~10 % (globaali)", change: "10×+" },
      { cascade: "Autismi", preElectric: "<3/10 000", modern: "320/10 000", change: "100×" },
      { cascade: "Masennus", preElectric: "Matala (arvio)", modern: "~10 % (globaali)", change: "?" },
      { cascade: "Siittiölasku", preElectric: "Ei dataa", modern: "−51,6 % (1973→)", change: "—" },
      { cascade: "TFR", preElectric: "~5–6 (länsimaat)", modern: "1,66 (USA)", change: "−3×" },
    ],
    preElecAmish: "Amish-yhteisöjen terveysprofiili — matala obesiteetti, matala diabetes, matala masennus, korkea hedelmällisyys (TFR 6,1) — muistuttaa 1900-luvun alun pre-sähköistysajan terveystilastoja. BERM tulkitsee tämän näytöksi siitä, että ero pre-modernien ja modernien terveysprofiilien välillä johtuu merkittävästi sähkömagneettisesta ympäristöstä, ei pelkästään genetiikasta, ruokavaliosta tai elämäntavasta.",
    preElecHeaders: { cascade: "Kaskadi", preElectric: "Pre-elektrinen (~1900)", modern: "Moderni (2024)", change: "Muutos" },
    occKicker: "AMMATILLINEN GRADIENTTI",
    occTitle: "Sisä- vs. ulkotyöntekijät",
    occLead: "EMF-altistus vaihtelee dramaattisesti ammateittain. Konventionaaliset sisä/ulko-vertailut keskittyvät liikkumattomuuteen ja UV-altistukseen. BERM lisää: sisätyöntekijöiden metabolinen riski on korkeampi MYÖS fyysisen aktiivisuuden vakioinnin jälkeen, koska heidän kumulatiivinen EMF-kuormansa on suurempi.",
    occGradient: [
      { occupation: "Datakeskustyöntekijä", stars: 5, sources: "ELF+IF+RF, monilähde, 8–12h" },
      { occupation: "Toimistotyöntekijä", stars: 4, sources: "WiFi+LED+näyttö+puhelin, 8–10h" },
      { occupation: "Myymälätyöntekijä", stars: 3, sources: "LED+WiFi+kassajärjestelmä" },
      { occupation: "Tehdastyöntekijä", stars: 3, sources: "ELF+IF, teollisuuslaitteet" },
      { occupation: "Rakennustyöntekijä", stars: 2, sources: "ELF sähkötyökalut, puhelin" },
      { occupation: "Maanviljelijä", stars: 1, sources: "Traktori ELF, puhelin, muuten matala" },
      { occupation: "Kalastaja/metsuri", stars: 1, sources: "Lähes EMF-vapaa työympäristö" },
    ],
    occPrediction: "Testattavissa: fyysisesti aktiiviset sisätyöntekijät (kuntosalilla käyvät toimistotyöntekijät) vs. ulkotyöntekijät samalla fyysisellä aktiivisuustasolla mutta eri EMF-ympäristössä — metaboliset mittarit pitäisi erota.",
    s6Kicker: "OSIO 6",
    s6Title: "Mitä tämä EI todista",
    s6Text: [
      "Jokainen yllä oleva populaatio eroaa moderneista yhteiskunnista useilla tavoilla samanaikaisesti. Sekoittavia tekijöitä ovat:",
    ],
    confounders: [
      "Ruokavalio — enemmän kokonaisia ruokia, vähemmän prosessoitua sokeria, erilaiset makroravinnesuhteet",
      "Liikunta — Hadza kävelee ~17 000 askelta/vrk vs USA ~4 000",
      "Yhteisörakenne — suurperheitä, sosiaalinen tuki, vähemmän eristäytymistä",
      "Kemikaalialtistus — ei torjunta-aineita, ei mikromuoveja, ei teollisuussaasteita",
      "Genetiikka — populaatiotarkkoja adaptaatioita vuosituhansien ajalta",
    ],
    s6Text2: [
      "Tämä näyttö on YHTEENSOPIVUUTTA BERM:n kanssa, ei sen todistusta. Mikä tahansa yllä olevista sekoittavista tekijöistä voisi selittää osan tai kaikki havaitut erot. Tsimane→Mosetén-gradientti on vahvin argumentti, koska se kontrolloi genetiikkaa ja maantiedettä, eristäen teknologian omaksumisen ensisijaiseksi muuttujaksi.",
      "Siirtyäksemme yhteensopivuudesta näyttöön tarvitsemme prospektiivisia tutkimuksia populaatioissa, joissa EMF on ensisijainen muuttuva tekijä. Kaksi ehdotetaan alla.",
    ],
    proposedStudies: [
      {
        id: "DIFF-1",
        title: "AGD-mittaus: Tsimane vs kaupunkimaiset trinidadilaiset vastasyntyneet",
        desc: "Anogenitaalinen etäisyys (AGD) on prenataalisen androgeenialtistuksen markkeri ja endokriinihäiritsijät pienentävät sitä. BERM ennustaa, että EMF-välitteinen testosteronin suppressio pienentäisi AGD:tä. Tsimanen vastasyntyneiden (nolla-EMF) vertaaminen kaupunkimaisten trinidadilaisten vastasyntyneiden (korkea EMF, vastaava leveysaste ja geneettinen sekoittuminen) kanssa testaisi tätä ennustetta.",
      },
      {
        id: "AMISH-1",
        title: "Amissien TFR vs etäisyys lähimpään kaupunkialueeseen",
        desc: "Amissit hylkäävät henkilökohtaisen teknologian mutta elävät läheisten kaupunkien ambientin EMF:n ympäröiminä. Jos ambient-altistus merkitsee, kaupunkikeskustojen lähellä olevien amissiyhteisöjen TFR:n tulisi olla matalampi kuin syrjäisten. Tämä on testattavissa olemassa olevalla demografisella datalla ja geospatiaalisella analyysillä.",
      },
    ],
    proposedTitle: "Ehdotetut tutkimukset",
    navPredictions: "Ennusteet →",
    navModel: "Mallispesifikaatio →",
    tablePopulation: "Populaatio",
    tableBaseline: "Lähtötaso",
    tableDecline: "Lasku",
    tableTrajectory: "Trajektoria",
    tableOccupation: "Ammatti",
    tableSources: "Lähteet",
  },
  ja: {
    title: "自然対照群",
    subtitle:
      "9つの低EMF集団と現代集団を7つの健康指標で比較。Tsimane-Mosetén勾配、近視の用量反応、BERMカスケードテスト。",
    backLink: "← エビデンスに戻る",
    warningTitle: "大規模な交絡因子",
    warningText:
      "以下にリストされたすべての集団は、食事、運動、コミュニティ構造、化学物質曝露、遺伝学において現代社会と異なります。これはEMFが疾病を引き起こす証拠ではありません。これは整合性チェックです：低EMF集団はBERMが予測する健康パターンを示すか？示さなければBERMは反証されます。示すことは必要条件ですが十分条件ではありません。",
    s1Kicker: "セクション 1",
    s1Title: "これらの集団が重要な理由",
    s1Text: [
      "BERMは、人為的EMF曝露がほぼゼロの集団が以下を示すべきと予測します：高い出生率（TFR > 4）、低い心血管疾患、低い認知症、低い肥満、低いT2D、低いうつ病。これらは恣意的に選ばれた結果ではなく、モデルの7つの疾病カスケードの直接的な予測です。",
      "現代の都市からEMFを除去する対照実験を行うことはできません。しかし、電気や個人用テクノロジーを一度も採用しなかった集団は自然なベースラインを提供します。モデルが誤りであれば、これらの集団の少なくとも一部は現代の疾病パターンを示すはずです。いずれも示しません。",
    ],
    s2Kicker: "セクション 2",
    s2Title: "集団比較",
    tableHeaders: {
      population: "集団",
      location: "地域",
      emf: "EMFレベル",
      tfr: "TFR",
      cvd: "CVD",
      dementia: "認知症",
      obesity: "肥満",
      t2d: "T2D",
      cancer: "がん",
      depression: "うつ病",
    },
    s3Kicker: "セクション 3",
    s3Title: "Tsimane → Mosetén → 現代の勾配",
    s3Text: [
      "これはBERMにとって最も強力な集団レベルのエビデンスです。TsimaneとMoseténは遺伝的祖先、地理的地域、基本的な生計パターンを共有しています。主な違いは近代化の程度です：Moseténはより多くのテクノロジー、医療、インフラを持っています。",
      "測定されたすべての健康変数において、MoseténはTsimaneと西洋集団の間に位置します。これは遺伝学を制御する用量反応勾配であり、最も一般的な交絡因子の反論に対応します。",
    ],
    gradientLabels: [
      {
        name: "Tsimane",
        chi: "χ_env = 0",
        desc: "電気なし、電話なし、現代テクノロジーなし",
        health: "記録された中で最低のCVD。認知症1.2%。脳萎縮70%遅い。",
      },
      {
        name: "Mosetén",
        chi: "χ_env > 0",
        desc: "Tsimaneと祖先を共有するが、より多くのテクノロジーとインフラ",
        health: "CVD低い。認知症中程度。脳萎縮中程度。",
      },
      {
        name: "現代（米国）",
        chi: "χ_env = high",
        desc: "完全電化、スマートフォン、高密度RF環境",
        health: "CVD高い。認知症8–11%。肥満42%。TFR 1.66。",
      },
    ],
    gradientPunchline:
      "同じ遺伝子。同じ地域。同じ基本食。異なるテクノロジー。異なる健康。すべての変数において。",
    tProfileKicker: "テストステロンプロファイル",
    tProfileTitle: "Tsimane：テストステロンは加齢とともに低下しない",
    tProfileLead: "テストステロンの低下が生物学的必然であれば、すべての集団に現れるはずです。しかし現れません。Tsimaneの男性は基準レベルが33%低いにもかかわらず、加齢に伴うテストステロン低下を示しません。これは「加齢」説明に対する自然実験です。",
    tProfileBaseline: "ベースライン",
    tProfileAgeDecline: "加齢による低下",
    tProfileReactivity: "反応性",
    tProfileImplication: "意義",
    tProfileParadox: "パラドックス：60歳までに、Tsimaneの男性はアメリカ人男性よりもテストステロンが高くなる可能性があります — 開始時点で33%低いにもかかわらず。アメリカ人の軌跡（高いベースラインから年間約1.5%低下）はTsimaneレベル（安定）と約55歳で交差します。",
    tGradientKicker: "テストステロン勾配",
    tGradientTitle: "Tsimane → Mosetén → 米国：テストステロン加齢における用量反応",
    tGradientLead: "アマゾンの祖先を共有するがテクノロジーの採用が異なる3つの集団は、EMF曝露を追跡するテストステロン軌跡勾配を示します — 遺伝学、食事、緯度ではありません。",
    tGradientRows: [
      { pop: "Tsimane", emf: "ゼロ", baseline: "~400 pg/mL（唾液）", decline: "なし", trajectory: "年齢にわたり平坦" },
      { pop: "Mosetén", emf: "低", baseline: "中程度", decline: "穏やか", trajectory: "加齢とともにわずかに低下" },
      { pop: "現代米国", emf: "高", baseline: "~550 pg/mL → 低下中", decline: "~1.5%/年", trajectory: "急激な低下；約55歳でTsimaneと交差" },
    ],
    tGradientNote: "この勾配は最も強い交絡因子を制御します：TsimaneとMoseténは祖先、地理、生計基盤を共有しています。テクノロジーの採用が異なる主要な変数であり、テストステロンの軌跡はそれに従います。BERMの用語では：Tsimane P=1.0, R=2.1 → EMF_eff ≈ 0。Mosetén P=1.2, R=1.5 → EMF_eff = low。USA P=2.2, R=1.0 → EMF_eff = high。同じRF曝露 → 異なるプライミング履歴のため異なる反応。",
    s4Kicker: "セクション 4",
    s4Title: "近視の勾配",
    s4Text: [
      "近視の有病率は、遺伝学ではなくテクノロジーの採用を追跡する5段階の勾配に従います。これは屈折検査法で測定されます — 自己申告ではなく客観的な物理測定です。",
      "COVID-19パンデミックは時間的テストを提供しました：ロックダウン中にスクリーンタイムが劇的に増加し、世界的に小児近視の急増が観察されました（メタアナリシスは進行の1.5–3倍の増加を報告）。これはBERMの3チャネルモデルのRF/スクリーン光チャネルと一致しています。",
    ],
    myopiaHeaders: { region: "地域", prevalence: "近視有病率", tech: "テクノロジーレベル" },
    s5Kicker: "セクション 5",
    s5Title: "BERMカスケードテスト",
    s5Text:
      "BERMは、VGCC媒介Ca²⁺調節異常が特定の病理を生じる16の疾病カスケードを予測します。各カスケードについて問います：低EMF集団はより低い有病率を示すか？16カスケード中11が一致を確認（69%）、5はデータなし、0が矛盾。",
    cascadeHeaders: {
      cascade: "カスケード",
      lowEmf: "低EMF",
      modern: "現代",
      mechanism: "BERMメカニズム",
      status: "ステータス",
    },
    cascadeSummary: "11/16 確認 · 5/16 データなし · 0/16 矛盾",
    preElecKicker: "レトロディクション",
    preElecTitle: "電化以前のベースライン",
    preElecLead: "BERMは、電化以前の集団がすべてのカスケード結果においてより低い有病率を示すべきと予測します。これはレトロディクションです — モデルは過去を予測します。",
    preElecRows: [
      { cascade: "肥満", preElectric: "~5%", modern: "42%（米国）", change: "8×" },
      { cascade: "2型糖尿病", preElectric: "まれ", modern: "~10%（世界）", change: "10×+" },
      { cascade: "自閉症", preElectric: "<3/10,000", modern: "320/10,000", change: "100×" },
      { cascade: "うつ病", preElectric: "低い（推定）", modern: "~10%（世界）", change: "?" },
      { cascade: "精子数", preElectric: "データなし", modern: "−51.6%（1973→）", change: "—" },
      { cascade: "TFR", preElectric: "~5–6（西洋）", modern: "1.66（米国）", change: "−3×" },
    ],
    preElecAmish: "Amishの健康プロファイル — 低肥満、低糖尿病、低うつ病、高出生率（TFR 6.1） — は1900年代初頭の電化以前の健康データに類似しています。BERMはこれを、前近代と近代の健康プロファイルの差が遺伝学、食事、ライフスタイルだけでなく、電磁環境によって大きく左右されているという証拠として解釈します。",
    preElecHeaders: { cascade: "カスケード", preElectric: "電化以前（~1900）", modern: "現代（2024）", change: "変化" },
    occKicker: "職業別勾配",
    occTitle: "屋内労働者 vs. 屋外労働者",
    occLead: "EMF曝露は職業によって劇的に異なります。従来の屋内/屋外の比較は座位行動とUV曝露に焦点を当てています。BERMは追加します：屋内労働者の代謝リスクは身体活動を制御した後でも高い。累積EMF負荷がより大きいためです。",
    occGradient: [
      { occupation: "データセンター作業員", stars: 5, sources: "ELF+IF+RF, multi-source, 8–12h" },
      { occupation: "オフィス作業員", stars: 4, sources: "WiFi+LED+screen+phone, 8–10h" },
      { occupation: "小売店員", stars: 3, sources: "LED+WiFi+POS system" },
      { occupation: "工場作業員", stars: 3, sources: "ELF+IF, industrial equipment" },
      { occupation: "建設作業員", stars: 2, sources: "ELF power tools, phone" },
      { occupation: "農業従事者", stars: 1, sources: "Tractor ELF, phone, otherwise low" },
      { occupation: "漁師/伐採作業員", stars: 1, sources: "Near EMF-free work environment" },
    ],
    occPrediction: "検証可能：身体的に活動的な屋内労働者（ジム通いのオフィスワーカー）vs. 同じ身体活動レベルだが異なるEMF環境の屋外労働者 — 代謝マーカーに差が出るはずです。",
    s6Kicker: "セクション 6",
    s6Title: "これが証明しないこと",
    s6Text: [
      "上記のすべての集団は、同時に複数の方法で現代社会と異なります。交絡因子には以下が含まれます：",
    ],
    confounders: [
      "食事 — より多くのホールフード、より少ない加工糖、異なるマクロ栄養素比率",
      "運動 — Hadzaは1日約17,000歩 vs 米国約4,000歩",
      "コミュニティ構造 — 拡大家族、社会的サポート、少ない孤立",
      "化学物質曝露 — 農薬なし、マイクロプラスチックなし、産業汚染なし",
      "遺伝学 — 数千年にわたる集団固有の適応",
    ],
    s6Text2: [
      "このエビデンスはBERMとの整合性であり、その証明ではありません。上記の交絡因子のいずれかが、観察された差異の一部またはすべてを説明できる可能性があります。Tsimane→Mosetén勾配は、遺伝学と地理を制御し、テクノロジーの採用を主要な変数として分離するため、最も強力な議論です。",
      "整合性からエビデンスに移行するには、EMFが変化する主要な変数である集団における前向き研究が必要です。以下に2つを提案します。",
    ],
    proposedStudies: [
      {
        id: "DIFF-1",
        title: "AGD測定：Tsimane vs 都市部トリニダードの新生児",
        desc: "肛門性器間距離（AGD）は出生前アンドロゲン曝露のマーカーであり、内分泌撹乱物質により減少します。BERMはEMF媒介テストステロン抑制がAGDを減少させると予測します。Tsimaneの新生児（EMFゼロ）と都市部トリニダードの新生児（高EMF、類似の緯度と遺伝的混合）を比較することでこの予測をテストできます。",
      },
      {
        id: "AMISH-1",
        title: "AmishのTFR vs 最寄り都市地域への距離",
        desc: "Amishは個人用テクノロジーを拒否しますが、近くの都市からの周囲EMFに囲まれて暮らしています。周囲曝露が重要であれば、都市中心部に近いAmishコミュニティは遠隔地よりも低いTFRを示すはずです。これは既存の人口統計データと地理空間分析で検証可能です。",
      },
    ],
    proposedTitle: "提案研究",
    navPredictions: "予測 →",
    navModel: "モデル仕様 →",
    tablePopulation: "集団",
    tableBaseline: "基準値",
    tableDecline: "低下",
    tableTrajectory: "軌跡",
    tableOccupation: "職業",
    tableSources: "出典",
  },
  fr: {
    title: "Groupes témoins naturels",
    subtitle:
      "Neuf populations à faible EMF comparées aux populations modernes sur sept indicateurs de santé. Le gradient Tsimane–Mosetén, la réponse dose-effet de la myopie et le test de cascade BERM.",
    backLink: "← Retour aux preuves",
    warningTitle: "Facteurs de confusion massifs",
    warningText:
      "Chaque population listée ci-dessous diffère des sociétés modernes en termes d'alimentation, d'exercice, de structure communautaire, d'exposition chimique et de génétique. Rien de cela ne prouve que les EMF causent des maladies. Il s'agit d'un contrôle de cohérence : les populations à faible EMF présentent-elles les schémas de santé prédits par BERM ? Si ce n'était pas le cas, BERM serait falsifié. Qu'elles le fassent est nécessaire mais pas suffisant.",
    s1Kicker: "SECTION 1",
    s1Title: "Pourquoi ces populations sont importantes",
    s1Text: [
      "BERM prédit que les populations avec une exposition EMF anthropique quasi nulle devraient présenter : une fertilité élevée (TFR > 4), un faible taux de maladies cardiovasculaires, une faible démence, une faible obésité, un faible T2D et une faible dépression. Ce ne sont pas des résultats sélectionnés — ce sont les prédictions directes des sept cascades de maladies du modèle.",
      "Nous ne pouvons pas mener une expérience contrôlée en supprimant les EMF d'une ville moderne. Mais les populations qui n'ont jamais adopté l'électricité ni la technologie personnelle fournissent une base de référence naturelle. Si le modèle est faux, au moins certaines de ces populations devraient présenter des schémas de maladies modernes. Aucune ne le fait.",
    ],
    s2Kicker: "SECTION 2",
    s2Title: "Comparaison des populations",
    tableHeaders: {
      population: "Population",
      location: "Localisation",
      emf: "Niveau EMF",
      tfr: "TFR",
      cvd: "CVD",
      dementia: "Démence",
      obesity: "Obésité",
      t2d: "T2D",
      cancer: "Cancer",
      depression: "Dépression",
    },
    s3Kicker: "SECTION 3",
    s3Title: "Gradient Tsimane → Mosetén → Moderne",
    s3Text: [
      "C'est la preuve la plus solide au niveau populationnel pour BERM. Les Tsimane et Mosetén partagent une ascendance génétique, une région géographique et des schémas de subsistance de base. Ils diffèrent principalement par le degré de modernisation : les Mosetén disposent de plus de technologie, de médecine et d'infrastructure.",
      "Pour chaque variable de santé mesurée, les Mosetén se situent ENTRE les Tsimane et les populations occidentales. C'est un gradient dose-réponse qui contrôle la génétique — l'objection de facteur de confusion la plus courante.",
    ],
    gradientLabels: [
      {
        name: "Tsimane",
        chi: "χ_env = 0",
        desc: "Pas d'électricité, pas de téléphones, pas de technologie moderne",
        health: "CVD la plus basse jamais enregistrée. Démence 1,2 %. Atrophie cérébrale 70 % plus lente.",
      },
      {
        name: "Mosetén",
        chi: "χ_env > 0",
        desc: "Ascendance partagée avec les Tsimane mais plus de technologie et d'infrastructure",
        health: "CVD faible. Démence intermédiaire. Atrophie cérébrale intermédiaire.",
      },
      {
        name: "Moderne (USA)",
        chi: "χ_env = high",
        desc: "Électrification complète, smartphones, environnement RF dense",
        health: "CVD élevée. Démence 8–11 %. Obésité 42 %. TFR 1,66.",
      },
    ],
    gradientPunchline:
      "Mêmes gènes. Même région. Même alimentation de base. Technologie différente. Santé différente. Sur chaque variable.",
    tProfileKicker: "PROFIL TESTOSTÉRONE",
    tProfileTitle: "Tsimane : la testostérone ne décline pas avec l'âge",
    tProfileLead: "Si le déclin de la testostérone était une fatalité biologique, il devrait apparaître dans toutes les populations. Ce n'est pas le cas. Les hommes Tsimane ne montrent aucun déclin de testostérone lié à l'âge malgré des niveaux de base 33 % plus bas — une expérience naturelle contre l'explication du « vieillissement ».",
    tProfileBaseline: "Niveau de base",
    tProfileAgeDecline: "Déclin lié à l'âge",
    tProfileReactivity: "Réactivité",
    tProfileImplication: "Implication",
    tProfileParadox: "Paradoxe : à 60 ans, les hommes Tsimane pourraient avoir une testostérone PLUS ÉLEVÉE que les hommes américains — bien qu'ils commencent 33 % plus bas. La trajectoire américaine (déclin d'environ 1,5 %/an à partir d'un niveau de base plus élevé) croise le niveau Tsimane (stable) vers 55 ans.",
    tGradientKicker: "GRADIENT TESTOSTÉRONE",
    tGradientTitle: "Tsimane → Mosetén → USA : réponse dose-effet dans le vieillissement de la testostérone",
    tGradientLead: "Trois populations partageant une ascendance amazonienne mais différant dans l'adoption technologique montrent un gradient de trajectoire de testostérone qui suit l'exposition aux EMF — pas la génétique, l'alimentation ou la latitude.",
    tGradientRows: [
      { pop: "Tsimane", emf: "Zéro", baseline: "~400 pg/mL (salivaire)", decline: "Aucun", trajectory: "Plat avec l'âge" },
      { pop: "Mosetén", emf: "Faible", baseline: "Intermédiaire", decline: "Modeste", trajectory: "Léger déclin avec l'âge" },
      { pop: "USA moderne", emf: "Élevé", baseline: "~550 pg/mL → en déclin", decline: "~1,5 %/an", trajectory: "Déclin abrupt ; croise Tsimane vers ~55 ans" },
    ],
    tGradientNote: "Ce gradient contrôle les facteurs de confusion les plus forts : Tsimane et Mosetén partagent l'ascendance, la géographie et la base de subsistance. L'adoption technologique est la variable principale qui diffère — et la trajectoire de testostérone la suit. En termes BERM : Tsimane P=1,0, R=2,1 → EMF_eff ≈ 0. Mosetén P=1,2, R=1,5 → EMF_eff = low. USA P=2,2, R=1,0 → EMF_eff = high. Même exposition RF → réponse différente en raison d'un historique de priming différent.",
    s4Kicker: "SECTION 4",
    s4Title: "Gradient de la myopie",
    s4Text: [
      "La prévalence de la myopie suit un gradient à cinq niveaux qui suit l'adoption technologique, pas la génétique. Ceci est mesuré par réfractométrie — une mesure physique objective, pas un auto-rapport.",
      "La pandémie de COVID-19 a fourni un test temporel : le temps d'écran a augmenté dramatiquement pendant les confinements, et une hausse correspondante de la myopie infantile a été observée mondialement (les méta-analyses rapportent une augmentation de 1,5–3× de la progression). Ceci est cohérent avec le canal RF/lumière d'écran du modèle à trois canaux de BERM.",
    ],
    myopiaHeaders: { region: "Région", prevalence: "Prévalence de la myopie", tech: "Niveau technologique" },
    s5Kicker: "SECTION 5",
    s5Title: "Test de cascade BERM",
    s5Text:
      "BERM prédit 16 cascades de maladies où la dérégulation du Ca²⁺ médiée par VGCC produit des pathologies spécifiques. Pour chaque cascade, nous demandons : les populations à faible EMF montrent-elles une prévalence plus faible ? Sur 16 cascades, 11 sont confirmées cohérentes (69 %), 5 n'ont pas de données et 0 sont contredites.",
    cascadeHeaders: {
      cascade: "Cascade",
      lowEmf: "Faible EMF",
      modern: "Moderne",
      mechanism: "Mécanisme BERM",
      status: "Statut",
    },
    cascadeSummary: "11/16 confirmées · 5/16 pas de données · 0/16 contredites",
    preElecKicker: "RÉTRODICTION",
    preElecTitle: "Niveaux de référence pré-électriques",
    preElecLead: "BERM prédit que les populations pré-électriques devraient présenter une prévalence plus faible de TOUS les résultats de cascade. C'est une rétrodiction — le modèle prédit le PASSÉ.",
    preElecRows: [
      { cascade: "Obésité", preElectric: "~5 %", modern: "42 % (USA)", change: "8×" },
      { cascade: "Diabète de type 2", preElectric: "Rare", modern: "~10 % (mondial)", change: "10×+" },
      { cascade: "Autisme", preElectric: "<3/10 000", modern: "320/10 000", change: "100×" },
      { cascade: "Dépression", preElectric: "Faible (est.)", modern: "~10 % (mondial)", change: "?" },
      { cascade: "Nombre de spermatozoïdes", preElectric: "Pas de données", modern: "−51,6 % (1973→)", change: "—" },
      { cascade: "TFR", preElectric: "~5–6 (Occident)", modern: "1,66 (USA)", change: "−3×" },
    ],
    preElecAmish: "Le profil de santé Amish — faible obésité, faible diabète, faible dépression, haute fertilité (TFR 6,1) — ressemble aux données de santé pré-électrification du début des années 1900. BERM interprète ceci comme preuve que la différence entre les profils de santé pré-modernes et modernes est substantiellement due à l'environnement électromagnétique, et non à la génétique, l'alimentation ou le mode de vie seuls.",
    preElecHeaders: { cascade: "Cascade", preElectric: "Pré-électrique (~1900)", modern: "Moderne (2024)", change: "Changement" },
    occKicker: "GRADIENT PROFESSIONNEL",
    occTitle: "Travailleurs en intérieur vs. en extérieur",
    occLead: "L'exposition aux EMF varie considérablement selon la profession. Les comparaisons conventionnelles intérieur/extérieur se concentrent sur la sédentarité et l'exposition aux UV. BERM ajoute : le risque métabolique des travailleurs en intérieur est plus élevé MÊME après contrôle de l'activité physique, car leur charge EMF cumulative est plus grande.",
    occGradient: [
      { occupation: "Opérateur de centre de données", stars: 5, sources: "ELF+IF+RF, multi-source, 8–12h" },
      { occupation: "Employé de bureau", stars: 4, sources: "WiFi+LED+screen+phone, 8–10h" },
      { occupation: "Employé de commerce", stars: 3, sources: "LED+WiFi+POS system" },
      { occupation: "Ouvrier d'usine", stars: 3, sources: "ELF+IF, industrial equipment" },
      { occupation: "Ouvrier du bâtiment", stars: 2, sources: "ELF power tools, phone" },
      { occupation: "Agriculteur", stars: 1, sources: "Tractor ELF, phone, otherwise low" },
      { occupation: "Pêcheur / bûcheron", stars: 1, sources: "Near EMF-free work environment" },
    ],
    occPrediction: "Testable : travailleurs d'intérieur physiquement actifs (employés de bureau allant à la salle de sport) vs. travailleurs d'extérieur avec le même niveau d'activité physique mais un environnement EMF différent — les marqueurs métaboliques devraient différer.",
    s6Kicker: "SECTION 6",
    s6Title: "Ce que cela NE prouve PAS",
    s6Text: [
      "Chaque population ci-dessus diffère des sociétés modernes de multiples façons simultanément. Les facteurs de confusion incluent :",
    ],
    confounders: [
      "Alimentation — plus d'aliments complets, moins de sucre transformé, ratios de macronutriments différents",
      "Exercice — les Hadza marchent ~17 000 pas/jour vs USA ~4 000",
      "Structure communautaire — familles élargies, soutien social, moins d'isolement",
      "Exposition chimique — pas de pesticides, pas de microplastiques, pas de pollution industrielle",
      "Génétique — adaptations spécifiques aux populations sur des millénaires",
    ],
    s6Text2: [
      "Cette preuve est une COHÉRENCE avec BERM, pas sa preuve. N'importe lequel des facteurs de confusion ci-dessus pourrait expliquer certaines ou toutes les différences observées. Le gradient Tsimane→Mosetén est l'argument le plus fort car il contrôle la génétique et la géographie, isolant l'adoption technologique comme variable principale.",
      "Pour passer de la cohérence à la preuve, nous avons besoin d'études prospectives dans des populations où les EMF sont la variable principale qui change. Deux sont proposées ci-dessous.",
    ],
    proposedStudies: [
      {
        id: "DIFF-1",
        title: "Mesure de l'AGD : Tsimane vs néonats trinidadiens urbains",
        desc: "La distance anogénitale (AGD) est un marqueur de l'exposition prénatale aux androgènes et est réduite par les perturbateurs endocriniens. BERM prédit que la suppression de la testostérone médiée par les EMF réduirait l'AGD. La comparaison des néonats Tsimane (zéro EMF) avec les néonats trinidadiens urbains (EMF élevé, latitude et mélange génétique similaires) testerait cette prédiction.",
      },
      {
        id: "AMISH-1",
        title: "TFR Amish vs distance au centre urbain le plus proche",
        desc: "Les Amish rejettent la technologie personnelle mais vivent entourés d'EMF ambiants provenant des villes voisines. Si l'exposition ambiante compte, les communautés Amish plus proches des centres urbains devraient avoir un TFR plus bas que les communautés éloignées. Ceci est testable avec les données démographiques existantes et l'analyse géospatiale.",
      },
    ],
    proposedTitle: "Études proposées",
    navPredictions: "Prédictions →",
    navModel: "Spécification du modèle →",
    tablePopulation: "Population",
    tableBaseline: "Référence",
    tableDecline: "Déclin",
    tableTrajectory: "Trajectoire",
    tableOccupation: "Profession",
    tableSources: "Sources",
  },
  ko: {
    title: "자연 대조군",
    subtitle:
      "9개 저EMF 인구 집단과 현대 인구 집단을 7가지 건강 지표로 비교. Tsimane–Mosetén 기울기, 근시 용량-반응, BERM 캐스케이드 테스트.",
    backLink: "← 증거로 돌아가기",
    warningTitle: "대규모 교란 요인",
    warningText:
      "아래에 나열된 모든 인구 집단은 식이, 운동, 공동체 구조, 화학물질 노출, 유전학에서 현대 사회와 다릅니다. 이것은 EMF가 질병을 유발한다는 증거가 아닙니다. 이것은 일관성 확인입니다: 저EMF 인구 집단이 BERM이 예측하는 건강 패턴을 보이는가? 보이지 않는다면 BERM은 반증됩니다. 보인다는 것은 필요조건이지만 충분조건은 아닙니다.",
    s1Kicker: "섹션 1",
    s1Title: "이 인구 집단이 중요한 이유",
    s1Text: [
      "BERM은 인위적 EMF 노출이 거의 0인 인구 집단이 다음을 나타내야 한다고 예측합니다: 높은 출산율(TFR > 4), 낮은 심혈관 질환, 낮은 치매, 낮은 비만, 낮은 T2D, 낮은 우울증. 이들은 선별된 결과가 아니라 모델의 7가지 질병 캐스케이드의 직접적인 예측입니다.",
      "현대 도시에서 EMF를 제거하는 통제 실험을 수행할 수 없습니다. 그러나 전기나 개인 기술을 채택한 적 없는 인구 집단은 자연적 기준선을 제공합니다. 모델이 틀렸다면, 이 인구 집단 중 최소한 일부는 현대 질병 패턴을 보여야 합니다. 어느 것도 보이지 않습니다.",
    ],
    s2Kicker: "섹션 2",
    s2Title: "인구 집단 비교",
    tableHeaders: {
      population: "인구 집단",
      location: "위치",
      emf: "EMF 수준",
      tfr: "TFR",
      cvd: "CVD",
      dementia: "치매",
      obesity: "비만",
      t2d: "T2D",
      cancer: "암",
      depression: "우울증",
    },
    s3Kicker: "섹션 3",
    s3Title: "Tsimane → Mosetén → 현대 기울기",
    s3Text: [
      "이것은 BERM에 대한 가장 강력한 단일 인구 수준 증거입니다. Tsimane과 Mosetén은 유전적 조상, 지리적 지역, 기본 생계 패턴을 공유합니다. 주요 차이는 현대화 정도입니다: Mosetén은 더 많은 기술, 의료, 인프라를 보유하고 있습니다.",
      "측정된 모든 건강 변수에서 Mosetén은 Tsimane과 서양 인구 집단 사이에 위치합니다. 이것은 유전학을 통제하는 용량-반응 기울기로, 가장 일반적인 교란 요인 반론에 대응합니다.",
    ],
    gradientLabels: [
      {
        name: "Tsimane",
        chi: "χ_env = 0",
        desc: "전기 없음, 전화 없음, 현대 기술 없음",
        health: "기록된 중 가장 낮은 CVD. 치매 1.2%. 뇌 위축 70% 느림.",
      },
      {
        name: "Mosetén",
        chi: "χ_env > 0",
        desc: "Tsimane과 조상을 공유하지만 더 많은 기술과 인프라",
        health: "CVD 낮음. 치매 중간. 뇌 위축 중간.",
      },
      {
        name: "현대(미국)",
        chi: "χ_env = high",
        desc: "완전 전기화, 스마트폰, 고밀도 RF 환경",
        health: "CVD 높음. 치매 8–11%. 비만 42%. TFR 1.66.",
      },
    ],
    gradientPunchline:
      "같은 유전자. 같은 지역. 같은 기본 식단. 다른 기술. 다른 건강. 모든 변수에서.",
    tProfileKicker: "테스토스테론 프로파일",
    tProfileTitle: "Tsimane: 테스토스테론은 나이에 따라 감소하지 않는다",
    tProfileLead: "테스토스테론 감소가 생물학적 필연이라면 모든 인구 집단에서 나타나야 합니다. 그렇지 않습니다. Tsimane 남성은 기준 수준이 33% 낮음에도 불구하고 연령 관련 테스토스테론 감소를 보이지 않습니다 — 이는 '노화' 설명에 대한 자연 실험입니다.",
    tProfileBaseline: "기준선",
    tProfileAgeDecline: "연령별 감소",
    tProfileReactivity: "반응성",
    tProfileImplication: "시사점",
    tProfileParadox: "역설: 60세까지 Tsimane 남성은 미국 남성보다 테스토스테론이 더 높을 수 있습니다 — 시작점이 33% 낮음에도 불구하고. 미국인의 궤적(높은 기준선에서 연간 약 1.5% 감소)은 Tsimane 수준(안정)과 약 55세에서 교차합니다.",
    tGradientKicker: "테스토스테론 기울기",
    tGradientTitle: "Tsimane → Mosetén → 미국: 테스토스테론 노화의 용량-반응",
    tGradientLead: "아마존 조상을 공유하지만 기술 채택이 다른 세 인구 집단은 EMF 노출을 추적하는 테스토스테론 궤적 기울기를 보여줍니다 — 유전학, 식이, 위도가 아닙니다.",
    tGradientRows: [
      { pop: "Tsimane", emf: "제로", baseline: "~400 pg/mL(타액)", decline: "없음", trajectory: "연령에 걸쳐 평탄" },
      { pop: "Mosetén", emf: "낮음", baseline: "중간", decline: "완만", trajectory: "나이에 따라 약간 감소" },
      { pop: "현대 미국", emf: "높음", baseline: "~550 pg/mL → 감소 중", decline: "~1.5%/년", trajectory: "급격한 감소; 약 55세에서 Tsimane과 교차" },
    ],
    tGradientNote: "이 기울기는 가장 강력한 교란 요인을 통제합니다: Tsimane과 Mosetén은 조상, 지리, 생계 기반을 공유합니다. 기술 채택이 다른 주요 변수이며 테스토스테론 궤적은 이를 따릅니다. BERM 용어로: Tsimane P=1.0, R=2.1 → EMF_eff ≈ 0. Mosetén P=1.2, R=1.5 → EMF_eff = low. USA P=2.2, R=1.0 → EMF_eff = high. 같은 RF 노출 → 다른 프라이밍 이력 때문에 다른 반응.",
    s4Kicker: "섹션 4",
    s4Title: "근시 기울기",
    s4Text: [
      "근시 유병률은 유전학이 아닌 기술 채택을 추적하는 5단계 기울기를 따릅니다. 이것은 굴절검사로 측정됩니다 — 자기 보고가 아닌 객관적 물리 측정입니다.",
      "COVID-19 팬데믹은 시간적 테스트를 제공했습니다: 봉쇄 기간 동안 스크린 시간이 극적으로 증가했고, 전 세계적으로 소아 근시의 급증이 관찰되었습니다(메타분석은 진행의 1.5–3배 증가를 보고). 이는 BERM의 3채널 모델에서 RF/스크린 광 채널과 일치합니다.",
    ],
    myopiaHeaders: { region: "지역", prevalence: "근시 유병률", tech: "기술 수준" },
    s5Kicker: "섹션 5",
    s5Title: "BERM 캐스케이드 테스트",
    s5Text:
      "BERM은 VGCC 매개 Ca²⁺ 조절 장애가 특정 병리를 생성하는 16개 질병 캐스케이드를 예측합니다. 각 캐스케이드에 대해 묻습니다: 저EMF 인구 집단이 더 낮은 유병률을 보이는가? 16개 캐스케이드 중 11개가 일치 확인(69%), 5개는 데이터 없음, 0개가 모순.",
    cascadeHeaders: {
      cascade: "캐스케이드",
      lowEmf: "저EMF",
      modern: "현대",
      mechanism: "BERM 메커니즘",
      status: "상태",
    },
    cascadeSummary: "11/16 확인 · 5/16 데이터 없음 · 0/16 모순",
    preElecKicker: "레트로딕션",
    preElecTitle: "전기 이전 기준선",
    preElecLead: "BERM은 전기 이전 인구 집단이 모든 캐스케이드 결과에서 더 낮은 유병률을 보여야 한다고 예측합니다. 이것은 레트로딕션입니다 — 모델이 과거를 예측합니다.",
    preElecRows: [
      { cascade: "비만", preElectric: "~5%", modern: "42%(미국)", change: "8×" },
      { cascade: "2형 당뇨병", preElectric: "드문", modern: "~10%(세계)", change: "10×+" },
      { cascade: "자폐증", preElectric: "<3/10,000", modern: "320/10,000", change: "100×" },
      { cascade: "우울증", preElectric: "낮음(추정)", modern: "~10%(세계)", change: "?" },
      { cascade: "정자 수", preElectric: "데이터 없음", modern: "−51.6%(1973→)", change: "—" },
      { cascade: "TFR", preElectric: "~5–6(서양)", modern: "1.66(미국)", change: "−3×" },
    ],
    preElecAmish: "Amish 건강 프로파일 — 낮은 비만, 낮은 당뇨병, 낮은 우울증, 높은 출산율(TFR 6.1) — 은 1900년대 초기 전기화 이전 건강 데이터와 유사합니다. BERM은 이를 전근대와 현대 건강 프로파일 간의 차이가 유전학, 식이, 생활양식만이 아닌 전자기 환경에 의해 상당 부분 좌우된다는 증거로 해석합니다.",
    preElecHeaders: { cascade: "캐스케이드", preElectric: "전기 이전(~1900)", modern: "현대(2024)", change: "변화" },
    occKicker: "직업별 기울기",
    occTitle: "실내 근로자 vs. 실외 근로자",
    occLead: "EMF 노출은 직업에 따라 극적으로 다릅니다. 기존의 실내/실외 비교는 좌식 행동과 UV 노출에 초점을 맞춥니다. BERM은 추가합니다: 실내 근로자의 대사 위험은 신체 활동을 통제한 후에도 더 높습니다. 누적 EMF 부하가 더 크기 때문입니다.",
    occGradient: [
      { occupation: "데이터센터 근로자", stars: 5, sources: "ELF+IF+RF, multi-source, 8–12h" },
      { occupation: "사무직 근로자", stars: 4, sources: "WiFi+LED+screen+phone, 8–10h" },
      { occupation: "소매업 근로자", stars: 3, sources: "LED+WiFi+POS system" },
      { occupation: "공장 근로자", stars: 3, sources: "ELF+IF, industrial equipment" },
      { occupation: "건설 근로자", stars: 2, sources: "ELF power tools, phone" },
      { occupation: "농업 종사자", stars: 1, sources: "Tractor ELF, phone, otherwise low" },
      { occupation: "어부/벌목꾼", stars: 1, sources: "Near EMF-free work environment" },
    ],
    occPrediction: "검증 가능: 신체적으로 활동적인 실내 근로자(헬스장에 다니는 사무직)와 같은 신체 활동 수준이지만 다른 EMF 환경의 실외 근로자 — 대사 마커가 달라야 합니다.",
    s6Kicker: "섹션 6",
    s6Title: "이것이 증명하지 않는 것",
    s6Text: [
      "위의 모든 인구 집단은 동시에 여러 방면에서 현대 사회와 다릅니다. 교란 요인에는 다음이 포함됩니다:",
    ],
    confounders: [
      "식이 — 더 많은 자연식품, 더 적은 가공 설탕, 다른 다량영양소 비율",
      "운동 — Hadza는 하루 약 17,000보 vs 미국 약 4,000보",
      "공동체 구조 — 대가족, 사회적 지원, 적은 고립",
      "화학물질 노출 — 살충제 없음, 미세 플라스틱 없음, 산업 오염 없음",
      "유전학 — 수천 년에 걸친 인구 집단 고유의 적응",
    ],
    s6Text2: [
      "이 증거는 BERM과의 일관성이지 그 증명이 아닙니다. 위의 교란 요인 중 어느 것이든 관찰된 차이의 일부 또는 전부를 설명할 수 있습니다. Tsimane→Mosetén 기울기는 유전학과 지리를 통제하고 기술 채택을 주요 변수로 분리하기 때문에 가장 강력한 논거입니다.",
      "일관성에서 증거로 이동하려면 EMF가 변화하는 주요 변수인 인구 집단에서 전향적 연구가 필요합니다. 아래에 두 가지를 제안합니다.",
    ],
    proposedStudies: [
      {
        id: "DIFF-1",
        title: "AGD 측정: Tsimane vs 도시 트리니다드 신생아",
        desc: "항문생식기 거리(AGD)는 태아기 안드로겐 노출의 마커이며 내분비교란물질에 의해 감소합니다. BERM은 EMF 매개 테스토스테론 억제가 AGD를 감소시킬 것으로 예측합니다. Tsimane 신생아(EMF 제로)와 도시 트리니다드 신생아(높은 EMF, 유사한 위도와 유전적 혼합)를 비교하면 이 예측을 테스트할 수 있습니다.",
      },
      {
        id: "AMISH-1",
        title: "Amish TFR vs 가장 가까운 도시 지역까지의 거리",
        desc: "Amish는 개인 기술을 거부하지만 인근 도시의 주변 EMF에 둘러싸여 살고 있습니다. 주변 노출이 중요하다면, 도시 중심에 가까운 Amish 공동체는 원격지보다 낮은 TFR을 보여야 합니다. 이것은 기존 인구통계 데이터와 지리공간 분석으로 검증 가능합니다.",
      },
    ],
    proposedTitle: "제안된 연구",
    navPredictions: "예측 →",
    navModel: "모델 사양 →",
    tablePopulation: "집단",
    tableBaseline: "기준치",
    tableDecline: "감소",
    tableTrajectory: "궤적",
    tableOccupation: "직업",
    tableSources: "출처",
  },
} as const;

/* --- Helpers --- */

function cellColor(value: string, isModern: boolean): string {
  if (isModern) return "text-red-500 dark:text-red-400";
  if (value === "?") return "text-foreground-muted/50";
  return "text-green-600 dark:text-green-400";
}

function techBar(level: number): string {
  const filled = "█".repeat(level);
  const empty = "░".repeat(5 - level);
  return filled + empty;
}

function starBar(level: number): string {
  const filled = "★".repeat(level);
  const empty = "☆".repeat(5 - level);
  return filled + empty;
}

/* --- Metadata --- */

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

/* --- Page --- */

export default async function PopulationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = pickCopy(COPY, locale);


  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={Users} title={d.title} subtitle={d.subtitle} />

      {/* Warning box */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 mb-12">
        <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
          {d.warningTitle}
        </h3>
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          {d.warningText}
        </p>
      </div>

      {/* Section 1: Why these populations matter */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s1Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s1Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s1Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Section 2: Population comparison table */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s2Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s2Title}</h2>
        <div className="rounded-xl border border-card-border bg-card-bg p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-card-border text-left uppercase tracking-wider text-foreground-muted">
                  <th className="py-2 pr-3 sticky left-0 bg-card-bg z-10">{d.tableHeaders.population}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.location}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.emf}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.tfr}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.cvd}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.dementia}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.obesity}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.t2d}</th>
                  <th className="py-2 pr-3">{d.tableHeaders.cancer}</th>
                  <th className="py-2">{d.tableHeaders.depression}</th>
                </tr>
              </thead>
              <tbody>
                {LOW_EMF_POPULATIONS.map((pop) => (
                  <tr key={pop.id} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-semibold text-foreground sticky left-0 bg-card-bg z-10">
                      {pickSuffix(pop, "name", locale)}
                    </td>
                    <td className="py-2 pr-3 text-foreground-muted">{pop.location}</td>
                    <td className="py-2 pr-3">
                      <span className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400">
                        {pickSuffix(pop, "emfLabel", locale)}
                      </span>
                    </td>
                    <td className={`py-2 pr-3 font-mono-num ${cellColor(pop.health.tfr ?? "?", false)}`}>
                      {pop.health.tfr ?? "?"}
                    </td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cvd, false)}`}>{pop.health.cvd}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.dementia, false)}`}>{pop.health.dementia}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.obesity, false)}`}>{pop.health.obesity}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.t2d, false)}`}>{pop.health.t2d}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cancer, false)}`}>{pop.health.cancer}</td>
                    <td className={`py-2 ${cellColor(pop.health.depression, false)}`}>{pop.health.depression}</td>
                  </tr>
                ))}
                {/* Separator */}
                <tr>
                  <td colSpan={10} className="py-1">
                    <div className="border-t-2 border-dashed border-card-border" />
                  </td>
                </tr>
                {/* Modern comparisons */}
                {MODERN_COMPARISONS.map((pop) => (
                  <tr key={pop.id} className="border-b border-card-border/40 bg-red-500/5">
                    <td className="py-2 pr-3 font-semibold text-foreground sticky left-0 bg-red-500/5 z-10">
                      {pickSuffix(pop, "name", locale)}
                    </td>
                    <td className="py-2 pr-3 text-foreground-muted">—</td>
                    <td className="py-2 pr-3">
                      <span className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold bg-red-500/10 text-red-500 dark:text-red-400">
                        {pickSuffix(pop, "emfLabel", locale)}
                      </span>
                    </td>
                    <td className={`py-2 pr-3 font-mono-num ${cellColor(pop.health.tfr ?? "?", true)}`}>
                      {pop.health.tfr ?? "?"}
                    </td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cvd, true)}`}>{pop.health.cvd}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.dementia, true)}`}>{pop.health.dementia}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.obesity, true)}`}>{pop.health.obesity}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.t2d, true)}`}>{pop.health.t2d}</td>
                    <td className={`py-2 pr-3 ${cellColor(pop.health.cancer, true)}`}>{pop.health.cancer}</td>
                    <td className={`py-2 ${cellColor(pop.health.depression, true)}`}>{pop.health.depression}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Tsimane -> Moseten -> Modern gradient */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s3Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s3Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.s3Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>

        {/* Gradient visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {d.gradientLabels.map((step, i) => {
            const colors = [
              "border-green-500/40 bg-green-500/5",
              "border-amber-500/40 bg-amber-500/5",
              "border-red-500/40 bg-red-500/5",
            ];
            const dotColors = [
              "bg-green-500",
              "bg-amber-500",
              "bg-red-500",
            ];
            return (
              <div key={i} className={`rounded-xl border ${colors[i]} p-5 relative`}>
                {i < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-foreground-muted text-lg">
                    →
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${dotColors[i]}`} />
                  <h3 className="font-semibold text-foreground">{step.name}</h3>
                </div>
                <p className="font-mono-num text-xs text-accent mb-2">{step.chi}</p>
                <p className="text-xs text-foreground-muted mb-3">{step.desc}</p>
                <p className="text-xs font-medium text-foreground">{step.health}</p>
              </div>
            );
          })}
        </div>
        <p className="text-sm font-semibold text-foreground italic text-center">
          {d.gradientPunchline}
        </p>
      </section>

      {/* Section 3b: Tsimane testosterone profile */}
      {(() => {
        const tsimane = LOW_EMF_POPULATIONS.find((p) => p.id === "tsimane");
        const tp = tsimane?.testosteroneProfile;
        if (!tp) return null;
        return (
          <section className="mb-16 border-t editorial-rule pt-6">
            <p className="editorial-kicker text-purple-500 mb-2">{d.tProfileKicker}</p>
            <h2 className="editorial-section-heading mb-4">{d.tProfileTitle}</h2>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">{d.tProfileLead}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mb-6">
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
                <p className="text-xs font-semibold text-purple-500 mb-1">{d.tProfileBaseline}</p>
                <p className="text-sm text-foreground leading-relaxed">{pickSuffix(tp, "baseline", locale)}</p>
              </div>
              <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
                <p className="text-xs font-semibold text-green-600 mb-1">{d.tProfileAgeDecline}</p>
                <p className="text-sm text-foreground leading-relaxed font-semibold">{pickSuffix(tp, "ageDecline", locale)}</p>
              </div>
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
                <p className="text-xs font-semibold text-blue-500 mb-1">{d.tProfileReactivity}</p>
                <p className="text-sm text-foreground leading-relaxed">{pickSuffix(tp, "reactivity", locale)}</p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-xs font-semibold text-amber-500 mb-1">{d.tProfileImplication}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{pickSuffix(tp, "implication", locale)}</p>
              </div>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 max-w-4xl">
              <p className="text-xs text-foreground-muted leading-relaxed italic">{d.tProfileParadox}</p>
            </div>
            <p className="text-xs text-foreground-muted mt-3">
              {tp.referenceId ? (
                <StudyCitation referenceId={tp.referenceId} locale={locale} label={tp.source} />
              ) : (
                tp.source
              )}
            </p>
          </section>
        );
      })()}

      {/* Section 3c: Testosterone gradient Tsimane → Mosetén → USA */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-purple-500 mb-2">{d.tGradientKicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.tGradientTitle}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">{d.tGradientLead}</p>
        <div className="rounded-xl border border-card-border bg-card-bg p-5 max-w-4xl mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{d.tablePopulation}</th>
                  <th className="py-2 pr-3">EMF</th>
                  <th className="py-2 pr-3">{d.tableBaseline}</th>
                  <th className="py-2 pr-3">{d.tableDecline}</th>
                  <th className="py-2">{d.tableTrajectory}</th>
                </tr>
              </thead>
              <tbody>
                {d.tGradientRows.map((row: { pop: string; emf: string; baseline: string; decline: string; trajectory: string }, i: number) => (
                  <tr key={i} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">{row.pop}</td>
                    <td className="py-2 pr-3">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${i === 0 ? "bg-green-500/10 text-green-600 dark:text-green-400" : i === 1 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`}>
                        {row.emf}
                      </span>
                    </td>
                    <td className="py-2 pr-3 font-mono-num text-foreground">{row.baseline}</td>
                    <td className="py-2 pr-3 font-mono-num text-foreground">{row.decline}</td>
                    <td className="py-2 text-foreground-muted">{row.trajectory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 max-w-4xl">
          <p className="text-xs text-foreground-muted leading-relaxed italic">{d.tGradientNote}</p>
        </div>
      </section>

      {/* Section 4: Myopia gradient */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s4Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s4Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.s4Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{d.myopiaHeaders.region}</th>
                  <th className="py-2 pr-3">{d.myopiaHeaders.prevalence}</th>
                  <th className="py-2">{d.myopiaHeaders.tech}</th>
                </tr>
              </thead>
              <tbody>
                {MYOPIA_GRADIENT.map((row, i) => (
                  <tr key={i} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {pickSuffix(row, "region", locale)}
                    </td>
                    <td className="py-2 pr-3 font-mono-num text-foreground">{row.prevalence}</td>
                    <td className="py-2 font-mono-num text-xs tracking-widest text-accent">
                      {techBar(row.techLevel)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Occupational EMF gradient */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.occKicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.occTitle}</h2>
        <p className="editorial-rail text-[0.95rem] text-foreground mb-6 max-w-4xl">{d.occLead}</p>
        <div className="rounded-xl border border-card-border bg-card-bg p-5 max-w-4xl mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{d.tableOccupation}</th>
                  <th className="py-2 pr-3">EMF</th>
                  <th className="py-2">{d.tableSources}</th>
                </tr>
              </thead>
              <tbody>
                {d.occGradient.map((row: { occupation: string; stars: number; sources: string }, i: number) => (
                  <tr key={i} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">{row.occupation}</td>
                    <td className="py-2 pr-3 font-mono-num text-xs tracking-widest whitespace-nowrap">
                      <span className={row.stars >= 4 ? "text-red-500 dark:text-red-400" : row.stars >= 3 ? "text-amber-500 dark:text-amber-400" : "text-green-600 dark:text-green-400"}>
                        {starBar(row.stars)}
                      </span>
                    </td>
                    <td className="py-2 text-xs text-foreground-muted">{row.sources}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 max-w-4xl">
          <p className="text-xs text-foreground-muted leading-relaxed italic">{d.occPrediction}</p>
        </div>
      </section>

      {/* Section 5: BERM cascade test */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s5Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s5Title}</h2>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-4xl mb-6">
          {d.s5Text}
        </p>

        <div className="rounded-xl border border-card-border bg-card-bg p-5 mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-card-border text-left uppercase tracking-wider text-foreground-muted">
                  <th className="py-2 pr-3">{d.cascadeHeaders.cascade}</th>
                  <th className="py-2 pr-3">{d.cascadeHeaders.lowEmf}</th>
                  <th className="py-2 pr-3">{d.cascadeHeaders.modern}</th>
                  <th className="py-2 pr-3">{d.cascadeHeaders.mechanism}</th>
                  <th className="py-2 text-center">{d.cascadeHeaders.status}</th>
                </tr>
              </thead>
              <tbody>
                {CASCADE_COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {pickSuffix(row, "cascade", locale)}
                    </td>
                    <td className="py-2 pr-3 text-green-600 dark:text-green-400">{row.lowEmf}</td>
                    <td className="py-2 pr-3 text-red-500 dark:text-red-400">{row.modern}</td>
                    <td className="py-2 pr-3 font-mono-num text-foreground-muted text-xs">{row.bermPredicts}</td>
                    <td className="py-2 text-center text-base">
                      {row.confirmed === true && (
                        <span className="text-green-600 dark:text-green-400" title="Confirmed">{"✓"}</span>
                      )}
                      {row.confirmed === null && (
                        <span className="text-foreground-muted/50" title="No data">?</span>
                      )}
                      {row.confirmed === false && (
                        <span className="text-red-500 dark:text-red-400" title="Contradicted">{"✗"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm font-semibold text-foreground text-center font-mono-num">
          {d.cascadeSummary}
        </p>
      </section>

      {/* Pre-electric baselines (retrodiction) */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-purple-500 mb-2">{d.preElecKicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.preElecTitle}</h2>
        <p className="editorial-rail text-[0.95rem] text-foreground mb-6 max-w-4xl">{d.preElecLead}</p>
        <div className="rounded-xl border border-card-border bg-card-bg p-5 max-w-4xl mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                  <th className="py-2 pr-3">{d.preElecHeaders.cascade}</th>
                  <th className="py-2 pr-3">{d.preElecHeaders.preElectric}</th>
                  <th className="py-2 pr-3">{d.preElecHeaders.modern}</th>
                  <th className="py-2">{d.preElecHeaders.change}</th>
                </tr>
              </thead>
              <tbody>
                {d.preElecRows.map((row: { cascade: string; preElectric: string; modern: string; change: string }, i: number) => (
                  <tr key={i} className="border-b border-card-border/40">
                    <td className="py-2 pr-3 font-medium text-foreground">{row.cascade}</td>
                    <td className="py-2 pr-3 text-green-600 dark:text-green-400 font-mono-num">{row.preElectric}</td>
                    <td className="py-2 pr-3 text-red-500 dark:text-red-400 font-mono-num">{row.modern}</td>
                    <td className="py-2 font-mono-num font-semibold text-foreground">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 max-w-4xl">
          <p className="text-xs text-foreground-muted leading-relaxed italic">{d.preElecAmish}</p>
        </div>
      </section>

      {/* Section 6: What this does NOT prove */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <p className="editorial-kicker text-accent mb-2">{d.s6Kicker}</p>
        <h2 className="editorial-section-heading mb-4">{d.s6Title}</h2>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl">
          {d.s6Text.map((p, i) => (
            <p key={i} className={i === 0 ? "editorial-rail text-[0.95rem] text-foreground" : ""}>
              {p}
            </p>
          ))}
        </div>
        <ul className="list-disc list-inside text-sm text-foreground-muted leading-relaxed mt-3 mb-6 space-y-1">
          {d.confounders.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <div className="space-y-3 text-sm text-foreground-muted leading-relaxed max-w-4xl mb-8">
          {d.s6Text2.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Proposed studies */}
        <h3 className="font-semibold text-foreground mb-4">{d.proposedTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {d.proposedStudies.map((study) => (
            <div key={study.id} className="rounded-xl border border-card-border bg-card-bg p-5">
              <span className="font-mono-num text-xs text-accent">{study.id}</span>
              <h4 className="font-semibold text-foreground mt-1 mb-2 text-sm">{study.title}</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">{study.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom navigation */}
      <section className="mt-16">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${locale}/predictions`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.navPredictions}
          </Link>
          <Link
            href={`/${locale}/model`}
            className="rounded-lg border border-accent/20 bg-card-bg px-4 py-3 text-accent hover:underline font-semibold text-sm"
          >
            {d.navModel}
          </Link>
        </div>
      </section>
    </div>
  );
}
