# Mallin, evidenssin ja sivuston integraatio — 7.9.2026

Tämä toteutus seuraa [integraatioauditointia](../analysis/BERM_integraatioauditointi_2026-09-07/README.md). Atlas säilyy yhtenä yhteisenä verkostona, josta kuusi aliatlasta näyttää eri näkymät. Tässä versiossa verkossa on 234 kanavaa ja 578 yhteyttä. Kanavan esiintyminen kartassa, kuratoitu väite, tutkimussuhde ja kalibroitu ennuste ovat erillisiä asioita.

## Toteutetut muutokset

| Auditoinnin kohde | Toteutus |
|---|---|
| Osamallien erillisyys | Uusi `berm-modulome-conditional-asfr-v1` yhdistää kalvokompetenssin, Ca²⁺-osastot, vastaanotinvalmiuden, korjauksen, vaurion, toiminnallisen elinportin, parikapasiteetin ja ikäkohtaisen väestölaskennan. CLI:n `scenario` ja `predict --route modulome` käyttävät samaa Python-rajapintaa. |
| Ajoitus ja palautuminen | Solutilat päivittyvät aika-askeleittain. Toiminnallinen vasteikkuna voi tuottaa myös parantuneen toimintatuloksen. Neljä toistettavaa vertailua erottavat saman energian eri ajoituksen, hormonivaiheen, korjauskapasiteetin ja odotusjakauman. |
| Hormonaalinen vastaanottavuus | Hormonin saatavuus ja kohdekudoksen vastaanottavuus yhdistetään ajallisesti. Implantaatioportti voi käyttää paikallisten hormonilähteiden kompensaatiota. Vanhojen sivujen pitoisuuspohjaisia yleistyksiä rajattiin. |
| Toiminnallinen lisääntyminen | Siittiötoiminto tai munasolun redox-toiminto on erikseen nimetty päätepiste. Sama portti ei saa esiintyä toisena käsin lisättynä kertoimena. CatSperin geneettinen välttämättömyys erotetaan oletetusta kenttäsyystä. |
| Odotus ja kalenteri | WPP-rajapinta välittää odotusvertailun alemmalle tasolle. Odotussuhde korvaa kapasiteettisuhteen. Erillinen ajettava kalenterioperaattori huomioi iän, pariteetin, raskausajan, menetykset ja synnytyksen jälkeisen tauon. |
| Teknologia ja vastaanotin | Valinnainen spektriliitos käyttää ilmoitettua B₀:aa, alkutilaa, spektriä ja muunnoskerrointa. Sivut erottavat aaltomuodon, optisen historian, CRY-alatyypin ja kokeen annoksen. Cry4a–Gtα- ja opsiini–Gtα-sitoutumisnäyttö on rekisterissä ja atlaksessa. |
| Sosiaaliset ja ekologiset vuorovaikutukset | Uudet erilliset operaattorit kuvaavat suunnattua kontaktiverkkoa, kertynyttä toimintavarantoa ja lajien välisiä kohtaamisia. Niillä on ajallinen tila, eksplisiittiset kertoimet ja erilliset päätepisteet. Sivujen yleistä loisetu- ja yhteiskuntakynnystulkintaa rajattiin. |
| Interventiot | Estokoe, geenin poisto, pelastaminen, lähtötila ja myöhempi haaste erotetaan toisistaan. Sivujen TRPC1-, autofagia-, RyR/SERCA- ja hormoniselitykset käyttävät tätä erottelua. |
| Evidenssin riippumattomuus | Kolmitilainen tulos: riippuvainen, riippumaton tai selvittämätön. Tarkistus seuraa lähdealiaksia, korjausjulkaisuja, tutkimuksia, aineistoperheitä, premissejä ja väiteriippuvuuksia. Puuttuva tarkastus ei merkitse riippumattomuutta. |
| Atlas–väite-liitos | Yhteinen solmu- ja yhteyskohtainen sidostiedosto. Kaikki kymmenen moduloomikorttia on kuratoitu. Meng/Kish sekä uudet komponenttiväitteet avautuvat samoina eri aliatlaksissa. Näytössä erotetaan tutkimuksen rooli, soveltamisala ja kalibrointi; myös puuttuva kuratointi näkyy. |
| Lähdekorjaukset | Kim 2026:n korjaus on yhdistetty alkuperäiseen julkaisuun. CatSper 2021:n viite on korjattu 28 päivän rottakokeeksi: motiliteetti- ja Ca²⁺-löydös, ei merkitsevää parittelu-/elävänä syntymän eroa, CatSper-geenianalyysi keskeneräinen ja amlodipiini epäspesifinen suhteessa CatSperiin. |
| Yhteinen laskentanäkymä | Biologisen koordinaation sivun uusi vertailu lukee Pythonin tuottamat tulokset. Se näyttää muutetut syötteet, solukäyrät, toiminnallisen portin, parikapasiteetin, biologisen suhteen sekä kaikki seitsemän ASFR-riviä. Täydet syötteet ja tulokset ovat ladattavissa. |

Tarkemmat laskentasopimukset: [moduloomi–ASFR-reitti](../../berm/docs/conditional-modulome-route.md) ja [vuorovaikutusoperaattorit](../../berm/docs/interaction-operators.md).

Rekisterissä on 55 väitettä ja 115 evidenssisuhdetta. Kaikki 55 väitettä löytyvät 92 sisältöankkurin kautta. Atlasliitoksia on 50 solmulle ja viidelle yhteydelle; tämä ei tarkoita koko 234-solmuisen verkon evidenssikalibrointia. Nykyisten reittien kuudesta parista neljä on riippuvaisia ja kahden riippumattomuus on selvittämätön. Iiriskortin assosiaatioarvio C ja genotyyppikortin M|C-arvio säilyvät myös kartan merkinnöissä ja suodattimissa.

## Tulkinta ja avoin empiirinen työ

Uusi koostettu reitti on `STRUCTURAL_ONLY`, `forecast_calibrated: false`. Esimerkkien ASFR 100/1000 ja TFR 3,5 ovat synteettinen lähtötaso. Parametrien yksiköt, tunnisteet ja provenienssi kulkevat tuloksissa. Komponenttitutkimusta ei nimetä sellaisen siirtokertoimen kalibroinniksi, jota siihen ei ole sovitettu.

Lukitun v17:n numerot säilyvät. Kalenteri sekä sosiaali- ja ekologiaoperaattorit ovat omia ajettavia mallejaan, eivät uusia piilotettuja TFR-kertoimia. Maksa–haima–glukoosi-palaute on sivuilla yhdistetty mekanistiseen selitykseen; julkaisu ei väitä sen olevan uusi havaintoaineistoon sovitettu koko elimistön aineenvaihduntamalli.

Auditoinnin empiirinen sovitusvaihe jää erilliseksi tutkimustyöksi: tarvitaan yksilöidyt aikasarjat, protokollakohtaiset parametrit, identifioituvuuden arvio ja erillinen validointiaineisto. L2-vastaanotto-operaattori on edelleen avoin. Näitä puutteita ei korvata havainnollistavilla luvuilla tai alavirran tutkimusmäärällä.

## Varmistus ja julkaisu

- Pythonin koko ei-hidas sarja: **2 004 läpäistyä**, kaksi hidasta testiä rajattu pois. Myöhempien syötevalidointikorjausten kohdesarja: 100 läpäistyä; CatSper-tulkintakorjausten v16/v17-sarja: 230 läpäistyä. Vanhojen laskentakertoimien ja suoritettavan v17-rungon säilyminen tarkistettu.
- Sivuston lopullinen testisarja: **323 läpäistyä testiä 30 tiedostossa**.
- Tuotantokäännöksen tyyppi-, tiukka lint-, viite-, rekisteri- ja ankkuritarkistus: läpi. Rekisterin 14 ennestään tunnettua DKC-julkaisuportin varoitusta säilyvät; DKC on edelleen kandidaatti, ei hyväksytty kalibroitu julkaisu.
- **502 esirenderöityä sivua:** ei raakaviitetunnisteita, tyhjiä kappaleita/otsikoita tai tyhjiä linkkejä. Erikseen 20 FI/EN-sivun HTTP-tarkistus: kaikki 200.
- Käännöstekstien tiukka tarkistus: 82 COPY-sivua, nolla tyhjää englanninkielistä avainta.
- Selaimessa: FI/EN-skenaariovalinnat, kaikki neljä laskuesimerkkiä, kaavion päätepistevalinnat, ASFR-taulukon avaaminen, atlasväitteiden lähteet/rajaukset, Kim-korjauksen esittäminen sekä C/M|C-suodatus. Valmiin tuotantokäännöksen mobiilileveys 383 px vastaa sivun leveyttä; ei vaakasuuntaista ylivuotoa.
- Julkaisu käyttää erillistä 432 tiedoston lähdekopiota, joka sisältää tarkoitetun sivuston ilman paikallisia agenttityökopioita. Tiedostot verrattiin SHA-256-tunnistein testattuun työpuuhun.

Tuotanto julkaistu 7.9.2026 klo 20.49 (Europe/Helsinki), versio `dpl_4Y5nZQs2uoTojtiUXxVFj7r6ko5j`, tila **READY**. Julkaisupalvelun oma käännös ja 502 sivun jälkitarkistus läpäisivät myös. Julkisen sivuston 20 FI/EN-reittiä palauttivat 200. Neljän ladattavan aineiston SHA-256 vastaa täsmälleen tarkistettua julkaisupakettia, mukaan lukien uusi skenaariovienti ja aiempi global_panel.csv. Tuotannossa testattiin lisäksi atlasväitteen avaus, C-suodatin, suomenkielinen skenaariovalinta, vauriokäyrä ja mobiilileveys. [Koneelliset tuotantotarkistukset](INTEGRATION_PRODUCTION_CHECKS_2026-09-07.json).

Julkiset näkymät: [atlas](https://www.extinctionfield.com/fi/map) ja [mekanismista väestölaskentaan](https://www.extinctionfield.com/fi/model/biological-coordination#conditional-scenarios).
