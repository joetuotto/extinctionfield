# Sivuston teknologiapeiton inventaario

Tarkistettu 8.9.2026 paikallisesta työpuusta ennen uuden historian verkkohakua. Tämä muistio luokittelee **olemassa olevan sisällön**, ei vahvista sivujen historiallisia vuosilukuja, päästölukuja tai biologisia väitteitä. Sivukoodia ei muutettu.

Haussa olivat nykyiset `website/app`, `components`, `data`, `lib` ja `public/data`: 404 tekstitiedostoa rajatussa koneellisessa läpikäynnissä. `node_modules`, `.next` ja `website/.claude/worktrees` jätettiin pois; viimeksi mainittu sisältää vanhan kokonaisen repositorion kopion eikä kuvaa nykyistä sivustoa. Minifioidun `map_data.json`-tiedoston EAS on aluekoodi eikä hälytinportti. PLC tarkoittaa useissa biologisissa teksteissä fosfolipaasia; `lte4` voi tarkoittaa leukotrieeniä. Niitä ei laskettu teknologiamaininnoiksi.

Luokat: **P** = oma teknologiaprofiili, **A** = nimetty aikajanakerros, **S** = tekstimaininta/muu sivun osa, **V** = pelkkä lähderekisteriviite, **D** = data-/väiterekisterin käsittely, **O** = Codelle-ohjeessa oleva luettelo. Sama teknologia voi kuulua useaan luokkaan. ”Ei löytynyt” tarkoittaa tämän inventaarion määritellyillä termeillä ja nimivariaatioilla puuttuvaa käsittelyä, ei väitettä koko repositorion kaikkien vapaiden tekstien täydellisestä semanttisesta hausta.

## 1. Technology-sivu kokonaisuutena

`website/app/[locale]/evidence/technology/page.tsx` on 1174 riviä. Käsittely kattoi profiilitaulukon, suomenkieliset korvaukset, kaikkien kieliversioiden kerros- ja korrelaatioluettelot sekä sivun renderöidyt muut osiot. Pelkkä ”14 profiilia” ei kuvaa koko sivun teknologiapeittoa.

| Teknologia | Luokka | Ensimmäinen profiilirivi | Muu käsittely |
|---|---|---:|---|
| Sähköverkko 50/60 Hz | P, A, S | 33 | Perustakerros ~1920–1990; esialtistus- ja palautumisosat |
| Wi-Fi-reititin 2,4/5/6 GHz | P, A, S | 44 | Kerros 2005–2012; hitaat verhokäyrät; yökäyttö |
| GSM/2G | P, A, S | 55 | Kerros 1991–2005; TDMA; temporaalinen vertailu |
| 4G/LTE | P, A, S | 66 | Kerros 2012–2020; puhelimen sijainti ja käyttötapa |
| 5G FR1 | P, A, S | 77 | Kerros 2020–nykyhetki sisältää myös FR2:n |
| LED-valaistus/hakkuriajuri | P, A, S | 88 | Kerros 2012–2020; kotien, näyttöjen ja työtilojen lähteet |
| Sähköauton invertteri/moottori | P, A | 99 | Kerros 2020–nykyhetki; matkustamo |
| Induktioliesi | P | 110 | Oma IF-profiili; ei sivun viiden kerroksen nimetty jäsen |
| Bluetooth-nappikuulokkeet | P, A, S | 121 | Kerros 2012–2020; ajallinen korrelaatio |
| Tukiasemat | P | 132 | Omassa profiilissa yleinen nimike; kerroksissa standardit |
| Datakeskukset | P | 143 | Oma monilähdeprofiili; ei nimetty käyttöönottokerros |
| LED-katuvalot | P, A | 154 | Kerros 2020–nykyhetki; optinen ja sähköinen reitti eroteltu roolitekstissä |
| Langaton lataus/Qi | P, A | 165 | Puhelin latausalustalla; kerros 2020–nykyhetki |
| Starlink/LEO | P | 176 | Ku-alaslinkki ja päätelaitteen altistus; ei oma historiallinen sarja |

Viiden kerroksen suomenkielinen lista alkaa riviltä 434. Profiililuettelon ulkopuolelta se lisää **3G/UMTS:n**, **varhaiset älypuhelimet**, **älykodin IoT:n** ja **5G FR2:n**. Nämä ovat jo mukana, vaikka oma profiili puuttuu. Siittiötrendin taulukko riviltä 504 lisää **NMT:n/analogisen matkapuhelimen** vuosille 1973–1990. Mielenterveystaulukko riviltä 510 mainitsee tietokonekäytön, somealustat ja älypuhelimen omaksumisen; alustat eivät ole erillisiä sähkömagneettisen lähteen standardeja.

Muut sivun osat ovat ELF-esialtistus, monilähteisyys, aaltomuoto/vastaanottoikkuna, palautuminen ja ”Miksi 2012?”. Niissä ei ole piilotettua uutta sähköistymistä edeltävää infrastruktuuriluetteloa. TTFields ja kokeellinen ELF esiintyvät mekanismi-/vertailuviitteinä, eivät ympäristöteknologian omaksumishistorioina.

## 2. Sivuston 12 kerrosta on eri luettelo kuin Codelle-ohjeen 12 kerrosta

Nykyinen `website/components/LayersExplorer.tsx:17` sisältää seuraavat 12 nimettyä kerrosta. Komponentti renderöidään `website/components/ExploreTabs.tsx:73`:ssa. Sama lista esitetään mallisivun `website/app/[locale]/model/page.tsx:5908` ympäristölähteiden summan yhteydessä.

| Nykyinen kerros | Sivun aloitusvuosi | Lisätarkenne | Riviviite LayersExplorer |
|---|---:|---|---:|
| Sotilastutka | 1950 | S/X-kaista, kylmä sota | 19 |
| Säätutka | 1988 | NEXRAD / Euroopan Doppler-verkot | 28 |
| Matkapuhelinverkot | 1991 | 2G–5G | 37 |
| Wi-Fi | 1999 | 2,4/5/6 GHz | 46 |
| Näyttösiirtymä | 2005 | CRT → LCD/LED, suoratoisto | 55 |
| Älymittarit | 2005 | 900 MHz / 2,4 GHz mesh | 64 |
| Sisä-LED | 2009 | Hakkuri ja harmoniset | 73 |
| Aurinkoinvertterit | 2010 | MPPT-kytkentä | 82 |
| LED-katuvalaistus | 2012 | Ajuri + **LoRa/4G-älyohjaus** | 91 |
| IoT-laitteet | 2014 | **BLE, Zigbee, LoRa, NB-IoT**, älykoti/teollisuus | 100 |
| ADAS-ajoneuvotutka | 2015 | 24/77 GHz, tiekäytävät | 109 |
| Tuuliturbiinit | 2000 | Maaseutu, invertteri | 118 |

**Nämä eivät ole kokonaan puuttuvia teknologioita.** Mittarit, uusiutuva tuotanto ja ADAS tarvitsevat omaksumis- ja päästödatan syventämistä; niiden lisääminen listaan uutena löydöksenä olisi virhe.

Codelle-ohjeen `docs/codelle/BERM_CODELLE_teknologia_altistusmalli_MASTER.md:56` luettelo sen sijaan on: **AC-sähköverkko 1880–, AM-radio 1920–, tutka 1940–, FM-radio+TV 1950–, CRT 1950–, loisteputket 1960–, 1G/2G-tukiasemat 1983–, Wi-Fi 1999–, 3G/4G 2001–, LED 2009–, 5G 2019–, IoT 2015–**. Tämä on O-tason suunnittelusisältö, ei sama nykyinen 12 sarjan lista. Ohjeet `BERM_CODELLE_teknologia_kokonaisintegraatio_FINAL.md` ja `BERM_CODELLE_teknologia_supplement_FINAL.md` jäsentävät näyttö- ja kanavakerroksia, mutta eivät lisää puuttuville teknologioille alueellista adoptioaineistoa.

Etusivulla renderöity `website/components/BermMasterInfographic.tsx:11` säilyttää viisi yhdistettyä aikajanariviä: **sähköverkko; Radio·Radar; CRT·Fluorescent; Cellular; WiFi·LED·IoT**. Etusivun käyttökutsu on `website/app/[locale]/page.tsx:279`. Siksi AM/FM/TV ja loisteputket ovat vähintään yhdistelmäkerrosten ja ohjeen kautta mukana. Varsinainen puute on luetteloiden yhteensovitus ja näiden lähdeperheiden erillinen aluehistoria.

## 3. Lighting-, history- ja muut aikajanat

**Valaistussivu** `website/app/[locale]/evidence/lighting/page.tsx` käsittelee kokonaisina kertomuksina hehkulamppu → LED-siirtymän (rivit 20/112), CRT → LCD/LED-siirtymän (43/135), EU:n lamppuvaatimukset, TTFields-vertailun sekä 1980-luvun VDT-työn (95/187). Natriumlamput, halogeenit ja LED-pyydykset ovat vertailu-/historiallisia mainintoja. CRT:n VLF-kenttä on mainittu, mutta tämä **ei** ole VLF-radiolähetinten tai navigointiverkkojen käsittely.

`website/components/LightingTransitionTimeline.tsx:12` sisältää EU:n vuosien 2009, 2010, 2011, 2012 ja 2018 sekä USA:n vuoden 2023 vaiheet. `LED_SHARE` riviltä 93 on kovakoodattu globaali LED-osuussarja 2005–2024. Se on A-taso; se ei ole maakohtainen todellinen lamppukanta-/ajurityyppisarja. Merkintöjen lainmukaisuutta tai historiallista tarkkuutta ei validoitu tässä inventaariossa.

**Tutkimushistoria** `website/app/[locale]/about/history/page.tsx:11` kuvaa BERM-tutkimusohjelman kehitystä, mobiililiittymäproxya ja tutka-asemavertailua. Se ei ole yleinen teknologian omaksumishistoria. Sivun otsikkoa ”history” ei tule tulkita osoitukseksi kattavasta infrastruktuurikronologiasta.

**Sairauskaskadien aikajana** `website/components/DiseaseCascadeTimeline.tsx:208` lisää lähdeajoituksia, joita 14 profiilin luettelo ei näytä erikseen: **synteettiset vaatteet/staattinen sähkö 1990, SMPS 1995, HVAC-taajuusmuuttajat 2000, induktio 2005, älypuhelin 2007 ja TWS 2016**. Lisäksi se näyttää verkon, EV:n, LEDin ja matkapuhelinsukupolvet. Varhaiset loisteputkien liitäntälaitteet mainitaan myös rivillä 419. Näiden ajoitukset ovat sivun skenaarioarvoja tässä inventaariossa.

**Muut sähköiset lähteet:** `website/components/ThreeChannelDiagram.tsx:13` mainitsee **HVAC VFD:n ja UPS:n**; `website/app/[locale]/model/page.tsx:297` myös **kannettavien ja puhelinten laturit / kaikki SMPS:t**. `CellSizeFrequencyMatrix.tsx:29` näyttää LED-, HVAC VFD- ja invertterikaistat. Siksi hakkuriteholähteitä, UPS:ää ja taajuusmuuttajia ei pidä ehdottaa täysin uusina luokkina; niiden lämmitys-, pumppu-, kylmäketju-, teollisuus- ja liikennealalajit ovat mahdollisia syventämisiä.

## 4. Koko sivuston kohdennettu tarkistus

| Teknologiaperhe | Mitä löytyi nykyiseltä sivustolta | Luokitus / täsmällinen puute |
|---|---|---|
| RFID / NFC | Ei relevanttia nimettyä osumaa nykyisistä sivuista tai teknologialistoista | Uusi teknologiaprofiili/historia mahdollinen; eläintunnistus ja kulunvalvonta omiksi käyttökohteiksi |
| EAS-hälytinportit | `website/lib/referenceIndex.json:2306,3696`; neljä tietuetta `website/public/data/references_full.json` | V: `khan2018_eas_pregnancy`, `wake2022_eas_measurement`, `yamaguchi2022_eas_library`, `herrala2018_eas_memory_mice`. Varsinainen teknologia- ja omaksumiskäsittely puuttuu; aihe ei ole täysin tuntematon rekisterissä |
| PLC / BPL / HomePlug / G3-PLC | Ei sähkönsiirtojohtimissa kulkevaa tiedonsiirtoa kuvaavaa osumaa | Uusi alalaji älymittarin/älyverkon jo olemassa olevan ylätason sisään; biologinen PLC-osuma ei kuulu tähän |
| Älyverkko / älymittarit | 12 kerrosta; lisäksi BeeArticleContent:27 ja legacyEvidence:2911 | A, S; **PLC vs RF-mesh vs mobiili** puuttuu erotteluna |
| Sähköautojen johtava lataus / suurteholatausasemat | Ei relevanttia erillistä osumaa; EV-profiili koskee matkustamoa ja Qi-profiili puhelinta | Latausasemien sekä autojen induktiivisen latauksen alalajit/historiat puuttuvat |
| Langaton tehonsiirto yleisesti | Technology-sivun Qi-profiili ja aikajana | P, A; sitä ei voi kutsua puuttuvaksi. Teollinen, kulkuväline- ja ajoneuvolataus ovat kattavuuslaajennuksia |
| Sähköaidat | Ei osumaa `electric fence`/`sähköaita`-varianteilla | Uusi maatalouden ja luonnonvaraisten eläinten rajapinta |
| Sähkökalastus, sähköiset kalaesteet, pulssitroolaus | Ei nimettyä käsittelyä haetussa nykyisessä sisällössä | Uusi johtavan vesiympäristön, paikallisten pulssien ja tarkoituksellisen aistimisen/liikkeen ohjauksen perhe |
| Katodinen suojaus | Ei nimettyä käsittelyä | Uusi meri-/maaelektrodien ja jatkuvien DC-virtojen perhe |
| Maa-/vesipaluu ja harhavirrat | **Stray voltage/contact currents** käsitellään evidence/page.tsx:133; hevosia koskeva lähdetietue referenceIndex:2246 | S, V; koko aihe ei puutu. Infrastruktuurin paluuvirtojen historia, maaperä/vesireitit ja paikallinen dosimetria puuttuvat |
| VLF-lähettimet, LORAN/eLORAN, Decca | VLF-osumat vain CRT-näytöistä | Navigointi- ja sukellusveneviestiverkkojen käsittely puuttuu; CRT-VLF ei kata niitä |
| Sähkörautatiet, raitiotiet, johdinautot, vetovirta | Ei relevanttia nimettyä osumaa haetussa nykyisessä sisällössä | Uusi matalataajuisen/DC-infrastruktuurin historia; kiskopaluu ja harhavirta erikseen |
| Teollinen induktio-/dielektrinen lämmitys, hitsaus, valokaariuunit, elektrolyysi | Induktioliesi on oma profiili; `channelGroups.ts:7` mainitsee lääketieteellisen diatermian | Uudet teolliset alalajit ja omaksumishistoriat; kotiliesi ei kata työprosessia |
| DECT, itkuhälyttimet, langattomat kotipuhelimet | `evidence/infant-vulnerability/page.tsx:55`, predictions:538; mittaus- ja puhelinviitteitä rekisterissä | S, V; historia ja DECT:n eri käyttötilat puuttuvat, mutta teknologiaa ei saa nimetä täysin puuttuvaksi |
| Zigbee / LoRa / NB-IoT / BLE | LayersExplorerin IoT-kerros ja katuvalo-ohjaus | A, S; maatalouden etäanturien, kaupunkiohjauksen ym. aluehistorioita syvennettävä |
| TETRA / UWB / WiMAX / Sigfox / hakulaitteet | Ei relevanttia nimettyä osumaa rajatussa haussa | Lupaavia erillisiä viestintä-/paikannusperheitä; prioriteetti riippuu kohtaamisalueesta |
| MRI / TMS / tDCS / PEMF / TTFields | Useita omia näyttö-, laite- ja taajuuskarttasivuja; MRI myös response-conditions/testosterone-sivuilla | Jo huomattava lääketieteellinen käsittely. Puute voisi koskea laitekannan historiaa tai sivullisten/työntekijöiden altistusta, ei teknologian olemassaoloa |
| Merikaapelit | sentinel/page.tsx:52–67, evolutionData.ts:735, causal-atlas-extensions.json:573, evidence/page.tsx:481 | S, D; **ei täysin puuttuva**. HVDC/HVAC, kuormitus, elektrodit, geometria ja reittikohtainen käyttöhistoria puuttuvat |
| Kasvihuonevalaistus | sentinel/page.tsx:83; maatalousvalaistus BeeArticleContent:27 | S; kasvihuoneiden käyttörytmit, lamppusukupolvet ja muu maatalousautomaatio syvennettävä |
| Sähköinen pölytys / staattinen ympäristö | ecology/page.tsx:19, sähköreseptio, kukat, muovi, laitteet; synteettiset tekstiilit aikajanalla | S, A; luontainen ilmiö on käsitelty. Sähköstaattisen ruiskutuksen tai tarkoituksellisen sähköviljelyn adoptiohistoriaa ei löytynyt |

Pelkkään lähderekisteriin rajautuva osuma ei takaa, että lähde renderöityy nykyiselle lukijalle helposti löydettävänä teknologiasisältönä. Tässä inventaariossa EAS luokiteltiin siksi V-tasolle eikä profiiliksi.

## 5. Mitä website/data sisältää teknologiasta

`website/data` ei sisällä nykyisellään yhtä kattavaa kanonista teknologia-/adoptiosarjataulukkoa. Teknologianimien kohdennetussa läpikäynnissä löytyi:

- `signal_structure.ts`: GSM:n 25 Hz:n komponentti, monikehys ja signaalikontrastit; mallilaskennan ja mitatun aaltomuodon raja.
- `biological_constraints.ts`: UMTS/GSM/LTE-kokeiden tarkat protokollat. Nämä ovat biologisen tutkimuksen signaaleja, eivät alueellisia käyttöönottoja.
- `research_program.ts` ja `correction_registry.ts`: standardikohtaisten tulosten tutkimus- ja korjausluokat.
- `dkc-framework.json`: erillinen Wi-Fi-proxy (rivi 141), GSM- ja FM-kauden väitteet (457/468), Wi-Fi/CCD-ajoitus (589). FM esiintyy siis myös D-tasolla.
- `claims.json` ja `intervention-profiles.json`: esimerkiksi GSM-moduloitu 3,5 GHz:n koe ja sen ero 5G NR:ään; ei uusi matkapuhelinteknologia.
- `causal-atlas-extensions.json`: merikaapelit/sähköaisti sekä avaruussään ja sähköverkon yhteisvaikutus.

Numeeristen skenaariotiedostojen monet biologiset `lte4`-kentät eivät ole LTE-verkkoa. Mobiililiittymä- ja muut laajat proxyt eivät itsessään todista uuden lähdeperheen fysiikan olevan mallinnettu. Tässä muistiossa ei auditoida kaikkia Python-mallin syötepolkuja; se kuuluu rinnakkaiseen malliinventaarioon.

## 6. Aidosti lupaavat lisäykset muiden organismien kannalta

Uuden lähdetutkimuksen ensimmäinen joukko on **sähköaidat; sähkökalastus/pulssitroolaus/kalaesteet; katodinen suojaus; infrastruktuurin maa-/vesipaluu ja harhavirrat**. Ensimmäisille kolmelle ei löytynyt nimettyä nykykäsittelyä. Neljännelle on jo eläinten kontaktivirran maininta, jota laajennetaan tarkoituksellisiin ja tahattomiin virtareitteihin. Näillä saadaan mukaan johtava maaperä/vesi, elektrodigeometria, kontaktit ja paikalliset pulsseina toistuvat kohtaamiset.

Toinen joukko on RFID/NFC/EAS:n käyttökohteet, PLC, sähköinen raideliikenne, VLF/navigointiverkot ja teolliset sähköprosessit. Näiden kenttärakenne tai organismin kohtaaminen eroaa nykyisten kuluttajaprofiilien painopisteestä. EAS:n lähdepohja ja älymittarien ylätaso ovat jo olemassa.

Lisäysten tarkoitus on parantaa BERM:n fysikaalista syöterekisteriä, ei nimetä haittaa pelkän teknologian perusteella. Lähteen leviäminen, paikallinen kenttä/virta, organismin kohtaaminen, biologinen vastaanotin ja populaatiovaikutus ovat eri portaita. Inventaario ei aseta uusille perheille annosta tai biologista kerrointa. Historiatyössä tarvitaan käyttöönoton lisäksi käytöstäpoistot ja paikallisen kenttäalueen rajaus.
