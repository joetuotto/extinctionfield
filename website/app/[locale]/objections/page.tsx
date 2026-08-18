import type { Metadata } from "next";
import Link from "next/link";

interface Objection {
  id: string;
  claim: string;
  paragraphs: string[];
  evidenceLinks: { label: string; href: string }[];
  uncertaintyText: string;
}

interface Dict {
  metaTitle: string;
  metaDesc: string;
  title: string;
  subtitle: string;
  clickToExpand: string;
  uncertainty: string;
  evidence: string;
  objections: Objection[];
}

const t: { en: Dict; fi: Dict } = {
  en: {
    metaTitle: "Objections - Extinction Field",
    metaDesc:
      "Common objections to the BERM model addressed with evidence, acknowledged uncertainties, and links to supporting data.",
    title: "Common Objections",
    subtitle:
      "Every strong claim invites strong skepticism. Below are the objections we hear most often, addressed honestly — including what we cannot yet answer.",
    clickToExpand: "Click to expand",
    uncertainty: "Acknowledged uncertainty",
    evidence: "Evidence",
    objections: [
      {
        id: "cultural",
        claim: "Fertility decline is cultural — education, urbanization, contraception.",
        paragraphs: [
          "This is the standard explanation and it is partly correct. Education, urbanization, and contraception access do suppress fertility. BERM does not deny this — the model's Level 3 (\"true culture\") explicitly incorporates voluntary fertility choices.",
          "But the cultural explanation cannot account for three observations: (1) Dogs, horses, and insects are also experiencing reproductive decline — they don't attend university or use contraception. (2) Sperm concentration dropped 62% in 50 years across all regions, including populations with stable education levels. (3) 49 countries are now below the \"TFR floor\" of 1.4 that demography considered impossible under purely volitional models.",
          "BERM proposes that cultural factors operate on top of a biological substrate that is itself declining. The sentinel species evidence is the strongest argument: identical VGCC-mediated reproductive effects across phyla that share no social or cultural factors.",
        ],
        evidenceLinks: [
          { label: "Sentinel species evidence", href: "/sentinel" },
          { label: "Cross-species convergence table", href: "/sentinel#convergence" },
          { label: "Explorer — country-level data", href: "/explorer" },
        ],
        uncertaintyText:
          "Cultural factors clearly matter. BERM cannot yet quantify the exact partition between biological and cultural contributions for any given country. The model's Level 3 is calibrated, not derived from first principles.",
      },
      {
        id: "correlation",
        claim: "Correlation is not causation.",
        paragraphs: [
          "Correct. No single study proves EMF causes fertility decline. BERM does not rest on any single study. Instead, it uses six identification strategies that collectively narrow the space of alternative explanations:",
          "1. Proxy elimination: sentinel species remove human confounders. 2. Natural experiments: Amish/Hutterite communities, Israeli Shabbat observance, COVID lockdown sperm recovery. 3. Pharmacological validation: drugs targeting the same pathways (VGCC blockers, mTOR inhibitors) produce quantitatively consistent effects. 4. Dose-response: Norwegian naval cohort (N=10,497) shows OR 1.86 with dose-response gradient. 5. Cross-species evidence: VGCC conservation >70% across all eukaryotes, same reproductive effects in insects, amphibians, birds, bats, and lab mammals. 6. Mechanistic chain: Lindgren geometry → χ(Ā) selection → VGCC activation → Ca²⁺ → ROS → sperm damage, each step independently verified.",
          "No single strategy proves causation. Together, they eliminate most alternative explanations. The remaining alternatives (unknown ubiquitous toxin, coincidence across 7 phyla) are less parsimonious than the EMF hypothesis.",
        ],
        evidenceLinks: [
          { label: "Evidence compilation (80+ studies)", href: "/evidence" },
          { label: "Pharmacological validation", href: "/mathematics#pharmacological" },
          { label: "Lindgren geometry derivation", href: "/mathematics#lindgren" },
        ],
        uncertaintyText:
          "Identification strategies narrow but do not eliminate confounding. A true RCT of population-level EMF reduction has never been conducted. BERM's causal claim remains a hypothesis supported by converging evidence, not a proven fact.",
      },
      {
        id: "replication",
        claim: "EMF research hasn't replicated.",
        paragraphs: [
          "This is partly true and partly a structural artifact. Panagopoulos et al. (2025) conducted an umbrella review of 39 systematic reviews covering thousands of individual studies. The majority report biological effects of non-ionizing EMF. The replication problem is real but not unique to EMF — it affects all of biomedical research.",
          "BERM offers a structural explanation for why EMF research specifically suffers replication failures: the control group is not EMF-free. Every laboratory operates inside the ambient electromagnetic environment. Control animals in 2020 are exposed to EMF levels that would have been the experimental condition in 1985. This is the Laboratory Baseline Bias — it systematically shrinks effect sizes over time as ambient EMF rises.",
          "The model predicts that a Faraday-shielded laboratory would show 684× larger effect ratios than a standard lab. This is a testable, falsifiable prediction.",
        ],
        evidenceLinks: [
          { label: "Laboratory Baseline Bias analysis", href: "/evidence#lab-baseline" },
          { label: "Replication crisis as BERM prediction", href: "/replication" },
        ],
        uncertaintyText:
          "The lab baseline bias hypothesis is mechanistically plausible but has not been experimentally tested. No Faraday-shielded replication study has been conducted. The 684× prediction is derived from the model, not from observation.",
      },
      {
        id: "levels",
        claim: "Radiation levels are too low to cause biological effects.",
        paragraphs: [
          "This objection assumes biological response is proportional to absolute field strength. Lindgren's framework shows this is incorrect. The biologically relevant response is χ(Ā) = Ā / √(1 + Ā²), where Ā is the normalized background field. This is a saturation function, not a linear one.",
          "At the cell membrane, the endogenous electric field is approximately 7 × 10⁶ V/m. In Lindgren's normalized units, this means χ ≈ 1.0 — the biological system is already near saturation. Small perturbations at this operating point produce measurable effects because the system is operating on the steep part of the response curve.",
          "The VGCC voltage sensor is sensitive to fields 100× below current safety limits. Salford et al. demonstrated blood-brain barrier permeability at SAR 0.016 W/kg — 100× below the FCC limit of 1.6 W/kg. Safety standards are based on thermal effects; BERM's mechanisms are non-thermal.",
        ],
        evidenceLinks: [
          { label: "χ(Ā) selection rule derivation", href: "/mathematics#chi" },
          { label: "Lindgren geometry", href: "/mathematics#lindgren" },
          { label: "Pathway A: VGCC mechanism", href: "/evidence" },
        ],
        uncertaintyText:
          "Lindgren's geometric framework is published but not yet widely replicated. The χ(Ā) function is a theoretical prediction. While VGCC sensitivity at sub-thermal levels is experimentally demonstrated, the full chain from geometry to population-level fertility has not been verified end-to-end in a single experiment.",
      },
      {
        id: "noticed",
        claim: "If this were real, someone would have noticed.",
        paragraphs: [
          "Someone did. Robert O. Becker documented bioelectric effects in the 1960s–70s and was systematically marginalized. His research funding was terminated after publishing findings on electromagnetic effects on bone healing and neural regeneration. W. Ross Adey and Allan Frey made similar discoveries (Frey auditory effect, 1961) and faced similar institutional resistance.",
          "The US Navy and CIA conducted classified EMF bioeffects research programs throughout the 1960s–80s. The results were not published in the open literature. When the telecommunications industry grew into a multi-trillion dollar sector, research funding shifted: industry-funded studies are 10× more likely to find no effect than independently funded studies (Huss et al. 2007, EHP).",
          "This is not a conspiracy theory — it is a documented pattern of institutional incentives. The tobacco industry followed the same playbook for decades. The absence of mainstream recognition is not evidence of absence; it is evidence of the structure of research funding.",
        ],
        evidenceLinks: [
          { label: "About the BERM project", href: "/about" },
        ],
        uncertaintyText:
          "Historical marginalization of researchers does not prove their claims were correct. Becker's bioelectric work on bone healing was eventually validated, but his broader EMF claims remain controversial. The funding bias is documented but its magnitude is debated.",
      },
      {
        id: "overfitting",
        claim: "The model is too good — R² = 0.9999 is overfitting.",
        paragraphs: [
          "This is a legitimate concern, and we agree. R² = 0.9999 on the cross-section IS calibration, NOT validation. The model is calibrated to match 2024 observed TFR for each country by construction. This site says so on every page (footer disclaimer K8).",
          "The meaningful test statistics are different: LOOCV RMSE = 1.146 (leave-one-country-out cross-validation), and 86% of randomly generated placebo series fit the current data better than the model (K8). These are not impressive numbers. We report them because intellectual honesty requires it.",
          "The model's value is not in fitting the past but in predicting the future. Seven locked predictions with timestamps, confidence intervals, and explicit refutation conditions are published on the Predictions page. If observed values fall outside the CI, the model is falsified on that prediction. No other fertility model makes locked, falsifiable predictions.",
        ],
        evidenceLinks: [
          { label: "Locked predictions with CI", href: "/predictions" },
          { label: "Falsification conditions (§9)", href: "/mathematics#falsification" },
          { label: "LOOCV analysis", href: "/model" },
        ],
        uncertaintyText:
          "The model has more free parameters than ideal. The placebo test (K8) suggests the cross-sectional fit is not strongly constraining. The model's real test is temporal: will the 2030 and 2035 predictions hold? Until then, the model is a hypothesis, not an established result.",
      },
      {
        id: "chemicals",
        claim: "Climate change and chemicals explain everything.",
        paragraphs: [
          "Climate change and endocrine-disrupting chemicals (EDCs) are real threats to ecosystems and reproductive health. BERM does not deny this. The question is whether they can explain the full cross-species convergence — identical reproductive declines across insects, amphibians, bees, birds, lab mammals, and humans — or whether an additional factor is required.",
          "The proxy masking table on the Sentinel Species page shows the critical test: no single conventional explanation gets a 'yes' across all six taxa. Pesticides are partial for insects and bees but have no mechanism for lab mammal fertility decline. Climate change correlates with some insect declines but Krefeld data shows warmer temperatures INCREASE insect biomass. Habitat loss applies to wild species but not to lab animals or humans. Disease explains individual outbreaks (chytrid, Varroa) but not the cross-species pattern. Only EMF via the conserved VGCC mechanism applies to all simultaneously.",
          "Three structural mechanisms maintain the invisibility of the EMF signal: (1) Attribution bias — EMF is not in most researchers' conceptual vocabulary. A 2024 analysis of 92 potential drivers of insect decline did not include EMF among the candidates. (2) Evidence asymmetry — hundreds of studies examine climate-insect links; fewer than twenty examine EMF-insect links. The volume of evidence tracks funding, not causation. (3) Causal masking — climate change and EMF infrastructure are temporally correlated (both grew 1970–2024). A regression controlling for 'temperature' may inadvertently remove the EMF signal because the two trends move together.",
          "The test that would distinguish them: a Faraday-shielded laboratory replication. If EMF is the driver, shielded controls would show dramatically different baselines than standard labs. This is a concrete, falsifiable prediction.",
        ],
        evidenceLinks: [
          { label: "Proxy masking analysis", href: "/sentinel#proxy-masking" },
          { label: "Cross-species convergence", href: "/sentinel#convergence" },
          { label: "Temporal correlations", href: "/sentinel#temporal" },
          { label: "Attribution bias in evidence", href: "/evidence#attribution-bias" },
        ],
        uncertaintyText:
          "Chemical and EMF effects are difficult to separate epidemiologically because both increased during the same period. BERM's partition (EMF dominant, chemicals secondary) is a modeling assumption, not an empirically established ratio. The proxy masking argument identifies a structural blind spot but does not prove EMF is the cause. A Faraday-shielded replication study has not been conducted. Interaction effects between EDCs and EMF are plausible but not modeled.",
      },
      {
        id: "pronatalism",
        claim: "TFR is declining because people don't want children.",
        paragraphs: [
          "This is the strongest version of the cultural objection. If fertility decline were purely volitional, pronatalist policies should reverse it. They don't. The empirical record of pronatalist interventions is a natural experiment that tests the volitional hypothesis — and the results are negative.",
          "Hungary spends 5% of GDP on family support (the highest in the OECD). TFR rose from 1.23 (2011) to 1.59 (2021), then fell back to 1.51 (2023). The gain was temporary and did not reach replacement. South Korea has spent over $270 billion on pronatalist policies since 2006. TFR continued falling: 1.17 (2006) → 0.72 (2023). Singapore offers up to $190,000 in birth-related incentives per family. TFR: 1.04 (2023). Japan's multi-decade pronatalist effort has failed to reverse the trend: TFR fell from 1.26 (2005) to 1.20 (2024).",
          "Nordic countries — the gold standard for family-friendly policy (paid parental leave, subsidized childcare, gender equality) — are also declining. Finland: 1.87 (2010) → 1.32 (2024). Sweden: 1.91 (2015) → 1.45 (2024). Norway: 1.98 (2009) → 1.41 (2024). These countries already have the policies that pronatalists advocate, and fertility is still falling.",
          "The volitional model predicts that removing financial and logistical barriers should restore fertility. The data shows the opposite: even massive financial incentives produce at best a temporary, partial recovery. BERM explains this pattern: pronatalist policies address cultural factors (Level 3) but cannot compensate for declining biological capacity (Level 1). You cannot incentivize your way past impaired spermatogenesis, disrupted ovulation, or suppressed pair-bonding hormones.",
          "Desire-for-children surveys confirm the gap. Eurobarometer (2018) shows Europeans desire 2.3 children on average but achieve 1.5 — a gap of 0.8 that financial incentives have failed to close. This gap between desired and achieved fertility is itself a signal: if decline were purely volitional, desired fertility would match achieved fertility.",
        ],
        evidenceLinks: [
          { label: "Country-level TFR data", href: "/explorer" },
          { label: "Biological capacity model", href: "/mathematics#biocap" },
          { label: "Behavioral factor (hormones)", href: "/mathematics#behavioral" },
          { label: "Locked predictions", href: "/predictions" },
        ],
        uncertaintyText:
          "Pronatalist policy effectiveness is difficult to evaluate causally — countries that adopt strong policies may differ from those that don't. The desire-fertility gap could partly reflect economic constraints not captured by policy. Some pronatalist interventions may not have been implemented long enough to show full effects. BERM's interpretation (biological capacity limits the response) is consistent with the data but not the only possible explanation.",
      },
      {
        id: "ehs-provocation",
        claim: "EHS provocation studies show EMF has no effect on people.",
        paragraphs: [
          "Provocation studies measure the wrong thing. They ask: 'Do you feel the field?' This is a subjective perception that does not require a biological effect. BERM predicts OBJECTIVE changes (Ca²⁺, ROS, HRV, cortisol) that occur unconsciously. The absence of conscious detection does not imply the absence of biological response.",
          "Belpomme 2015/2022 (N≈1000) measured objective biomarkers in EHS patients: histaminemia↑ 40%, nitrotyrosine↑ 28% (ONOO⁻/BBB opening marker), S100B↑ 15%, melatonin/creatinine↓ in all cases. These are exactly the markers predicted by BERM's VGCC→Ca²⁺→ROS→BBB pathway. PMC 10226401 (2023) measured HRV in HEALTHY volunteers under Wi-Fi: parasympathetic tone fell significantly (p=0.036), sympathetic tone rose (p=0.002). These were not EHS patients — objective autonomic change occurred in all subjects.",
          "Provocation null results have four structural explanations: (a) They do not genotype CACNA1C — the population average masks a subgroup response. A 2024 medrxiv study is the first to genotype VGCC variants in an EMF study, confirming 'striking inter-individual differences.' (b) They do not control for anatomical differences (skull thickness, fat layer) that change internal field distribution. (c) They do not control for cumulative exposure history (Selye phase modulates the response). (d) The control group is NOT EMF-free (laboratory baseline bias).",
          "The discriminating test: a provocation study measuring HRV and Ca²⁺ markers (not subjective symptoms), genotyping CACNA1C, with the control condition in a Faraday-shielded room.",
        ],
        evidenceLinks: [
          { label: "Individual susceptibility evidence", href: "/evidence#individual-susceptibility" },
          { label: "Laboratory Baseline Bias", href: "/evidence#lab-baseline" },
          { label: "Mathematical basis (§11)", href: "/mathematics#individual-susceptibility" },
        ],
        uncertaintyText:
          "Belpomme's biomarkers are elevated only in subsets (15–40%), and it has not been shown that the SAME patients have ALL markers elevated simultaneously (PMC12314686, 2025). The CACNA1C genotyping study is a preprint (medrxiv), not yet peer-reviewed. The Selye phase quantification is heuristic, not validated. This is a structural critique of study methodology, not proof that EMF causes EHS.",
      },
      {
        id: "short-experiments",
        claim: "Short-term exposure studies don't find an effect.",
        paragraphs: [
          "This is actually what BERM predicts. The model distinguishes between acute response and chronic cumulation — they are different phenomena requiring different experimental designs.",
          "DNA repair (BER pathway) has a half-life of approximately 6 hours (Dianov & Hübscher 2013). A typical short-term study exposes for 2 hours and then allows 22 hours of recovery. At this ratio, repair capacity is sufficient: approximately 93% of damage is repaired before the next cycle. Net daily accumulation is negligible. This is why short-term studies find null results — they are measuring a regime where biological defense mechanisms are working as designed.",
          "Modern human exposure is the opposite: approximately 22 hours of EMF (Wi-Fi, cellular, IoT) with only 2 hours truly EMF-free (deep sleep, perhaps). At this ratio, repair capacity is overwhelmed: only about 21% of daily damage is repaired. The remaining 79% accumulates. Over a year, this produces massive oxidative burden. Manta et al. (2014) demonstrated this directly in Drosophila ovaries: short EMF exposure — ROS returned to baseline; long EMF exposure — ROS did NOT return to baseline.",
          "The REFLEX consortium (Diem 2005) found a further counter-intuitive result: intermittent exposure produces MORE DNA damage than continuous exposure at the same total dose. BERM explains this through VGCC gating asymmetry — channel opening is faster than closing, so each off→on field transition generates a transient Ca²⁺ spike that exceeds the steady-state level. Repeated transitions = greater total Ca²⁺ load. McCarty (2011) confirmed in a double-blind study that symptoms correlated with field transitions, not field strength.",
          "The discriminating test: a long-term study (months, not hours) comparing 22h/day exposure with 2h recovery versus 4h/day exposure with 20h recovery, measuring cumulative oxidative markers (nitrotyrosine, lipid peroxidation, 8-OHdG). BERM predicts the high-exposure group will show exponentially more damage than a linear dose-response model would predict.",
        ],
        evidenceLinks: [
          { label: "Recovery window evidence", href: "/evidence" },
          { label: "Cumulative exposure model (§3)", href: "/mathematics#two-channel" },
          { label: "Laboratory Baseline Bias", href: "/evidence#lab-baseline" },
        ],
        uncertaintyText:
          "The BER half-life of ~6h is an estimate for one specific repair pathway; total DNA repair involves multiple pathways (NER, HR, NHEJ) with different kinetics. The recovery window model is simplified — real repair is more complex. The REFLEX data (Diem 2005) has been disputed (Vienna investigation into possible data manipulation), though the intermittent > continuous finding has been reported independently. The 22h/2h exposure ratio for modern humans is an estimate that varies by individual.",
      },
    ],
  },
  fi: {
    metaTitle: "Vastaväitteet - Extinction Field",
    metaDesc:
      "Yleisimmät vastaväitteet BERM-mallille käsiteltyinä näytön, tunnustettujen epävarmuuksien ja tukidatan avulla.",
    title: "Yleisimmät vastaväitteet",
    subtitle:
      "Jokainen vahva väite kutsuu vahvaa skeptisyyttä. Alla ovat useimmin kuulemamme vastaväitteet, käsiteltyinä rehellisesti — mukaan lukien se, mihin emme vielä osaa vastata.",
    clickToExpand: "Klikkaa avataksesi",
    uncertainty: "Tunnustettu epävarmuus",
    evidence: "Näyttö",
    objections: [
      {
        id: "cultural",
        claim: "Hedelmällisyyden lasku on kulttuurista — koulutus, kaupungistuminen, ehkäisy.",
        paragraphs: [
          "Tämä on vakioselitys ja osittain oikea. Koulutus, kaupungistuminen ja ehkäisyn saatavuus laskevat hedelmällisyyttä. BERM ei kiistä tätä — mallin taso 3 (\"todellinen kulttuuri\") sisältää eksplisiittisesti vapaaehtoiset hedelmällisyysvalinnat.",
          "Kulttuurinen selitys ei kuitenkaan kykene selittämään kolmea havaintoa: (1) Myös koirat, hevoset ja hyönteiset kokevat lisääntymiskyvyn heikkenemistä — ne eivät käy yliopistossa eivätkä käytä ehkäisyä. (2) Siittiökonsentraatio laski 62 % 50 vuodessa kaikilla alueilla, myös populaatioissa joissa koulutustaso on pysynyt vakaana. (3) 49 maata on nyt alle \"TFR-lattian\" 1,4, jota väestötiede piti mahdottomana puhtaasti tahdonalaisissa malleissa.",
          "BERM esittää, että kulttuuriset tekijät vaikuttavat biologisen substraatin päällä, joka itsessään heikkenee. Indikaattorilajien näyttö on vahvin argumentti: identtiset VGCC-välitteiset lisääntymisvaikutukset pääjaksoissa, joilla ei ole yhteisiä sosiaalisia tai kulttuurisia tekijöitä.",
        ],
        evidenceLinks: [
          { label: "Indikaattorilajien näyttö", href: "/sentinel" },
          { label: "Lajienväliset konvergenssitaulukko", href: "/sentinel#convergence" },
          { label: "Tutkija — maatason data", href: "/explorer" },
        ],
        uncertaintyText:
          "Kulttuuriset tekijät selvästi vaikuttavat. BERM ei vielä kykene kvantifioimaan tarkkaa jakaumaa biologisten ja kulttuuristen tekijöiden välillä minkään yksittäisen maan kohdalla. Mallin taso 3 on kalibroitu, ei johdettu perusperiaatteista.",
      },
      {
        id: "correlation",
        claim: "Korrelaatio ei ole kausaatiota.",
        paragraphs: [
          "Oikein. Yksikään yksittäinen tutkimus ei todista, että EMF aiheuttaa hedelmällisyyden laskua. BERM ei nojaa yhteen tutkimukseen. Sen sijaan se käyttää kuutta identifiointistrategiaa, jotka yhdessä rajaavat vaihtoehtoisten selitysten tilaa:",
          "1. Proksi-eliminaatio: indikaattorilajit poistavat inhimilliset sekoittajat. 2. Luonnonkokeet: amish/hutteriittiyhteisöt, Israelin sapatin noudattaminen, COVID-lockdownin siittiöparannus. 3. Farmakologinen validaatio: samoja reittejä kohdentavat lääkkeet (VGCC-salpaajat, mTOR-estäjät) tuottavat kvantitatiivisesti yhdenmukaisia vaikutuksia. 4. Annos-vaste: Norjan laivaston kohortti (N=10 497) osoittaa OR 1,86 annos-vastegradientin kanssa. 5. Lajienväliset todisteet: VGCC-konservaatio >70 % kaikissa aitotumallisissa, samat lisääntymisvaikutukset hyönteisissä, sammakkoeläimissä, linnuissa, lepakoissa ja laboratorionisäkkäissä. 6. Mekanistinen ketju: Lindgrenin geometria → χ(Ā)-valinta → VGCC-aktivaatio → Ca²⁺ → ROS → siittiövaurio, jokainen vaihe itsenäisesti varmistettu.",
          "Mikään yksittäinen strategia ei todista kausaatiota. Yhdessä ne eliminoivat useimmat vaihtoehtoiset selitykset. Jäljelle jäävät vaihtoehdot (tuntematon kaikkialla esiintyvä toksiini, sattuma seitsemässä pääjaksossa) ovat vähemmän parsimoniallisia kuin EMF-hypoteesi.",
        ],
        evidenceLinks: [
          { label: "Näyttökokoelma (80+ tutkimusta)", href: "/evidence" },
          { label: "Farmakologinen validaatio", href: "/mathematics#pharmacological" },
          { label: "Lindgrenin geometrian johtaminen", href: "/mathematics#lindgren" },
        ],
        uncertaintyText:
          "Identifiointistrategiat rajaavat mutta eivät eliminoi sekoittajia. Todellista väestötason EMF-vähennyskokeen RCT:tä ei ole koskaan tehty. BERM:n kausaaliväite on yhtenevän näytön tukema hypoteesi, ei todistettu tosiasia.",
      },
      {
        id: "replication",
        claim: "EMF-tutkimus ei ole replikoitunut.",
        paragraphs: [
          "Tämä on osittain totta ja osittain rakenteellinen artefakti. Panagopoulos ym. (2025) tekivät sateenvarjokatsauksen 39 systemaattisesta katsauksesta, jotka kattavat tuhansia yksittäisiä tutkimuksia. Enemmistö raportoi ei-ionisoivan EMF:n biologisia vaikutuksia. Replikaatio-ongelma on todellinen mutta ei ainutlaatuinen EMF:lle — se koskee koko biolääketieteellistä tutkimusta.",
          "BERM tarjoaa rakenteellisen selityksen sille, miksi nimenomaan EMF-tutkimus kärsii replikaatio-ongelmista: kontrolliryhmä ei ole EMF-vapaa. Jokainen laboratorio toimii ympäristön sähkömagneettisessa kentässä. Kontrollieläimet vuonna 2020 altistuvat EMF-tasoille, jotka olisivat olleet koeolosuhde vuonna 1985. Tämä on laboratorion lähtötason vinouma — se pienentää systemaattisesti vaikutuskokoja ajan myötä ambient-EMF:n noustessa.",
          "Malli ennustaa, että Faraday-suojattu laboratorio osoittaisi 684× suuremman vaikutussuhteen kuin tavallinen laboratorio. Tämä on testattava, falsifioitava ennuste.",
        ],
        evidenceLinks: [
          { label: "Laboratorion lähtötason vinoumaanalyysi", href: "/evidence#lab-baseline" },
          { label: "Replikaatiokriisi BERM:n ennusteena", href: "/replication" },
        ],
        uncertaintyText:
          "Laboratorion lähtötason vinoumahypoteesi on mekanistisesti uskottava, mutta sitä ei ole kokeellisesti testattu. Faraday-suojattua replikaatiotutkimusta ei ole tehty. 684×-ennuste on johdettu mallista, ei havainnoista.",
      },
      {
        id: "levels",
        claim: "Säteilytasot ovat liian alhaiset aiheuttamaan biologisia vaikutuksia.",
        paragraphs: [
          "Tämä vastaväite olettaa, että biologinen vaste on verrannollinen absoluuttiseen kenttävoimakkuuteen. Lindgrenin viitekehys osoittaa tämän vääräksi. Biologisesti relevantti vaste on χ(Ā) = Ā / √(1 + Ā²), missä Ā on normalisoitu taustakenttä. Tämä on saturaatiofunktio, ei lineaarinen.",
          "Solukalvolla endogeeninen sähkökenttä on noin 7 × 10⁶ V/m. Lindgrenin normalisoiduissa yksiköissä tämä tarkoittaa χ ≈ 1,0 — biologinen järjestelmä on jo lähellä saturaatiota. Pienet häiriöt tässä toimintapisteessä tuottavat mitattavia vaikutuksia, koska järjestelmä toimii vastekäyrän jyrkällä osalla.",
          "VGCC:n jännitesensori on herkkä kentille, jotka ovat 100× nykyisten turvarajojen alapuolella. Salford ym. osoittivat veri-aivoesteen läpäisevyyden SAR-arvolla 0,016 W/kg — 100× FCC-rajan 1,6 W/kg alapuolella. Turvallisuusstandardit perustuvat termisiin vaikutuksiin; BERM:n mekanismit ovat ei-termisiä.",
        ],
        evidenceLinks: [
          { label: "χ(Ā)-valintasäännön johtaminen", href: "/mathematics#chi" },
          { label: "Lindgrenin geometria", href: "/mathematics#lindgren" },
          { label: "Reitti A: VGCC-mekanismi", href: "/evidence" },
        ],
        uncertaintyText:
          "Lindgrenin geometrinen viitekehys on julkaistu mutta ei vielä laajasti replikoitu. χ(Ā)-funktio on teoreettinen ennuste. Vaikka VGCC:n herkkyys subtermisillä tasoilla on kokeellisesti osoitettu, koko ketjua geometriasta väestötason hedelmällisyyteen ei ole verifioitu yhdessä kokeessa.",
      },
      {
        id: "noticed",
        claim: "Jos tämä olisi totta, joku olisi huomannut.",
        paragraphs: [
          "Joku huomasi. Robert O. Becker dokumentoi biosähköisiä vaikutuksia 1960–70-luvuilla ja hänet marginalisoitiin systemaattisesti. Hänen tutkimusrahoituksensa katkaistiin sen jälkeen, kun hän julkaisi löydöksiä sähkömagneettisten kenttien vaikutuksista luun paranemiseen ja hermojen regeneraatioon. W. Ross Adey ja Allan Frey tekivät vastaavia löydöksiä (Freyn kuulovaikutus, 1961) ja kohtasivat vastaavaa institutionaalista vastustusta.",
          "Yhdysvaltain laivasto ja CIA toteuttivat luokiteltuja EMF:n biovaikutusten tutkimusohjelmia 1960–80-luvuilla. Tuloksia ei julkaistu avoimessa kirjallisuudessa. Kun televiestintäteollisuus kasvoi monen biljoonan dollarin sektoriksi, tutkimusrahoitus muuttui: teollisuuden rahoittamat tutkimukset löytävät 10× todennäköisemmin \"ei vaikutusta\" kuin riippumattomasti rahoitetut (Huss ym. 2007, EHP).",
          "Tämä ei ole salaliittoteoria — se on dokumentoitu institutionaalisten kannustimien kuvio. Tupakkateollisuus noudatti samaa pelisääntöä vuosikymmeniä. Valtavirtaisen tunnustuksen puuttuminen ei ole todiste puuttumisesta; se on todiste tutkimusrahoituksen rakenteesta.",
        ],
        evidenceLinks: [
          { label: "Tietoa BERM-projektista", href: "/about" },
        ],
        uncertaintyText:
          "Tutkijoiden historiallinen marginalisointi ei todista heidän väitteidensä olleen oikeita. Beckerin biosähköinen työ luun paranemisesta lopulta validoitiin, mutta hänen laajemmat EMF-väitteensä ovat edelleen kiistanalaisia. Rahoitusvinouma on dokumentoitu mutta sen suuruusluokka on kiistelty.",
      },
      {
        id: "overfitting",
        claim: "Malli on liian hyvä — R² = 0,9999 on overfitting.",
        paragraphs: [
          "Tämä on oikeutettu huoli, ja olemme samaa mieltä. R² = 0,9999 poikkileikkauksessa ON kalibraatiota, EI validointia. Malli on kalibroitu vastaamaan vuoden 2024 havaittua TFR:ää jokaiselle maalle rakenteellisesti. Tämä sivusto sanoo tämän jokaisella sivulla (alatunnisteen disclaimer K8).",
          "Merkitykselliset testisuureet ovat toiset: LOOCV RMSE = 1,146 (jätä-yksi-maa-pois ristivalidointi), ja 86 % satunnaisesti generoiduista plasebosarjoista sopii nykyiseen dataan paremmin kuin malli (K8). Nämä eivät ole vaikuttavia lukuja. Raportoimme ne, koska älyllinen rehellisyys vaatii sitä.",
          "Mallin arvo ei ole menneisyyden sovittamisessa vaan tulevaisuuden ennustamisessa. Seitsemän lukittua ennustetta aikaleimoineen, luottamusväleineen ja eksplisiittisine kumoamisehtoineen on julkaistu Ennusteet-sivulla. Jos havaitut arvot osuvat CI:n ulkopuolelle, malli falsifioidaan kyseisen ennusteen osalta. Mikään muu hedelmällisyysmalli ei tee lukittuja, falsifioitavia ennusteita.",
        ],
        evidenceLinks: [
          { label: "Lukitut ennusteet CI:neen", href: "/predictions" },
          { label: "Falsifikaatioehdot (§9)", href: "/mathematics#falsification" },
          { label: "LOOCV-analyysi", href: "/model" },
        ],
        uncertaintyText:
          "Mallilla on enemmän vapaita parametreja kuin olisi ihanteellista. Plasebotesti (K8) viittaa siihen, että poikkileikkaussovitus ei ole vahvasti rajoittava. Mallin todellinen testi on ajallinen: pitävätkö vuosien 2030 ja 2035 ennusteet? Siihen asti malli on hypoteesi, ei vakiintunut tulos.",
      },
      {
        id: "chemicals",
        claim: "Ilmastonmuutos ja kemikaalit selittävät kaiken.",
        paragraphs: [
          "Ilmastonmuutos ja hormonihäiritsijät (EDC:t) ovat todellisia uhkia ekosysteemeille ja lisääntymisterveydelle. BERM ei kiistä tätä. Kysymys on, voivatko ne selittää koko lajienväliset konvergenssin — identtiset lisääntymisen vähenemät hyönteisissä, sammakkoeläimissä, mehiläisissä, linnuissa, laboratorionisäkkäissä ja ihmisissä — vai tarvitaanko lisätekijä.",
          "Indikaattorilajit-sivun proxy masking -taulukko osoittaa kriittisen testin: mikään yksittäinen perinteinen selitys ei saa 'kyllä'-merkintää kaikkien kuuden taksonin kohdalla. Torjunta-aineet ovat osittaisia hyönteisille ja mehiläisille mutta niillä ei ole mekanismia laboratorionisäkkäiden hedelmällisyyden laskulle. Ilmastonmuutos korreloi joidenkin hyönteisvähenemien kanssa, mutta Krefeldin data osoittaa, että lämpimämmät lämpötilat LISÄÄVÄT hyönteisten biomassaa. Elinympäristön menetys koskee villejä lajeja mutta ei laboratorieläimiä tai ihmisiä. Taudit selittävät yksittäisiä epidemioita (chytrid, Varroa) mutta eivät lajienvälistä kuviota. Vain EMF konservoituneen VGCC-mekanismin kautta soveltuu kaikkiin samanaikaisesti.",
          "Kolme rakenteellista mekanismia ylläpitää EMF-signaalin näkymättömyyttä: (1) Attribuutiovinouma — EMF ei ole useimpien tutkijoiden käsitteellisessä sanastossa. Vuoden 2024 analyysi 92 mahdollisesta hyönteisvähenemän ajurista ei sisältänyt EMF:ää kandidaattien joukossa. (2) Näytön epäsymmetria — satoja tutkimuksia tarkastelee ilmasto-hyönteisyhteyksiä; alle kaksikymmentä tarkastelee EMF-hyönteisyhteyksiä. Näytön määrä seuraa rahoitusta, ei kausaatiota. (3) Kausaalinen peittäminen — ilmastonmuutos ja EMF-infrastruktuuri ovat ajallisesti korreloituneet (molemmat kasvoivat 1970–2024). Regressio, joka kontrolloi 'lämpötilaa', voi vahingossa poistaa EMF-signaalin, koska kaksi trendiä liikkuvat yhdessä.",
          "Erottava testi: Faraday-suojattu laboratorioreplikaatio. Jos EMF on ajuri, suojatut kontrollit osoittaisivat dramaattisesti erilaisia perustasoja kuin tavalliset laboratoriot. Tämä on konkreettinen, falsifioitava ennuste.",
        ],
        evidenceLinks: [
          { label: "Proxy masking -analyysi", href: "/sentinel#proxy-masking" },
          { label: "Lajienväliset konvergenssi", href: "/sentinel#convergence" },
          { label: "Ajalliset korrelaatiot", href: "/sentinel#temporal" },
          { label: "Attribuutiovinouma näytössä", href: "/evidence#attribution-bias" },
        ],
        uncertaintyText:
          "Kemikaali- ja EMF-vaikutuksia on vaikea erottaa epidemiologisesti, koska molemmat lisääntyivät samana ajanjaksona. BERM:n jako (EMF hallitseva, kemikaalit toissijainen) on mallinnusoletus, ei empiirisesti vakiintunut suhdeluku. Proxy masking -argumentti tunnistaa rakenteellisen sokean pisteen mutta ei todista EMF:n olevan syy. Faraday-suojattua replikaatiotutkimusta ei ole tehty. Vuorovaikutusvaikutukset EDC:iden ja EMF:n välillä ovat uskottavia mutta mallintamattomia.",
      },
      {
        id: "pronatalism",
        claim: "TFR laskee, koska ihmiset eivät halua lapsia.",
        paragraphs: [
          "Tämä on kulttuurivastaväitteen vahvin muoto. Jos hedelmällisyyden lasku olisi puhtaasti tahdonalaista, pronatalismipolitiikkojen pitäisi kääntää se. Ne eivät tee sitä. Pronatalististen interventioiden empiirinen tietue on luonnonkoe, joka testaa tahdonalaista hypoteesia — ja tulokset ovat negatiivisia.",
          "Unkari käyttää 5 % BKT:stä perhetukeen (OECD:n korkein). TFR nousi 1,23:sta (2011) 1,59:ään (2021) ja laski sitten takaisin 1,51:een (2023). Nousu oli tilapäinen eikä saavuttanut uusiutumistasoa. Etelä-Korea on käyttänyt yli 270 miljardia dollaria pronatalismipolitiikkoihin vuodesta 2006. TFR jatkoi laskuaan: 1,17 (2006) → 0,72 (2023). Singapore tarjoaa jopa 190 000 dollaria syntyvyyskannustimia perhettä kohti. TFR: 1,04 (2023). Japanin vuosikymmeniä kestänyt pronatalistinen pyrkimys ei ole kääntänyt trendiä: TFR laski 1,26:sta (2005) 1,20:een (2024).",
          "Pohjoismaat — perheystävällisen politiikan kultastandardi (palkallinen vanhempainvapaa, tuettu päivähoito, sukupuolten tasa-arvo) — laskevat myös. Suomi: 1,87 (2010) → 1,32 (2024). Ruotsi: 1,91 (2015) → 1,45 (2024). Norja: 1,98 (2009) → 1,41 (2024). Näillä mailla on jo ne politiikat, joita pronatasmia kannattavat ajavat, ja hedelmällisyys laskee silti.",
          "Tahdonalainen malli ennustaa, että taloudellisten ja logististen esteiden poistamisen pitäisi palauttaa hedelmällisyys. Data osoittaa päinvastaista: massiivisetkin taloudelliset kannustimet tuottavat parhaimmillaan tilapäisen, osittaisen palautumisen. BERM selittää tämän kuvion: pronatalismipolitiikat kohdistuvat kulttuurisiin tekijöihin (taso 3) mutta eivät voi kompensoida heikkenevää biologista kapasiteettia (taso 1). Ei voi kannustimilla ohittaa heikentynyttä spermatogeneesiä, häiriintynyttä ovulaatiota tai tukahdutettuja parinmuodostushormoneja.",
          "Lapsitovekyselyt vahvistavat kuilun. Eurobarometri (2018) osoittaa, että eurooppalaiset haluavat keskimäärin 2,3 lasta mutta saavuttavat 1,5 — kuilu 0,8, jota taloudelliset kannustimet eivät ole onnistuneet kuromaan umpeen. Tämä kuilu halutun ja toteutuneen hedelmällisyyden välillä on itsessään signaali: jos lasku olisi puhtaasti tahdonalaista, haluttu hedelmällisyys vastaisi toteutunutta.",
        ],
        evidenceLinks: [
          { label: "Maatason TFR-data", href: "/explorer" },
          { label: "Biologisen kapasiteetin malli", href: "/mathematics#biocap" },
          { label: "Käyttäytymistekijä (hormonit)", href: "/mathematics#behavioral" },
          { label: "Lukitut ennusteet", href: "/predictions" },
        ],
        uncertaintyText:
          "Pronatalismipolitiikkojen tehokkuutta on vaikea arvioida kausaalisesti — politiikkoja omaksuvat maat voivat poiketa niistä, jotka eivät omaksu. Halu-hedelmällisyyskuilu voi osittain heijastaa taloudellisia rajoitteita, joita politiikka ei kata. Joitakin pronatalistisia interventioita ei ehkä ole toteutettu tarpeeksi pitkään täysien vaikutusten näyttämiseksi. BERM:n tulkinta (biologinen kapasiteetti rajoittaa vastetta) on yhdenmukainen datan kanssa mutta ei ainoa mahdollinen selitys.",
      },
      {
        id: "ehs-provocation",
        claim: "EHS-provokaatiotutkimukset osoittavat, ettei EMF vaikuta ihmisiin.",
        paragraphs: [
          "Provokaatiotutkimukset mittaavat väärää asiaa. Ne kysyvät: 'Tunnetko kentän?' Tämä on subjektiivinen havainto, joka ei edellytä biologista vaikutusta. BERM ennustaa OBJEKTIIVISIA muutoksia (Ca²⁺, ROS, HRV, kortisoli), jotka tapahtuvat tiedostamatta. Tietoisen havainnon puuttuminen ei tarkoita biologisen vasteen puuttumista.",
          "Belpomme 2015/2022 (N≈1000) mittasi objektiivisia biomarkkereita EHS-potilaissa: histaminemia↑ 40 %, nitrotyrosiini↑ 28 % (ONOO⁻/veri-aivoesteen avautumismarkkeri), S100B↑ 15 %, melatoniini/kreatiniini↓ kaikissa tapauksissa. Nämä ovat täsmälleen BERM:n VGCC→Ca²⁺→ROS→BBB-reitin ennustamat markkerit. PMC 10226401 (2023) mittasi HRV:tä TERVEISSÄ vapaaehtoisissa Wi-Fi-altistuksessa: parasympaattinen tonus laski merkitsevästi (p=0,036), sympaattinen tonus nousi (p=0,002). Nämä eivät olleet EHS-potilaita — objektiivinen autonominen muutos tapahtui kaikissa koehenkilöissä.",
          "Provokaation nollatuloksilla on neljä rakenteellista selitystä: (a) Ne eivät genotyypitä CACNA1C:tä — populaatiokeskiarvo peittää alaryhmän vasteen. Vuoden 2024 medrxiv-tutkimus on ensimmäinen, joka genotyypittää VGCC-variantit EMF-tutkimuksessa ja vahvistaa 'silmiinpistävät yksilöiden väliset erot.' (b) Ne eivät kontrolloi anatomisia eroja (kallon paksuus, rasvakerros), jotka muuttavat sisäistä kenttäjakaumaa. (c) Ne eivät kontrolloi kumulatiivista altistushistoriaa (Selye-vaihe moduloi vastetta). (d) Kontrolliryhmä EI ole EMF-vapaa (laboratorion perustasobias).",
          "Erotteleva testi: provokaatiotutkimus, joka mittaa HRV:tä ja Ca²⁺-markkereita (ei subjektiivisia oireita), genotyypittää CACNA1C:n, ja kontrollitilanteessa käytetään Faraday-suojattua huonetta.",
        ],
        evidenceLinks: [
          { label: "Yksilöllisen herkkyyden todisteet", href: "/evidence#individual-susceptibility" },
          { label: "Laboratorion perustasobias", href: "/evidence#lab-baseline" },
          { label: "Matemaattinen perusta (§11)", href: "/mathematics#individual-susceptibility" },
        ],
        uncertaintyText:
          "Belpommen biomarkkerit ovat koholla vain osajoukoissa (15–40 %), eikä ole osoitettu, että SAMOILLA potilailla KAIKKI markkerit olisivat koholla samanaikaisesti (PMC12314686, 2025). CACNA1C-genotyypitystutkimus on preprintti (medrxiv), ei vielä vertaisarvioitu. Selye-vaiheen kvantifiointi on heuristista, ei validoitua. Tämä on rakenteellinen kritiikki tutkimusmenetelmistä, ei todiste siitä, että EMF aiheuttaa EHS:n.",
      },
      {
        id: "short-experiments",
        claim: "Lyhytaikaiset altistuskokeet eivät löydä vaikutusta.",
        paragraphs: [
          "Juuri tätä BERM ennustaa. Malli erottaa akuutin vasteen ja kroonisen kumulaation — ne ovat eri ilmiöitä, jotka vaativat erilaiset koeasetelmat.",
          "DNA-korjauksen (BER-reitti) puoliintumisaika on noin 6 tuntia (Dianov & Hübscher 2013). Tyypillinen lyhytaikaiskoe altistaa 2 tuntia ja sallii 22 tuntia palautumista. Tällä suhteella korjauskapasiteetti riittää: noin 93 % vauriosta korjataan ennen seuraavaa sykliä. Nettokumulaatio on merkityksetöntä. Siksi lyhytkokeet antavat nollatuloksia — ne mittaavat aluetta, jossa biologiset puolustusmekanismit toimivat suunnitellulla tavalla.",
          "Moderni ihmisaltistus on päinvastainen: noin 22 tuntia EMF:ää (Wi-Fi, matkapuhelin, IoT) ja vain 2 tuntia todella EMF-vapaata aikaa (syvä uni). Tällä suhteella korjauskapasiteetti ylikuormittuu: vain noin 21 % päivittäisestä vauriosta korjataan. Loput 79 % kumuloituvat. Vuodessa tämä tuottaa massiivisen oksidatiivisen kuorman. Manta ym. (2014) osoittivat tämän suoraan Drosophilan munasarjoissa: lyhyt EMF-altistus — ROS palautui lähtötasolle; pitkä EMF-altistus — ROS EI palautunut lähtötasolle.",
          "REFLEX-konsortio (Diem 2005) havaitsi lisäksi vastaintuitiivisen tuloksen: katkonainen altistus tuottaa ENEMMÄN DNA-vaurioita kuin jatkuva samalla kokonaisannoksella. BERM selittää tämän VGCC-portin asymmetrialla — kanavan avautuminen on nopeampaa kuin sulkeutuminen, joten jokainen off→on-kenttäsiirtymä synnyttää ohimenevän Ca²⁺-piikin, joka ylittää vakiotilan. Toistuvat siirtymät = suurempi kokonais-Ca²⁺-kuorma. McCarty (2011) vahvisti tuplasokkokokeessa, että oireet korreloivat kenttäsiirtymien, eivät kenttävoimakkuuden kanssa.",
          "Erotteleva testi: pitkäaikaistutkimus (kuukausia, ei tunteja), jossa verrataan 22h/pv altistusta 2h palautumisella ja 4h/pv altistusta 20h palautumisella, mitaten kumulatiivisia oksidatiivisia markkereita (nitrotyrosiini, lipidiperoksidaatio, 8-OHdG). BERM ennustaa, että korkean altistuksen ryhmä osoittaa eksponentiaalisesti enemmän vaurioita kuin lineaarinen annos-vastemalli ennustaisi.",
        ],
        evidenceLinks: [
          { label: "Palautumisikkunan todisteet", href: "/evidence" },
          { label: "Kumulatiivinen altistusmalli (§3)", href: "/mathematics#two-channel" },
          { label: "Laboratorion perustasobias", href: "/evidence#lab-baseline" },
        ],
        uncertaintyText:
          "BER:n ~6h puoliintumisaika on arvio yhdelle korjausreitille; kokonais-DNA-korjaus käsittää useita reittejä (NER, HR, NHEJ), joilla on eri kinetiikka. Palautumisikkunamalli on yksinkertaistettu — todellinen korjaus on monimutkaisempaa. REFLEX-data (Diem 2005) on kiistetty (Wienin tutkinta mahdollisesta datan manipuloinnista), vaikka katkonainen > jatkuva -havainto on raportoitu itsenäisesti muualla. Modernin ihmisen 22h/2h altistussuhde on arvio, joka vaihtelee yksilöittäin.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;
  return { title: d.metaTitle, description: d.metaDesc };
}

function ObjectionCard({
  objection,
  locale,
  index,
}: {
  objection: Objection;
  locale: string;
  index: number;
}) {
  const d = locale === "fi" ? t.fi : t.en;
  const inputId = `objection-${objection.id}`;

  return (
    <div className="border border-card-border rounded-lg overflow-hidden">
      <input type="checkbox" id={inputId} className="peer hidden" />
      <label
        htmlFor={inputId}
        className="flex items-start gap-4 p-5 cursor-pointer hover:bg-card-bg/50 transition-colors peer-checked:bg-card-bg"
      >
        <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-status-refuted/15 text-status-refuted flex items-center justify-center text-xs font-bold">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-status-refuted leading-snug">
            &ldquo;{objection.claim}&rdquo;
          </p>
          <p className="text-xs text-foreground-muted mt-1 peer-checked:hidden">
            {d.clickToExpand}
          </p>
        </div>
        <span className="flex-shrink-0 mt-1 text-foreground-muted transition-transform peer-checked:rotate-180">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </label>

      <div className="hidden peer-checked:block border-t border-card-border p-5 bg-card-bg">
        <div className="space-y-3 text-sm text-foreground leading-relaxed max-w-3xl">
          {objection.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="text-xs font-medium text-foreground-muted">
            {d.evidence}:
          </span>
          {objection.evidenceLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-xs text-accent hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-background border border-border">
          <p className="text-xs font-semibold text-foreground-muted mb-1">
            {d.uncertainty}
          </p>
          <p className="text-xs text-foreground-muted leading-relaxed">
            {objection.uncertaintyText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function ObjectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const d = locale === "fi" ? t.fi : t.en;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">{d.title}</h1>
        <p className="text-foreground-muted leading-relaxed">{d.subtitle}</p>
      </header>

      <div className="space-y-4">
        {d.objections.map((objection, i) => (
          <ObjectionCard
            key={objection.id}
            objection={objection}
            locale={locale}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
