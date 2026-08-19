import type { Metadata } from "next";
import { EPISTEMIC_LEVELS, PATHWAYS, EVIDENCE } from "@/lib/evidence";
import type { EpistemicLevel } from "@/lib/types";
import { StatisticalValidation } from "@/components/StatisticalValidation";
import { BehavioralSuppression } from "@/components/BehavioralSuppression";
import { HindcastValidation } from "@/components/HindcastValidation";
import { PageHeader } from "@/components/PageHeader";
import { Layers } from "lucide-react";

interface NaturalExperimentCard {
  id: string;
  location: string;
  period: string;
  intervention: string;
  observed: string;
  bermPrediction: string;
  verdict: "consistent" | "inconsistent" | "inconclusive";
  epistemicLevel: EpistemicLevel;
  reference: string;
}

const NATURAL_EXPERIMENTS: { en: NaturalExperimentCard[]; fi: NaturalExperimentCard[] } = {
  en: [
    {
      id: "cuba",
      location: "Cuba",
      period: "2018 - present",
      intervention: "Mobile data opened to citizens (ETECSA 3G, December 2018) after decades of near-zero personal wireless use.",
      observed: "TFR was stable at ~1.65 for 17 years (2000-2017), then began declining to 1.45 within 4 years of mobile data access.",
      bermPrediction: "Onset of personal EMF exposure should trigger TFR decline with ~2-year lag. Stable-then-decline pattern is the predicted signature.",
      verdict: "consistent",
      epistemicLevel: "C",
      reference: "ETECSA coverage data; UN WPP 2024 TFR estimates",
    },
    {
      id: "bhutan",
      location: "Bhutan",
      period: "2003 - present",
      intervention: "First cellular service (B-Mobile) introduced in 2003. TV introduced in 1999. Simultaneous development transition.",
      observed: "TFR declined from 6.0 to 1.8, but proportional decline rate slowed after mobile introduction (4.9%/yr pre vs 2.2%/yr post).",
      bermPrediction: "Mobile introduction should accelerate TFR decline. Proportional decline should increase post-adoption.",
      verdict: "inconclusive",
      epistemicLevel: "C",
      reference: "World Bank mobile subscriptions; UN WPP 2024",
    },
    {
      id: "myanmar",
      location: "Myanmar",
      period: "2014 - present",
      intervention: "SIM card price collapsed from $250 to $1.50 with Ooredoo/Telenor entry. Mobile penetration jumped 7% to 80% in 3 years.",
      observed: "TFR decline rate actually decelerated (0.045/yr pre-event to 0.015/yr post-event). Military coup 2021 adds further confounding.",
      bermPrediction: "Massive jump in personal exposure should accelerate TFR decline.",
      verdict: "inconsistent",
      epistemicLevel: "C",
      reference: "ITU mobile data; Myanmar Census 2014; UN WPP 2024",
    },
    {
      id: "naval",
      location: "Norway (naval cohort)",
      period: "1950 - 2004",
      intervention: "Naval personnel received occupational high-frequency RF exposure at levels far above civilian ambient, with dose-response assessment.",
      observed: "OR 1.86 for infertility with dose-response gradient. Sex ratio shift toward female offspring in exposed group.",
      bermPrediction: "High RF exposure should increase infertility with dose-response. X>Y sperm sensitivity predicts sex ratio shift.",
      verdict: "consistent",
      epistemicLevel: "M|C",
      reference: "Mollerlikken & Moen 2008, n=10,497",
    },
    {
      id: "covid",
      location: "Global (COVID-19 lockdowns)",
      period: "March 2020 - June 2021",
      intervention: "Global synchronized natural experiment. Lockdowns reduced ambient EMF (traffic NO₂ −54%, industry closed) while massively increasing personal/indoor EMF (home offices, devices from 18→25 per household, screen time +60–80%).",
      observed: "CONFIRMED on both counts. Semen quality improved during lockdown (PubMed 41036143, N=2,672). Mental health deteriorated with medium effect size (Hedge’s g=0.337, PMC9709147). Chinese data shows REVERSE: when restrictions lifted, sperm quality declined again (Zhang 2025). Dutch longitudinal data: child mental health had NOT returned to pre-pandemic levels by April 2023 (PMC11472795).",
      bermPrediction: "Bidirectional: Ambient EMF↓ → sperm quality↑ (74-day lag). Personal EMF↑↑ → mental health↓ (weeks). Both simultaneously. Lifting restrictions should reverse sperm improvement but NOT mental health — because device counts and screen time remained permanently elevated.",
      verdict: "consistent",
      epistemicLevel: "M|C",
      reference: "PubMed 41036143 (N=2,672); PMC10804479 (N=85); PMC12540804 (N=74); Zhang 2025; PMC11472795; PMC9709147 (N=674); PMC9843116 (N=1,689)",
    },
    {
      id: "south-korea",
      location: "South Korea",
      period: "2012 - present",
      intervention: "World-leading smartphone penetration (>97%), densest 5G network globally, highest per-capita screen time.",
      observed: "TFR collapsed to 0.72 (2023), the lowest ever recorded for any country. Decline accelerated sharply in the smartphone era.",
      bermPrediction: "Maximum chi(A)-bar scenario: highest ambient + highest personal exposure should produce deepest TFR suppression globally.",
      verdict: "consistent",
      epistemicLevel: "C",
      reference: "Statistics Korea; ITU smartphone penetration data",
    },
    {
      id: "east-germany",
      location: "East Germany",
      period: "1990 - 1994",
      intervention: "Reunification brought sudden introduction of Western telecom infrastructure, consumer electronics, and broadcasting density alongside economic transformation.",
      observed: "TFR crashed from 1.52 to 0.77 in 4 years, the lowest ever recorded for any country at that time. Recovery began only in late 1990s.",
      bermPrediction: "Sudden EMF infrastructure jump should produce rapid TFR decline. Confounded by economic shock, but the magnitude (50% drop) exceeds what economic models predict.",
      verdict: "inconclusive",
      epistemicLevel: "C",
      reference: "Statistisches Bundesamt; Goldstein & Kreyenfeld 2011",
    },
  ],
  fi: [
    {
      id: "cuba",
      location: "Kuuba",
      period: "2018 - nykyhetki",
      intervention: "Mobiilidata avattiin kansalaisille (ETECSA 3G, joulukuu 2018) vuosikymmenten lahes nollatason henkilokohtaisen langattoman kayton jalkeen.",
      observed: "TFR oli vakaa ~1,65 tasolla 17 vuotta (2000-2017), sitten alkoi laskea 1,45:een 4 vuodessa mobiilidatan kayttoonoton jalkeen.",
      bermPrediction: "Henkilokohtaisen EMF-altistuksen alkamisen pitaisi laukaista TFR-lasku ~2 vuoden viiveella. Vakaa-sitten-lasku on ennustettu signaali.",
      verdict: "consistent",
      epistemicLevel: "C",
      reference: "ETECSA kattavuusdata; YK WPP 2024 TFR-arviot",
    },
    {
      id: "bhutan",
      location: "Bhutan",
      period: "2003 - nykyhetki",
      intervention: "Ensimmainen matkapuhelinpalvelu (B-Mobile) otettiin kayttoon 2003. TV esiteltiin 1999. Samanaikainen kehityssiirtyma.",
      observed: "TFR laski 6,0:sta 1,8:aan, mutta suhteellinen laskuvauhti hidastui matkapuhelimen kayttoonoton jalkeen (4,9 %/v ennen vs. 2,2 %/v jalkeen).",
      bermPrediction: "Mobiilikayttoonoton pitaisi kiihdyttaa TFR-laskua. Suhteellisen laskun pitaisi kasvaa adoption jalkeen.",
      verdict: "inconclusive",
      epistemicLevel: "C",
      reference: "Maailmanpankki matkapuhelintilaukset; YK WPP 2024",
    },
    {
      id: "myanmar",
      location: "Myanmar",
      period: "2014 - nykyhetki",
      intervention: "SIM-kortin hinta romahti 250 $:sta 1,50 $:iin Ooredoo/Telenor-tulon myota. Mobiilipenetraatio hyppasi 7 %:sta 80 %:iin 3 vuodessa.",
      observed: "TFR-laskuvauhti itse asiassa hidastui (0,045/v ennen vs. 0,015/v jalkeen). Sotilasvallankaappaus 2021 lisaa sekoittumista.",
      bermPrediction: "Massiivisen henkilokohtaisen altistuksen hypyn pitaisi kiihdyttaa TFR-laskua.",
      verdict: "inconsistent",
      epistemicLevel: "C",
      reference: "ITU mobiilidata; Myanmarin vaestonlaskenta 2014; YK WPP 2024",
    },
    {
      id: "naval",
      location: "Norja (laivastokokortti)",
      period: "1950 - 2004",
      intervention: "Laivaston henkilosto altistui tyossaan korkeataajuiselle RF-sateilylle siviilitasoja huomattavasti korkeammilla tasoilla, annos-vastearvioinnilla.",
      observed: "OR 1,86 hedelmattomyydelle annos-vastegradientilla. Sukupuolijakauman siirtyma naisjalkelaisten suuntaan altistuneessa ryhmassa.",
      bermPrediction: "Korkean RF-altistuksen pitaisi lisata hedelmattomyytta annos-vasteella. X>Y-siittioiden herkkyys ennustaa sukupuolisuhteen muutoksen.",
      verdict: "consistent",
      epistemicLevel: "M|C",
      reference: "Mollerlikken & Moen 2008, n=10 497",
    },
    {
      id: "covid",
      location: "Maailmanlaajuinen (COVID-19-sulut)",
      period: "maaliskuu 2020 - kesa 2021",
      intervention: "Maailmanlaajuinen synkronoitu luonnollinen koe. Sulut laskivat ymparisto-EMF:aa (liikenne NO₂ −54 %, teollisuus kiinni) samalla kun henkilokohtainen/sisatila-EMF nousi massiivisesti (etatoimistot, laitteet 18→25 per kotitalous, ruutuaika +60–80 %).",
      observed: "VAHVISTETTU molemmissa suunnissa. Siemennestelaatu parani sulun aikana (PubMed 41036143, N=2 672). Mielenterveys heikkeni keskisuurella efektikoolla (Hedgen g=0,337, PMC9709147). Kiinan data nayttaa KAANTEISEN: kun rajoitukset purettiin, siittiolaatu laski jalleen (Zhang 2025). Hollannin pitkaittaisdata: lasten mielenterveys EI ollut palannut pandemiaa edeltavalle tasolle huhtikuussa 2023 (PMC11472795).",
      bermPrediction: "Kaksisuuntainen: Ymparisto-EMF↓ → siittiolaatu↑ (74 pv viive). Henkilokohtainen EMF↑↑ → mielenterveys↓ (viikkojen viive). Molemmat samanaikaisesti. Rajoitusten purku kaantaa siittioparanemisen mutta EI mielenterveytta — koska laitemarat ja ruutuaika jaivat pysyvasti koholla.",
      verdict: "consistent",
      epistemicLevel: "M|C",
      reference: "PubMed 41036143 (N=2 672); PMC10804479 (N=85); PMC12540804 (N=74); Zhang 2025; PMC11472795; PMC9709147 (N=674); PMC9843116 (N=1 689)",
    },
    {
      id: "south-korea",
      location: "Etela-Korea",
      period: "2012 - nykyhetki",
      intervention: "Maailman johtava alypuhelinpenetraatio (>97 %), tiheein 5G-verkko maailmanlaajuisesti, korkein nayttoaika per capita.",
      observed: "TFR romahti 0,72:een (2023), alhaisin koskaan millekaan maalle kirjattu. Lasku kiihtyi jyrkasti alypuhelinaikakaudella.",
      bermPrediction: "Maksimaalinen chi(A)-skenaario: korkein ymparisto- + korkein henkilokohtainen altistus pitaisi tuottaa syvin TFR-suppressio maailmanlaajuisesti.",
      verdict: "consistent",
      epistemicLevel: "C",
      reference: "Statistics Korea; ITU alypuhelinpenetraatiodata",
    },
    {
      id: "east-germany",
      location: "Ita-Saksa",
      period: "1990 - 1994",
      intervention: "Yhdistyminen toi lansimaisen televiestintainfrastruktuurin, kulutuselektroniikan ja lahetystiheyden akillisenä muutoksena talousmuutoksen rinnalla.",
      observed: "TFR romahti 1,52:sta 0,77:aan 4 vuodessa, alhaisin koskaan millekaan maalle siihen asti kirjattu. Elpyminen alkoi vasta 1990-luvun lopussa.",
      bermPrediction: "Akillisen EMF-infrastruktuurin hypyn pitaisi tuottaa nopea TFR-lasku. Sekoittuu talouskriisin kanssa, mutta suuruusluokka (50 % pudotus) ylittaa talousmallien ennusteen.",
      verdict: "inconclusive",
      epistemicLevel: "C",
      reference: "Statistisches Bundesamt; Goldstein & Kreyenfeld 2011",
    },
  ],
};

const t = {
  en: {
    title: "Evidence Compilation",
    subtitle:
      "Studies and data supporting and challenging the BERM model, organized by biological pathway. Each entry is rated on the epistemic evidence scale described below.",
    epistemicTitle: "Epistemic level system",
    epistemicDesc:
      "Not all evidence is created equal. Each study is assigned an epistemic level reflecting the strength and type of evidence it provides. This is not a judgment of study quality per se, but of what kind of inference the study supports. A single RCT may be excellent science and still rate L* if it has not been replicated.",
    year: "Year",
    study: "Study",
    finding: "Finding",
    level: "Level",
    footNote:
      "This compilation is maintained as part of the BERM model documentation. Inclusion does not imply endorsement; studies are listed to show what each pathway rests on and where the gaps are. If you know of a study that should be added or believe a rating is incorrect, contributions are welcome via the project repository.",
    neTitle: "Natural Experiments",
    neSubtitle: "Real-world situations where EMF exposure changed abruptly, providing quasi-experimental tests of the BERM model. Results are reported transparently, including cases that contradict the model.",
    neIntervention: "What changed",
    neObserved: "What was observed",
    nePrediction: "BERM prediction",
    neVerdict: "Verdict",
    verdictConsistent: "BERM-consistent",
    verdictInconsistent: "BERM-inconsistent",
    verdictInconclusive: "Inconclusive",
    neNote: "Epistemic note: 4 of 7 cases are consistent with BERM predictions, 1 is inconsistent, and 2 are inconclusive due to confounding. This is not strong evidence — natural experiments in fertility are inherently confounded by development, culture, and economics. They are reported here for completeness, not as proof.",

    /* CSLI lag invariance section */
    csliInvTitle: "Cross-Species Lag Invariance",
    csliInvDesc: "If EMF drives biological decline through a shared VGCC mechanism, then the lag between EMF exposure and observed effect should be consistent across countries for each species — and should scale with biological generation time across species. The table below shows the coefficient of variation (CV) of lag estimates across countries. CV < 0.3 = strong invariance, 0.3–0.5 = moderate, > 0.5 = weak.",
    csliInvResult: "Result: All species show weak invariance (CV > 0.5). The lag varies widely across countries, which is inconsistent with a universal mechanism operating on a fixed biological timescale. This is a negative result for the CSLI hypothesis.",
    csliInvNote: "Note: Weak invariance does not refute EMF effects on individual species — it means that the cross-species lag pattern is not consistent enough to serve as independent evidence for a shared mechanism. Country-level confounders (development, chemical exposure, climate) add noise that this test cannot separate from the signal.",
    csliInvSpecies: "Species",
    csliInvCountries: "Countries",
    csliInvMuLag: "Mean lag (yr)",
    csliInvSigma: "σ (yr)",
    csliInvCV: "CV",
    csliInvAssessment: "Assessment",
    csliInvLink: "See the full CSLI analysis on the Sentinel Species page",

    /* Individual susceptibility section */
    indSuscTitle: "Individual Susceptibility: Why EMF Affects Some People More Than Others",
    indSuscDesc:
      "BERM predicts that EMF effects vary between individuals based on three factors: genetic variation in voltage-gated calcium channel expression, anatomical differences in tissue geometry that create different internal field patterns, and cumulative exposure history that determines the phase of allostatic adaptation. This prediction explains two apparent contradictions: why some people report electromagnetic hypersensitivity while most do not, and why provocation studies measuring subjective perception typically find null results while studies measuring objective biomarkers find significant effects in subgroups.",
    indSuscGenTitle: "Genetic: VGCC polymorphisms",
    indSuscGen:
      "CACNA1C rs1006737 risk allele increases L-type VGCC expression, producing a larger Ca²+ response to the same EMF field. This is the same mechanism that predisposes to bipolar disorder, schizophrenia, and major depression — all calcium signaling disorders. A 2024 medrxiv study is the first EMF study to genotype VGCC variants, confirming 'striking inter-individual differences in how volunteers respond to acute EMF exposure.' GSTM1/GSTT1 null genotypes weaken oxidative stress defense, so the same ROS load produces more damage.",
    indSuscAnatTitle: "Anatomical: internal interference patterns",
    indSuscAnat:
      "RF waves reflect at tissue boundaries (skin/fat, fat/muscle, bone/CSF, CSF/brain), creating standing wave patterns that are anatomically individual. Thin skull, low fat layer, high tissue water content = higher internal field in critical tissues. Gandhi 1996: SAR distribution in the head varies with skull geometry. Children absorb 2–3× the SAR of adults from the same external field (thinner skull, higher tissue water content).",
    indSuscCumTitle: "Cumulative: allostatic load",
    indSuscCum:
      "Long-term occupational exposure (telecom workers, electricians) raises allostatic load following Selye dynamics. When compensation capacity (phase 2, resistance) is exhausted, the system transitions to decompensation (phase 3, exhaustion) — symptoms appear seemingly suddenly despite chronic exposure. This explains why EHS typically begins in adulthood after cumulative exposure, not in childhood.",
    indSuscProvTitle: "Reinterpretation of provocation studies",
    indSuscProv:
      "Provocation study null results do NOT refute BERM because: (1) they measure subjective perception ('do you feel the field?'), not objective biomarkers — VGCC activation and Ca²+ changes occur unconsciously; (2) they do not genotype CACNA1C — the population average may be null even if a subgroup (risk allele carriers) responds significantly; (3) they do not control for anatomical differences; (4) they do not control for cumulative exposure history (Selye phase); (5) the control group is NOT EMF-free (lab baseline bias).",
    indSuscBioTitle: "Objective biomarkers",
    indSuscBio:
      "Belpomme 2015/2022 (N≈1000 EHS patients): histaminemia↑ 40%, nitrotyrosine↑ 28% (ONOO⁻/BBB marker), S100B↑ 15% (BBB opening), O-myelin autoantibodies 23%, Hsp27/70↑ 33%, urinary melatonin/creatinine↓ all cases. These markers are consistent with the VGCC→Ca²+→ROS→BBB pathway. PMC 10226401 (2023): HRV changes in HEALTHY non-EHS volunteers under Wi-Fi — HF-HRV reduced (p=0.036), sympathetic 0V% increased (p=0.002).",
    indSuscNote:
      "Limitation: Belpomme's biomarkers are elevated only in subsets (15–40%), and it has not been shown that the SAME patients have ALL markers elevated simultaneously (PMC12314686, 2025). The Selye phase quantification (years × intensity) is a heuristic simplification, not a validated predictor. This section presents mechanistic plausibility, not proof.",

    attrBiasTitle: "Attribution Bias in Decline Research",
    attrBiasDesc:
      "EMF is structurally invisible in most ecological and reproductive research — not because it was tested and rejected, but because it was never considered. This section documents how conventional attributions (climate change, chemicals, habitat loss) become the default explanation for declines that may have an electromagnetic component.",
    attrBiasP1Title: "Attribution bias",
    attrBiasP1:
      "When a decline is observed, researchers search for explanations among familiar factors. Climate change is well-funded and politically supported. Chemical pollution is regulated and measurable. EMF is unfamiliar to most biologists, unfunded by most agencies, and actively lobbied against by the telecommunications industry. A 2024 analysis of 92 potential drivers of insect decline in Germany did not include electromagnetic fields among the candidates — not because EMF was tested and rejected, but because it was never considered.",
    attrBiasP2Title: "Evidence asymmetry",
    attrBiasP2:
      "There are hundreds of studies on climate change and insect decline. There are fewer than twenty on EMF and insect decline. This disparity does not reflect the relative importance of the two factors — it reflects the structure of research funding. The volume of evidence for a hypothesis tracks the volume of funding, not the strength of the causal relationship.",
    attrBiasP3Title: "Causal masking",
    attrBiasP3:
      "Climate change and EMF infrastructure are temporally correlated: both grew between 1970 and 2024. An OLS regression cannot distinguish between them without an exogenous instrument. When a researcher controls for 'temperature,' they may inadvertently remove the EMF signal — because the two trends move together. The residual appears small, and the researcher concludes climate explains the decline. This is not a flaw in the researcher's analysis — it is a structural limitation of observational data.",
    attrBiasLink: "See the full proxy masking analysis on the Sentinel Species page",
    attrBiasNote:
      "This is not an accusation of negligence. It is a structural observation about how research funding, conceptual vocabulary, and temporal confounding combine to make a specific signal invisible. The test that would resolve it — Faraday-shielded replication — is concrete and feasible.",
  },
  fi: {
    title: "Näyttökokoelma",
    subtitle:
      "Tutkimuksia ja dataa, jotka tukevat ja haastavat BERM-mallia, järjestettynä biologisen reitin mukaan. Jokainen merkintä on arvioitu alla kuvatulla episteemisellä näyttöasteikolla.",
    epistemicTitle: "Episteeminen tasojärjestelmä",
    epistemicDesc:
      "Kaikki näyttö ei ole samanarvoista. Jokaiselle tutkimukselle on annettu episteeminen taso, joka heijastaa sen tarjoaman näytön vahvuutta ja tyyppiä. Tämä ei ole arvio tutkimuksen laadusta sinänsä, vaan siitä, millaista päättelyä tutkimus tukee. Yksittäinen RCT voi olla erinomaista tiedettä ja silti saada L*-arvion, jos sitä ei ole replikoitu.",
    year: "Vuosi",
    study: "Tutkimus",
    finding: "Löydös",
    level: "Taso",
    footNote:
      "Tämä kokoelma ylläpidetään osana BERM-mallin dokumentaatiota. Sisällyttäminen ei tarkoita hyväksyntää; tutkimukset on listattu osoittamaan, mihin kukin reitti nojaa ja missä aukot ovat. Jos tiedät tutkimuksen, joka tulisi lisätä, tai uskot arvion olevan virheellinen, osallistuminen on tervetullutta projektin repositoryn kautta.",
    neTitle: "Luonnolliset kokeet",
    neSubtitle: "Todellisia tilanteita, joissa EMF-altistus muuttui akillisesti, tarjoten kvasikokeellisia testeja BERM-mallille. Tulokset raportoidaan lapinakyvasti, mukaan lukien tapaukset jotka ovat ristiriidassa mallin kanssa.",
    neIntervention: "Mika muuttui",
    neObserved: "Mita havaittiin",
    nePrediction: "BERM-ennuste",
    neVerdict: "Tuomio",
    verdictConsistent: "BERM-yhdenmukainen",
    verdictInconsistent: "BERM-vastainen",
    verdictInconclusive: "Ratkaisematon",
    neNote: "Episteeminen huomautus: 4/7 tapauksesta on yhdenmukaisia BERM-ennusteiden kanssa, 1 on ristiriidassa ja 2 on ratkaisemattomia sekoittumisen vuoksi. Tama ei ole vahvaa nayttoa — hedelmallisyyden luonnolliset kokeet ovat vaistamatta sekoittuneita kehityksen, kulttuurin ja talouden kanssa. Ne raportoidaan taydellisyyden vuoksi, ei todisteena.",

    /* CSLI lag invariance section */
    csliInvTitle: "Lajien välinen viive-invarianssi",
    csliInvDesc: "Jos EMF ohjaa biologista vähenemää jaetun VGCC-mekanismin kautta, viiveen EMF-altistuksen ja havaitun vaikutuksen välillä tulisi olla johdonmukainen maiden välillä kullekin lajille — ja skaalautua biologisen sukupolviajan mukaan lajien välillä. Alla oleva taulukko näyttää viive-estimaattien variaatiokertoimen (CV) maiden välillä. CV < 0,3 = vahva invarianssi, 0,3–0,5 = kohtalainen, > 0,5 = heikko.",
    csliInvResult: "Tulos: Kaikki lajit osoittavat heikkoa invarianssia (CV > 0,5). Viive vaihtelee suuresti maiden välillä, mikä on ristiriidassa universaalin, kiinteällä biologisella aikaskaalalla toimivan mekanismin kanssa. Tämä on negatiivinen tulos CSLI-hypoteesille.",
    csliInvNote: "Huomautus: Heikko invarianssi ei kumoa EMF-vaikutuksia yksittäisiin lajeihin — se tarkoittaa, että lajien välinen viivekuvio ei ole riittävän johdonmukainen toimiakseen itsenäisenä näyttönä jaetusta mekanismista. Maatason sekoittajat (kehitys, kemikaalit, ilmasto) lisäävät kohinaa, jota tämä testi ei voi erottaa signaalista.",
    csliInvSpecies: "Laji",
    csliInvCountries: "Maita",
    csliInvMuLag: "Keskiviive (v)",
    csliInvSigma: "σ (v)",
    csliInvCV: "CV",
    csliInvAssessment: "Arvio",
    csliInvLink: "Katso koko CSLI-analyysi Indikaattorilajit-sivulla",

    /* Individual susceptibility section */
    indSuscTitle: "Yksilölliset erot: Miksi EMF vaikuttaa joihinkin enemmän kuin toisiin",
    indSuscDesc:
      "BERM ennustaa, että EMF-vaikutukset vaihtelevat yksilöiden välillä kolmen tekijän perusteella: geneettinen vaihtelu jänniteohjattujen kalsiumkanavien ilmentymisessä, anatomiset erot kudosgeometriassa jotka luovat erilaisia sisäisiä kenttäkuvioita, ja kumulatiivinen altistushistoria joka määrittää allostaattisen sopeutumisen vaiheen. Tämä ennuste selittää kaksi näennäistä ristiriitaa: miksi jotkut ihmiset raportoivat sähköyliherkkyyden kun useimmat eivät, ja miksi provokaatiotutkimukset jotka mittaavat subjektiivista havaintoa tuottavat tyypillisesti nollatuloksia kun objektiivisia biomarkkereita mittaavat tutkimukset löytävät merkitseviä vaikutuksia osaryhmissä.",
    indSuscGenTitle: "Geneettinen: VGCC-polymorfismit",
    indSuscGen:
      "CACNA1C rs1006737 -riskialleeli lisää L-tyypin VGCC:n ilmentymistä, tuottaen suuremman Ca²⁺-vasteen samaan EMF-kenttään. Tämä on sama mekanismi joka altistaa bipolaariselle häiriölle, skitsofrenialle ja masennukselle — kaikki kalsiumsignaloinnin häiriöitä. Vuoden 2024 medrxiv-tutkimus on ensimmäinen EMF-tutkimus joka genotyypittää VGCC-variantit, vahvistaen 'striking inter-individual differences in how volunteers respond to acute EMF exposure.' GSTM1/GSTT1-nollagenotyypit heikentävät oksidatiivisen stressin puolustusta.",
    indSuscAnatTitle: "Anatominen: sisäiset interferenssikuviot",
    indSuscAnat:
      "RF-aallot heijastuvat kudosrajoilta (iho/rasva, rasva/lihas, luu/CSF, CSF/aivot) luoden seisovia aaltokuvioita jotka ovat anatomisesti yksilöllisiä. Ohut kallo, vähäinen rasvakerros, korkea kudosten vesipitoisuus = korkeampi sisäinen kenttä kriittisissä kudoksissa. Gandhi 1996: SAR-jakauma päässä vaihtelee kallon geometrian funktiona. Lapset absorboivat 2–3× aikuisten SAR:n samasta ulkoisesta kentästä (ohuempi kallo, korkeampi kudosvesipitoisuus).",
    indSuscCumTitle: "Kumulatiivinen: allostaattinen kuormitus",
    indSuscCum:
      "Pitkäaikainen ammatillinen altistus (telecom-työntekijät, sähköasentajat) nostaa allostaattista kuormitusta Selye-dynamiikan mukaisesti. Kun kompensaatiokapasiteetti (vaihe 2, resistanssi) loppuu, siirrytään dekompensaatioon (vaihe 3, uupumus) — oireet ilmaantuvat näennäisesti äkillisesti vaikka altistus on ollut kroonista. Tämä selittää miksi EHS tyypillisesti alkaa aikuisiässä kumulatiivisen altistuksen jälkeen, ei lapsuudessa.",
    indSuscProvTitle: "Provokaatiotutkimusten uudelleentulkinta",
    indSuscProv:
      "Provokaatiokokeiden nollatulokset EIVÄT kumoa BERM:ää koska: (1) ne mittaavat subjektiivista havaintoa ('tunnetko kentän?'), eivät objektiivisia biomarkkereita — VGCC-aktivaatio tapahtuu tiedostamattomasti; (2) ne eivät genotyypitä CACNA1C:tä — keskiarvo peittää osaväestön vasteen; (3) ne eivät kontrolloi anatomisia eroja; (4) ne eivät kontrolloi kumulatiivista altistushistoriaa (Selye-vaihe); (5) kontrolliryhmä EI ole EMF-vapaa (laboratorion perustason harha).",
    indSuscBioTitle: "Objektiiviset biomarkkerit",
    indSuscBio:
      "Belpomme 2015/2022 (N≈1000 EHS-potilasta): histaminemia↑ 40%, nitrotyrosiini↑ 28% (ONOO⁻/BBB-merkkiaine), S100B↑ 15% (BBB-avautuminen), O-myeliini-autovasta-aineet 23%, Hsp27/70↑ 33%, virtsan melatoniini/kreatiniini↓ kaikissa tapauksissa. Nämä markkerit ovat yhdenmukaisia VGCC→Ca²⁺→ROS→BBB -reitin kanssa. PMC 10226401 (2023): HRV-muutokset TERVEILLÄ vapaaehtoisilla Wi-Fi-altistuksessa — HF-HRV laski (p=0,036), sympaattinen 0V% nousi (p=0,002).",
    indSuscNote:
      "Rajoitus: Belpomme-biomarkkerit ovat koholla vain osajoukoissa (15–40%), eikä ole osoitettu, että SAMOILLA potilailla KAIKKI markkerit olisivat koholla samanaikaisesti (PMC12314686, 2025). Selye-vaiheen kvantifiointi (vuodet × intensiteetti) on heuristinen yksinkertaistus, ei validoitu ennuste. Tämä osio esittää mekanistista uskottavuutta, ei todistetta.",

    attrBiasTitle: "Attribuutiovinouma vahenemätutkimuksessa",
    attrBiasDesc:
      "EMF on rakenteellisesti näkymätön useimmissa ekologisissa ja lisääntymistutkimuksissa — ei siksi, että se testattiin ja hylättiin, vaan siksi, ettei sitä koskaan harkittu. Tämä osio dokumentoi, miten perinteiset attribuutiot (ilmastonmuutos, kemikaalit, elinympäristön menetys) muodostuvat oletusselityksiksi vähenemille, joilla voi olla sähkömagneettinen komponentti.",
    attrBiasP1Title: "Attribuutiovinouma",
    attrBiasP1:
      "Kun vähenemä havaitaan, tutkijat etsivät selityksiä tuttujen tekijöiden joukosta. Ilmastonmuutos on hyvin rahoitettu ja poliittisesti tuettu. Kemikaalipäästöt ovat säädeltyjä ja mitattavia. EMF on useimmille biologeille vieras, useimpien rahoituslaitosten rahoittama ja televiestintäteollisuuden aktiivisesti lobbaama. Vuoden 2024 analyysi 92 mahdollisesta hyönteisvähenemän ajurista Saksassa ei sisältänyt sähkömagneettisia kenttiä kandidaattien joukossa — ei siksi, että EMF testattiin ja hylättiin, vaan siksi, ettei sitä koskaan harkittu.",
    attrBiasP2Title: "Näytön epäsymmetria",
    attrBiasP2:
      "On satoja tutkimuksia ilmastonmuutoksesta ja hyönteisten vähenemästä. EMF:stä ja hyönteisten vähenemästä on alle kaksikymmentä. Tämä epäsuhta ei heijasta kahden tekijän suhteellista merkitystä — se heijastaa tutkimusrahoituksen rakennetta. Näytön määrä hypoteesille seuraa rahoituksen määrää, ei kausaalisen suhteen vahvuutta.",
    attrBiasP3Title: "Kausaalinen peittäminen",
    attrBiasP3:
      "Ilmastonmuutos ja EMF-infrastruktuuri ovat ajallisesti korreloituneet: molemmat kasvoivat 1970–2024. OLS-regressio ei voi erottaa niitä ilman eksogeenista instrumenttia. Kun tutkija kontrolloi 'lämpötilaa', hän saattaa vahingossa poistaa EMF-signaalin — koska kaksi trendiä liikkuvat yhdessä. Residuaali näyttää pieneltä, ja tutkija päättelee, että ilmasto selittää vähenemän. Tämä ei ole tutkijan analyysin virhe — se on havainnointidatan rakenteellinen rajoitus.",
    attrBiasLink: "Katso koko proxy masking -analyysi Indikaattorilajit-sivulla",
    attrBiasNote:
      "Tämä ei ole syytös huolimattomuudesta. Se on rakenteellinen havainto siitä, miten tutkimusrahoitus, käsitteellinen sanasto ja ajallinen sekoittuminen yhdistyvät tehden tietyn signaalin näkymättömäksi. Testi, joka ratkaisisi asian — Faraday-suojattu replikaatio — on konkreettinen ja toteutettavissa.",
  },
} as const;

const epistemicLabelsFi: Record<
  EpistemicLevel,
  { label: string; description: string }
> = {
  E: {
    label: "Vakiintunut",
    description: "Sateenvarjokatsaus tai useat riippumattomat RCT:t vahvistavat",
  },
  "M|C": {
    label: "Mekanistinen + korrelaatio",
    description:
      "Selkeä mekanismi + epidemiologinen korrelaatio, ei ihmis-RCT:tä",
  },
  M: {
    label: "Vain mekanistinen",
    description: "In vitro/eläinmekanismi, rajallinen ihmisdata",
  },
  C: {
    label: "Vain korrelaatio",
    description: "Epidemiologinen yhteys, mekanismi epäselvä",
  },
  "L*": {
    label: "Kirjallisuus (rajattu)",
    description: "Yksittäinen tutkimus tai pieni otos, vaatii replikaation",
  },
  L: {
    label: "Kirjallisuus (rajaamaton)",
    description: "Viitattu mutta ei itsenäisesti varmennettu",
  },
};

const pathwaysFi: Record<string, { label: string; description: string }> = {
  A: {
    label: "VGIC → Ca²⁺ → ROS → Siittiövaurio",
    description:
      "EMF aktivoi jänniteohjattuja ionikanavia, nostaen solunsisäistä kalsiumia, mikä laukaisee reaktiivisten happilajien tuotannon. ROS vaurioittaa siittiöiden DNA:ta ja vähentää liikkuvuutta ja pitoisuutta.",
  },
  B: {
    label: "RPM → CRY → Vuorokausirytmin häiriö",
    description:
      "Kryptokromiproteiinien radikaalipari-mekanismi (RPM) on herkkä Maan magneettikenttävoimakkuuksille. Ritz ym. (2004) osoittivat RF-häiriön lintujen magneettikompassissa; Engels ym. (2014) osoittivat ympäristön antropogeenisen EMF:n riittävän häiritsemään sitä. FAD-superoksidi-radikaalipari on nyt tunnistettu sensoriksi (Nature Comms 2024), ja RPM:n ei-monotoniset ennusteet on vahvistettu planaariamatoissa (PNAS Nexus 2026). CRY:n häiriö muuttaa vuorokausirytmin signalointia, melatoniinin eritystä ja GnRH/HPG-lisääntymishormonirytmejä. RPM on teoreettisesti johdettavissa Lindgrenin geometriasta (87,5 % Hamiltoniaanin elementeistä), tehden siitä täydellisimmän sillan fysiikasta biologiaan BERM:ssä.",
  },
  C: {
    label: "Veri-aivoesteen häiriö",
    description:
      "Radiotaajuusaltistus voi lisätä veri-aivoesteen läpäisevyyttä, mahdollistaen neurotoksisten yhdisteiden pääsyn HPG-akselia sääteleviin aivoalueisiin.",
  },
  D: {
    label: "HPA → HPG ristiin-inhibitio",
    description:
      "Krooninen EMF-altistus voi nostaa kortisolia HPA-akselin aktivoinnin kautta, mikä ristiin-inhiboi hypotalamus-aivolisäke-gonadakselia, vähentäen testosteronia ja heikentäen spermatogeneesiä.",
  },
  E: {
    label: "Mikrobiomi",
    description:
      "EMF-altistus voi muuttaa suoliston ja siemennesteen mikrobiomin koostumusta, vaikuttaen lisääntymishormonien aineenvaihduntaan ja siittiöiden laatuun.",
  },
  F: {
    label: "Sempou-reitti (VGCC → mTOR → hedelmällisyys/ikääntyminen)",
    description:
      "Kalvopotentiaali säätelee spermatogonioiden erilaistumista VGCC → Ca²⁺ → mTOR -signaloinnin kautta. EMF:n aiheuttama Vmem-häiriö rikkoo tämän reitin, yhdistäen lisääntymisen heikkenemisen ikääntymiseen jaetun mTOR-yliaktivaation kautta.",
  },
  T_BE: {
    label: "Biosähköinen koodi",
    description:
      "Endogeeniset biosähköiset signaalit ohjaavat morfogeneesiä ja solujen koordinaatiota. Eksogeeninen EMF voi häiritä näitä biosähköisiä kuvioita, vaikka tämä reitti on vähiten vakiintunut.",
  },
  PV: {
    label: "Farmakologinen validointi",
    description:
      "Tunnetut lääkkeet, jotka kohdistuvat spesifeihin BERM-reitin komponentteihin, tarjoavat riippumattomia kalibrointiankkureita. Jos EMF vaikuttaa VGCC:n, mTOR:n tai HPA:n kautta, samoja mekanismeja kohdentavien lääkkeiden tulisi tuottaa kvantitatiivisesti yhdenmukaisia vaikutuksia.",
  },
  NE: {
    label: "Luonnolliset kokeet",
    description:
      "Maat, joissa mobiiliteknologian käyttöönotto muuttui äkillisesti, tarjoavat kvasikokeellisia testejä. Jos EMF ohjaa TFR:n laskua, äkillisen käyttöönoton tulisi kiihdyttää laskua. Tulokset ovat ristiriitaisia: 1/3 BERM-yhdenmukaisia, raportoitu avoimesti.",
  },
  TG: {
    label: "Teknologiasukupolven askeleet",
    description:
      "Jos EMF-altistus ohjaa hedelmällisyyden laskua, siirtymän 2G:stä (tukiasemat) 3G:n (mobiilidata) kautta 4G/älypuhelimiin (henkilökohtainen RF-piikki) tulisi tuottaa monotonisesti kasvavia TFR-laskuasteita. Tulokset tukevat osittain: 6/8 maassa 4G-aikakauden kiihtyminen 2G:hen nähden, mutta vain 3/8 näyttää tiukan monotonisen kasvun.",
  },
  CA: {
    label: "Kalibrointiankkurit",
    description:
      "Riippumattomat empiiriset mittaukset Travisonilta (testosteronin lasku), Leproultilta (uni-testosteronireitti), Volkowilta (akuutti hermovaste) ja Beckeriltä (biosähköisten kenttien suhteet) tarkistavat tuottavatko BERM:n sisäiset parametrit fysiologisesti yhdenmukaisia suuruusluokkia.",
  },
  NR: {
    label: "Negatiiviset tulokset ja vastanäyttö",
    description:
      "Tutkimuksia ja havaintoja, jotka ovat ristiriidassa BERM:n ennusteiden kanssa, joita malli ei pysty selittämään tai jotka rajoittavat kausaaliväitteiden vahvuutta. Tieteellinen rehellisyys vaatii sen dokumentointia, mikä epäonnistuu, ei vain sen mikä sopii.",
  },
  LB: {
    label: "Laboratorion perustason harha",
    description:
      "Kasvava tausta-EMF laboratorioissa kontaminoi kontrolliryhmät, puristaen havaittuja vaikutuskokoja kohti nollaa. Jos χ(Ā) ohjaa biologista herkkyyttä ja laboratorion EMF on noussut ~0,1 V/m:stä (1950-luku) ~15 V/m:iin (2020-luku), kontrollit ovat jo χ ≈ 1,0 — tehden EMF-herkistä vaikutuksista lähes havaitsemattomia. Tämä ennustaa biologisen replikaatiokriisin BERM:n rakenteellisena seurauksena.",
  },
  RW: {
    label: "Palautumisikkunan eliminaatio",
    description:
      "DNA-korjauksen (BER-reitti) puoliintumisaika on ~6 tuntia. Kun EMF-vapaa palautumisjakso jää alle 2× puoliintumisajan (< 12 tuntia), korjaus ei ehdi valmistua ja oksidatiivinen vaurio kumuloituu. Moderni 24/7-altistus (22h EMF, 2h vapaa) sallii vain ~21 % korjauksen päivässä verrattuna ~90 %:iin 1950-luvulla (4h EMF, 20h vapaa). Tämä selittää miksi kumulatiivinen altistus on oikea metriikka: ratkaisevaa ei ole annos sinänsä vaan vaurionopeuden suhde korjauskapasiteettiin. REFLEX-konsortio (Diem 2005) havaitsi, että katkonainen altistus tuottaa ENEMMÄN DNA-vaurioita kuin jatkuva — yhdenmukainen VGCC-portin asymmetrian kanssa, jossa jokainen off→on-siirtymä synnyttää steady-state-tason ylittävän Ca²⁺-piikin.",
  },
  BS: {
    label: "Nelinkertainen behavioraalinen suppressio",
    description:
      "Hedelmällisyyden lasku toimii neljän multiplikatiivisen hormonaalisen kanavan kautta: testosteronin lasku vähentää miehen lähestymiskäyttäytymistä (Puts 2008), populaatiotason maskuliinisen fenotyypin heikkeneminen vähentää naisten attraktiorespon aktivoitumista (Thornhill 1994), oksitosiinin ja testosteronin lasku pariskunnilla vähentää seksuaalista aktiivisuutta (Carter 2021), ja siittiöiden laatu heikentää hedelmöitystodennäköisyyttä (Levine 2023). Dual-hormone -hypoteesi (Mehta 2015) lisää yhdistävän mekanismin: testosteronin käyttäytymisvaikutukset vaativat matalan kortisolin, mutta EMF nostaa kortisolia kroonisesti. Jos jokainen kanava laskee 20%, yhteisvaikutus on 0,8⁴ = 0,41, eli 59% lasku. Tämä selittää miksi pronatalististet taloudelliset ohjelmat epäonnistuvat järjestelmällisesti — ne kohdistuvat tietoiseen valintaan, mutta suppressio toimii tiedostamattoman hormonaalisen motivaation tasolla.",
  },
  IS: {
    label: "Yksilöllinen herkkyys",
    description:
      "EMF-herkkyys vaihtelee yksilöiden välillä VGCC-polymorfismien (CACNA1C rs1006737), anatomisten erojen (kallon paksuus, rasvakerros, vesipitoisuus) ja kumulatiivisen allostaattisen kuormituksen (Selye-vaihe) vuoksi. Tämä selittää EHS-prevalenssin (~3–10 %), provokaatiotutkimusten nollatulokset ja objektiiviset biomarkkerilöydökset (Belpomme 2015/2022).",
  },
  GME: {
    label: "RF-protokolla-ajoitus ja biologiset ikkunat",
    description:
      "Odottamaton konvergenssi: 3GPP:n eDRX-virransäästöprotokolla määrittelee periodisia RF-pulssi-rakenteita, joiden harmoniset osuvat samalle 20–40 mHz:n taajuusalueelle, jossa Zandieh ym. (2025) havaitsivat taajuusspesifisiä mitokondriaali- ja ROS-vasteita. Protokolla-ajoitukset standardoitiin verkkoteknisiin tarkoituksiin; biologinen ikkuna tunnistettiin solufysiologian kokeista. Kumpikaan ala ei tiennyt toisesta. Onko tämä konvergenssi kausaalista vai sattumanvaraista, on R43-kokeen aihe.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locale === "fi"
    ? {
        title: "Näyttö - Extinction Field",
        description:
          "Koottu näyttö BERM-mallia tukevista ja haastavista tutkimuksista, järjestettynä reitin mukaan episteemisillä arvioilla.",
      }
    : {
        title: "Evidence - Extinction Field",
        description:
          "Compiled evidence supporting and challenging the BERM model, organized by pathway with epistemic ratings.",
      };
}

function EpistemicBadge({
  level,
  locale,
}: {
  level: EpistemicLevel;
  locale: string;
}) {
  const info = EPISTEMIC_LEVELS[level];
  const fiInfo = locale === "fi" ? epistemicLabelsFi[level] : null;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
      style={{
        backgroundColor: `${info.color}18`,
        color: info.color,
        border: `1px solid ${info.color}40`,
      }}
      title={fiInfo?.description ?? info.description}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: info.color }}
      />
      {fiInfo?.label ?? info.label}
    </span>
  );
}

export default async function EvidencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;
  const pathwayKeys = Object.keys(PATHWAYS);

  const getPathway = (key: string) => {
    if (locale === "fi" && pathwaysFi[key]) return pathwaysFi[key];
    return PATHWAYS[key];
  };

  const getEpistemicLevels = () => {
    if (locale === "fi") {
      return Object.entries(EPISTEMIC_LEVELS).map(([key, info]) => ({
        key: key as EpistemicLevel,
        label: epistemicLabelsFi[key as EpistemicLevel]?.label ?? info.label,
        description:
          epistemicLabelsFi[key as EpistemicLevel]?.description ??
          info.description,
        color: info.color,
      }));
    }
    return Object.entries(EPISTEMIC_LEVELS).map(([key, info]) => ({
      key: key as EpistemicLevel,
      label: info.label,
      description: info.description,
      color: info.color,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PageHeader icon={Layers} title={d.title} subtitle={d.subtitle} />

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">{d.epistemicTitle}</h2>
        <p className="text-sm text-foreground-muted mb-6 max-w-3xl leading-relaxed">
          {d.epistemicDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {getEpistemicLevels().map((info) => (
            <div
              key={info.key}
              className="border border-card-border bg-card-bg rounded-lg p-4 flex items-start gap-3"
            >
              <span
                className="mt-0.5 w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: info.color }}
              />
              <div>
                <p className="text-sm font-medium">
                  {info.key} &mdash; {info.label}
                </p>
                <p className="text-xs text-foreground-muted mt-1">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {pathwayKeys.map((pKey) => {
        const pathway = getPathway(pKey);
        const items = EVIDENCE.filter((e) => e.pathway === pKey);
        if (items.length === 0) return null;

        return (
          <section key={pKey} className="mb-14">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-1">
                {pKey === "PV" ||
                pKey === "NE" ||
                pKey === "TG" ||
                pKey === "CA" ||
                pKey === "NR" ||
                pKey === "LB" ||
                pKey === "RW" ||
                pKey === "BS" ||
                pKey === "IS" ||
                pKey === "OT" ||
                pKey === "T_BE" ||
                pKey === "GME"
                  ? ""
                  : `${locale === "fi" ? "Reitti" : "Pathway"} ${pKey}: `}
                {pathway.label}
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
                {pathway.description}
              </p>
              {pKey === "LB" && (
                <p className="text-sm mt-2">
                  <a
                    href={`/${locale}/replication`}
                    className="text-blue-500 hover:underline"
                  >
                    {locale === "fi"
                      ? "BERM ennustaa lisäseurauksen: laboratorion replikaatiokriisin itsessään."
                      : "BERM predicts a further consequence: the laboratory replication crisis itself."}
                  </a>
                  {" →"}
                </p>
              )}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-foreground-muted">
                    <th className="py-2 pr-4 font-medium">{d.year}</th>
                    <th className="py-2 pr-4 font-medium">{d.study}</th>
                    <th className="py-2 pr-4 font-medium">{d.finding}</th>
                    <th className="py-2 pr-4 font-medium">{d.level}</th>
                    <th className="py-2 font-medium text-right">n</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-card-border last:border-0"
                    >
                      <td className="py-3 pr-4 font-mono-num whitespace-nowrap align-top">
                        {item.year}
                      </td>
                      <td className="py-3 pr-4 align-top max-w-[220px]">
                        {item.study}
                      </td>
                      <td className="py-3 pr-4 text-foreground-muted align-top">
                        {item.finding}
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <EpistemicBadge level={item.level} locale={locale} />
                      </td>
                      <td className="py-3 text-right font-mono-num align-top text-foreground-muted">
                        {item.n ? item.n.toLocaleString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="border border-card-border bg-card-bg rounded-lg p-4"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono-num text-sm">{item.year}</span>
                    <EpistemicBadge level={item.level} locale={locale} />
                  </div>
                  <p className="text-sm font-medium mb-1">{item.study}</p>
                  <p className="text-sm text-foreground-muted">
                    {item.finding}
                  </p>
                  {item.n && (
                    <p className="text-xs text-foreground-muted mt-2 font-mono-num">
                      n = {item.n.toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section id="natural-experiments" className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{d.neTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
            {d.neSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(locale === "fi" ? NATURAL_EXPERIMENTS.fi : NATURAL_EXPERIMENTS.en).map((exp) => {
            const verdictColor =
              exp.verdict === "consistent"
                ? "var(--status-confirmed)"
                : exp.verdict === "inconsistent"
                  ? "var(--status-refuted)"
                  : "var(--status-partial)";
            const verdictLabel =
              exp.verdict === "consistent"
                ? d.verdictConsistent
                : exp.verdict === "inconsistent"
                  ? d.verdictInconsistent
                  : d.verdictInconclusive;
            const levelInfo = EPISTEMIC_LEVELS[exp.epistemicLevel];
            return (
              <div
                key={exp.id}
                className="border border-card-border bg-card-bg rounded-lg p-5 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-semibold">{exp.location}</h3>
                    <p className="text-xs text-foreground-muted font-mono-num">{exp.period}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
                      style={{
                        backgroundColor: `${levelInfo.color}18`,
                        color: levelInfo.color,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: levelInfo.color }}
                      />
                      {exp.epistemicLevel}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: `${verdictColor}18`,
                        color: verdictColor,
                      }}
                    >
                      {verdictLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-sm flex-1">
                  <div>
                    <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-0.5">
                      {d.neIntervention}
                    </p>
                    <p className="text-foreground-muted leading-relaxed">{exp.intervention}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-0.5">
                      {d.neObserved}
                    </p>
                    <p className="text-foreground-muted leading-relaxed">{exp.observed}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-0.5">
                      {d.nePrediction}
                    </p>
                    <p className="text-foreground-muted leading-relaxed">{exp.bermPrediction}</p>
                  </div>
                </div>

                <p className="text-xs text-foreground-muted mt-3 pt-3 border-t border-card-border">
                  {exp.reference}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-background border border-border max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">
            {d.neNote}
          </p>
        </div>
      </section>

      <section id="attribution-bias" className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{d.attrBiasTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
            {d.attrBiasDesc}
          </p>
        </div>

        <div className="space-y-6 max-w-3xl">
          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.attrBiasP1Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.attrBiasP1}
            </p>
          </div>

          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.attrBiasP2Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.attrBiasP2}
            </p>
          </div>

          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.attrBiasP3Title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.attrBiasP3}
            </p>
          </div>
        </div>

        <p className="text-sm mt-4">
          <a
            href={`/${locale}/sentinel#proxy-masking`}
            className="text-accent hover:underline"
          >
            {d.attrBiasLink}
          </a>
          {" →"}
        </p>

        <div className="mt-4 p-4 rounded-lg bg-background border border-border max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">
            {d.attrBiasNote}
          </p>
        </div>
      </section>

      <section id="individual-susceptibility" className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{d.indSuscTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
            {d.indSuscDesc}
          </p>
        </div>

        <div className="space-y-5 max-w-3xl">
          <div className="border border-accent/40 bg-accent/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
              {d.indSuscBioTitle}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.indSuscBio}
            </p>
          </div>

          <div className="border border-card-border bg-card-bg rounded-lg p-5">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
              {d.indSuscGenTitle}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.indSuscGen}
            </p>
          </div>

          <div className="border border-card-border bg-card-bg rounded-lg p-5">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
              {d.indSuscAnatTitle}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.indSuscAnat}
            </p>
          </div>

          <div className="border border-card-border bg-card-bg rounded-lg p-5">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
              {d.indSuscCumTitle}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.indSuscCum}
            </p>
          </div>

          <div className="border border-status-partial/40 bg-status-partial/5 rounded-lg p-5">
            <h3 className="text-xs font-semibold text-status-partial uppercase tracking-wide mb-2">
              {d.indSuscProvTitle}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {d.indSuscProv}
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-background border border-border max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">
            {d.indSuscNote}
          </p>
        </div>
      </section>

      <section id="csli-invariance" className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{d.csliInvTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-3xl">
            {d.csliInvDesc}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="py-2 pr-4 font-medium">{d.csliInvSpecies}</th>
                <th className="py-2 pr-4 font-medium text-right">{d.csliInvCountries}</th>
                <th className="py-2 pr-4 font-medium text-right">{d.csliInvMuLag}</th>
                <th className="py-2 pr-4 font-medium text-right">{d.csliInvSigma}</th>
                <th className="py-2 pr-4 font-medium text-right">{d.csliInvCV}</th>
                <th className="py-2 font-medium">{d.csliInvAssessment}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { species: locale === "fi" ? "Mehiläiset" : "Bees", n: 29, mu: 4.31, sigma: 2.98, cv: 0.692, assessment: locale === "fi" ? "Heikko (CV > 0,5)" : "Weak (CV > 0.5)" },
                { species: locale === "fi" ? "Linnut" : "Birds", n: 11, mu: 1.0, sigma: 2.04, cv: 2.045, assessment: locale === "fi" ? "Heikko (CV > 0,5)" : "Weak (CV > 0.5)" },
                { species: locale === "fi" ? "Siittiöt" : "Human sperm", n: 3, mu: 0.33, sigma: 0.47, cv: 1.414, assessment: locale === "fi" ? "Heikko (CV > 0,5)" : "Weak (CV > 0.5)" },
              ].map((row) => (
                <tr key={row.species} className="border-b border-card-border last:border-0">
                  <td className="py-3 pr-4 font-medium">{row.species}</td>
                  <td className="py-3 pr-4 text-right font-mono-num">{row.n}</td>
                  <td className="py-3 pr-4 text-right font-mono-num">{row.mu.toFixed(1)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num">{row.sigma.toFixed(1)}</td>
                  <td className="py-3 pr-4 text-right font-mono-num text-status-refuted">{row.cv.toFixed(3)}</td>
                  <td className="py-3 text-xs text-foreground-muted">{row.assessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 rounded-lg border border-status-refuted/30 bg-status-refuted/5 max-w-3xl">
          <p className="text-sm text-foreground-muted leading-relaxed">
            {d.csliInvResult}
          </p>
        </div>

        <p className="text-sm mt-4">
          <a
            href={`/${locale}/sentinel#csli`}
            className="text-accent hover:underline"
          >
            {d.csliInvLink}
          </a>
          {" →"}
        </p>

        <div className="mt-4 p-4 rounded-lg bg-background border border-border max-w-3xl">
          <p className="text-xs text-foreground-muted leading-relaxed">
            {d.csliInvNote}
          </p>
        </div>
      </section>

      <BehavioralSuppression locale={locale} />

      <HindcastValidation locale={locale} />

      <StatisticalValidation locale={locale} />

      <section className="border-t border-border pt-8 mt-8">
        <p className="text-xs text-foreground-muted leading-relaxed max-w-3xl">
          {d.footNote}
        </p>
      </section>
    </div>
  );
}
