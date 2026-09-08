# BERM:n teknologiapeitto ja puuttuvat omaksumishistoriat

**Tutkimuskatsaus 8.9.2026.** Tarkastelun lähtökohtana on käyttäjän pyyntö: ensin mallin ja sivuston teknologialistojen perusteellinen inventaario, sitten vasta jo tunnistettujen lisäksi puuttuvien lähteiden ja leviämishistorioiden tutkiminen. Tarkoitus on vahvistaa BERM:n steelman-versiota täydentämällä sen fysikaalista ja historiallista syötettä.

**Jatkototeutus:** käyttäjän hyväksymä sivusto- ja aineistointegraatio, yhteinen rekisteri sekä kuvaajien korjaukset on kuvattu [toteutusmuistiossa](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/implementation.md>). Alla oleva teksti säilyttää sitä edeltäneen tutkimusinventaarion.

**Keskeinen tulos: mallin teknologiasisältö on selvästi 14 profiilin sivua laajempi. Olennaisimmat lisäykset löytyvät lähteiden toteutustavoista, johtavista ympäristöistä, käyttökohteista ja alueellisista laitekannoista.** Älymittarit, aurinkoinvertterit, tuuliturbiinit, ajoneuvotutkat, HVAC-taajuusmuuttajat, UPS, langaton lataus ja synteettisten materiaalien sähköistyminen ovat jo tunnistettuja. Niitä ei tässä esitetä uusina löytöinä.

**Mitä käytiin läpi ennen uusia verkkohakuja**

Inventaariossa erotettiin viisi tasoa: oma teknologiaprofiili, nimetty aikajanakerros, laskennallinen komponentti, pelkkä lähde-/tekstiviite sekä todellinen omaksumis-/mittausaineisto. Lisäksi tarkastettiin, oliko ehdokas nimetty aiemmassa tämän päivän katsauksessa puutteeksi. Näin esimerkiksi biologialähteistä löytyvä EAS-portti ei muutu perusteettomasti kokonaan uudeksi löydöksi.

| Tarkastettu kokonaisuus | Mitä se oikeasti sisältää |
|---|---|
| Teknologiasivu | 14 profiilia: sähköverkko, Wi-Fi, GSM, LTE, 5G FR1, LED, sähköauto, induktioliesi, Bluetooth-kuulokkeet, tukiasemat, datakeskukset, LED-katuvalot, Qi-lataus ja Starlink/LEO |
| Saman sivun viisi kerrosta ja trenditaulukot | Lisäksi 3G/UMTS, NMT, varhaiset älypuhelimet, IoT ja 5G FR2; eri tasolla kuin profiilit |
| Nykyinen LayersExplorer ja mallisivun 12 kerrosta | Sotilas- ja säätutkat, mobiiliverkot, Wi-Fi, näyttösiirtymä, älymittarit, sisä-LED, aurinkoinvertterit, katu-LED, IoT, ADAS ja tuuliturbiinit; IoT sisältää BLE/Zigbee/LoRa/NB-IoT |
| Codelle MASTERin historiallinen 12 kerrosta | Eri luettelo: AC, AM, tutka, FM/TV, CRT, loisteputket, 1G/2G, Wi-Fi, 3G/4G, LED, 5G ja IoT |
| Etusivun ja sairauskaskadien aikajanat | Radio/tutka ja CRT/loisteputki yhdistelminä; lisäksi SMPS, HVAC-VFD ja synteettinen vaatetus |
| Python-malli ja data | Mobiili-, Wi-Fi-, kuuloke- ja IoT-proxyt; broadcast-/sotilasskenaariot; ELF/IF/RF-diagnostiikka, metroinvertterit, älymittari, mikroaaltouunin vuoto, rakennus- ja tribosähkörajapinnat |
| Lähderekisteri ja aiemmat katsaukset | 1 191 tietueen kohdennettu metadatainventaario, 38 lähdeperheen vertailu ja 30 aiemmin nimetyn puutteen koonti |

Teknologiasivu ja mallisivu tarkastettiin myös julkisesta verkkoversiosta. Luetteloiden vuosilukuja käsiteltiin inventaariossa niiden nykyisin esittäminä arvoina, ei automaattisesti varmennettuna teknologiahistoriana. [Teknologiasivu](https://www.extinctionfield.com/fi/evidence/technology); [mallisivu](https://www.extinctionfield.com/fi/model).

Tarkat tiedostot, rivit, lähde-ID:t ja hakurajaukset ovat [sivuinventaariossa](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/site_inventory.md>), [malli- ja datainventaariossa](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/model_inventory.md>) sekä [aiempien puutteiden ja lähderekisterin vertailussa](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/prior_and_reference_inventory.md>). Koko lähderekisterin metadatapeiton tarkistus ei tarkoita 1 191 artikkelin kokotekstin uudelleenlukemista. Vanha työpuukopio, rakennustiedostot ja esimerkiksi biologinen PLC/fosfolipaasi suljettiin teknologiavertailusta pois.

**BERM:n premisseistä johdettu valintaperuste**

Vuoden 2025 Lindgren-formulaation BERM-normalisointi on

\[
g_{\mu\nu}=\eta_{\mu\nu}+\kappa A_\mu A_\nu.
\]

Kun olemassa olevaan kokonaispotentiaaliin A lisätään teknologian paikallinen osuus b, saadaan

\[
\Delta g_{\mu\nu}=\kappa(A_\mu b_\nu+b_\mu A_\nu+b_\mu b_\nu).
\]

Tämä on **johdettu geometrinen seuraus**. Uuden laitteen relevanssi riippuu siten myös aiemmasta kenttäympäristöstä, paikasta, orientaatiosta ja ajoituksesta. Teknologian nimelle tai myyntimäärälle ei tästä seuraa biologista kerrointa. BERM:n ehdollinen kudossilta voidaan kirjoittaa muodossa

\[
u_i(t)=\int_0^\infty K_i^{\mu\nu}(\tau;S_i(t-\tau))\,
\Delta g_{\mu\nu}(t-\tau)\,d\tau+\cdots.
\]

K ja vastaanottimen tila S kuuluvat **BERM:n ehdolliseen mekanismiin**. Historialliset tekniikkatiedot ja fysikaaliset mittaukset ovat **tuotua empiiristä syötettä**; yleinen gauge-, mittakaava- ja kudoskalibrointi säilyy erillisenä **avoimena kalibrointina**. Tässä ei tarvitse ratkaista kaikkia kertoimia ennen kuin puuttuva lähdehistoria voidaan tunnistaa ja rakentaa.

Tästä seuraa käytännöllinen priorisointisääntö: lisäys on arvokas, jos se tuo **uuden paikallisen kenttärakenteen, aiemmin puuttuvan pitkäkestoisen kohtaamisen, suuren mutta eri tavalla jakautuneen käyttäjäkunnan tai oman historiallisen muutoksen**. Prioriteetti alla tarkoittaa tiedollista lisäarvoa BERM:lle, ei jo mitattua terveys- tai ekologiavaikutusten suuruutta. FieldState voi tallentaa tai arvioida näitä fysikaalisia syötteitä; biologinen tulkinta tulee BERM:stä.

**Ensimmäinen ryhmä: puuttuvat tai vasta lähdeviitteissä esiintyvät tekniset toteutukset**

| Lisättävä kokonaisuus | Mitä oli jo olemassa? | Aidosti puuttuva osa | Missä lisäarvo on suurin? |
|---|---|---|---|
| Sähköverkkoviestintä: kuormanohjaus, PLC/BPL ja mittareiden tiedonsiirto | Sähköverkko ja RF-mesh-älymittari | Johtimiin kytketty viestintä, maa-/verkkoyhtiökohtainen protokolla ja lähetysrytmi | Kotien ja alueverkkojen IF-/RF-historia; älymittarivaihdot eri maissa |
| RFID/NFC sekä EAS-porttien oma teknologiakäsittely | EAS:n neljä lähdetietuetta; yleinen IoT | LF/HF/UHF-lukijat, induktiivinen lähikenttä, porttityyppi ja lukijalaitteiden kanta | Kauppa, kirjastot, varastot, kulunvalvonta ja eläintunnistus |
| Sähköaidat | Eläinten sähköaisti ja hajavirrat | Aitalaitteet, pitkät johtimet, pulssit, maadoitus ja kontaktit | Laidunalueet, maatilat ja luonnonvaraisten eläinten rajat |
| Sähkökalastus, sähköiset kalaesteet ja pulssitroolaus | Merikaapelit ja sähköreseptio | Tarkoitukselliset vedessä kulkevat virrat, elektrodigeometria ja käyttöpaikat | Joet, kanavat, vesienhoito ja tietyt kalastusalueet |
| Katodinen suojaus ja eritellyt maa-/vesipaluuvirrat | Merikaapelit sekä eläinten stray voltage/contact currents | Suojausjärjestelmän anodi–rakenne-virtareitti, ulkoisen virtalähteen ja uhrautuvan anodin ero | Satamat, laivat, putket, rannikkorakenteet; paikallinen ympäristö |
| Teollinen elektrolyysi ja suuret tasavirtaprosessit | Teollinen sähkö yleistasolla; hitsaus/induktio aiemmin tunnistettu | Elektrolyysihallit, virtakiskot, staattinen kenttä ja rippeli | Tietyt teollisuuspaikkakunnat ja ammattiryhmät, pitkä historiallinen peitto |
| UWB-paikannus ja lyhytpulssiset tunnistuslaitteet | Älypuhelin, IoT ja tutka | UWB:n oma aaltomuoto, toiminto ja käyttöaika | Henkilölaitteet, tunnisteet ja paikannusverkot |
| Metallinilmaisimet ja eritelty turvatarkastustekniikka | EAS-portit lähteissä | Induktiivinen mittauskenttä ja pulssimuodot; aktiivinen/passiivinen kuvantaminen erikseen | Läpikulku vs portin vieressä työskentely; julkiset tilat |

”Puuttuva” tarkoittaa tässä nykyisen nimetyn teknologia-/historiakäsittelyn puutetta. EAS, harhavirrat ja älymittarit ovat tarkoituksella mukana osittaisen peiton tapauksina. UWB on nykyisestä IoT-listasta puuttuva signaaliperhe, ei kokonaan uusi sähkömagneettisen fysiikan laji.

**Näille lisäyksille löytyi jo historiallisia ja mittauksellisia ankkureita**

| Lähdeperhe | Tarkistettu käyttöönotto tai levinneisyys | Merkitys täydennykselle |
|---|---|---|
| PLC ja kuormanohjaus | Italian Enelin Telegestore-ohjelma 2001–2006; Ranskan Linky-pääaalto 2015–2021, lopussa 34,3 miljoonaa mittaria. Uuden-Seelannin ripple control yleistyi jo 1950-luvulta. [Enel](https://www.enel.com/content/dam/enel-com/pressrelease/porting_pressrelease/1629732-1_PDF-1.pdf), [CRE](https://www.cre.fr/actualites/notre-magazine-parlons-energie/parlons-energie-n8/maitrise-de-sa-consommation-en-periode-de-crise-grace-aux-compteurs-evolues.html), [EECA](https://www.eeca.govt.nz/assets/EECA-Resources/Research-papers-guides/Ripple-Control-of-Hot-Water-in-New-Zealand.pdf). | Yhtä maailmanlaajuista älymittarivuotta ei tarvita: maa- ja protokollakohtaisia ohjelmia voi käyttää suoraan. Vanha kuormanohjaus muodostaa oman aikaisemman kerroksensa. |
| RFID/NFC | Tokion Suica alkoi 18.11.2001 ja saavutti 10 miljoonaa korttia lokakuussa 2004; NFC Forum perustettiin 2004. [JR East](https://www.jreast.co.jp/en/e/press/20041003/index.html), [NFC Forum](https://nfc-forum.org/uploads/nfc-forum-15-year-position-paper-wp-final-jan-2020.pdf). | Kulunvalvonnan, liikenteen ja kaupan omaksumiset erotellaan. Korttien tai passiivisten tunnisteiden määrä ei ole lähettävien lukijoiden määrä. |
| EAS-portit | Sensormaticin oma aikajana: EAS 1968, akustomagneettinen tekniikka 1986. Miwa ym. mittasivat vuonna 2022 julkaistussa tutkimuksessa viittä kirjastojen porttimallia, joiden signaalit ja kenttäjakaumat erosivat toisistaan. [Sensormatic](https://www.sensormatic.com/landing/60-anniversary-landing-page), [Miwa ym.](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2022.871134/full). | Mallin lähteissä oleva tutkimus voidaan liittää nimettyyn teknologiaan ja mitattuihin profiileihin. Yrityksen aikajana ei yksin kuvaa maailmanlaajuista markkinaosuutta. |
| Sähköaidat | Gallagherin Uuden-Seelannin toiminta alkoi 1938; nykyinen yritys ilmoittaa läsnäolon yli sadassa maassa. [Gallagher](https://www.am.gallagher.com/en-NZ/About-Us). | Historiallinen lähdeankkuri on olemassa, mutta alueelliset aita- ja paimenmäärät on vielä koottava. Akku- ja aurinkokäyttö tuovat verkkosähköstä erillisen leviämispolun. |
| Sähköiset vesistöjärjestelmät | Chicagon kanavan demonstraatioeste aloitti huhtikuussa 2002. Hollantilainen pulssitroolaus alkoi poikkeusluvilla 2007; EU:n siirtymäaika päättyi 30.6.2021. [USACE](https://www.mvr.usace.army.mil/Portals/48/GLMRIS%20Main%20Report%20w%20Updated%20Supplemental%20-%20MER%2017MAY2019.pdf), [CLO](https://www.clo.nl/indicatoren/nl058701-inzet-visserijtechnieken-nederlandse-kottersector-2014), [EU 2019/1241](https://eur-lex.europa.eu/eli/reg/2019/1241/oj/?uri=CELEX%3A32019R1241). | Paikallinen sähköinen lähde voidaan ajoittaa käyttöönottoon, toimintaan ja poistumaan. Kalaeste, tutkimuskalastus ja liikkuva trooli tarvitsevat eri kohtaamishistorian. |
| Katodinen suoja ja maapaluu | Davyn alkuperäisartikkeli meriveden korroosiosuojauksesta ilmestyi 1824. Queenslandin Ergonin SWER-verkko on noin 65 000 km, valtaosin 1970–1980-luvuilta, mutta palvelee noin 4 % yhtiön asiakkaista. [Davy](https://doi.org/10.1098/rstl.1824.0009), [Ergon](https://www.ergon.com.au/network/our-network/fringe-of-grid-supply). | Galvaaninen suoja ja ulkoinen virtalähde erotetaan. Verkon pituus ja asiakkaiden määrä mittaavat eri asioita; ekologinen kartoitus tarvitsee virtareitit ja elektrodit. |
| Teollinen elektrolyysi | Alcoan kaupallisen alumiinielektrolyysin pilottituotanto Pittsburghissa alkoi 1888. Moen ym. raportoivat 1995 elektrolyysihallien 3–20 mT:n staattisia kenttiä. [Alcoa](https://aacomnoa.apps.alcoa.com/global/en/who-we-are/history), [Moen ym.](https://doi.org/10.1136/oem.52.8.524). | Teollinen tasavirtahistoria on vanha, paikallinen ja mitattavissa. Tuotantotonnit ja työpaikan kenttä eivät ole sama suure. |
| UWB | FCC:n ensimmäinen laaja UWB-päätös 2002; UWB-toiminnon sisältävä iPhone 11 markkinoille 2019. [FCC](https://docs.fcc.gov/public/attachments/FCC-02-48A1.pdf), [Apple](https://www.apple.com/newsroom/2019/09/apple-introduces-dual-camera-iphone-11/). | Standardi, saatavuus, laitekanta ja toiminnon todellinen käyttöaika voidaan erottaa toisistaan. |
| Metallinilmaisimet | Yhdysvaltain matkustajaseulonnan vuoden 1973 vaatimus muodosti käyttöönoton ankkurin. Boivin ym. mittasivat 2003 eri käsi- ja läpikulku­laitteiden taajuuksia ja aaltomuotoja. [Federal Register](https://www.govinfo.gov/content/pkg/FR-1973-06-20/pdf/FR-1973-06-20.pdf), [Boivin ym.](https://pubmed.ncbi.nlm.nih.gov/12747477/). | Lyhyt läpikulku, työntekijän läsnäolo ja laitesukupolvi voidaan mallintaa erikseen. EAS ja metallinilmaisin eivät ole yksi yhtenäinen signaaliperhe. |

Suomesta löytyy lisäksi omaksumisen erillinen ankkuri: etäluennan pääaalto sijoittui vuosiin 2009–2013, ja vuoden 2017 ministeriöselvitys ilmoitti tuntimittauksen kattavuudeksi noin 99 %. Tämä on mittausjärjestelmän kattavuus, ei yhden radioprotokollan osuus tai lähetyksen jatkuvuus. [TEM:n selvitys, s. 57](https://julkaisut.valtioneuvosto.fi/server/api/core/bitstreams/c1a29bed-8cdb-40ba-a4ae-52d693a8ff9e/content).

**Toinen ryhmä: jo tunnistettujen teknologioiden tärkeimmät puuttuvat historiat**

1. **Kotien invertterilaitteet, ilmastointi ja lämpöpumput.** Kaupallinen HVAC-VFD on jo mallissa. Kotitalouksien invertteri-ilmastointilaitteen alku Japanissa vuonna 1981 antaa paljon LED-siirtymää vanhemman ankkurin. IEA:n mukaan vuonna 2017 maailmassa oli noin 1,7 miljardia ilmastointilaitetta, joista noin 36 % Kiinassa; luku ei tarkoita invertterimallien osuutta. Suomen lämpöpumppukanta ylitti SULPUn mukaan miljoonan vuonna 2020. Tarvitaan laitesukupolvi, sisä-/ulkoyksikön sijainti sekä lämmitys- ja jäähdytyskausi. [Toshiba Carrierin historiatiedote](https://www.toshiba-carrier.co.jp/global/news/pdf/Press_Release_en_20210316.pdf); [IEA: China cooling](https://www.iea.org/reports/the-future-of-cooling-in-china); [SULPU](https://www.sulpu.fi/lampopumput/).

2. **Synteettisten materiaalien käyttö, pintakäsittely ja maadoittuminen.** BERM sisältää jo StaticTriboelectricInterface-rajapinnan sekä polyesteri-/nailonlähteitä. Uusi työ on materiaalihistoria: nailonin kaupallinen tuotanto alkoi Seafordissa vuonna 1939; polyesteri oli 59 % globaalista kuitutuotannosta vuonna 2024. Kumpikaan tieto ei ole ihokontaktin annos. Tarvitaan käyttömaan ja tuotantomaan erottelu, vaatetus/lattiapinnat/jalkineet, kosteus, hankaus ja antistaattiset käsittelyt. [ACS:n historiallinen aineisto](https://www.acs.org/education/whatischemistry/landmarks/carotherspolymers.html); [Textile Exchange 2025](https://textileexchange.org/knowledge-center/reports/materials-market-report-2025/).

3. **Radioliikenteen historialliset verkot.** AM/FM/TV, tutka ja meriradio oli jo tunnistettu. Varsinaiset VLF/LF-, LORAN/OMEGA-, kiinteä radiolinkki- ja maa-asemaverkot tarvitsevat asemakohtaisen historian. Grimetonin kaupallinen toiminta alkoi 1924; OMEGAn kahdeksan aseman verkko oli kokonaisuudessaan käytössä elokuusta 1982 ja lopetti 30.9.1997. Tämä tuo aikajanaan kasvun lisäksi todellisia poistumia. Lähteen poistuminen muuttaa samoja geometrisia ristiosia kuin uuden lähteen lisääminen; biologisen vasteen suunta riippuu edelleen vastaanottimesta. [Grimetonin historia](https://grimeton.org/en/history/); [OMEGAn toimintakuvaus, Federal Radionavigation Plan 1996](https://rosap.ntl.bts.gov/view/dot/8404/dot_8404_DS1.pdf); [FAA:n vahvistus lopettamisesta](https://www.govinfo.gov/content/pkg/FR-2008-08-08/pdf/E8-18133.pdf).

4. **Sähköinen liikenne henkilöautoa laajemmin.** Metroinvertteri ja sähköauto ovat jo mukana. Sähköiset kaksi-/kolmipyöräiset, niiden irtoakkujen lataus ja ammattiajo lisäävät erillisen alueellisen historian etenkin Aasiassa. IEA:n vuoden 2024 luku on noin 10 miljoonaa sähköistä kaksi-/kolmipyöräistä myytynä; määritelmä jättää sähköavusteiset polkupyörät ja hitaat sähköpotkulaudat pois. Historiassa säilytetään nämä nimittäjät erillisinä. [IEA, Global EV Outlook 2025](https://www.iea.org/reports/global-ev-outlook-2025/trends-in-other-light-duty-electric-vehicles).

5. **Sairaalat, työprosessit ja pitkäaikaiset käyttäjäroolit.** MRI, TMS, sähköinen neuromodulaatio, PEMF, diatermia ja TTFields ovat jo lähteissä. Puute on laitekannan, toimenpidemäärien, kenttävoimakkuuksien ja työntekijä-/potilasroolien historia. Samoin teollinen hitsaus, dielektrinen kuumennus ja kuivaus olivat aiemmin nimettyjä puutteita. Nämä kannattaa toteuttaa ammatillisina ja toimenpidekohtaisina haaroina.

6. **Tunnettujen lähteiden korvautuminen ja käyttötavan vaihtuminen.** CRT→LCD, magneettinen→elektroninen liitäntälaite→LED, radiolinkki→kuitu, DECT-kannan pienentyminen, analogisen television sulkeminen sekä puhelinverkkojen rinnakkaiselo tarvitsevat osuudet ja poistumat. Langaton lataus, datakeskus, aurinkoinvertteri ja tuulivoima ovat jo listalla; niille uutta arvoa tuovat laitekanta, paikallinen kuorma, rakenne ja käyttötunnit.

7. **Verkosta riippumaton sähkö ja varavoima.** Aurinkosähkö, akut ja UPS ovat jo tunnistettuja, mutta aurinkolyhty → kodin DC-järjestelmä → invertterillinen järjestelmä → verkkoon liittyminen on erillinen omaksumispolku. GOGLAn raportointiin osallistuneet toimijat myivät vuonna 2024 noin 9,3 miljoonaa aurinkosähköpakettia; niistä noin 5,64 miljoonaa oli lyhtyjä ja 1,7 miljoonaa kotijärjestelmiä. Tämä ei ole koko maailman markkinakanta. Erottelu on tärkeä etenkin Afrikan ja Aasian historiassa: sähköön pääsy voi muuttua usealla teknisellä tavalla ennen laajaa AC-verkkoa. [GOGLA/ESMAP, vuoden 2024 myyntiaineisto](https://gogla.org/reports/semi-annual-solar-market-report/insights-from-goglas-2024-sales-and-impact-data/).

Näiden teknisten lisäysten lähteet, alkuvuodet, lukutasot ja rajaukset löytyvät neljästä erillisestä lähdemuistiosta: [RFID/EAS/NFC ja sähköverkkoviestintä](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/identification_plc_history.md>), [maatalous- ja vesistöteknologiat](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/ecology_technology_history.md>), [teollisuus ja kuluttajalaitteet](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/industrial_consumer_history.md>) sekä [radioinfrastruktuuri](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/radio_infrastructure_history.md>).

**Mitä paikallinen data jo mahdollistaa ja mitä siihen kannattaa lisätä**

Mallissa on oikeita World Bank/ITU:n mobiili-, internet- ja laajakaistasarjoja sekä ANFR:n paikallisia RF-mittauksia. Niiden rinnalla on skenaariokäyriä ja heuristisiä käyttöönottovuosia. Esimerkiksi 32 laajennusmaan sukupolvivuosien generointi käyttää internetin/laajakaistan kynnysarvoja. LED-ryhmäsarja taas on 100 vuosiarvon arvioitu taulukko kahdessa yhtäpitävässä kopiossa. Nämä antavat rakennuspohjan, mutta teknologian omat käyttöönotto- ja käyttöosuudet täydentävät puuttuvan historiallisen tiedon. Tarkka kutsuketju on [malliinventaariossa](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/model_inventory.md>).

Yksi yhteinen teknologiarekisteri palvelisi nykyisiä profiileja, aikajanoja ja mallin syötteitä. Jokaiselle lähdeperheelle kannattaa tallentaa:

| Tietoryhmä | Sisältö |
|---|---|
| Tekninen identiteetti | Teknologia, standardi/laitesukupolvi, kantataajuus, todellinen aaltomuoto; E, B, johtava virta ja optinen valo eriteltyinä |
| Historiallinen tila | Ensimmäinen käyttö, asennukset, käytössä oleva kanta, käyttöosuudet, korvautuminen ja sulkeminen |
| Paikka ja rakenne | Maa, alue, asema/rakennus/laite, antenni tai elektrodi, johdin-/paluuvirran geometria, lähteen ja vastaanottimen paikka |
| Käyttö | Vuorokausi, vuodenaika, työvuoro, kuorma, käyttötila, pulssit, lähetysaika ja tauot |
| Organismin kohtaaminen | Ihmis- tai eläinryhmä, liikereitti, kehon/kudoksen sijainti, kontakti sekä elinympäristön johtavuus |
| Lähde ja varmuus | Mittaus, laitekanta, käyttötilasto, välillinen proxy vai skenaario; lähteen vuosi ja kattavuus |
| BERM-liitos | Paikallisen fysikaalisen syötteen siirto, vastaanotintila ja käytetty ehdollinen vasteydin erillisinä |

Asennuskannan historia voidaan rakentaa myynneistä/asennuksista ja poistumasta: N(t)=∫myynti(t−a)·säilymisosuus(a) da. Käyttöaika ja paikallinen kenttä lisätään tämän jälkeen. Tällöin yhden vuoden myyntiosuus ei muutu vahingossa koko käytössä olevan kannan osuudeksi. Valmistajan ilmoittama lanseeraus, verkkoyhtiön valmis asennusohjelma ja kentällä mitattu päivittäinen signaali säilyvät kolmena eri havaintona.

**Maantiede ja vuodenaika ovat tässä teknologian historiaa**

Sama teknologianimi voi tarkoittaa eri maissa eri signaalia: PLC-mittari, RF-mesh-mittari ja matkapuhelinyhteyttä käyttävä mittari tarvitsevat eri lähdekuvauksen. Sama invertteriperhe voi toimia pohjoisen talvella lämmitykseen ja etelän kesällä jäähdytykseen. Aurinkosähkö, varastoakku ja yölataus erottuvat ajallisesti toisistaan. Synteettisen materiaalin varaus riippuu käyttöympäristöstä; maaperän ja veden johtavuus liittyy paikallisiin virtareitteihin.

BERM:ssa nämä vaihtelut voivat muuttaa sekä lähteen aikajälkeä että vastaanottimen tilaa. Teknologiahistorian täydennys auttaa siksi myös aiemmassa steelman-analyysissa käsiteltyjen eri paikkaan tai vuodenaikaan sijoittuvien tutkimusten vertailua. Tässä ei luokitella niitä uudelleen uusiksi vaikutustutkimuksiksi: nyt täydennetään sitä, millainen fysikaalinen ympäristö tutkimuspaikalla oli ja kuinka se kohtasi organismin.

**Ensisijainen kehitysjärjestys**

Ensimmäiseksi yhdistäisin nykyiset erilliset teknologialistat yllä olevalla peittoluokituksella ja lisäisin **PLC/älymittariprotokollat, RFID/EAS-lukijaympäristöt sekä kotien invertterien aluehistorian**. Näille on laajoja käyttöönotto-ohjelmia, tunnistettavia laitesukupolvia tai jo olemassa olevia mittauslähteitä.

Samanaikainen ekologinen täydennys on **sähköaidat, sähköiset vesistöjärjestelmät ja katodinen suojaus/paluuvirrat**. Ne tuovat lähdeympäristöjä, joita mobiili-, Wi-Fi- ja valaistusprofiilit eivät kuvaa. Historialliseen ja ryhmäkohtaiseen laajennukseen kuuluvat **teolliset tasavirrat, synteettiset materiaalit ja vanhat radioverkot**. UWB ja metallinilmaisimet ansaitsevat oman luokan, mutta niiden suhteellinen väestömerkitys tarvitsee käyttöaikatiedot.

UV-desinfiointi, solariumit, infrapunalämmitys, teollinen optiikka, kuulon induktiosilmukat ja sähköstaattinen ruiskutus jäivät tunnistetuiksi jatkohaaroiksi. Niille ei tässä koottu yhtä kattavaa historiallista lähdepakettia eikä määritetty suurta selitysosuutta.

Tämä katsaus täydentää mallin tutkimuspohjaa. Julkista sivustoa, ennustekertoimia tai mallin ohjelmakoodia ei muutettu tämän tehtävän yhteydessä.
