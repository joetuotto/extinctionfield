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
        claim: "It's chemicals and microplastics, not EMF.",
        paragraphs: [
          "Endocrine-disrupting chemicals (EDCs), microplastics, and PFAS are real threats to reproductive health. BERM does not deny this. The question is whether they are the PRIMARY driver of the global pattern or a contributing factor.",
          "Three observations favor EMF over chemicals as the dominant driver: (1) Amish/Hutterite communities have TFR 6.4–7.0 despite similar agricultural chemical exposure to surrounding populations — but with near-zero personal EMF exposure. (2) Cross-species convergence: insects, amphibians, birds, bats, and mammals show the same reproductive decline pattern despite vastly different chemical exposures. A forest insect and a lab rat do not share a pesticide profile, but they share the ambient electromagnetic environment. (3) Temporal pattern: sperm decline accelerated sharply around 2000, coinciding with the pocket phone era, not with a step-change in chemical exposure.",
          "The most likely reality is that both contribute. BERM models EMF as the dominant factor with chemicals as a potential amplifier. The model would need modification if a chemical were identified that (a) is ubiquitous across all continents, (b) affects all VGCC-bearing species equally, and (c) correlates temporally with mobile infrastructure deployment. No such chemical has been identified.",
        ],
        evidenceLinks: [
          { label: "Sentinel species — cross-species evidence", href: "/sentinel" },
          { label: "Temporal correlations", href: "/sentinel#temporal" },
          { label: "Natural experiments", href: "/evidence" },
        ],
        uncertaintyText:
          "Chemical and EMF effects are difficult to separate epidemiologically because both increased during the same period. BERM's partition (EMF dominant, chemicals secondary) is a modeling assumption, not an empirically established ratio. Interaction effects between EDCs and EMF are plausible but not modeled.",
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
        claim: "Kemikaalit ja mikromuovit selittävät kaiken, ei EMF.",
        paragraphs: [
          "Hormonihäiritsijät (EDC:t), mikromuovit ja PFAS-yhdisteet ovat todellisia uhkia lisääntymisterveydelle. BERM ei kiistä tätä. Kysymys on, ovatko ne PÄÄASIALLINEN ajuri globaalille kuviolle vai myötävaikuttava tekijä.",
          "Kolme havaintoa suosii EMF:ää kemikaalien sijaan hallitsevana ajurina: (1) Amish/hutteriittiyhteisöillä on TFR 6,4–7,0 huolimatta samankaltaisesta maatalouskemikaalialtistuksesta ympäröivien populaatioiden kanssa — mutta lähes nolla-henkilökohtaisella EMF-altistuksella. (2) Lajienväliset konvergenssi: hyönteiset, sammakkoeläimet, linnut, lepakot ja nisäkkäät osoittavat saman lisääntymisen heikkenemiskuvion huolimatta hyvin erilaisista kemikaalialtistuksista. Metsähyönteinen ja laboratoriorotta eivät jaa torjunta-aineprofiilia, mutta ne jakavat ympäristön sähkömagneettisen kentän. (3) Ajallinen kuvio: siittiöiden vähenemä kiihtyi jyrkästi noin vuonna 2000, yhtäaikaa taskupuhelinkauden kanssa, ei kemikaalialtistuksen askelmuutoksen kanssa.",
          "Todennäköisin todellisuus on, että molemmat vaikuttavat. BERM mallintaa EMF:n hallitsevana tekijänä ja kemikaalit mahdollisena vahvistajana. Mallia pitäisi muuttaa, jos tunnistettaisiin kemikaali, joka (a) on kaikkialla kaikilla mantereilla, (b) vaikuttaa kaikkiin VGCC:tä kantaviin lajeihin yhtäläisesti ja (c) korreloi ajallisesti mobiili-infrastruktuurin käyttöönoton kanssa. Tällaista kemikaalia ei ole tunnistettu.",
        ],
        evidenceLinks: [
          { label: "Indikaattorilajit — lajienväliset todisteet", href: "/sentinel" },
          { label: "Ajalliset korrelaatiot", href: "/sentinel#temporal" },
          { label: "Luonnolliset kokeet", href: "/evidence" },
        ],
        uncertaintyText:
          "Kemikaali- ja EMF-vaikutuksia on vaikea erottaa epidemiologisesti, koska molemmat lisääntyivät samana ajanjaksona. BERM:n jako (EMF hallitseva, kemikaalit toissijainen) on mallinnusoletus, ei empiirisesti vakiintunut suhdeluku. Vuorovaikutusvaikutukset EDC:iden ja EMF:n välillä ovat uskottavia mutta mallintamattomia.",
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
