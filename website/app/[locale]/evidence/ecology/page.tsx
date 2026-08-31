import type { Metadata } from "next";
import Link from "next/link";
import { TreePine } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { CitationLink } from "@/components/CitationLink";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Ecological & Sentinel Evidence",
    subtitle: "Electroecology and weather radar effects on sentinel species",
    backLink: "← Back to Evidence",
    narratives: [
      {
        id: "electroecology",
        title: "Electroecology: the emerging science of electric pollution",
        paragraphs: [
          "Aerial electroreception — the ability to detect airborne electric fields — has emerged as a recognized sensory modality in arthropods ([[ref:robert2024_aerial_electroreception_review|Robert 2024, Current Biology]]). Bees detect floral electric fields to optimize foraging ([[ref:clarke2013_bee_electroreception|Clarke 2013, Science]]). Their mechanosensory hairs physically bend in electric fields, transmitting neural signals ([[ref:sutton2016_bee_hair_mechanism|Sutton 2016, PNAS]]). Bees communicate within the hive using electrostatic signals during the waggle dance, with individual bee charge reaching 450 V ([[ref:greggers2013_bee_electric_comm|Greggers 2013, Proc R Soc B]]). Spiders detect atmospheric electric fields for ballooning ([[ref:morley2018_spider_ballooning|Morley & Robert 2018, Current Biology]]). Caterpillars detect approaching wasps electrically before contact ([[ref:england2024_caterpillar_predator|England & Robert 2024, PNAS]]). Ticks are passively attracted to hosts across air gaps by electrostatic forces ([[ref:england_2023_ticks|England 2023, Current Biology]]).",
          "Electrostatic charging is not a passive byproduct of flight. A 2024 study of 269 butterflies and moths across 11 species showed that the amount of static charge varies systematically with ecology — whether the species visits flowers, is tropical, or flies at night ([[ref:england2024_butterfly_adaptive|England & Robert 2024, J R Soc Interface]]). This is the first evidence that electrostatic properties are adaptive traits shaped by natural selection. If evolution has optimized organisms’ electrostatic properties, a changed electrostatic environment (synthetic materials, plastic surfaces, electrical devices) disrupts that optimization — the same logic as BERM’s evolutionary calibration principle applied to the STATIC channel.",
          "In field experiments in urban meadows, [[ref:mallinson2025_electric_pollution|Mallinson et al. (2025, iScience)]] demonstrated that weak anthropogenic electric fields reduce honeybee floral landings by 71% (AC fields) and 53% (positive DC fields). Electric field measurements near high-voltage transmission lines revealed persistent field strengths comparable to those used experimentally, spanning tens of meters at heights relevant for bee foraging. The authors use the term ‘electric pollution’ — the first use of this term in a Cell Press journal.",
          "These findings provide the empirical foundation for BERM’s STATIC and ELF channels. If anthropogenic electric fields reduce pollinator efficiency by 71%, every new power line, transformer, and electric device reduces pollination. Combined with LED lighting’s IF emissions (which affect insect populations through a separate mechanism), the electromagnetic environment exerts a double pressure on pollinator-dependent ecosystems. This is consistent with the global pollinator decline documented by IPBES and the FAO.",
        ],
        studies: [
          { citation: "Clarke et al. (Science)", year: 2013, referenceId: "clarke2013_bee_electroreception", note: "Bees detect floral electric fields — first terrestrial electroreception" },
          { citation: "Greggers et al. (Proc R Soc B)", year: 2013, referenceId: "greggers2013_bee_electric_comm", note: "Bee electric communication in hive, charge up to 450 V" },
          { citation: "Sutton et al. (PNAS)", year: 2016, referenceId: "sutton2016_bee_hair_mechanism", note: "Mechanosensory hairs = electroreceptors in bumblebees" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, referenceId: "morley2018_spider_ballooning", note: "Spiders detect E-fields for ballooning dispersal" },
          { citation: "England et al. (Current Biology)", year: 2023, referenceId: "england_2023_ticks", note: "Ticks attracted electrostatically across air gaps" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, referenceId: "england2024_butterfly_adaptive", note: "Butterfly electrostatic charge is adaptive (natural selection)" },
          { citation: "England & Robert (PNAS)", year: 2024, referenceId: "england2024_caterpillar_predator", note: "Caterpillars detect predators electrically before contact" },
          { citation: "Robert (Current Biology)", year: 2024, referenceId: "robert2024_aerial_electroreception_review", note: "Aerial electroreception formalized as sensory modality" },
          { citation: "Mallinson et al. (iScience / Cell Press)", year: 2025, referenceId: "mallinson2025_electric_pollution", note: "Field experiment: AC fields −71% bee landings, term ‘electric pollution’" },
        ],
      },
      {
        id: "weather-radar",
        title: "Weather radar networks and sentinel species",
        paragraphs: [
          "Weather surveillance radars are among the most powerful EMF sources in the environment. NEXRAD (USA, 159 stations) and equivalent European networks operate at S-band (2.7–3.0 GHz — nearly identical to Wi-Fi) or C-band (5.6 GHz), transmitting 250 kW to 1 MW peak power in rotating beams that sweep the entire landscape 24/7. Protected nature reserves are not shielded from radar signals.",
          "The temporal coincidence with insect decline is notable: NEXRAD deployment began in 1988 and was complete by 1997. [[ref:hallmann2017_v2|Hallmann’s]] insect biomass data begins in 1989 — one year after the first NEXRAD installations. European Doppler radar networks were built on a similar timeline. The S-band frequency (2.8 GHz, λ/2 ≈ 5.4 cm) matches the body size of large flying insects, producing resonant absorption ([[ref:thielens2018|Thielens 2018]]).",
          "[[ref:nicholls2007|Nicholls & Racey (2007, PLOS ONE)]] demonstrated that bat activity was significantly reduced near radar installations at field strengths above 2 V/m. In a follow-up study ([[ref:nicholls2009|2009]]), a portable radar reduced foraging bat activity, suggesting EMF rather than noise or visual cues was responsible.",
          "Weather radar data is now widely used to monitor insect populations. These studies use the radar to measure insect density but do not consider whether the radar itself affects the insects being measured — a methodological blind spot that BERM identifies as a critical research gap. The 2024 German analysis (Archiv für Naturschutz und Landschaftsforschung) reanalyzed [[ref:hallmann2017_v2|Hallmann]]-type data with proximity to mobile base stations and weather radar as covariates — both predicted insect decline independently of pesticide load and land use. This is proxy masking in action: conventional analyses attribute declines to pesticides and climate because they never include EMF as a covariate. BERM predicts that when EMF proximity is added, the variance explained by conventional variables will decrease.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, referenceId: "nicholls2007", note: "Bat activity reduced near radar (>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, referenceId: "nicholls2009", note: "Portable radar reduced foraging bat activity" },
          { citation: "Hallmann et al.", year: 2017, referenceId: "hallmann2017_v2", note: "76% insect biomass decline, protected areas, 1989–2016" },
          { citation: "Thielens et al.", year: 2018, referenceId: "thielens2018", note: "Insect RF absorption at 2–120 GHz, resonance effects" },
          { citation: "UK weather radar insect study", year: 2025, referenceId: "uk_weather_radar_insects_2025", note: "Radar used to TRACK insects, not test radar effects" },
          { citation: "NEXRAD insect density study", year: 2025, referenceId: "nexrad_insect_density_2025", note: "140 radars track US insects — radar impact not considered" },
        ],
      },
      {
        id: "plant-cry",
        title: "Plants respond to EMF through the same molecule",
        paragraphs: [
          "Cryptochrome (CRY) was first characterized in plants — Arabidopsis thaliana, 1993 — before its role in animal magnetoreception was recognized. CRY2 is the primary photoperiodic flowering receptor in Arabidopsis: the CRY2 → CONSTANS → FLOWERING LOCUS T (FT) pathway triggers flowering induction ([[ref:arabidopsis_book_cry|Arabidopsis Book 2010]]). This means the same molecule that BERM identifies as the key EMF sensor in animals (Pathway B) has its best-documented reproductive function in plants.",
          "Plant CRY responds to magnetic fields. [[ref:xu2014_cry_phosphorylation|Xu et al. (2014)]] showed that a 500 µT magnetic field enhanced CRY1 and CRY2 blue-light-dependent phosphorylations in Arabidopsis, while near-null field weakened CRY2 phosphorylation. [[ref:xu2015_flowering_nnmf|Xu et al. (2015)]] demonstrated that near-null magnetic field suppresses Arabidopsis flowering in a blue-light-dependent manner — direct evidence that the geomagnetic field regulates plant reproduction through CRY. [[ref:agliassa2018_gmf_cry_phytochrome|Agliassa et al. (2018)]] confirmed geomagnetic field impacts on CRY signaling and gene expression.",
          "The critical finding: [[ref:ahmad2020_cry1_rf|Ahmad et al. (2020, Scientific Reports)]] showed that a weak 7 MHz radiofrequency magnetic field significantly reduces Arabidopsis CRY1's biological response to blue light. This is the same RPM diagnostic fingerprint as Ritz's (2004) result in migratory birds: Larmor-frequency RF disrupts cryptochrome function. The authors note the effect is 'relatively minor' — consistent with BERM's prediction, since plants synthesize their own riboflavin (B2) and maintain endogenous FAD supply, making them less vulnerable than animals that depend on dietary B2.",
          "RF affects plant reproduction in the field. [[ref:lettuce_rf_2023|PMC10005510 (2023)]]: Wi-Fi frequencies (2.4 GHz and 5 GHz) accelerated lettuce flowering time in field conditions and reduced photosynthetic efficiency. [[ref:field_plants_rf_2023|Ecological Indicators (2023)]]: 866–868 MHz RF exposure from seed to maturity altered growth and development in 10 wild plant species — the first controlled field experiment of wild plant RF response. [[ref:haggerty2010_aspen_rf|Haggerty (2010)]]: RF background adversely affected trembling aspen seedling growth, leaf development, and anthocyanin production.",
          "The implication is fundamental: the same molecule (CRY), the same cofactor (FAD), and the same mechanism (RPM) regulate reproduction in both plants (flowering) and animals (melatonin → HPG axis). Anthropogenic RF disrupts both simultaneously. 'Insect decline', 'bird decline', and 'fertility crisis' are not three separate crises — they are one crisis mediated by one molecule.",
          "Masting — the synchronized mass seed production by trees at 2–8 year intervals — provides a further test. [[ref:bogdziewicz2024_nature_plants_solstice|Bogdziewicz et al. (2024, Nature Plants)]] showed that European beech synchronizes masting across 2,000 km using the summer solstice as a 'celestial starting gun'. The geomagnetic field is the only environmental signal that is homogeneous at this spatial scale. BERM proposes CRY2 as the synchronizer: it reads photoperiod, temperature, AND geomagnetic field simultaneously. [[ref:bogdziewicz2021_climate_masting|Bogdziewicz et al. (2021)]] report that masting synchrony is weakening — attributed to climate change, but BERM's alternative explanation is RF disruption of CRY2. [[ref:ascoli2017_nao_masting|Ascoli et al. (2017, Nature Communications)]]: NAO teleconnections correlate with masting synchrony across decades, but these relationships are non-stationary — consistent with a changing electromagnetic environment.",
        ],
        studies: [
          { citation: "Ahmad et al. (Scientific Reports)", year: 2020, referenceId: "ahmad2020_cry1_rf", note: "7 MHz RF reduces CRY1 response in Arabidopsis — RPM fingerprint in plants" },
          { citation: "Xu et al. (Adv. Space Res.)", year: 2014, referenceId: "xu2014_cry_phosphorylation", note: "500 µT enhances CRY phosphorylation; near-zero weakens it" },
          { citation: "Xu et al. (Bioelectromagnetics)", year: 2015, referenceId: "xu2015_flowering_nnmf", note: "Near-null field suppresses flowering — geomagnetic field → CRY → reproduction" },
          { citation: "Agliassa et al. (J Photochem Photobiol B)", year: 2018, referenceId: "agliassa2018_gmf_cry_phytochrome", note: "Geomagnetic field affects CRY signaling and gene expression" },
          { citation: "Arabidopsis Book (review)", year: 2010, referenceId: "arabidopsis_book_cry", note: "CRY2 → CONSTANS → FT: primary photoperiodic flowering pathway" },
          { citation: "PMC10005510 (Plants MDPI)", year: 2023, referenceId: "lettuce_rf_2023", note: "Wi-Fi accelerated lettuce flowering in field conditions" },
          { citation: "Ecological Indicators", year: 2023, referenceId: "field_plants_rf_2023", note: "868 MHz RF altered 10 wild plant species — first field experiment" },
          { citation: "Haggerty (Int J Forestry Res)", year: 2010, referenceId: "haggerty2010_aspen_rf", note: "RF background affected aspen seedling growth and anthocyanin" },
          { citation: "Bogdziewicz et al. (Nature Plants)", year: 2024, referenceId: "bogdziewicz2024_nature_plants_solstice", note: "Masting synchronizes 2,000 km via summer solstice — CRY2 as candidate synchronizer" },
          { citation: "Bogdziewicz et al. (Commun Biol)", year: 2021, referenceId: "bogdziewicz2021_climate_masting", note: "Masting synchrony weakening — RF disruption alternative to climate" },
          { citation: "Ascoli et al. (Nature Commun)", year: 2017, referenceId: "ascoli2017_nao_masting", note: "NAO–masting correlations are non-stationary across decades" },
        ],
      },
    ],
    seeAlso: "See also",
    evidencePortal: "Evidence register →",
    thCitation: "Citation",
    thYear: "Year",
    thNote: "Note",
  },
  fi: {
    title: "Ekologinen ja sentinellievidenssi",
    subtitle: "Sähköekologia ja säätutkavaikutukset indikaattorilajeihin",
    backLink: "← Takaisin evidenssiin",
    narratives: [
      {
        id: "electroecology",
        title: "Sähköekologia: sähkösaasteen tutkimus",
        paragraphs: [
          "Ilman sähkökentän havaitseminen (aerial electroreception) on tunnistettu omana aistimodaalisuutenaan niveljalkaisilla ([[ref:robert2024_aerial_electroreception_review|Robert 2024, Current Biology]]). Mehiläiset havaitsevat kukkien sähkökentät ravinnonhaun optimoimiseksi ([[ref:clarke2013_bee_electroreception|Clarke 2013, Science]]). Niiden mekanosensoriset karvat taipuvat fyysisesti sähkökentässä ja välittävät hermosignaaleja ([[ref:sutton2016_bee_hair_mechanism|Sutton 2016, PNAS]]). Mehiläiset viestivät pesässä sähköstaattisilla signaaleilla heiluritanssin aikana, yksittäisen mehiläisen varauksen ollessa jopa 450 V ([[ref:greggers2013_bee_electric_comm|Greggers 2013, Proc R Soc B]]). Hämähäkit havaitsevat ilmakehän sähkökenttiä lentämistä (ballooning) varten ([[ref:morley2018_spider_ballooning|Morley & Robert 2018, Current Biology]]). Toukat havaitsevat lähestyvän ampiaisen sähköisesti ennen kontaktia ([[ref:england2024_caterpillar_predator|England & Robert 2024, PNAS]]). Punkkeja vedetään isäntiin ilmarakojen yli sähköstaattisilla voimilla ([[ref:england_2023_ticks|England 2023, Current Biology]]).",
          "Sähköstaattinen varautuminen ei ole lennon passiivinen sivutuote. Vuoden 2024 tutkimus 269 perhosesta ja yöperhosesta 11 lajin poikki osoitti, että staattisen varauksen määrä vaihtelee systemaattisesti ekologian mukaan — vieraileeko laji kukilla, onko se trooppinen vai lentääkö se yöllä ([[ref:england2024_butterfly_adaptive|England & Robert 2024, J R Soc Interface]]). Tämä on ensimmäinen todiste siitä, että sähköstaattiset ominaisuudet ovat adaptiivisia piirteitä, joita luonnonvalinta on muokannut. Jos evoluutio on optimoinut eliöiden sähköstaattisia ominaisuuksia, muuttunut sähköstaattinen ympäristö (synteettiset materiaalit, muovipinnat, sähkölaitteet) häiritsee tätä optimointia — sama logiikka kuin BERM:n evolutionäärinen kalibraatioperiaate STATIC-kanavassa.",
          "Kenttäkokeissa kaupunkiniityillä [[ref:mallinson2025_electric_pollution|Mallinson ym. (2025, iScience)]] osoittivat, että heikot ihmisperäiset sähkökentät vähensivät mehiläisten kukille laskeutumista 71 % (AC-kentät) ja 53 % (positiiviset DC-kentät). Suurjännitevoimalinjojen lähellä mitatut kenttävoimakkuudet olivat verrattavissa kokeellisiin, ulottuen kymmenien metrien etäisyydelle mehiläisten ravinnonhakukorkeudella. Tekijät käyttävät termiä ‘electric pollution’ (sähkösaaste) — ensimmäinen kerta kun tätä termiä käytetään Cell Press -lehdessä.",
          "Nämä löydökset tarjoavat empiirisen perustan BERM:n STATIC- ja ELF-kanaville. Jos ihmisperäiset sähkökentät vähentävät pölyttäjien tehokkuutta 71 %, jokainen uusi voimalinja, muuntaja ja sähkölaite vähentää pölytystä. Yhdistettynä LED-valaistuksen IF-emissioihin (jotka vaikuttavat hyönteispopulaatioihin eri mekanismilla), sähkömagneettinen ympäristö kohdistaa kaksinkertaisen paineen pölyttäjäriippuvaisiin ekosysteemeihin. Tämä on yhdenmukaista IPBES:n ja FAO:n dokumentoiman globaalin pölyttäjäkadon kanssa.",
        ],
        studies: [
          { citation: "Clarke ym. (Science)", year: 2013, referenceId: "clarke2013_bee_electroreception", note: "Mehiläiset havaitsevat kukkien sähkökentät — ensimmäinen maaeläimen sähköreseptio" },
          { citation: "Greggers ym. (Proc R Soc B)", year: 2013, referenceId: "greggers2013_bee_electric_comm", note: "Mehiläisten sähköinen viestintä pesässä, varaus 450 V" },
          { citation: "Sutton ym. (PNAS)", year: 2016, referenceId: "sutton2016_bee_hair_mechanism", note: "Mekanosensoriset karvat = sähköreseptorit kimalaisilla" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, referenceId: "morley2018_spider_ballooning", note: "Hämähäkit havaitsevat sähkökenttiä lentämistä varten" },
          { citation: "England ym. (Current Biology)", year: 2023, referenceId: "england_2023_ticks", note: "Punkit kulkeutuvat sähköstaattisesti ilmarakojen yli" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, referenceId: "england2024_butterfly_adaptive", note: "Perhosten sähkövaraus adaptiivinen (luonnonvalinta)" },
          { citation: "England & Robert (PNAS)", year: 2024, referenceId: "england2024_caterpillar_predator", note: "Toukat havaitsevat saalistajan sähköisesti ennen kontaktia" },
          { citation: "Robert (Current Biology)", year: 2024, referenceId: "robert2024_aerial_electroreception_review", note: "Ilman sähköreseptio virallistettu aistimodaalisuutena" },
          { citation: "Mallinson ym. (iScience / Cell Press)", year: 2025, referenceId: "mallinson2025_electric_pollution", note: "Kenttäkoe: AC-kentät −71 % mehiläislaskeutumisia, termi ‘electric pollution’" },
        ],
      },
      {
        id: "weather-radar",
        title: "Säätutkäverkostot ja indikaattorilajit",
        paragraphs: [
          "Säävalvontatutkat ovat ympäristön voimakkaimpia EMF-lähteitä. NEXRAD (USA, 159 asemaa) ja vastaavat eurooppalaiset verkostot toimivat S-kaistalla (2,7–3,0 GHz — lähes identtinen Wi-Fi:n kanssa) tai C-kaistalla (5,6 GHz), lähettäen 250 kW – 1 MW huipputehoa pyörivissä keiloissa jotka pyyhkäisevät koko maiseman 24/7. Luonnonsuojelualueet eivät ole suojattuja tutkasignaaleilta.",
          "Ajallinen yhteensattuma hyönteiskadon kanssa on huomattava: NEXRAD-asennus alkoi 1988 ja valmistui 1997. [[ref:hallmann2017_v2|Hallmannin]] hyönteisbiomassadata alkaa 1989 — vuosi ensimmäisten NEXRAD-asennusten jälkeen. Eurooppalaiset Doppler-tutkaverkostot rakennettiin vastaavalla aikataululla. S-kaistan taajuus (2,8 GHz, λ/2 ≈ 5,4 cm) vastaa suurten lentävien hyönteisten kehon kokoa, tuottaen resonanssityyppistä absorptiota ([[ref:thielens2018|Thielens 2018]]).",
          "[[ref:nicholls2007|Nicholls & Racey (2007, PLOS ONE)]] osoittivat, että lepakkoaktiivisuus laski merkittävästi tutka-asemien lähellä kenttävoimakkuuksilla yli 2 V/m. Jatkotutkimuksessa ([[ref:nicholls2009|2009]]) kannettava tutka vähensi saalistavien lepakoiden aktiivisuutta, viitaten siihen, että EMF eikä melu tai visuaaliset vihjeet oli vastuussa.",
          "Säätutkadataa käytetään nykyisin laajasti hyönteispopulaatioiden seuraamiseen. Nämä tutkimukset käyttävät tutkaa hyönteistiheyden mittaamiseen mutta eivät harkitse, vaikuttaako tutka itse mitattaviin hyönteisiin — metodologinen sokea piste, jonka BERM tunnistaa kriittiseksi tutkimusaukoksi. Vuoden 2024 saksalaisanalyysi (Archiv für Naturschutz und Landschaftsforschung) analysoi uudelleen [[ref:hallmann2017_v2|Hallmann-tyyppistä]] dataa matkapuhelintukiasemien ja säätutkien läheisyydellä kovariaatteina — molemmat ennustivat hyönteiskatoa riippumatta torjunta-ainekuormasta ja maankäytöstä. Tämä on proksimaskausta käytännössä: tavanomaiset analyysit yhdistävät laskut torjunta-aineisiin ja ilmastolle, koska ne eivät koskaan sisällytä EMF:ää kovariaatiksi. BERM ennustaa, että kun EMF-läheisyys lisätään, tavanomaisten muuttujien selittämä varianssi laskee.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, referenceId: "nicholls2007", note: "Lepakkoaktiivisuus laski tutkan lähellä (>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, referenceId: "nicholls2009", note: "Kannettava tutka vähensi saalistavien lepakoiden aktiivisuutta" },
          { citation: "Hallmann ym.", year: 2017, referenceId: "hallmann2017_v2", note: "76 %:n hyönteisbiomassalasku, suojelualueet, 1989–2016" },
          { citation: "Thielens ym.", year: 2018, referenceId: "thielens2018", note: "Hyönteisten RF-absorptio 2–120 GHz, resonanssivaikutuksia" },
          { citation: "UK:n säätutkahyönteistutkimus", year: 2025, referenceId: "uk_weather_radar_insects_2025", note: "Tutkaa käytetty hyönteisten SEURAAMISEEN, ei vaikutusten testaamiseen" },
          { citation: "NEXRAD-hyönteistiheystutkimus", year: 2025, referenceId: "nexrad_insect_density_2025", note: "140 tutkaa seuraa USA:n hyönteisiä — tutkan vaikutusta ei huomioitu" },
        ],
      },
      {
        id: "plant-cry",
        title: "Kasvit reagoivat EMF:ään saman molekyylin kautta",
        paragraphs: [
          "Kryptokromi (CRY) karakterisoitiin ensin kasveissa — Arabidopsis thaliana, 1993 — ennen kuin sen rooli eläinten magnetoreseptiossa tunnistettiin. CRY2 on Arabidopsiksen ensisijainen fotoperiodinen kukintareseptori: CRY2 → CONSTANS → FLOWERING LOCUS T (FT) -ketju laukaisee kukinta-induktion ([[ref:arabidopsis_book_cry|Arabidopsis Book 2010]]). Sama molekyyli, jonka BERM tunnistaa eläinten EMF-avainsensiriksi (polku B), on parhaiten dokumentoitu kasvien reproduktiivinen funktio.",
          "Kasvi-CRY reagoi magneettikenttiin. [[ref:xu2014_cry_phosphorylation|Xu ym. (2014)]] osoittivat, että 500 µT magneettikenttä vahvisti CRY1:n ja CRY2:n sinivaloriippuvaisia fosforylaatioita Arabidopsiksessa, kun taas lähes-nollakenttä heikensi CRY2:n fosforylaatiota. [[ref:xu2015_flowering_nnmf|Xu ym. (2015)]] osoittivat, että lähes-nollakenttä suppressoi Arabidopsiksen kukintaa sinivaloriippuvaisesti — suora todiste siitä, että geomagneettinen kenttä säätelee kasvien lisääntymistä CRY:n kautta. [[ref:agliassa2018_gmf_cry_phytochrome|Agliassa ym. (2018)]] vahvistivat geomagneettisen kentän vaikutukset CRY-signalointiin ja geeniekspressioon.",
          "Kriittisin löydös: [[ref:ahmad2020_cry1_rf|Ahmad ym. (2020, Scientific Reports)]] osoittivat, että heikko 7 MHz radiotaajuinen magneettikenttä vähentää merkitsevästi Arabidopsiksen CRY1:n biologista responssia siniseen valoon. Tämä on sama RPM-diagnostinen sormenjälki kuin Ritzin (2004) tulos muuttolinnuissa: Larmor-taajuuden RF häiritsee kryptokromin toimintaa. Tekijät toteavat efektin olevan 'relatively minor' — yhdenmukainen BERM:n ennusteen kanssa, koska kasvit syntetisoivat oman riboflaviininsa (B2) ja ylläpitävät endogeenistä FAD-saatavuutta, tehden niistä vähemmän haavoittuvia kuin eläimistä jotka riippuvat ravinnon B2:sta.",
          "RF vaikuttaa kasvien lisääntymiseen kentällä. [[ref:lettuce_rf_2023|PMC10005510 (2023)]]: Wi-Fi-taajuudet (2,4 GHz ja 5 GHz) kiihdyttivät salaatin kukintaa kenttäolosuhteissa ja laskivat fotosynteesitehokkuutta. [[ref:field_plants_rf_2023|Ecological Indicators (2023)]]: 866–868 MHz RF-altistus siemenestä kypsymiseen muutti 10 villin kasvilajin kasvua ja kehitystä — ensimmäinen kontrolloitu kenttäkoe villien kasvien RF-vasteesta. [[ref:haggerty2010_aspen_rf|Haggerty (2010)]]: RF-tausta vaikutti haitallisesti haavan taimien kasvuun, lehtikehitykseen ja antosyaanituotantoon.",
          "Implikaatio on perustavanlaatuinen: sama molekyyli (CRY), sama kofaktori (FAD) ja sama mekanismi (RPM) säätelevät lisääntymistä sekä kasveissa (kukinta) että eläimissä (melatoniini → HPG-akseli). Antropogeeninen RF häiritsee molempia samanaikaisesti. 'Hyönteiskato', 'lintukato' ja 'hedelmällisyyskriisi' eivät ole kolme erillistä kriisiä — ne ovat yksi kriisi yhden molekyylin välittämänä.",
          "Masting — puiden synkronoitu massasiementuotanto 2–8 vuoden välein — tarjoaa lisätestin. [[ref:bogdziewicz2024_nature_plants_solstice|Bogdziewicz ym. (2024, Nature Plants)]] osoittivat, että eurooppalainen pyökki synkronoi mastingin 2 000 km:n etäisyydelle käyttäen kesäpäivänseisausta 'aloituspistoolin' tavoin. Geomagneettinen kenttä on ainoa ympäristösignaali joka on homogeeninen tällä spatiaalisella skaalalla. BERM ehdottaa CRY2:ta synkronoijaksi: se lukee samanaikaisesti fotoperiodiin, lämpötilaan JA geomagneettiseen kenttään. [[ref:bogdziewicz2021_climate_masting|Bogdziewicz ym. (2021)]] raportoivat masting-synkronian heikkenemisestä — selitetty ilmastonmuutoksella, mutta BERM:n vaihtoehtoinen selitys on CRY2:n RF-häiriö. [[ref:ascoli2017_nao_masting|Ascoli ym. (2017, Nature Communications)]]: NAO-telekytkennät korreloivat masting-synkronian kanssa vuosikymmenien yli, mutta nämä suhteet ovat epästationaarisia — yhdenmukainen muuttuvan sähkömagneettisen ympäristön kanssa.",
        ],
        studies: [
          { citation: "Ahmad ym. (Scientific Reports)", year: 2020, referenceId: "ahmad2020_cry1_rf", note: "7 MHz RF vähentää CRY1:n responssia Arabidopsiksessa — RPM-sormenjälki kasveissa" },
          { citation: "Xu ym. (Adv. Space Res.)", year: 2014, referenceId: "xu2014_cry_phosphorylation", note: "500 µT vahvistaa CRY-fosforylaatiota; lähes-nolla heikentää" },
          { citation: "Xu ym. (Bioelectromagnetics)", year: 2015, referenceId: "xu2015_flowering_nnmf", note: "Lähes-nollakenttä suppressoi kukintaa — geomagneettinen kenttä → CRY → lisääntyminen" },
          { citation: "Agliassa ym. (J Photochem Photobiol B)", year: 2018, referenceId: "agliassa2018_gmf_cry_phytochrome", note: "Geomagneettinen kenttä vaikuttaa CRY-signalointiin ja geeniekspressioon" },
          { citation: "Arabidopsis Book (katsaus)", year: 2010, referenceId: "arabidopsis_book_cry", note: "CRY2 → CONSTANS → FT: ensisijainen fotoperiodinen kukintareitti" },
          { citation: "PMC10005510 (Plants MDPI)", year: 2023, referenceId: "lettuce_rf_2023", note: "Wi-Fi kiihdytti salaatin kukintaa kenttäolosuhteissa" },
          { citation: "Ecological Indicators", year: 2023, referenceId: "field_plants_rf_2023", note: "868 MHz RF muutti 10 villiä kasvilajia — ensimmäinen kenttäkoe" },
          { citation: "Haggerty (Int J Forestry Res)", year: 2010, referenceId: "haggerty2010_aspen_rf", note: "RF-tausta vaikutti haavan taimien kasvuun ja antosyaaniin" },
          { citation: "Bogdziewicz ym. (Nature Plants)", year: 2024, referenceId: "bogdziewicz2024_nature_plants_solstice", note: "Masting synkronoituu 2 000 km kesäpäivänseisauksella — CRY2 ehdokassynkronoija" },
          { citation: "Bogdziewicz ym. (Commun Biol)", year: 2021, referenceId: "bogdziewicz2021_climate_masting", note: "Masting-synkronia heikkenee — RF-häiriö vaihtoehto ilmastolle" },
          { citation: "Ascoli ym. (Nature Commun)", year: 2017, referenceId: "ascoli2017_nao_masting", note: "NAO–masting-korrelaatiot ovat epästationaarisia vuosikymmenien yli" },
        ],
      },
    ],
    seeAlso: "Katso myös",
    evidencePortal: "Evidenssirekisteri →",
    thCitation: "Viite",
    thYear: "Vuosi",
    thNote: "Huomio",
  },
  ja: {
    title: "生態学的・センチネル種の証拠",
    subtitle: "電気生態学と気象レーダーのセンチネル種への影響",
    backLink: "← 証拠に戻る",
    narratives: [
      {
        id: "electroecology",
        title: "電気生態学：電気汚染の新興科学",
        paragraphs: [
          "空中電気受容（aerial electroreception）——空中の電場を感知する能力——は、節足動物において認知された感覚モダリティとして確立されている（[[ref:robert2024_aerial_electroreception_review|Robert 2024, Current Biology]]）。ミツバチは花の電場を感知して採餌を最適化する（[[ref:clarke2013_bee_electroreception|Clarke 2013, Science]]）。その機械感覚毛は電場中で物理的にたわみ、神経信号を伝達する（[[ref:sutton2016_bee_hair_mechanism|Sutton 2016, PNAS]]）。ミツバチは巣箱内で尻振りダンス中に静電気信号を使ってコミュニケーションし、個々のミツバチの電荷は450 Vに達する（[[ref:greggers2013_bee_electric_comm|Greggers 2013, Proc R Soc B]]）。クモはバルーニングのために大気電場を感知する（[[ref:morley2018_spider_ballooning|Morley & Robert 2018, Current Biology]]）。イモムシは接触前に近づくハチを電気的に感知する（[[ref:england2024_caterpillar_predator|England & Robert 2024, PNAS]]）。ダニは静電気力によって空気の隔たりを越えて宿主に受動的に引き寄せられる（[[ref:england_2023_ticks|England 2023, Current Biology]]）。",
          "静電気帯電は飛行の受動的な副産物ではない。269頭のチョウとガの11種を対象とした2024年の研究では、静電気量が生態学に応じて体系的に変動することが示された——その種が花を訪れるか、熱帯産か、夜行性かどうか（[[ref:england2024_butterfly_adaptive|England & Robert 2024, J R Soc Interface]]）。これは静電気特性が自然選択によって形成された適応的形質であるという最初の証拠である。進化が生物の静電気特性を最適化しているなら、変化した静電気環境（合成材料、プラスチック表面、電気機器）はその最適化を乱す——BERMの進化的キャリブレーション原理をSTATICチャネルに適用したのと同じ論理である。",
          "都市の草地でのフィールド実験で、[[ref:mallinson2025_electric_pollution|Mallinsonら（2025, iScience）]]は、弱い人為的電場がミツバチの花への着地を71%（AC電場）およこ53%（正のDC電場）減少させることを実証した。高圧送電線近くの電場測定では、実験で使用されたものと同等の持続的な電場強度が明らかになり、ミツバチの採餌高度で数十メートルに及んでいた。著者らは「electric pollution」（電気汚染）という用語を使用しており、Cell Press誌でこの用語が使用されたのは初めてである。",
          "これらの知見は、BERMのSTATICおよびELFチャネルの実証的基盤を提供する。人為的電場が花粉媒介者の効率を71%低下させるなら、すべての新しい送電線、変圧器、電気機器が花粉媒介を減少させる。LED照明のIF放射（別のメカニズムで昆虫個体群に影響する）と組み合わせると、電磁環境は花粉媒介者依存の生態系に二重の圧力をかける。これはIPBESとFAOが文書化した世界的な花粉媒介者の減少と一致している。",
        ],
        studies: [
          { citation: "Clarke et al. (Science)", year: 2013, referenceId: "clarke2013_bee_electroreception", note: "ミツバチが花の電場を感知——初の陸生電気受容" },
          { citation: "Greggers et al. (Proc R Soc B)", year: 2013, referenceId: "greggers2013_bee_electric_comm", note: "巣箱内でのミツバチの電気的コミュニケーション、電荷450 V" },
          { citation: "Sutton et al. (PNAS)", year: 2016, referenceId: "sutton2016_bee_hair_mechanism", note: "機械感覚毛 = マルハナバチの電気受容器" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, referenceId: "morley2018_spider_ballooning", note: "クモがバルーニング拡散のために電場を感知" },
          { citation: "England et al. (Current Biology)", year: 2023, referenceId: "england_2023_ticks", note: "ダニが静電気的に空気の隔たりを越えて引き寄せられる" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, referenceId: "england2024_butterfly_adaptive", note: "チョウの静電気帯電は適応的（自然選択）" },
          { citation: "England & Robert (PNAS)", year: 2024, referenceId: "england2024_caterpillar_predator", note: "イモムシが接触前に捕食者を電気的に感知" },
          { citation: "Robert (Current Biology)", year: 2024, referenceId: "robert2024_aerial_electroreception_review", note: "空中電気受容が感覚モダリティとして正式化" },
          { citation: "Mallinson et al. (iScience / Cell Press)", year: 2025, referenceId: "mallinson2025_electric_pollution", note: "フィールド実験：AC電場でミツバチの着地−71%、「electric pollution」という用語" },
        ],
      },
      {
        id: "weather-radar",
        title: "気象レーダーネットワークとセンチネル種",
        paragraphs: [
          "気象監視レーダーは環境中で最も強力なEMF源の一つである。NEXRAD（米国、159局）と同等の欧州ネットワークはSバンド（2.7–3.0 GHz——Wi-Fiとほぼ同一）またはCバンド（5.6 GHz）で動作し、250 kWから1 MWのピーク電力を回転ビームで送信し、全景観を24時間365日推引する。保護された自然保護区はレーダー信号から遮蔽されていない。",
          "昆虫減少との時間的一致は注目に値する：NEXRADの展開は1988年に始まり、1997年までに完了した。[[ref:hallmann2017_v2|Hallmann]]の昆虫バイオマスデータは1989年に始まる——最初のNEXRAD設置の1年後である。欧州Dopplerレーダーネットワークも同様のタイムラインで建設された。Sバンド周波数（2.8 GHz、λ/2 ≈ 5.4 cm）は大型飛翔昆虫の体サイズと一致し、共振吸収を生じる（[[ref:thielens2018|Thielens 2018]]）。",
          "[[ref:nicholls2007|Nicholls & Racey（2007, PLOS ONE）]]は、2 V/mを超える電場強度でレーダー設備近くのコウモリの活動が有意に減少することを実証した。フォローアップ研究（[[ref:nicholls2009|2009]]）では、携帯型レーダーが採餌中のコウモリの活動を減少させ、騒音や視覚的手がかりではなくEMFが原因であることが示唆された。",
          "気象レーダーデータは現在、昆虫個体群の監視に広く使用されている。これらの研究はレーダーを使って昆虫密度を測定するが、レーダー自体が測定対象の昆虫に影響を与えるかどうかは考慮されていない——BERMが重要な研究ギャップとして識別する方法論的盲点である。2024年のドイツの分析（Archiv für Naturschutz und Landschaftsforschung）は[[ref:hallmann2017_v2|Hallmann]]型データを携帯電話基地局と気象レーダーへの近接性を共変量として再分析し、両者が農薬負荷と土地利用とは独立に昆虫減少を予測した。これはプロキシマスキングの実例である：従来の分析はEMFを共変量として含めないため、減少を農薬と気候に帰属させる。BERMはEMF近接性が追加されれば、従来の変数で説明される分散が減少すると予測する。",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, referenceId: "nicholls2007", note: "レーダー近くでコウモリの活動が減少（>2 V/m）" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, referenceId: "nicholls2009", note: "携帯型レーダーが採餌中のコウモリの活動を減少" },
          { citation: "Hallmann et al.", year: 2017, referenceId: "hallmann2017_v2", note: "76%の昆虫バイオマス減少、保護区域、1989–2016" },
          { citation: "Thielens et al.", year: 2018, referenceId: "thielens2018", note: "昆虫のRF吸収 2–120 GHz、共振効果" },
          { citation: "UK weather radar insect study", year: 2025, referenceId: "uk_weather_radar_insects_2025", note: "レーダーは昆虫の追跡に使用、レーダーの影響テストには使用せず" },
          { citation: "NEXRAD insect density study", year: 2025, referenceId: "nexrad_insect_density_2025", note: "140基のレーダーが米国の昆虫を追跡——レーダーの影響は考慮されず" },
        ],
      },
      {
        id: "plant-cry",
        title: "植物は同じ分子を通じてEMFに応答する",
        paragraphs: [
          "クリプトクロム（CRY）は植物で最初に特性化された——シロイヌナズナ（Arabidopsis thaliana）、1993年——動物の磁気受容における役割が認識される前であった。CRY2はシロイヌナズナの主要な光周性開花受容体であり、CRY2→CONSTANS→FLOWERING LOCUS T（FT）経路が開花誘導を引き起こす（[[ref:arabidopsis_book_cry|Arabidopsis Book 2010]]）。BERMが動物のEMFセンサーとして同定した分子（経路B）は、植物において最もよく文書化された生殖機能を持つ。",
          "植物CRYは磁場に応答する。[[ref:xu2014_cry_phosphorylation|Xu et al.（2014）]]は、500 µTの磁場がシロイヌナズナのCRY1とCRY2の青色光依存性リン酸化を増強し、ほぼゼロ磁場がCRY2リン酸化を弱めることを示した。[[ref:xu2015_flowering_nnmf|Xu et al.（2015）]]は、ほぼゼロ磁場が青色光依存的にシロイヌナズナの開花を抑制することを実証した——地磁気場がCRYを通じて植物の生殖を制御する直接的証拠。[[ref:agliassa2018_gmf_cry_phytochrome|Agliassa et al.（2018）]]は地磁気場のCRYシグナリングと遺伝子発現への影響を確認した。",
          "重要な発見：[[ref:ahmad2020_cry1_rf|Ahmad et al.（2020, Scientific Reports）]]は、弱い7 MHz高周波磁場がシロイヌナズナCRY1の青色光に対する生物学的応答を有意に減少させることを示した。これはRitz（2004）の渡り鳥での結果と同じRPM診断的フィンガープリントである：Larmor周波数のRFがクリプトクロム機能を妨害する。著者は効果が「比較的軽微」であると述べているが、これはBERMの予測と一致する——植物は自らリボフラビン（B2）を合成し内因性FAD供給を維持するため、食事性B2に依存する動物より脆弱性が低い。",
          "RFは野外で植物の生殖に影響する。[[ref:lettuce_rf_2023|PMC10005510（2023）]]：Wi-Fi周波数（2.4 GHzと5 GHz）が野外条件でレタスの開花を加速し光合成効率を低下させた。[[ref:field_plants_rf_2023|Ecological Indicators（2023）]]：866–868 MHz RF曝露が種子から成熟まで10種の野生植物の成長と発達を変化させた——野生植物のRF応答の初の制御された野外実験。[[ref:haggerty2010_aspen_rf|Haggerty（2010）]]：RFバックグラウンドがポプラ実生の成長、葉の発達、アントシアニン産生に悪影響を及ぼした。",
          "その含意は根本的である：同じ分子（CRY）、同じ補因子（FAD）、同じメカニズム（RPM）が植物（開花）と動物（メラトニン→HPG軸）の両方で生殖を制御する。人為的RFは両方を同時に妨害する。「昆虫減少」「鳥類減少」「生殖能力危機」は3つの別々の危機ではない——1つの分子が媒介する1つの危機である。",
          "マスティング——樹木による2〜8年間隔の同期的大量種子生産——はさらなるテストを提供する。[[ref:bogdziewicz2024_nature_plants_solstice|Bogdziewicz et al.（2024, Nature Plants）]]はヨーロッパブナが夏至を「天体のスターティングガン」として2,000 kmにわたってマスティングを同期させることを示した。地磁気場はこの空間スケールで均一な唯一の環境シグナルである。BERMはCRY2を同期装置として提案する。[[ref:bogdziewicz2021_climate_masting|Bogdziewicz et al.（2021）]]はマスティング同期の弱体化を報告——気候変動に帰されているが、BERMの代替説明はCRY2のRF妨害である。[[ref:ascoli2017_nao_masting|Ascoli et al.（2017, Nature Communications）]]：NAOテレコネクションはマスティング同期と相関するが、これらの関係は非定常的——変化する電磁環境と整合的。",
        ],
        studies: [
          { citation: "Ahmad et al. (Scientific Reports)", year: 2020, referenceId: "ahmad2020_cry1_rf", note: "7 MHz RFがシロイヌナズナのCRY1応答を減少 — 植物でのRPMフィンガープリント" },
          { citation: "Xu et al. (Adv. Space Res.)", year: 2014, referenceId: "xu2014_cry_phosphorylation", note: "500 µTがCRYリン酸化を増強; ほぼゼロが弱化" },
          { citation: "Xu et al. (Bioelectromagnetics)", year: 2015, referenceId: "xu2015_flowering_nnmf", note: "ほぼゼロ磁場が開花を抑制 — 地磁気→CRY→生殖" },
          { citation: "Agliassa et al. (J Photochem Photobiol B)", year: 2018, referenceId: "agliassa2018_gmf_cry_phytochrome", note: "地磁気場がCRYシグナリングと遺伝子発現に影響" },
          { citation: "Arabidopsis Book (レビュー)", year: 2010, referenceId: "arabidopsis_book_cry", note: "CRY2→CONSTANS→FT: 主要な光周性開花経路" },
          { citation: "PMC10005510 (Plants MDPI)", year: 2023, referenceId: "lettuce_rf_2023", note: "Wi-Fiが野外でレタスの開花を加速" },
          { citation: "Ecological Indicators", year: 2023, referenceId: "field_plants_rf_2023", note: "868 MHz RFが10野生植物種に影響 — 初の野外実験" },
          { citation: "Haggerty (Int J Forestry Res)", year: 2010, referenceId: "haggerty2010_aspen_rf", note: "RFバックグラウンドがポプラ実生の成長とアントシアニンに影響" },
          { citation: "Bogdziewicz et al. (Nature Plants)", year: 2024, referenceId: "bogdziewicz2024_nature_plants_solstice", note: "マスティングが夏至を介して2,000 kmで同期 — CRY2が候補同期装置" },
          { citation: "Bogdziewicz et al. (Commun Biol)", year: 2021, referenceId: "bogdziewicz2021_climate_masting", note: "マスティング同期の弱体化 — RF妨害が気候の代替" },
          { citation: "Ascoli et al. (Nature Commun)", year: 2017, referenceId: "ascoli2017_nao_masting", note: "NAO-マスティング相関は数十年にわたり非定常的" },
        ],
      },
    ],
    seeAlso: "関連項目",
    evidencePortal: "証拠レジスター →",
    thCitation: "引用",
    thYear: "年",
    thNote: "注記",
  },
  fr: {
    title: "Preuves écologiques et sentinelles",
    subtitle: "Électroécologie et effets des radars météorologiques sur les espèces sentinelles",
    backLink: "← Retour aux preuves",
    narratives: [
      {
        id: "electroecology",
        title: "Électroécologie : la science émergente de la pollution électrique",
        paragraphs: [
          "L’électroréception aérienne — la capacité à détecter les champs électriques aériens — s’est imposée comme une modalité sensorielle reconnue chez les arthropodes ([[ref:robert2024_aerial_electroreception_review|Robert 2024, Current Biology]]). Les abeilles détectent les champs électriques floraux pour optimiser le butinage ([[ref:clarke2013_bee_electroreception|Clarke 2013, Science]]). Leurs poils mécanosensoriels se courbent physiquement dans les champs électriques, transmettant des signaux nerveux ([[ref:sutton2016_bee_hair_mechanism|Sutton 2016, PNAS]]). Les abeilles communiquent dans la ruche par des signaux électrostatiques pendant la danse frétillante, la charge individuelle d’une abeille atteignant 450 V ([[ref:greggers2013_bee_electric_comm|Greggers 2013, Proc R Soc B]]). Les araignées détectent les champs électriques atmosphériques pour le « ballooning » ([[ref:morley2018_spider_ballooning|Morley & Robert 2018, Current Biology]]). Les chenilles détectent électriquement les guêpes qui approchent avant le contact ([[ref:england2024_caterpillar_predator|England & Robert 2024, PNAS]]). Les tiques sont attirées passivement vers leurs hôtes à travers des espaces d’air par des forces électrostatiques ([[ref:england_2023_ticks|England 2023, Current Biology]]).",
          "La charge électrostatique n’est pas un sous-produit passif du vol. Une étude de 2024 portant sur 269 papillons diurnes et nocturnes de 11 espèces a montré que la quantité de charge statique varie systématiquement avec l’écologie — selon que l’espèce visite des fleurs, est tropicale ou vole la nuit ([[ref:england2024_butterfly_adaptive|England & Robert 2024, J R Soc Interface]]). C’est la première preuve que les propriétés électrostatiques sont des traits adaptatifs façonnés par la sélection naturelle. Si l’évolution a optimisé les propriétés électrostatiques des organismes, un environnement électrostatique modifié (matériaux synthétiques, surfaces en plastique, appareils électriques) perturbe cette optimisation — la même logique que le principe de calibration évolutive de BERM appliqué au canal STATIC.",
          "Dans des expériences de terrain dans des prairies urbaines, [[ref:mallinson2025_electric_pollution|Mallinson et al. (2025, iScience)]] ont démontré que de faibles champs électriques anthropiques réduisent les atterrissages floraux des abeilles de 71 % (champs AC) et 53 % (champs DC positifs). Les mesures de champs électriques près des lignes à haute tension ont révélé des intensités persistantes comparables à celles utilisées expérimentalement, s’étendant sur des dizaines de mètres aux hauteurs pertinentes pour le butinage. Les auteurs utilisent le terme « electric pollution » (pollution électrique) — la première utilisation de ce terme dans une revue Cell Press.",
          "Ces résultats fournissent la base empirique des canaux STATIC et ELF de BERM. Si les champs électriques anthropiques réduisent l’efficacité des pollinisateurs de 71 %, chaque nouvelle ligne électrique, transformateur et appareil électrique réduit la pollinisation. Combiné aux émissions IF de l’éclairage LED (qui affectent les populations d’insectes par un mécanisme distinct), l’environnement électromagnétique exerce une double pression sur les écosystèmes dépendants des pollinisateurs. Ceci est cohérent avec le déclin mondial des pollinisateurs documenté par l’IPBES et la FAO.",
        ],
        studies: [
          { citation: "Clarke et al. (Science)", year: 2013, referenceId: "clarke2013_bee_electroreception", note: "Les abeilles détectent les champs électriques floraux — première électroréception terrestre" },
          { citation: "Greggers et al. (Proc R Soc B)", year: 2013, referenceId: "greggers2013_bee_electric_comm", note: "Communication électrique des abeilles dans la ruche, charge jusqu’à 450 V" },
          { citation: "Sutton et al. (PNAS)", year: 2016, referenceId: "sutton2016_bee_hair_mechanism", note: "Poils mécanosensoriels = électrorécepteurs chez les bourdons" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, referenceId: "morley2018_spider_ballooning", note: "Les araignées détectent les champs électriques pour la dispersion par ballooning" },
          { citation: "England et al. (Current Biology)", year: 2023, referenceId: "england_2023_ticks", note: "Les tiques attirées électrostatiquement à travers des espaces d’air" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, referenceId: "england2024_butterfly_adaptive", note: "La charge électrostatique des papillons est adaptative (sélection naturelle)" },
          { citation: "England & Robert (PNAS)", year: 2024, referenceId: "england2024_caterpillar_predator", note: "Les chenilles détectent les prédateurs électriquement avant le contact" },
          { citation: "Robert (Current Biology)", year: 2024, referenceId: "robert2024_aerial_electroreception_review", note: "Électroréception aérienne formalisée comme modalité sensorielle" },
          { citation: "Mallinson et al. (iScience / Cell Press)", year: 2025, referenceId: "mallinson2025_electric_pollution", note: "Expérience de terrain : champs AC −71 % d’atterrissages d’abeilles, terme « electric pollution »" },
        ],
      },
      {
        id: "weather-radar",
        title: "Réseaux de radars météorologiques et espèces sentinelles",
        paragraphs: [
          "Les radars de surveillance météorologique comptent parmi les sources EMF les plus puissantes de l’environnement. NEXRAD (USA, 159 stations) et les réseaux européens équivalents opèrent en bande S (2,7–3,0 GHz — presque identique au Wi-Fi) ou en bande C (5,6 GHz), émettant de 250 kW à 1 MW de puissance crête dans des faisceaux rotatifs qui balaient l’ensemble du paysage 24h/24, 7j/7. Les réserves naturelles protégées ne sont pas protégées des signaux radar.",
          "La coïncidence temporelle avec le déclin des insectes est notable : le déploiement de NEXRAD a commencé en 1988 et était achevé en 1997. Les données de biomasse d’insectes de [[ref:hallmann2017_v2|Hallmann]] débutent en 1989 — un an après les premières installations NEXRAD. Les réseaux de radars Doppler européens ont été construits selon un calendrier similaire. La fréquence de la bande S (2,8 GHz, λ/2 ≈ 5,4 cm) correspond à la taille corporelle des grands insectes volants, produisant une absorption résonante ([[ref:thielens2018|Thielens 2018]]).",
          "[[ref:nicholls2007|Nicholls & Racey (2007, PLOS ONE)]] ont démontré que l’activité des chauves-souris était significativement réduite près des installations radar à des intensités de champ supérieures à 2 V/m. Dans une étude de suivi ([[ref:nicholls2009|2009]]), un radar portable a réduit l’activité de chasse des chauves-souris, suggérant que l’EMF plutôt que le bruit ou les indices visuels en était responsable.",
          "Les données de radars météorologiques sont désormais largement utilisées pour surveiller les populations d’insectes. Ces études utilisent le radar pour mesurer la densité d’insectes mais ne considèrent pas si le radar lui-même affecte les insectes mesurés — un angle mort méthodologique que BERM identifie comme un déficit de recherche critique. L’analyse allemande de 2024 (Archiv für Naturschutz und Landschaftsforschung) a réanalysé des données de type [[ref:hallmann2017_v2|Hallmann]] avec la proximité des stations de base mobiles et des radars météorologiques comme covariables — les deux prédisaient le déclin des insectes indépendamment de la charge en pesticides et de l’utilisation des sols. C’est le proxy masking en action : les analyses conventionnelles attribuent les déclins aux pesticides et au climat parce qu’elles n’incluent jamais l’EMF comme covariable. BERM prédit que lorsque la proximité EMF est ajoutée, la variance expliquée par les variables conventionnelles diminuera.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, referenceId: "nicholls2007", note: "Activité des chauves-souris réduite près des radars (>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, referenceId: "nicholls2009", note: "Un radar portable a réduit l’activité de chasse des chauves-souris" },
          { citation: "Hallmann et al.", year: 2017, referenceId: "hallmann2017_v2", note: "Déclin de 76 % de la biomasse d’insectes, zones protégées, 1989–2016" },
          { citation: "Thielens et al.", year: 2018, referenceId: "thielens2018", note: "Absorption RF des insectes à 2–120 GHz, effets de résonance" },
          { citation: "UK weather radar insect study", year: 2025, referenceId: "uk_weather_radar_insects_2025", note: "Radar utilisé pour SUIVRE les insectes, pas pour tester les effets du radar" },
          { citation: "NEXRAD insect density study", year: 2025, referenceId: "nexrad_insect_density_2025", note: "140 radars suivent les insectes aux USA — impact du radar non considéré" },
        ],
      },
      {
        id: "plant-cry",
        title: "Les plantes repondent aux EMF par la meme molecule",
        paragraphs: [
          "Le cryptochrome (CRY) a ete caracterise d'abord chez les plantes — Arabidopsis thaliana, 1993 — avant que son role dans la magnetoreception animale ne soit reconnu. CRY2 est le principal recepteur photoperiodique de la floraison chez Arabidopsis : la voie CRY2 → CONSTANS → FLOWERING LOCUS T (FT) declenche l'induction de la floraison ([[ref:arabidopsis_book_cry|Arabidopsis Book 2010]]). La meme molecule que BERM identifie comme capteur EMF cle chez les animaux (voie B) possede sa fonction reproductive la mieux documentee chez les plantes.",
          "Le CRY vegetal repond aux champs magnetiques. [[ref:xu2014_cry_phosphorylation|Xu et al. (2014)]] ont montre qu'un champ magnetique de 500 µT renforce les phosphorylations dependantes de la lumiere bleue de CRY1 et CRY2 chez Arabidopsis, tandis qu'un champ quasi-nul affaiblissait la phosphorylation de CRY2. [[ref:xu2015_flowering_nnmf|Xu et al. (2015)]] ont demontre qu'un champ magnetique quasi-nul supprime la floraison d'Arabidopsis de maniere dependante de la lumiere bleue — preuve directe que le champ geomagnetique regule la reproduction vegetale via CRY. [[ref:agliassa2018_gmf_cry_phytochrome|Agliassa et al. (2018)]] ont confirme les impacts du champ geomagnetique sur la signalisation CRY et l'expression genique.",
          "La decouverte critique : [[ref:ahmad2020_cry1_rf|Ahmad et al. (2020, Scientific Reports)]] ont montre qu'un faible champ magnetique radiofrequence de 7 MHz reduit significativement la reponse biologique de CRY1 d'Arabidopsis a la lumiere bleue. C'est la meme empreinte diagnostique RPM que le resultat de Ritz (2004) chez les oiseaux migrateurs : le RF a la frequence de Larmor perturbe la fonction du cryptochrome. Les auteurs notent que l'effet est 'relativement mineur' — coherent avec la prediction de BERM, car les plantes synthetisent leur propre riboflavine (B2) et maintiennent un approvisionnement endogene en FAD.",
          "Le RF affecte la reproduction vegetale en conditions de terrain. [[ref:lettuce_rf_2023|PMC10005510 (2023)]] : les frequences Wi-Fi (2,4 GHz et 5 GHz) ont accelere la floraison de la laitue en conditions de terrain et reduit l'efficacite photosynthetique. [[ref:field_plants_rf_2023|Ecological Indicators (2023)]] : l'exposition RF a 866–868 MHz du semis a la maturite a modifie la croissance et le developpement de 10 especes vegetales sauvages — la premiere experience de terrain controlee sur la reponse RF des plantes sauvages. [[ref:haggerty2010_aspen_rf|Haggerty (2010)]] : le fond RF a affecte negativement la croissance, le developpement foliaire et la production d'anthocyanines des semis de peuplier faux-tremble.",
          "L'implication est fondamentale : la meme molecule (CRY), le meme cofacteur (FAD) et le meme mecanisme (RPM) regulentla reproduction tant chez les plantes (floraison) que chez les animaux (melatonine → axe HPG). Le RF anthropogenique perturbe les deux simultanement. Le 'declin des insectes', le 'declin des oiseaux' et la 'crise de la fertilite' ne sont pas trois crises separees — c'est une seule crise mediee par une seule molecule.",
          "Le masting — la production synchronisee de graines en masse par les arbres a intervalles de 2 a 8 ans — fournit un test supplementaire. [[ref:bogdziewicz2024_nature_plants_solstice|Bogdziewicz et al. (2024, Nature Plants)]] ont montre que le hetre europeen synchronise le masting sur 2 000 km en utilisant le solstice d'ete comme 'pistolet de depart celeste'. Le champ geomagnetique est le seul signal environnemental homogene a cette echelle spatiale. BERM propose CRY2 comme synchroniseur. [[ref:bogdziewicz2021_climate_masting|Bogdziewicz et al. (2021)]] rapportent que la synchronie du masting s'affaiblit — attribuee au changement climatique, mais l'explication alternative de BERM est la perturbation RF de CRY2. [[ref:ascoli2017_nao_masting|Ascoli et al. (2017, Nature Communications)]] : les teleconnexions NAO correlent avec la synchronie du masting sur des decennies, mais ces relations sont non stationnaires — coherent avec un environnement electromagnetique changeant.",
        ],
        studies: [
          { citation: "Ahmad et al. (Scientific Reports)", year: 2020, referenceId: "ahmad2020_cry1_rf", note: "7 MHz RF reduit la reponse CRY1 chez Arabidopsis — empreinte RPM vegetale" },
          { citation: "Xu et al. (Adv. Space Res.)", year: 2014, referenceId: "xu2014_cry_phosphorylation", note: "500 µT renforce la phosphorylation CRY; quasi-nul l'affaiblit" },
          { citation: "Xu et al. (Bioelectromagnetics)", year: 2015, referenceId: "xu2015_flowering_nnmf", note: "Champ quasi-nul supprime la floraison — champ geomagnetique → CRY → reproduction" },
          { citation: "Agliassa et al. (J Photochem Photobiol B)", year: 2018, referenceId: "agliassa2018_gmf_cry_phytochrome", note: "Champ geomagnetique affecte la signalisation CRY et l'expression genique" },
          { citation: "Arabidopsis Book (revue)", year: 2010, referenceId: "arabidopsis_book_cry", note: "CRY2 → CONSTANS → FT : voie photoperiodique de floraison principale" },
          { citation: "PMC10005510 (Plants MDPI)", year: 2023, referenceId: "lettuce_rf_2023", note: "Wi-Fi a accelere la floraison de la laitue en terrain" },
          { citation: "Ecological Indicators", year: 2023, referenceId: "field_plants_rf_2023", note: "868 MHz RF a affecte 10 especes sauvages — premiere experience terrain" },
          { citation: "Haggerty (Int J Forestry Res)", year: 2010, referenceId: "haggerty2010_aspen_rf", note: "Le fond RF a affecte la croissance des semis de peuplier et les anthocyanines" },
          { citation: "Bogdziewicz et al. (Nature Plants)", year: 2024, referenceId: "bogdziewicz2024_nature_plants_solstice", note: "Masting synchronise sur 2 000 km via solstice — CRY2 candidat synchroniseur" },
          { citation: "Bogdziewicz et al. (Commun Biol)", year: 2021, referenceId: "bogdziewicz2021_climate_masting", note: "Synchronie du masting s'affaiblit — perturbation RF alternative au climat" },
          { citation: "Ascoli et al. (Nature Commun)", year: 2017, referenceId: "ascoli2017_nao_masting", note: "Correlations NAO-masting non stationnaires sur les decennies" },
        ],
      },
    ],
    seeAlso: "Voir aussi",
    evidencePortal: "Registre des preuves →",
    thCitation: "Référence",
    thYear: "Année",
    thNote: "Note",
  },
  ko: {
    title: "생태학적 및 보초종 증거",
    subtitle: "전기생태학과 보초종에 대한 기상 레이더 효과",
    backLink: "← 증거로 돌아가기",
    narratives: [
      {
        id: "electroecology",
        title: "전기생태학: 전기 오염의 신흥 과학",
        paragraphs: [
          "공중 전기수용(aerial electroreception) — 공중 전기장을 감지하는 능력 — 은 절족동물에서 인정된 감각 양식으로 확립되었다([[ref:robert2024_aerial_electroreception_review|Robert 2024, Current Biology]]). 꼬벌은 채집을 최적화하기 위해 꽃의 전기장을 감지한다([[ref:clarke2013_bee_electroreception|Clarke 2013, Science]]). 그들의 기계감각 털은 전기장에서 물리적으로 휘어져 신경 신호를 전달한다([[ref:sutton2016_bee_hair_mechanism|Sutton 2016, PNAS]]). 꼬벌은 발다리 흔들기 춤 중 정전기 신호를 사용하여 벌집 내에서 소통하며, 개별 꼬벌의 전하는 450 V에 달한다([[ref:greggers2013_bee_electric_comm|Greggers 2013, Proc R Soc B]]). 거미는 벌루닝을 위해 대기 전기장을 감지한다([[ref:morley2018_spider_ballooning|Morley & Robert 2018, Current Biology]]). 애벌레는 접촉 전에 접근하는 말벌을 전기적으로 감지한다([[ref:england2024_caterpillar_predator|England & Robert 2024, PNAS]]). 진드기는 정전기력에 의해 공기 간격을 건너 숙주에게 수동적으로 끌린다([[ref:england_2023_ticks|England 2023, Current Biology]]).",
          "정전기 대전은 비행의 수동적 부산물이 아니다. 11종에 걸친 269마리의 나비와 나방을 대상으로 한 2024년 연구에서, 정전기량이 생태학에 따라 체계적으로 변한다는 것이 보여졌다 — 그 종이 꽃을 방문하는지, 열대산인지, 야행성인지 여부([[ref:england2024_butterfly_adaptive|England & Robert 2024, J R Soc Interface]]). 이것은 정전기 특성이 자연선택에 의해 형성된 적응적 형질이라는 최초의 증거이다. 진화가 생물의 정전기 특성을 최적화했다면, 변화된 정전기 환경(합성 재료, 플라스틱 표면, 전자기기)은 그 최적화를 교란한다 — BERM의 진화적 캠리브레이션 원리를 STATIC 채널에 적용한 것과 같은 논리이다.",
          "도시 초원에서의 현장 실험에서, [[ref:mallinson2025_electric_pollution|Mallinson 등(2025, iScience)]]은 약한 인위적 전기장이 꼬벌의 꽃 착륙을 71%(AC 전장) 및 53%(양의 DC 전장) 감소시키는 것을 실증했다. 고압 송전선 근처의 전기장 측정에서는 실험에 사용된 것과 비슷한 지속적인 전장 강도가 꼬벌 채집 높이에서 수십 미터에 걸쳐 나타났다. 저자들은 ‘electric pollution’(전기 오염)이라는 용어를 사용했으며, Cell Press 저널에서 이 용어가 사용된 것은 처음이다.",
          "이러한 발견들은 BERM의 STATIC 및 ELF 채널에 대한 실증적 기반을 제공한다. 인위적 전기장이 꽃가루받이 매개자의 효율을 71% 감소시킨다면, 모든 새로운 송전선, 변압기, 전기 기기가 수분을 감소시킨다. LED 조명의 IF 방출(별도의 메커니즘으로 곶충 개체군에 영향)과 결합하면, 전자기 환경은 꽃가루받이 의존 생태계에 이중 압력을 가한다. 이는 IPBES와 FAO가 문서화한 전 세계적 꽃가루받이 감소와 일치한다.",
        ],
        studies: [
          { citation: "Clarke et al. (Science)", year: 2013, referenceId: "clarke2013_bee_electroreception", note: "꼬벌이 꽃의 전기장을 감지 — 최초의 육상 전기수용" },
          { citation: "Greggers et al. (Proc R Soc B)", year: 2013, referenceId: "greggers2013_bee_electric_comm", note: "벌집 내 꼬벌의 전기적 소통, 전하 450 V" },
          { citation: "Sutton et al. (PNAS)", year: 2016, referenceId: "sutton2016_bee_hair_mechanism", note: "기계감각 털 = 땁벌의 전기수용체" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, referenceId: "morley2018_spider_ballooning", note: "거미가 벌루닝 분산을 위해 전기장 감지" },
          { citation: "England et al. (Current Biology)", year: 2023, referenceId: "england_2023_ticks", note: "진드기가 공기 간격을 건너 정전기적으로 끌림" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, referenceId: "england2024_butterfly_adaptive", note: "나비의 정전기 대전이 적응적(자연선택)" },
          { citation: "England & Robert (PNAS)", year: 2024, referenceId: "england2024_caterpillar_predator", note: "애벌레가 접촉 전에 포식자를 전기적으로 감지" },
          { citation: "Robert (Current Biology)", year: 2024, referenceId: "robert2024_aerial_electroreception_review", note: "공중 전기수용이 감각 양식으로 공식화" },
          { citation: "Mallinson et al. (iScience / Cell Press)", year: 2025, referenceId: "mallinson2025_electric_pollution", note: "현장 실험: AC 전장으로 꼬벌 착륙 −71%, ‘electric pollution’ 용어" },
        ],
      },
      {
        id: "weather-radar",
        title: "기상 레이더 네트워크와 보초종",
        paragraphs: [
          "기상 감시 레이더는 환경에서 가장 강력한 EMF 원 중 하나이다. NEXRAD(미국, 159개 기지국)와 동등한 유럽 네트워크는 S밴드(2.7–3.0 GHz — Wi-Fi와 거의 동일) 또는 C밴드(5.6 GHz)에서 작동하며, 250 kW에서 1 MW의 첨두 전력을 회전 빔으로 송신하여 전체 경관을 24시간 내내 스캠한다. 보호된 자연보호구역은 레이더 신호로부터 차폐되지 않는다.",
          "곶충 감소와의 시간적 일치는 주목할 만하다: NEXRAD 배치는 1988년에 시작되어 1997년까지 완료되었다. [[ref:hallmann2017_v2|Hallmann]]의 곶충 바이오매스 데이터는 1989년에 시작된다 — 최초 NEXRAD 설치 1년 후이다. 유럽 Doppler 레이더 네트워크도 비슷한 일정으로 건설되었다. S밴드 주파수(2.8 GHz, λ/2 ≈ 5.4 cm)는 대형 비행 곶충의 체구와 일치하여 공진 흡수를 생성한다([[ref:thielens2018|Thielens 2018]]).",
          "[[ref:nicholls2007|Nicholls & Racey(2007, PLOS ONE)]]는 2 V/m을 초과하는 전장 강도에서 레이더 시설 근처의 박쥐 활동이 유의하게 감소함을 실증했다. 후속 연구([[ref:nicholls2009|2009]])에서는 휴대용 레이더가 채이 중인 박쥐의 활동을 감소시켜, 소음이나 시각적 단서가 아닌 EMF가 원인임을 시사했다.",
          "기상 레이더 데이터는 현재 곶충 개체군 모니터링에 널리 사용되고 있다. 이러한 연구들은 레이더를 사용하여 곶충 밀도를 측정하지만, 레이더 자체가 측정 대상 곶충에 영향을 미치는지 여부는 고려하지 않는다 — BERM이 중요한 연구 격차로 식별하는 방법론적 사각지대이다. 2024년 독일 분석(Archiv für Naturschutz und Landschaftsforschung)은 이동통신 기지국과 기상 레이더 근접성을 공변량으로 [[ref:hallmann2017_v2|Hallmann]]형 데이터를 재분석했으며, 둘 다 농약 부하와 토지 이용과 독립적으로 곶충 감소를 예측했다. 이것은 프록시 마스킹의 실제 사례이다: 기존 분석은 EMF를 공변량으로 포함하지 않기 때문에 감소를 농약과 기후에 귀속시킨다. BERM은 EMF 근접성이 추가되면 기존 변수로 설명되는 분산이 감소할 것으로 예측한다.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, referenceId: "nicholls2007", note: "레이더 근처에서 박쥐 활동 감소(>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, referenceId: "nicholls2009", note: "휴대용 레이더가 채이 중인 박쥐의 활동을 감소시킴" },
          { citation: "Hallmann et al.", year: 2017, referenceId: "hallmann2017_v2", note: "곶충 바이오매스 76% 감소, 보호지역, 1989–2016" },
          { citation: "Thielens et al.", year: 2018, referenceId: "thielens2018", note: "곶충의 RF 흡수 2–120 GHz, 공진 효과" },
          { citation: "UK weather radar insect study", year: 2025, referenceId: "uk_weather_radar_insects_2025", note: "레이더는 곶충 추적에 사용, 레이더 효과 테스트에는 사용되지 않음" },
          { citation: "NEXRAD insect density study", year: 2025, referenceId: "nexrad_insect_density_2025", note: "140개 레이더가 미국 곶충 추적 — 레이더 영향은 고려되지 않음" },
        ],
      },
      {
        id: "plant-cry",
        title: "식물은 같은 분자를 통해 EMF에 반응한다",
        paragraphs: [
          "크립토크롬(CRY)은 식물에서 처음 특성화되었다——애기장대(Arabidopsis thaliana), 1993년——동물 자기수용에서의 역할이 인식되기 전이었다. CRY2는 애기장대의 주요 광주기성 개화 수용체로, CRY2→CONSTANS→FLOWERING LOCUS T(FT) 경로가 개화 유도를 촉발한다([[ref:arabidopsis_book_cry|Arabidopsis Book 2010]]). BERM이 동물의 핵심 EMF 센서로 식별한 분자(경로 B)는 식물에서 가장 잘 문서화된 생식 기능을 가진다.",
          "식물 CRY는 자기장에 반응한다. [[ref:xu2014_cry_phosphorylation|Xu et al.(2014)]]은 500 µT 자기장이 애기장대 CRY1과 CRY2의 청색광 의존성 인산화를 강화하고, 거의 영 자기장이 CRY2 인산화를 약화시킴을 보여주었다. [[ref:xu2015_flowering_nnmf|Xu et al.(2015)]]은 거의 영 자기장이 청색광 의존적으로 애기장대 개화를 억제함을 실증했다——지자기장이 CRY를 통해 식물 생식을 조절한다는 직접적 증거. [[ref:agliassa2018_gmf_cry_phytochrome|Agliassa et al.(2018)]]은 지자기장의 CRY 신호전달과 유전자 발현에 대한 영향을 확인했다.",
          "핵심 발견: [[ref:ahmad2020_cry1_rf|Ahmad et al.(2020, Scientific Reports)]]은 약한 7 MHz 무선주파수 자기장이 애기장대 CRY1의 청색광에 대한 생물학적 반응을 유의하게 감소시킴을 보여주었다. 이것은 Ritz(2004)의 철새 결과와 동일한 RPM 진단 지문이다: Larmor 주파수 RF가 크립토크롬 기능을 교란한다. 저자들은 효과가 '비교적 경미'하다고 언급하지만, 이는 BERM 예측과 일치한다——식물은 자체적으로 리보플라빈(B2)을 합성하고 내인성 FAD 공급을 유지하므로, 식이 B2에 의존하는 동물보다 취약성이 낮다.",
          "RF는 현장에서 식물 생식에 영향을 미친다. [[ref:lettuce_rf_2023|PMC10005510(2023)]]: Wi-Fi 주파수(2.4 GHz와 5 GHz)가 현장 조건에서 상추 개화를 가속하고 광합성 효율을 감소시켰다. [[ref:field_plants_rf_2023|Ecological Indicators(2023)]]: 866–868 MHz RF 노출이 종자에서 성숙까지 10종의 야생 식물의 성장과 발달을 변화시켰다——야생 식물 RF 반응의 최초 통제 현장 실험. [[ref:haggerty2010_aspen_rf|Haggerty(2010)]]: RF 배경이 사시나무 묘목의 성장, 잎 발달, 안토시아닌 생산에 부정적 영향을 미쳤다.",
          "함의는 근본적이다: 같은 분자(CRY), 같은 보조인자(FAD), 같은 메커니즘(RPM)이 식물(개화)과 동물(멜라토닌→HPG 축) 모두에서 생식을 조절한다. 인위적 RF는 둘 다를 동시에 교란한다. '곤충 감소', '조류 감소', '생식력 위기'는 세 개의 별개 위기가 아니라——한 분자가 매개하는 하나의 위기이다.",
          "마스팅——나무에 의한 2~8년 간격의 동기화된 대량 종자 생산——은 추가 테스트를 제공한다. [[ref:bogdziewicz2024_nature_plants_solstice|Bogdziewicz et al.(2024, Nature Plants)]]은 유럽 너도밤나무가 하지를 '천체 시작 신호'로 사용하여 2,000 km에 걸쳐 마스팅을 동기화함을 보여주었다. 지자기장은 이 공간 규모에서 균일한 유일한 환경 신호이다. BERM은 CRY2를 동기화 장치로 제안한다. [[ref:bogdziewicz2021_climate_masting|Bogdziewicz et al.(2021)]]은 마스팅 동기성 약화를 보고——기후변화로 귀속되었지만, BERM의 대안 설명은 CRY2의 RF 교란이다. [[ref:ascoli2017_nao_masting|Ascoli et al.(2017, Nature Communications)]]: NAO 텔레커넥션이 수십 년에 걸쳐 마스팅 동기성과 상관하지만, 이 관계는 비정상적——변화하는 전자기 환경과 정합적.",
        ],
        studies: [
          { citation: "Ahmad et al. (Scientific Reports)", year: 2020, referenceId: "ahmad2020_cry1_rf", note: "7 MHz RF가 애기장대 CRY1 반응 감소 — 식물에서의 RPM 지문" },
          { citation: "Xu et al. (Adv. Space Res.)", year: 2014, referenceId: "xu2014_cry_phosphorylation", note: "500 µT가 CRY 인산화 강화; 거의 영이 약화" },
          { citation: "Xu et al. (Bioelectromagnetics)", year: 2015, referenceId: "xu2015_flowering_nnmf", note: "거의 영 자기장이 개화 억제 — 지자기→CRY→생식" },
          { citation: "Agliassa et al. (J Photochem Photobiol B)", year: 2018, referenceId: "agliassa2018_gmf_cry_phytochrome", note: "지자기장이 CRY 신호전달과 유전자 발현에 영향" },
          { citation: "Arabidopsis Book (리뷰)", year: 2010, referenceId: "arabidopsis_book_cry", note: "CRY2→CONSTANS→FT: 주요 광주기 개화 경로" },
          { citation: "PMC10005510 (Plants MDPI)", year: 2023, referenceId: "lettuce_rf_2023", note: "Wi-Fi가 현장에서 상추 개화 가속" },
          { citation: "Ecological Indicators", year: 2023, referenceId: "field_plants_rf_2023", note: "868 MHz RF가 야생 식물 10종에 영향 — 최초 현장 실험" },
          { citation: "Haggerty (Int J Forestry Res)", year: 2010, referenceId: "haggerty2010_aspen_rf", note: "RF 배경이 사시나무 묘목 성장과 안토시아닌에 영향" },
          { citation: "Bogdziewicz et al. (Nature Plants)", year: 2024, referenceId: "bogdziewicz2024_nature_plants_solstice", note: "마스팅이 하지를 통해 2,000 km 동기화 — CRY2가 후보 동기화 장치" },
          { citation: "Bogdziewicz et al. (Commun Biol)", year: 2021, referenceId: "bogdziewicz2021_climate_masting", note: "마스팅 동기성 약화 — RF 교란이 기후의 대안" },
          { citation: "Ascoli et al. (Nature Commun)", year: 2017, referenceId: "ascoli2017_nao_masting", note: "NAO-마스팅 상관이 수십 년에 걸쳐 비정상적" },
        ],
      },
    ],
    seeAlso: "참고 항목",
    evidencePortal: "증거 레지스터 →",
    thCitation: "인용",
    thYear: "연도",
    thNote: "비고",
  },
} as const;

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

export default async function EcologyPage({
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

      <PageHeader icon={TreePine} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="ecology" size={28} className="text-accent" />} />

      {/* Narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "electroecology" && <><span id="static-interface" /><span id="ticks" /></>}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  <InlineReferenceText text={narrative.paragraphs[0]} locale={locale} />
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}><InlineReferenceText text={p} locale={locale} /></p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{d.thCitation}</th>
                      <th className="py-2 pr-3 w-16">{d.thYear}</th>
                      <th className="py-2">{d.thNote}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink referenceId={s.referenceId} locale={locale} citation={s.citation} year={s.year} /></td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-3">
          {d.seeAlso}
        </h3>
        <Link
          href={`/${locale}/evidence`}
          className="text-sm text-accent hover:underline"
        >
          {d.evidencePortal}
        </Link>
      </section>
    </div>
  );
}
