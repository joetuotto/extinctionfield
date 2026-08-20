# BERM: tieteellisten lähteiden evidenssikartta

**Tila:** lähdeatlas / tutkimusohjelman kartta  
**Päivitetty:** 2026-08-20  
**Rajaus:** vain tieteelliset julkaisut, systemaattiset katsaukset ja niihin
suoraan liittyvät tutkimusaineistot. Hallinnolliset rekisterit, tekniset
mittauslähteet, BERM:n omat analyysit, malliparametrit ja pelkät
hankintapyynnöt eivät kuulu tähän dokumenttiin.

## 1. Käyttötapa ja evidenssitasot

Tämä atlas kertoo jokaisesta lähteestä: mitä se mittasi, mihin BERM-haaraan
se liittyy, mitä näyttötasoa se edustaa ja mitä siitä ei saa päätellä.
Lähteet rajaavat ketjun eri kohtia:

FieldState → reseptori tai rajapinta → biologinen päätepiste → yksilö/paritila
→ ASFR → TFR.

Niistä ei muodostu valmista EMF → kansallinen TFR -kerrointa. Solu-, eläin- ja
ekologiakokeet voivat olla vahvoja omissa päätepisteissään ilman, että niitä
yleistetään ihmisväestön hedelmällisyyteen. Ihmissperman in-vitro-tutkimus ei
ole henkilöaltistuskohortti, eikä ekologinen seurantasarja ole paikallisen
kenttäannoksen korvike.

| Tila | Legitiimi BERM-käyttö | Ei tarkoita |
| --- | --- | --- |
| DIRECT_ENDPOINT_PROTOCOL_PRIOR | Kontrolloitu tutkimus rajoittaa päätepisteen suunnan, elinvaiheen tai vasteperheen omassa protokollassaan. | Vaikutuskokoa toisessa lajissa, elimessä tai altistusgeometriassa. |
| STRUCTURAL_ONLY / ACTIVE_STRUCTURAL_PRIOR | FieldState-ominaisuus, reseptori tai välitila on säilytettävä näkyvänä mallissa. | Numerista väestöparametria. |
| SYNTHESIS_CONVERGENCE_PRIOR | Katsaus/meta-analyysi jäsentää endpointteja ja heterogeenisyyttä. | Primääritutkimusten kaksinkertaista painottamista. |
| DESCRIPTIVE_SIGNATURE_PRIOR | Kohortti-, ammatti- tai seurantakuvio ohjaa testattavan allekirjoituksen suunnittelua. | Dosimetriaa tai kausaliteettia. |
| CONTEXT_ONLY / benchmark | Tieteellinen tausta, mittausmalli, kontrolli tai tulevan testin suunnittelu. | Aktiivista kausaalireunaa. |
| MIGRATION_CANDIDATE | Tieteellinen viite on säilytetty, mutta se vaatii vielä protokolla- ja lähdevarmennuksen. | Myönteistä tai kielteistä evidenssipainoa. |
| PROVENANCE_ONLY | Viite säilytetään auditointia varten. | Tukevan evidenssin käyttöä. |

Lähdestatus määräytyy ensisijaisesti
[fieldstate_causal_evidence.json](../data/evidence/fieldstate_causal_evidence.json),
[legacy_evidence_qualification_v1.json](../data/evidence/legacy_evidence_qualification_v1.json)
ja [legacy_reference_migration_v1.json](../data/evidence/legacy_reference_migration_v1.json)
-tiedostoista. Laaja website-viitearkisto ei ole lähdestatuksen auktoriteetti,
koska siinä on PDF-/narratiivituonnista syntyneitä placeholder- ja
ristiriitatietueita.

## 2. Ydinrajat

- Lindgren-haara on upstream-teoreettinen premissi, ei empiirinen
  lisääntymisvaikutuksen estimaatti.
- Yksikään lähde ei nykyisellään osoita väestötason kausaalista EMF → TFR
  -vaikutuskerrointa.
- Ekologinen tutkimus voi tukea FieldState- ja lajikohtaisen
  siirtofunktion premissejä; se ei yksin siirry ihmiseen.
- Evolutiivinen valinta on tuleva testattava johdannainen, ei tämänhetkinen
  tulos.
- Tutkimusdataan liittyvä julkaisu on eri asia kuin aineiston nykyinen
  analyysikelpoisuus: ilman kohdistettua altistusta, biologista päätepistettä,
  paikka-aikaa ja keskeisiä sekoittajia lähde ei ole RF-kausaalitesti.

## 3. Lindgren, FieldState ja fysikaalis-biologinen siirtokerros

| Tieteellinen lähde | Mitä se mittasi tai esitti | BERM-yhteys | Raja |
| --- | --- | --- | --- |
| Lindgren, J. & Liukkonen, J. (2019), *Geometric electrodynamics from Weyl geometry*, [doi:10.1038/s41598-019-56357-3](https://doi.org/10.1038/s41598-019-56357-3); Lindgren & Liukkonen (2021), [doi:10.1088/1742-6596/1956/1/012017](https://doi.org/10.1088/1742-6596/1956/1/012017); Lindgren, Kovacs & Liukkonen (2025), [doi:10.1088/1742-6596/2987/1/012001](https://doi.org/10.1088/1742-6596/2987/1/012001). | Teoreettinen geometrinen elektrodynamiikka. Paikallisessa arkistossa nämä ovat edelleen erikseen lähdevarmennettavia teorialähteitä. | L*-tason lähtökohta sille, että tausta, vektori, kulma, geometria, vaihe, spektri ja aika säilyvät FieldState-mittauksessa. | Ei yksilöi ihmisreseptoria, ei anna altistusmittausta eikä EMF → hedelmällisyys- tai TFR-kerrointa. |
| Weyl (1918), Rainich (1925), Wheeler–Misner sekä Scholz (2018). | Historiallinen/käsitteellinen geometrisen kenttä- ja Weyl-fysiikan konteksti. | Teorian genealogia; auttaa erottamaan Lindgren-haaran fysiikan peruslähtökohdat biologiasta. | Ei biologista, lisääntymis- tai demografista evidenssiä. |
| Blackman, C. F. et al. (1985), *A role for the magnetic field in the radiation-induced efflux of calcium ions from brain tissue in vitro*, **Bioelectromagnetics**. [doi:10.1002/bem.2250060402](https://doi.org/10.1002/bem.2250060402) | Kanan aivokudoksessa paikallinen geomagneettinen tausta siirsi ELF-taajuusikkunaa Ca-ulosvirtauksessa. | Tausta × taajuus: FieldStatea ei saa puristaa yhdeksi amplitudiksi. | In-vitro avian kudos ja Ca-endpoint; ei lisääntyminen. |
| Ritz, T. et al. (2004), *Resonance effects indicate a radical-pair mechanism for avian magnetic compass*, **Nature**. [doi:10.1038/nature02534](https://doi.org/10.1038/nature02534) | Euroopanpunarinnan orientaatiohäiriö riippui RF-kentän kulmasta suhteessa geomagneettiseen taustaan. | FIELDSTATE_VECTOR / B_RPM_CRY: kulma ja vektori pidetään erillisinä. | Linnun navigointi, ei ihmisreproduktiota. |
| Usselman, R. J. et al. (2016), *The quantum biology of reactive oxygen species partitioning impacts cellular bioenergetics*, **Scientific Reports** 6:38543. [doi:10.1038/srep38543](https://doi.org/10.1038/srep38543) | Solu- ja radikaaliparijärjestelmässä kentän orientaatio liittyi ROS-tuotteisiin ja bioenergetiikkaan. | Geometriaherkkä B_RPM_CRY → A_VGCC_ROS -välivaihe. | Endoteelisolut/kemiallinen malli; ei sukusolu- tai väestöannos. |
| Majewska, M. et al. (2025), *European Robin Cryptochrome-4a Associates with Lipid Bilayers in an Ordered Manner*, **ACS Chemical Biology**. [doi:10.1021/acschembio.4c00576](https://doi.org/10.1021/acschembio.4c00576) | Robin Cry4a:n järjestynyt lipidikalvokytkentä. | Reseptorin orientaatio ja kalvotila pidetään RPM-haarassa. | Proteiini- ja mallikalvotutkimus; ei sovellettu altistus- tai fitnesskoe. |
| Sherrard, R. M. et al. (2018), *Low-intensity electromagnetic fields induce human cryptochrome to modulate intracellular reactive oxygen species*, **PLOS Biology** 16:e2006229. [doi:10.1371/journal.pbio.2006229](https://doi.org/10.1371/journal.pbio.2006229) | HEK293- ja hiiren fibroblastimalleissa kryptokromin toiminnallinen poisto erotti ROS-/geenivasteen. | B_RPM_CRY → A_VGCC_ROS -solusilta. | PEMF-solukoe; ei kuluttaja-RF, gonadiannos tai hedelmällisyys. |
| Zandieh, A. et al. (2025), *An amplification mechanism for weak ELF magnetic fields quantum-bio effects in cancer cells*, **Scientific Reports** 15:2964. [doi:10.1038/s41598-025-87235-w](https://doi.org/10.1038/s41598-025-87235-w) | Syöpäsoluissa mitokondriokalvon potentiaali ja ROS vaihtelivat taajuus-/kenttäolosuhteiden mukaan. | FIELDSTATE_ENVELOPE ja solutilariippuvainen vasteikkuna on testattava. | 0.01–5 Hz / 0–100 mT ei ole väestön RF-annos eikä reproduktiivinen endpoint. |
| Thielens, A. et al. (2018), *Exposure of insects to radio-frequency electromagnetic fields from 2 to 120 GHz*, **Scientific Reports**. [doi:10.1038/s41598-018-22271-3](https://doi.org/10.1038/s41598-018-22271-3), sekä Thielens et al. (2020), [doi:10.1038/s41598-019-56948-0](https://doi.org/10.1038/s41598-019-56948-0) | Hyönteismorfologiaan perustuva RF-siirtolaskenta/dosimetria. | Ulkoinen teho ei korvaa lajikohtaista taajuus-, koko-, orientaatio- ja kudossiirtoa. | Fysiikan siirtotutkimus, ei biologinen fitness- tai TFR-päätepiste. |
| Petri, A. K. et al. (2017), *Static electric fields: systematic review and exposure assessment*, **Environmental Health**. [doi:10.1186/s12940-017-0248-y](https://doi.org/10.1186/s12940-017-0248-y); Dincmen, M. G. et al. (2016), *Atmospheric Pressure Plasma Treatment of Nylon 6,6 and Polyester Fabrics for Enhancing Antistatic Properties*. [doi:10.14504/ajr.3.4.4](https://doi.org/10.14504/ajr.3.4.4) | Staattisen kentän arviointi sekä tekstiilimateriaalin varauksen synty/relaksaatio. | STATIC_TRIBO_INTERFACE-mittaussopimus; staattinen E, ELF ja RF erotetaan. | Ei erityinen lisääntymis- tai ekologiaefektitutkimus. |

## 4. Ihmisbiologia: suorat päätepisteet, mekanismit ja synteesit

### 4.1 Ihmisgamaetti- ja rajapintatutkimukset

| Tieteellinen lähde | Mitä se koskee | BERM-yhteys | Mitä se ei todista |
| --- | --- | --- | --- |
| De Iuliis, G. N. et al. (2009), *Mobile phone radiation induces reactive oxygen species production and DNA damage in human spermatozoa in vitro*, **PLOS ONE** 4:e6446. [doi:10.1371/journal.pone.0006446](https://doi.org/10.1371/journal.pone.0006446) | Puhdistettu ihmisen sperma, 1.8 GHz, mitoROS, DNA-vaurio, fragmentaatio, motiliteetti ja vitaalisuus. | A_VGCC_ROS → MALE_SPERM; endpointit pidetään erillään. | In-vitro, 0.4–27.5 W/kg SAR, ei veri-kivesestettä, parin hedelmällisyyttä tai TFR-kerrointa. |
| Agarwal, A. et al. (2009), *Effects of radiofrequency electromagnetic waves from cellular phones on human ejaculated semen*, **Fertility and Sterility**. [doi:10.1016/j.fertnstert.2008.08.022](https://doi.org/10.1016/j.fertnstert.2008.08.022) | Paritettu talk-mode-ex-vivo -protokolla terveillä ja infertileillä luovuttajilla. | Lyhyen viiveen ROS-, motiliteetti- ja vitaalisuuspäätepisteiden lähde. | Paikallisen siirron ja protokollan vaikutus; ei populaatiokulmakerroin. |
| Avendaño, C. et al. (2012), *Use of laptop computers connected to internet through Wi-Fi decreases human sperm motility and increases sperm DNA fragmentation*, **Fertility and Sterility**. [doi:10.1016/j.fertnstert.2011.10.012](https://doi.org/10.1016/j.fertnstert.2011.10.012) | 29 paritettua luovuttajanäytettä Wi-Fi-laptop-protokollassa. | Paikallinen geometria, altistusaika ja lämpökonteksti säilyvät MALE_SPERM-haarassa. | Ei henkilöaltistuskohortti; lämpö ja laitegeometria ovat sekoittajia. |
| Baldini, G. M. et al. (2025), *Does Electromagnetic Pollution in the ART Laboratory Affect Sperm Quality?*, **Toxics** 13:510. [doi:10.3390/toxics13060510](https://doi.org/10.3390/toxics13060510) | Ihmissperman lyhyt laboratoriovertailu / lähiympäristön geometria. | Täydentää mitattavan paikallissiirron suunnittelua. | Yksi laboratorio ja lyhyt ex-vivo-asetelma; ei väestöaltistus eikä syntyvyystutkimus. |
| Møllerløkken, O. J. & Moen, B. E. (2008), *Is fertility reduced among men exposed to radiofrequency fields in the Norwegian Navy?*, **Bioelectromagnetics**. [doi:10.1002/bem.20400](https://doi.org/10.1002/bem.20400) | Ammattialtistukseen perustuva kysely-/kuviotutkimus. | DESCRIPTIVE_SIGNATURE_PRIOR: mahdollinen ihmisen ammattikuvio, joka ohjaa paremman kohortin suunnittelua. | Karkea altistusluokitus ja laaja sekoittuminen; ei annos eikä TFR-kerroin. |
| Shafik, A., Ibrahim, I. H. & El-Sayed, E. M. (1992), *Effect of different types of textile fabric on spermatogenesis. I. Electrostatic potentials generated on surface of human scrotum by wearing different types of fabric*, **Andrologia**. [doi:10.1111/j.1439-0272.1992.tb02628.x](https://doi.org/10.1111/j.1439-0272.1992.tb02628.x) | Tekstiili–iho -rajapinnan sähköstaattinen mittaus. | Materiaalikohtainen STATIC_TRIBO_INTERFACE. | Historiallinen V/cm²-lukema ei yksin määritä kenttää ilman anturi-, referenssi- ja kalibrointigeometriaa. |
| Shafik, A. (1992), *Contraceptive efficacy of polyester-induced azoospermia in normal men*, **Contraception**. [doi:10.1016/0010-7824(92)90157-O](https://doi.org/10.1016/0010-7824(92)90157-O) | Pitkäkestoinen polyesterisling-kokeilu ihmisillä. | Historiallinen ihmisen lisääntymispäätepisteankkuri materiaalirajapinnalle. | Pieni kontrolloimaton asetelma; staattinen varaus, lämpö ja geometria eivät erotu; ei yleinen vaatetus- tai TFR-vaikutus. |

### 4.2 Biologiset välitilat, esteet ja kehityshaara

| Lähde | BERM-solmu / käyttö | Rajoite |
| --- | --- | --- |
| Pall, M. L. (2013), *Electromagnetic fields act via activation of voltage-gated calcium channels to produce beneficial or adverse effects*, **J Cell Mol Med**. [doi:10.1111/jcmm.12088](https://doi.org/10.1111/jcmm.12088); Pall (2018), *Wi-Fi is an important threat to human health*, **Environmental Research**. [doi:10.1016/j.envres.2018.01.035](https://doi.org/10.1016/j.envres.2018.01.035) | VGCC/Ca²⁺/redox-topologian synteesit; pulssi-, polarisaatio- ja tilariippuvuus pidetään herkkyysperheinä. | Narratiiviset synteesit, eivät itsenäisiä vaikutuskokoja eivätkä primääritutkimusten lisäpainoja. |
| Yakymenko, I. et al. (2016), *Oxidative mechanisms of biological activity of low-intensity radiofrequency radiation*, **Electromagnetic Biology and Medicine**. [doi:10.3109/15368378.2015.1043557](https://doi.org/10.3109/15368378.2015.1043557) | ROS-, lipidiperoksidaatio-, DNA- ja antioksidanttipäätepisteiden heterogeeninen perhe. | Katsaus, ei yksi pooled magnitude. |
| Panagopoulos, D. J. et al. (2025), narratiivinen mekanismikatsaus antropogeenisista ELF- ja langattomista EMF-kirjallisuuksista, **Frontiers in Public Health**. [doi:10.3389/fpubh.2025.1585441](https://doi.org/10.3389/fpubh.2025.1585441) | Mekanismi-/topologiakonteksti A_VGCC_ROS-haaralle; kenttäluokka, modulaatio ja biologinen järjestelmä pidetään erillisinä. | Ei umbrella review eikä itsenäinen kvantitatiivinen paino. |
| Lai, H. & Singh, N. P. (2004), *Magnetic-field-induced DNA strand breaks in brain cells of the rat*, **Environmental Health Perspectives**. [doi:10.1289/ehp.6355](https://doi.org/10.1289/ehp.6355); Salford, L. G. et al. (2003), *Nerve cell damage in mammalian brain after exposure to microwaves from GSM mobile phones*, **EHP**. [doi:10.1289/ehp.6039](https://doi.org/10.1289/ehp.6039) | Redox-/barrier-haaran eläin- ja kudosrajoitteita. | Aivo- ja BBB-haara, ei ihmisen lisääntymisvaikutus. |
| Lochhead, J. J. et al. (2010), *Oxidative stress increases blood-brain barrier permeability and induces alterations in occludin*, **J Cereb Blood Flow Metab**. [doi:10.1038/jcbfm.2010.29](https://doi.org/10.1038/jcbfm.2010.29); Chakraborty, P. et al. (2020), *Excess iodine impairs spermatogenesis by inducing oxidative stress and perturbing blood-testis barrier*, **Reproductive Toxicology**. [doi:10.1016/j.reprotox.2020.06.012](https://doi.org/10.1016/j.reprotox.2020.06.012) | Biologinen silta ROS → tight junction/barrier; BBB ja BTB pidetään erillisinä elinarkkitehtuureina. | Upstream ei ole kummassakaan EMF; vaikutusketju ei ole suora EMF-näyttö. |
| Sempou, E. et al. (2022), *Membrane potential drives spermatogonial stem cell differentiation via mTOR*, **Nature Communications**. [doi:10.1038/s41467-022-34363-w](https://doi.org/10.1038/s41467-022-34363-w) | VMEM_MTOR ja kehitysmuistin downstream-bioelectric topologia. | Ei EMF-altistus, eikä sukusolujen populaatioefekti. |
| Liu, Y. et al. (2014), *The circadian clock protein Bmal1 regulates progesterone synthesis in mice*, **PNAS**. [doi:10.1073/pnas.1209249111](https://doi.org/10.1073/pnas.1209249111); He, C. et al. (2016), *Melatonin synthesis in the mitochondria of murine oocytes and its role in protecting oocytes from oxidative damage*, **IJMS**. [doi:10.3390/ijms17060939](https://doi.org/10.3390/ijms17060939) | OVULATION_CLOCK → IMPLANTATION ja MELATONIN_REDOX → OOCYTE_REDOX. | Hiiri-/oosyytti-/IVF-mallit; eivät EMF-altistustutkimuksia. |
| Cao, H. et al. (2015), *Effects of 1.8 GHz radiofrequency fields on circadian rhythms of melatonin, GSH-Px and SOD in rats*, **IJERPH**. [doi:10.3390/ijerph120202071](https://doi.org/10.3390/ijerph120202071) | Vuorokaudenaika ja redox-tila ovat FieldState-kontekstia. | Rotta, yksi RF-protokolla, ei hedelmällisyys- tai TFR-päätepiste. |
| Yu, G. et al. (2020), *Long-term exposure to 4G smartphone RF radiation diminished male reproductive potential by disrupting the Spock3-MMP2-BTB axis*, **Science of the Total Environment** 698:133860. [doi:10.1016/j.scitotenv.2019.133860](https://doi.org/10.1016/j.scitotenv.2019.133860); Meena, R. et al. (2014), *Melatonin in microwave-radiation-induced oxidative stress-mediated male fertility toxicity*, **Electromagnetic Biology and Medicine**. [doi:10.3109/15368378.2013.781035](https://doi.org/10.3109/15368378.2013.781035) | Paikallinen BARRIER_BTB, spermatogeeninen viive, redox-/melatoniinivälitys ja mieskapasiteetti pidetään erillisinä. | Protokollasidonnaiset rottatutkimukset, ei ihmisen paikallissiirtokalibrointi. |
| Ahmadi, S. S. et al. (2016), *Effect of non-ionizing electromagnetic field on the alteration of ovarian follicles in rats*, **Electron Physician**. [doi:10.19082/2168](https://doi.org/10.19082/2168); Calis, P. et al. (2021), *Does Exposure of Smart Phones during Pregnancy Affect the Offspring's Ovarian Reserve?*, **Fetal and Pediatric Pathology**. [doi:10.1080/15513815.2019.1692112](https://doi.org/10.1080/15513815.2019.1692112); Yousefi, B. et al. (2025), *Impairment of Oogenesis and Folliculogenesis in Neonatal Rats after Maternal Exposure to Mobile Phones*, **Reproductive Sciences**. [doi:10.1007/s43032-025-01880-0](https://doi.org/10.1007/s43032-025-01880-0) | Kehityksellinen OVARIAN_RESERVE / OOCYTE_REDOX -haara erotetaan akuutista aikuisovulaatiosta. | Rotan histologia/kehitysmallit; ei ihmisen AMH-, AFC- tai fecundability-kalibrointi. |

### 4.3 Katsaukset ja väestö-/trendikonteksti

| Lähde | BERM-rooli | Raja |
| --- | --- | --- |
| Adams, J. A. et al. (2014), *Effect of mobile telephones on sperm quality: a systematic review and meta-analysis*, **Environment International**. [doi:10.1016/j.envint.2014.04.015](https://doi.org/10.1016/j.envint.2014.04.015); Houston, B. J. et al. (2016), *Radiofrequency electromagnetic radiation and sperm quality*, **Reproduction**. [doi:10.1530/REP-16-0126](https://doi.org/10.1530/REP-16-0126); La Vignera, S. et al. (2012), *Effects of the exposure to mobile phones on male reproduction*, **J Androl**. [doi:10.2164/jandrol.111.014373](https://doi.org/10.2164/jandrol.111.014373) | Erottavat motiliteetin, vitaalisuuden, ROS:n ja DNA-integriteetin; tukevat heterogeenistä mieshaaraa. | Synteesit eivät ole oma itsenäinen populaatiokerroin. |
| Cordelli, E. et al. (2024), *Effects of RF-EMF exposure on male fertility: systematic review of experimental studies on non-human mammals and human sperm in vitro*, **Environment International** 185:108509. [doi:10.1016/j.envint.2024.108509](https://doi.org/10.1016/j.envint.2024.108509), ja Corrigendum (2025), [doi:10.1016/j.envint.2025.109449](https://doi.org/10.1016/j.envint.2025.109449) | WHO-tilattu tutkimusagenda ja tutkimusheterogeenisyyden katsaus. | Korjaus luetaan aina mukana; ei ihmisväestön annos–vaste. |
| Naderi, N. et al. (2026), *Influence of RF electromagnetic radiation on spermatogenesis and sperm function in rodent models: a systematic review*, **Reproductive Toxicology** 144:109300. [doi:10.1016/j.reprotox.2026.109300](https://doi.org/10.1016/j.reprotox.2026.109300) | Jäsentää jyrsijöiden sperma- ja spermatogeneesipäätepisteet. | Heterogeeninen eläinkirjallisuus; ei yksi biologinen kerroin. |
| Levine, H. et al. (2017; 2023), *Temporal trends in sperm count* -systemaattiset katsaukset/meta-regressiot, erityisesti 2023 [doi:10.1093/humupd/dmac035](https://doi.org/10.1093/humupd/dmac035); Carlsen, E. et al. (1992), *Evidence for decreasing quality of semen during past 50 years*; Swan, S. H. et al. (2000), *The question of declining sperm density revisited*; Skakkebaek, N. E. et al. (2016), *Male Reproductive Disorders and Fertility Trends*. | Mieslisääntymisen ajallinen konteksti ja tulevan biomarkkeripaneelin suunnittelu. | Ei EMF-attribuutio. Projektin maasarja on rekonstruktio/proxy, ei julkaistu havaintopaneeli. |
| Travison, T. G. et al. (2007), *A population-level decline in serum testosterone levels in American men*, **JCEM**; Lokeshwar, S. D. et al. (2021), *Decline in serum testosterone in adolescents and young adults*, **Eur Urol Focus**. | MALE_STEROIDOGENESIS-trendikonteksti. | CONTEXT_ONLY; ei EMF-kausaalireunaa. |
| Goldstein, J. R. & Kreyenfeld, M. (2011), *Has East Germany Overtaken West Germany? Recent Trends in Order-Specific Fertility*. | Hedelmällisyyden järjestys-, tempo- ja koostumusmuutosten vaihtoehtoinen demografinen selityskonteksti. | OUTSIDE_ACTIVE_GRAPH; ei BERM:n kausaalilinkki eikä EMF-testi. |
| Veroniki, A. A. et al. (2016), [doi:10.1002/jrsm.1164](https://doi.org/10.1002/jrsm.1164), ja Langan, D. et al. (2019), [doi:10.1002/jrsm.1316](https://doi.org/10.1002/jrsm.1316). | Meta-analyysin heterogeenisyys- ja raportointimenetelmien tausta. | Laajassa arkistossa vain menetelmäkontekstia; niihin ei ole sidottu BERM-vaikutusarviota. |

BERM:llä ei tällä hetkellä ole lähdevarmennettua ihmisnaisten altistus–
hedelmällisyys- tai munasarjavarannon kohorttia. Naishaara on biologisesti
motivoitu eläin- ja kehitystutkimuksilla, mutta ei ihmisessä kalibroitu.

## 5. Ekologia ja evoluutio: yksityiskohtainen lähdekartta

Ekologiahaara on BERM:n tärkein ulkoinen biologinen testikenttä. Se testaa
sitä, ovatko vektori, spektri, polarisaatio, tausta, geometria, valo, kosteus
ja aika lajikohtaisia FieldState-ominaisuuksia. Todistustasot eivät kuitenkaan
saa sekoittua:

1. luonnollinen sähkö-/magneettiaisti osoittaa, että kenttä voi olla biologinen
   informaatio tai voima;
2. kontrolloitu antropogeeninen koe osoittaa vain oman laji–protokolla
   -päätepisteensä;
3. sentinelli-/seurantadata on kuvailevaa ilman mitattua altistusta ja
   päätesekoittajia;
4. evolutiivinen valinta vaatii periytyvää vaihtelua, toistuvaa
   kelpoisuuseroa, sukupolvista altistusta ja genomisen tai vastaavan testin.

### 5.1 Luonnollinen sähköaisti, kohtaaminen ja dispersaali

| Tieteellinen lähde | Mitä se osoittaa omassa järjestelmässään | BERM–Eco-yhteys | Raja |
| --- | --- | --- | --- |
| England, S. J. & Robert, D. (2022), *The ecology of electricity and electroreception*, **Biological Reviews**. [doi:10.1111/brv.12804](https://doi.org/10.1111/brv.12804) | Laaja synteesi sähköekologiasta. | FieldState voi olla lajille relevantti ympäristömuuttuja, ei vain tekninen annos. | Luonnon sähköekologian katsaus, ei antropogeeninen altistuskoe. |
| Clarke, D. et al. (2013), *Detection and learning of floral electric fields by bumblebees*, **Science**. [doi:10.1126/science.1230883](https://doi.org/10.1126/science.1230883) | Kimalaiset havaitsevat ja oppivat kukkien sähkökenttäsignaaleja. | Lajispesifinen sähköinen foraging-siirtofunktio. | Luonnollinen signaali, ei RF-/populaatiovaikutus. |
| Greggers, U. et al. (2013), *Reception and learning of electric fields in bees*, **Proc R Soc B**. [doi:10.1098/rspb.2013.0528](https://doi.org/10.1098/rspb.2013.0528) | Mehiläisten sähköisten vihjeiden vastaanotto ja oppiminen. | Erillinen ECOLOGICAL_ENCOUNTER-reitti pölytyksessä. | Ei pesäfitness- tai ihmistulkinta. |
| Sutton, G. P. et al. (2016), *Bumblebee hairs as electric-field sensors*, **PNAS**. [doi:10.1073/pnas.1601624113](https://doi.org/10.1073/pnas.1601624113) | Karvat toimivat sähkökentän aistivana muuntimena. | Reseptori ja morfologia määrittävät siirron. | Ei keinotekoisen kentän yhteisövaikutus. |
| England, S. J. & Robert, D. (2024), *Caterpillars detect the electric fields of predatory wasps*, **PNAS**. [doi:10.1073/pnas.2322674121](https://doi.org/10.1073/pnas.2322674121) | Toukat aistivat petoampiaisten kenttiä. | Modulaatio/action spectrum on mahdollinen FieldState-ominaisuus. | Käyttäytyminen, ei fitness- tai väestöpäätepiste. |
| Morley, E. L. & Robert, D. (2018), *Electric fields elicit ballooning in spiders*, **Current Biology**. [doi:10.1016/j.cub.2018.05.057](https://doi.org/10.1016/j.cub.2018.05.057) | Staattiset kentät voivat laukaista hämähäkin ballooning-dispersaalia. | FieldState → dispersaali → metapopulaatio/geeni­virta on testattava reitti. | Ei maisematason kasvun tai infrastruktuurivaikutuksen estimaatti. |
| England, S. J., Lihou, K. & Robert, D. (2023), *Static electricity passively attracts ticks onto hosts*, **Current Biology**. [doi:10.1016/j.cub.2023.06.021](https://doi.org/10.1016/j.cub.2023.06.021) | Ixodes ricinus -nymfien sähköstaattinen isäntäkohtaaminen/polarisaatio. | STATIC_TRIBO_INTERFACE → ECOLOGICAL_ENCOUNTER; relevantti suure on gradientti/geometria. | Kiinnittyminen ei ole populaatiokasvu eikä RF-/ELF-resistenssi. |
| Colin, M. E. et al. (1992), *Attraction of Varroa jacobsoni, parasite of Apis mellifera by electrical charges*, **J Insect Physiology**. [doi:10.1016/0022-1910(92)90039-G](https://doi.org/10.1016/0022-1910(92)90039-G) | Varauksen merkki muutti Varroa-kontaktikäyttäytymistä; nimi on historiallisen taksonomian mukainen. | Loisen kohtaamisreitti on erillinen mehiläisen foraging-reitistä. | Ei Varroa-resistenssi, populaation kasvu eikä colony-collapse-mekanismi. |
| García-Robledo, C., Dierick, D. & Manser, K. (2025), *Electric transportation and electroreception in hummingbird flower mites*, **PNAS**. [doi:10.1073/pnas.2419214122](https://doi.org/10.1073/pnas.2419214122) | Kukkapunkkien elektroreseptio ja sähköstaattinen kuljetus. | Kohtaamis-/kuljetusreitin mekanistinen analogia. | Ei yleistys kaikkiin punkkeihin tai valintaestimaatti. |
| Ran, X. et al. (2025), *Parasitic jumping nematodes use electrical host attachment*, **PNAS**. [doi:10.1073/pnas.2503555122](https://doi.org/10.1073/pnas.2503555122) | Loissukkulamatojen sähköinen isäntäkiinnittyminen. | Lisää eri taksonissa testattavan ECOLOGICAL_ENCOUNTER-analogian. | Ei väestö-/evoluutiotulos. |

### 5.2 Magnetoreseptio, kryptokromi ja luonnollinen kenttäaisti

| Tieteellinen lähde | BERM–Eco-yhteys | Raja |
| --- | --- | --- |
| Lefèvre, C. T. & Bazylinski, D. A. (2013), *Ecology, diversity, and evolution of magnetotactic bacteria*, **Microbiology and Molecular Biology Reviews**. [doi:10.1128/MMBR.00021-13](https://doi.org/10.1128/MMBR.00021-13) | Luonnonvalinnan muovaama magnetotaksis on periaate-esimerkki siitä, että magneettinen ympäristö voi olla biologinen resurssi. | Ei antropogeenisen EMF:n evoluutiovaikutus. |
| Wan, G. J. et al. (2021), *CRY1 is necessary for light-dependent magnetoreception in monarch butterflies*, **Nature Communications**. [doi:10.1038/s41467-021-21002-z](https://doi.org/10.1038/s41467-021-21002-z) | B_RPM_CRY: CRY1:n välttämättömyys arkkitehtuurina, jossa valo ja tausta ovat tärkeitä. | Perhosen kompassi, ei ihmisreseptori. |
| Engels, S. et al. (2014), *Anthropogenic electromagnetic noise disrupts magnetic compass orientation in a migratory bird*, **Nature**. [doi:10.1038/nature13290](https://doi.org/10.1038/nature13290) | Laajakaistainen häly, maadoitus/suojaus ja taustakenttä ovat biologisesti eroteltavia; spektri-, maadoitus- ja taustakomponentit säilytetään FieldState-action spectrumissa. | Lintujen orientaatio; ei lisääntyminen eikä TFR. |
| Leberecht, M. et al. (2022), *RF effects on blackcap compass orientation*, **J Comp Physiol A**. [doi:10.1007/s00359-021-01537-8](https://doi.org/10.1007/s00359-021-01537-8), sekä Leberecht et al. (2023), *Upper frequency bound for RF disruption of avian magnetic compass orientation*, **PNAS**. [doi:10.1073/pnas.2301153120](https://doi.org/10.1073/pnas.2301153120) | RF action spectrum / taajuusraja on testattava, eikä “kaikki RF” ole yksi biologinen luokka. | Mustapääkertun kompassi, ei ihmis- tai fitnesskerroin. |
| Yoshii, T. et al. (2009), *Cryptochrome mediates light-dependent magnetosensitivity of the circadian clock*, **PLOS Biology**. [doi:10.1371/journal.pbio.1000086](https://doi.org/10.1371/journal.pbio.1000086) | Genotyyppi-, valo- ja kenttävoimakkuusriippuvuus tukee B_RPM_CRY-haaran heterogeenisyyttä. | Drosophilan kello, ei ihmisen hedelmällisyys. |
| Fedele, G. et al. (2014), *Genetic analysis of a magnetic-field-induced clock phenotype in Drosophila*, **PLOS Genetics**. [doi:10.1371/journal.pgen.1004804](https://doi.org/10.1371/journal.pgen.1004804) | G×FieldState-vaihtelu on mahdollinen valinnan edellytys. | Ei osoita luonnossa tapahtunutta alleelitaajuusmuutosta. |
| Hore, P. J. & Mouritsen, H. (2016), *The radical pair mechanism of magnetoreception*, **Annual Review of Biophysics**. | Reseptoriteorian taustakatsaus RPM/CRY-haaralle. | Teoriakatsaus; ei suora TFR-, fitness- tai ihmistulos. |

### 5.3 Antropogeeninen FieldState: kontrolloidut ekologiset kokeet

| Tieteellinen lähde | Mitattu päätepiste | BERM–Eco-yhteys | Raja |
| --- | --- | --- | --- |
| Shepherd, S. et al. (2018), *Extremely low frequency electromagnetic fields impair the cognitive and motor abilities of honey bees*, **Scientific Reports**. [doi:10.1038/s41598-018-26185-y](https://doi.org/10.1038/s41598-018-26185-y) | 50 Hz ELF, oppiminen/lento/foraging/feeding. | Erillinen FIELDSTATE_LOW_FREQUENCY_ELECTRIC- ja pölyttäjäsentinellireitti. | Ei Wi-Fi/RF-skaalari eikä populaatiovaikutus. |
| Mallinson, V. J., Woodburn, F. A. & O'Reilly, L. J. (2025), *Weak anthropogenic electric fields affect honeybee foraging*, **iScience** 28:112550. [doi:10.1016/j.isci.2025.112550](https://doi.org/10.1016/j.isci.2025.112550) | Paritettu kenttäkoe, AC/DC ja polariteettispesifinen kukkalaskeutuminen. | Kenttäluokka ja polariteetti säilytetään erillisinä pölytysreiteissä. | Yksi laji/konteksti; laskeutuminen ei ole pesä- tai populaatiofitness. |
| Molina-Montenegro, M. A. et al. (2023), *Electromagnetic fields associated with power infrastructure affect plants and pollination*, **Science Advances**. [doi:10.1126/sciadv.adh1455](https://doi.org/10.1126/sciadv.adh1455) | Sähköinfrastruktuuri, kasvit, pölyttäjäkäynnit ja pölytys. | Verkostollinen, mitattava kasvi–pölyttäjätestijärjestelmä. | Ei yleinen kenttäkerroin eikä TFR-analogia. |
| Treder, M. et al. (2025), *RF exposure and differential flower visits by Bombus and Apis*, **Environmental Pollution**. [doi:10.1016/j.envpol.2025.126836](https://doi.org/10.1016/j.envpol.2025.126836) | Bombus- ja Apis-kukkakäynnit 2.45/5.805 GHz -asetelmassa. | Mahdollinen community-sorting: sama mitattu FieldState, eri taksonien vaste. | Trial×EMF-analyysin epävarmuus ja yksi asetelma; ei väestökerroin. |
| Treder, M. et al. (2023), *Defined exposure of honey bee colonies to simulated radiofrequency electromagnetic fields: negative effects on homing ability, but not on brood development or longevity*, **Science of the Total Environment**. [doi:10.1016/j.scitotenv.2023.165211](https://doi.org/10.1016/j.scitotenv.2023.165211) | Koloniassa homing muuttui, brood/elinikä eivät samassa asetelmassa. | Toiminto-, päätepiste- ja viive-erojen ennustaminen ilman yleiskuolleisuus-oletusta. | Yksi määritelty protokolla; ei yleinen populaatiovaikutus. |
| Lázaro, A. et al. (2016), *Electromagnetic radiation of mobile telecommunication antennas affects abundance and composition of wild pollinators*, **Journal of Insect Conservation**. [doi:10.1007/s10841-016-9868-8](https://doi.org/10.1007/s10841-016-9868-8) | Tukiasemagradientin villipölyttäjäyhteisö. | Kuvaileva yhteisö-/sentinelliallekirjoitus. | Vahva paikkasekoittumisen ja altistuksen karakterisoinnin riski; ei kausaalinen RF-testi. |
| Hutchison, Z. L. et al. (2020), *Anthropogenic electromagnetic fields influence the behaviour of bottom-dwelling marine species*, **Scientific Reports**. [doi:10.1038/s41598-020-60793-x](https://doi.org/10.1038/s41598-020-60793-x) | HVDC/AC/indusoitujen komponenttien ja pohjaeläinkäyttäytymisen asetelma. | Esimerkki siitä, että kenttäkomponentit on mitattava erikseen. | Ei yhtä yhteisöhaittaa eikä maalla elävän lajin yleisvaikutusta. |
| Donázar-Aramendía, I. et al. (2025), *In situ assessment of HVAC-submarine-cable magnetic fields and macrobenthic communities*, **Environmental Research**. [doi:10.1016/j.envres.2024.120573](https://doi.org/10.1016/j.envres.2024.120573) | In situ -kaapelikenttä ja makrobenthos; rajaava/negatiivinen tulos on osa evidenssiä. | Estää kaapeli = vaikutus -oletuksen; tarvitaan komponentti-, laji- ja kynnystesti. | Ei universaali nollatulos kaikille kentille/lajeille. |
| Zmejkoski, D. et al. (2017), *Genetic-background-dependent responses of Drosophila subobscura to a 50 Hz magnetic field*, **International Journal of Radiation Biology**. [doi:10.1080/09553002.2017.1268281](https://doi.org/10.1080/09553002.2017.1268281) | 50 Hz -vaste riippui geneettisestä taustasta. | G×FieldState-vihje: mahdollinen valintaedellytys, joka pitää testata. | Ei todiste toteutuneesta evoluutiosta. |
| Šofranková, L. et al. (2023), *Effects of Electromagnetic Radiation on Neuropeptide Transcript Levels in the Synganglion of Ixodes ricinus*, **Pathogens**. [doi:10.3390/pathogens12121398](https://doi.org/10.3390/pathogens12121398) | Punkin RF-protokollan neuropeptidi-/reseptoritranskriptit. | Erillinen punkin RF-fysiologiahaara, jota ei sekoiteta staattiseen kiinnittymiseen. | qRT-PCR, ei feeding-fitness, populaatiokasvu eikä resistenssi. |
| Panagopoulos, D. J., Karabarbounis, A. & Margaritis, L. H. (2004), *Effect of GSM 900-MHz Mobile Phone Radiation on the Reproductive Capacity of Drosophila melanogaster*, **Electromagnetic Biology and Medicine**. [doi:10.1081/JBC-120039350](https://doi.org/10.1081/JBC-120039350) | Modulaatioherkkä Drosophila-lisääntymisendpoint. | Lajienvälinen lisääntymis- ja kehitysvaihesignatuuri. | Läheinen kenttä/hyönteinen; ei ihmisen vaikutuksen suuruus. |
| Manta, A. K. et al. (2014), Drosophila-ovaarin ROS-vaste RF-altistuksen jälkeen, **Electromagnetic Biology and Medicine**. [doi:10.3109/15368378.2013.791991](https://doi.org/10.3109/15368378.2013.791991) | Nopean palautuvan redox-vasteen aikakulku. | OOCYTE_REDOX sisältää palautuvan komponentin pysyvän kehitysmuistin ohella. | Hyönteisen munasarja/protokolla; ei ihmiskerroin. |

### 5.4 Ekologian katsaukset, seurantatutkimukset ja sentinellit

| Lähde | BERM-yhteys | Raja |
| --- | --- | --- |
| Karipidis, K. et al. (2023), *Systematic map of radiofrequency electromagnetic-field effects on animals and plants*, **Environmental Evidence**. [doi:10.1186/s13750-023-00304-3](https://doi.org/10.1186/s13750-023-00304-3); Thill, C. et al. (2024), *Electromagnetic fields and insects: systematic review and meta-analysis*, **Reviews on Environmental Health**. [doi:10.1515/reveh-2023-0072](https://doi.org/10.1515/reveh-2023-0072) | Tutkimuskentän kattavuus, altistus- ja endpoint-heterogeenisyys sekä aukot. | Ei yhtä lajienvälistä vaikutuskokoa. |
| Cucurachi, S. et al. (2013), *A review of the ecological effects of radiofrequency electromagnetic fields*, **Environment International**. | Arkiston OUTSIDE_ACTIVE_GRAPH-katsaus; discovery- ja kriittisen vertailun lähde. | Ei aktiivista mallisolmua ennen lähde-/protokolla-arviointia. |
| Hallmann, C. A. et al. (2017), *More than 75 percent decline over 27 years in total flying insect biomass in protected areas*, **PLOS ONE**; Rosenberg, K. V. et al. (2019), *Decline of the North American avifauna*, **Science**. [doi:10.1126/science.aaw1313](https://doi.org/10.1126/science.aaw1313); Sánchez-Bayo, F. & Wyckhuys, K. A. G. (2019), *Worldwide decline of the entomofauna*, **Biological Conservation**. | Hyönteis- ja lintutrendien, monisyisyisen ekologiakadon ja sentinelien taustakonteksti. | Ei EMF-attribuutio; niitä ei saa käyttää yksittäisen FieldState-reitin todistuksena. |
| Vanbergen, A. J. et al. (2013), *Threats to an ecosystem service: pressures on pollinators*; Stuart, S. N. et al. (2004), *Status and Trends of Amphibian Declines and Extinctions Worldwide*; Frick, W. F. et al. (2010), *An Emerging Disease Causes Regional Population Collapse of a Common North American Bat Species*. | Monistressori- ja vaihtoehtoisten selitysten suunnittelukonteksti. | OUTSIDE_ACTIVE_GRAPH; ei kausaalinen EMF-näyttö. |
| Balmori (2006, 2009, 2015), Favre (2011), Sharma & Kumar (2010), Wang et al. (2007, bat magnetic polarity). | Historiallisia ekologisia/hypoteesilähteitä tai MIGRATION_CANDIDATE-viitteitä. | Ei aktiivista vaikutuspainoa ennen yksityiskohtaista protokolla- ja lähdevarmennusta. |
| Jacques et al. (2017), EPILOBEE-aineisto [doi:10.5281/zenodo.400232](https://doi.org/10.5281/zenodo.400232); Brodschneider et al. (2016) [doi:10.1080/00218839.2016.1260240](https://doi.org/10.1080/00218839.2016.1260240), (2018) [doi:10.1080/00218839.2018.1460911](https://doi.org/10.1080/00218839.2018.1460911); Gray et al. (2019) [doi:10.1080/00218839.2019.1615661](https://doi.org/10.1080/00218839.2019.1615661), (2020) [doi:10.1080/00218839.2020.1797272](https://doi.org/10.1080/00218839.2020.1797272), (2022) [doi:10.1080/00218839.2022.2113329](https://doi.org/10.1080/00218839.2022.2113329). | COLOSS-talvikuolleisuuden ekologinen seurantakerros; mahdollinen tuleva sentineliasetelma. | Talvikuolleisuus ei ole lisääntymisendpoint; protokollat vaihtelevat ja puuttuvat Varroa, taudit, torjunta-aineet, ravinto, sää ja kohdistettu RF. Vanhat CSLI-lag-luvut on vedetty pois. |
| EFSA (2021), *Research project on field data collection for honey bee colony model evaluation*, **EFSA Supporting Publications** 18:6695E. [doi:10.2903/sp.efsa.2021.EN-6695](https://doi.org/10.2903/sp.efsa.2021.EN-6695). | MUST-B:n tutkimus-/provenienssikehys tulevalle mehiläisbiologialle. | Hallussa oleva arkistopala sisältää vain sijaintikontekstin, ei päivätason biologisia vasteita tai RF:tä. |
| Rosenberg et al. (2019), yllä; PECBMS:n tieteellinen seurantakehys. | Lintujen runsausindeksi mahdollisena ulkoisena sentinellinä. | Epäsäännöllinen runsausindeksi, ei lisääntyminen, ei kohdistettua altistusta; sillä ei voi laskea vuosiviivettä. |

### 5.5 Evoluutioväitteen testaamisen metodit

| Metodinen lähde | Käyttö BERM–Eco:ssa |
| --- | --- |
| Underwood, A. J. (1992), *Beyond BACI*, **J Exp Mar Biol Ecol**. [doi:10.1016/0022-0981(92)90094-Q](https://doi.org/10.1016/0022-0981(92)90094-Q) | Ennalta määritelty Before–After–Control–Impact-asetelma kenttävaikutusten erottamiseen. |
| Kawecki, T. J. & Ebert, D. (2004), *Conceptual issues in local adaptation*, **Ecology Letters**. [doi:10.1111/j.1461-0248.2004.00684.x](https://doi.org/10.1111/j.1461-0248.2004.00684.x) | Paikallisen sopeuman, geenivirran ja ympäristötekijän erottaminen. |
| Lande, R. & Arnold, S. J. (1983), *The measurement of selection on correlated characters*, **Evolution**. [doi:10.1111/j.1558-5646.1983.tb00236.x](https://doi.org/10.1111/j.1558-5646.1983.tb00236.x) | Kelpoisuuseron ja korreloitujen ominaisuuksien mittaaminen. |
| Schlötterer, C. et al. (2015), *Combining experimental evolution with next-generation sequencing*, **Heredity**. [doi:10.1038/hdy.2014.86](https://doi.org/10.1038/hdy.2014.86) | Evolve-and-resequence / genominen tapa testata sukupolvista valintaa. |
| Dominoni, D. M. et al. (2020), *Why conservation biology can benefit from sensory ecology*, **Nature Ecology & Evolution**. [doi:10.1038/s41559-020-1135-4](https://doi.org/10.1038/s41559-020-1135-4) | Aistiekologian integroiminen suojelu- ja kenttäasetelmiin. |

**Nykyinen johtopäätös:** kirjallisuus tukee luonnollisen kenttäaistin
monimuotoisuutta, lajikohtaisia FieldState-siirtofunktioita ja joitakin
kontrolloituja antropogeenisia käyttäytymis-/fysiologiapäätepisteitä. Se ei
vielä osoita, että antropogeeninen EMF olisi muuttanut lajien geenitaajuuksia
laajasti. Tuon väitteen testi tarvitsee mitatun altistuksen, useat riippumattomat
paikat, sukupolvien välisen fitnessin, common-garden/F1–F2-asetelman tai
vastaavan ja genomiikan.


## 6. Eläinlääketiede, seminologia ja lajienväliset benchmarkit

| Tieteellinen lähde | Mitä se tarjoaa | BERM-yhteys | Rajoite |
| --- | --- | --- | --- |
| Lea, R. G. et al. (2016), *Environmental chemicals impact dog semen quality in vitro and may be associated with a temporal decline in sperm motility and increased cryptorchidism*, **Scientific Reports** 6:31281. [doi:10.1038/srep31281](https://doi.org/10.1038/srep31281) | UK Guide Dogs -jalostuspopulaatio, 1988–2014; motiliteetti, morfologia, kokonaismäärä ja cryptorchidismi. | Koirasentinellin lisääntymisendpointit. | Artikkelin fokus on kemikaalit; sarja on digitoitu kuvaajista, yksi ohjelma/paikka, ei RF eikä ihmisliitos. |
| Fielding, H. R. (2025), *Managing free-roaming domestic dog populations using surgical sterilisation: a randomised controlled trial*, **Scientific Reports**. [doi:10.1038/s41598-025-98990-1](https://doi.org/10.1038/s41598-025-98990-1); DataShare-aineisto [doi:10.7488/ds/7919](https://doi.org/10.7488/ds/7919). | Goa, 10 anonymisoitua paikkaa, kontrolli-/interventioparit, pentu- ja imettävien narttujen laskennat 2020–2023. | Eläinlääketieteellisen päätepisteen, kovariaattien ja intervention dokumentointimalli. | Sterilisaatio määrää itse vasteen, paikat anonymisoitu, ei RF, ei yksilöhedelmällisyys; HELD_ISOLATED. |
| Fernández-López, P. et al. (2022), *Predicting fertility from sperm motility landscapes*, **Communications Biology** 5:1027. [doi:10.1038/s42003-022-03954-0](https://doi.org/10.1038/s42003-022-03954-0); aineisto [doi:10.17632/jd38jhxpg6.5](https://doi.org/10.17632/jd38jhxpg6.5). | 17 Pietrain-karjua, 36 ejakulaattia, 98 020 CASA-soluriviä ja 221 inseminaatiotapahtumaa, yksi asema, 2017. | CASA-piirteiden → inseminaatio/farrowing -mittausmallin benchmark. | Neljä kuukautta, yksi asema, ei RF-/sää-/kemikaalipaneelia; outcome-määritelmän ristiriita säilytetään. |
| Iolchiev, B. S. et al. (2019), *Geomagnetic activity and sperm quality in Holstein bulls*, **Agricultural Biology**. [doi:10.15389/agrobiology.2019.6.1196eng](https://doi.org/10.15389/agrobiology.2019.6.1196eng) | Toistetut semen-näytteet kymmeneltä Holstein-härältä suhteessa luonnollisen geomagneettisen aktiivisuuden indeksiin. | Luonnollisen taustakentän FIELDSTATE_VECTOR → MALE_SPERM -sentinelliesimerkki. | Pieni havainnoiva aikasarja; kausi, hoito ja muut aikariippuvat tekijät sekoittavat; ei RF eikä ihmisyleistys. |
| Wahl, R. L. & Reif, J. S. (2009), *Temporal trends in bull semen quality: a comparative model for human health?*, **Environmental Research**. [doi:10.1016/j.envres.2008.10.012](https://doi.org/10.1016/j.envres.2008.10.012) | USA:n AI-organisaation härkäsemen 1965–1995. | Mahdollinen pitkä kontrolli-/vertailusarja. | Numeerista paneelia, paikkaa ja protokollaa ei ole hallussa; jalostus/keruutapa sekoittavat; ei RF-päätelmää. |
| Karoui, S. et al. (2011), *Time trends, environmental factors and genetic basis of semen traits collected in Holstein bulls under commercial conditions*, **Animal Reproduction Science**. [doi:10.1016/j.anireprosci.2011.02.008](https://doi.org/10.1016/j.anireprosci.2011.02.008) | 42 348 ejakulaattia, 502 Holstein-härkää, 1990–2007; genetiikka-, ikä-, ympäristö- ja tekniset tekijät. | Näyttää, mitkä sekoittajat on mallinnettava ennen härkätrendin käyttöä. | Ei hankittua rivi-/altistusdataa. |
| Hensel, B. et al. (2026), *Temporal trends in porcine and bovine semen characteristics*, **Animal Reproduction Science** 286:108093. [doi:10.1016/j.anireprosci.2025.108093](https://doi.org/10.1016/j.anireprosci.2025.108093) | Julkaisutason yhteenveto 47 757 härkä- ja 619 368 karjuejakulaatista yhdellä saksalaisella AI-keskuksella/laji. | Pisin tunnistettu trendivertailu. | Aggregaatit eivät ole havaintopaneeli, eikä RF-/asema-/valinta-/protokollatietoja ole hallussa. |
| Broekhuijse, M. L. W. J., Feitsma, H. & Gadella, B. M. (2011), *Field Data Analysis of Boar Semen Quality*, **Reproduction in Domestic Animals**. [doi:10.1111/j.1439-0531.2011.01861.x](https://doi.org/10.1111/j.1439-0531.2011.01861.x) | >1 miljoona karjuejakulaattia ja 8,6 miljoonaa porsimistietuetta 750 tilalta (julkaisun kuvaus). | Sisällöllisesti vahvin mahdollinen semen → kenttähedelmällisyys -paneeli. | ACCESS_REQUIRED; ilman raakadataa, paikka-avainta, protokolla- ja altistustietoa ei evidenssiä BERM:lle. |
| Netherton, J. et al. (2022), *Seasonal variation in bull semen quality demonstrates there are heat-sensitive and heat-tolerant bulls*, **Scientific Reports**. [doi:10.1038/s41598-022-17708-9](https://doi.org/10.1038/s41598-022-17708-9) | Julkaistu lisäaineisto voi toimia sää-/seminologiabenchmarkina. | Tarkastettu kandidaattilähde tulevaa datakontrollia varten. | Ei hallussa eikä sentinelli: bull-ID/paikka ja aineiston sisäinen konteksti ovat riittämättömiä; ei RF. |
| Clydesdale pregnancy data, Mendeley Data. [doi:10.17632/kjmc7dg5ny.4](https://doi.org/10.17632/kjmc7dg5ny.4) | 441 tiineyttä, 135 tammaa, 12 anonymisoitua tilaa, 2000–2020. | Monipaikkainen tiineysbenchmarkin kandidaattilähde. | CC BY-NC, anonyymi paikka ja puuttuvat täsmäpäivät; ei RF eikä nykyistä ingestointia. |

## 7. Säilytetty, mutta ei tukevana evidenssinä käytettävä kirjallisuus

| Lähde | Tila | Miksi |
| --- | --- | --- |
| Friedman, J. et al. (2007), *Mechanism of short-term ERK activation by electromagnetic fields at mobile phone frequencies*, **Biochemical Journal**. [doi:10.1042/BJ20061653](https://doi.org/10.1042/BJ20061653) | RETRACTED_2024 / PROVENANCE_ONLY | Retraction; ei aktiivista painoa. |
| Diem, E. et al. (2005), *Non-thermal DNA breakage by mobile-phone radiation in human fibroblasts*, **Mutation Research**. [doi:10.1016/j.mrgentox.2005.03.006](https://doi.org/10.1016/j.mrgentox.2005.03.006) | Vakavasti kiistetty provenance-tietue | Julkaistut data-provenance -huolet; ei aktiivista painoa puolesta eikä vastaan. |

Väitetty riippumaton Lindgren-validointi, placeholder-tietueet ja BERM:n
omat vanhat CSLI-analyysit eivät ole tämän dokumentin tieteellisiä
tukilähteitä. Ne säilyvät erillisessä provenance-arkistossa, mutta niille ei
anneta lähderoolia tässä atlaksessa.

## 8. Mitä lähdekartta tukee nyt

1. **FieldState on pidettävä moniulotteisena mittauskohteena.** Vektori,
   tausta, taajuus, spektri, polarisaatio, geometria, kudos/lajisiirto, valo,
   aika ja materiaali voivat olla merkityksellisiä kontrolloiduissa
   järjestelmissä.
2. **Biologiset reitit ovat erillisiä.** ROS, kalsium, kryptokromi,
   circadian/redox, kudosesteet, sperma, munasarjakehitys, navigointi,
   sähköinen kohtaaminen ja dispersaali eivät ole yksi sama EMF-efekti.
3. **Ekologia on ulkoinen testialusta.** Mehiläiset, kimalaiset, linnut,
   hämähäkit, punkit, kukkapunkit ja vesipohjaeläimet mahdollistavat
   lajikohtaiset, vastakkaissuuntaiset ja komponenttispesifiset ennusteet.
4. **Evoluutioväite on tuleva testi, ei nykyinen tulos.** Sen tulee osoittaa
   mitattu altistus, periytyvä vaihtelu, toistuva fitnessero ja genominen/
   common-garden-tuki.
5. **Ihmisen väestöhedelmällisyyden kausaalipolku on edelleen mittaamatta.**
   Tarvitaan ajallisesti ja paikallisesti kohdistettu FieldState, ihmisessä
   mitatut väli-endpointit, paritason/ASFR-malli sekä ennalta jäädytetty
   validointi.

## 9. Paikalliset lähde- ja auditointipolut

- Aktiiviset tutkimuskohtaiset profiilit:
  [fieldstate_causal_evidence.json](../data/evidence/fieldstate_causal_evidence.json)
- Varmennetut legacy-lähteet:
  [legacy_evidence_qualification_v1.json](../data/evidence/legacy_evidence_qualification_v1.json)
- Koko historiallinen, ei-automaattisesti-aktiivinen bibliografia:
  [legacy_reference_migration_v1.json](../data/evidence/legacy_reference_migration_v1.json)
- Ekologia/evoluutio-synteesi ja tutkimusasetelma:
  [berm-eco-bioelectromagnetic-selection-review.md](berm-eco-bioelectromagnetic-selection-review.md)
- Sentinelien data- ja käyttörajoitteet:
  [sentinel-data-requirements.md](sentinel-data-requirements.md)
- Eläinlääketieteen koirasentinelli:
  [veterinary-sentinel-data.md](veterinary-sentinel-data.md)
- Seminologian benchmarkit ja kandidaattilähteet:
  [seminology-benchmark.md](seminology-benchmark.md) ja
  [seminology-candidate-ledger.md](seminology-candidate-ledger.md)
