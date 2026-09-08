# BERM:n selitystasot, konvergenssi ja navigaatio — 7.9.2026

Toteutus seuraa hyväksyttyä [navigaatiosuunnitelmaa](../analysis/BERM_navigaatio_ja_selitystasot_2026-09-07.md). Tavoite on esittää BERM:n oma päättely kokonaisena: fysikaalinen syöte ja vastaanotto → biologinen tila → halu, arvottaminen, oppiminen ja perustelu → vuorovaikutus → väestö, instituutiot ja sivilisaatio. Näytön koonti yhdistää tutkimukset näiden siirtymien kautta.

## Toteutus

- Päävalikko: **Malli · Fysiikka · Biologia · Käyttäytyminen · Sivilisaatio · Näyttö · Tietoa**. Logo johtaa etusivulle. Epistemologia kuuluu Tietoa-osioon, myös sivun omissa välilehdissä. Näyttö kokoaa konvergenssin, rekisterin, mittauksen, datan, ennusteet, artikkelit ja lähteet.
- Uudet koontisivut: `/physics`, `/biology`, `/behavior` ja `/evidence/convergence`. Yhteinen lukupolku jatkuu tasolta seuraavalle. Pitkät sisällöt ovat valmiit suomeksi ja englanniksi; japanin, ranskan ja korean reitit näyttävät englanninkielisen sisällön käännösilmoituksella. Navigaatio ja uudet yhteiset lukemisohjeet ovat kaikilla viidellä kielellä.
- Malli-, Tietoa-, Näyttö-, Epistemologia- ja Sivilisaatio-sivut liitettiin uuteen järjestykseen. Sivilisaation vanhat esseet säilyvät ja etenevät nyt yksilöstä vuorovaikutuksen, yhteisöjen ja instituutioiden kautta historialliseen palautteeseen.
- Konvergenssissa on seitsemän tutkimusketjua ja kuusi aineistokokonaisuutta. Halu ja perustelu kuuluvat biologisen tilan seurauksiin ja palautteeseen. Kentästä vastaanottimeen johtava L2-kytkentä on nimetty premissi; siitä jatkuva mallin päättely esitetään kokonaisena.
- Lähderekisteriin lisättiin 18 alkuperäistutkimusta ja yksi korjausjulkaisu. Rekisterissä on nyt 1 156 lähdettä. Väitteisiin lisättiin kahdeksan komponenttiväitettä, niitä yhdistävä synteesi ja 16 tutkimussuhdetta. Kokonaisuus: 64 väitettä, 131 tutkimussuhdetta, 64 arviota ja viisi reittiä. Uusi koottu reitti on `route.biological-state-to-action`.
- Tutkimukset säilyttävät tutkimusasetelmansa, mitatun päätepisteensä ja aineistoperheensä. Westbrookin julkaisuja ei lasketa riippumattomiksi toistoiksi; Ben Simonin korjaus on yhdistetty alkuperäiseen lähteeseen. Uusi selitysrakenne ei muuta Pythonin laskentaa tai lisää sovittamattomia numeerisia kertoimia nykyisiin ennusteisiin.

## Säilyminen ja tarkastus

[Lähderakenteen säilyvyysauditointi](NAVIGATION_PRESERVATION_2026-09-07.md) ja [sisältökatselmointi](NAVIGATION_CONTENT_REVIEW_2026-09-07.md) tehtiin erikseen. Vertailukohta on tämän navigaatiotyön alussa tallennettu työtila, ei vanha Git-versio.

- Kaikki 356 tallennettua tiedostoa ja 97 aiempaa sivua säilyvät.
- Yhtään vanhaa sivukohtaista ankkuria, lähdeviittausta, väitetunnistetta tai valikon 38 aiempaa kohdetta ei kadonnut.
- Kaikki 1 137 aiempaa lähdettä, 55 väitettä, 115 tutkimussuhdetta ja neljä reittiä säilyvät. Ben Simonin aiempaan tietueeseen lisättiin korjausjulkaisun linkki.
- Sisältökatselmointi löysi yhden väärän Q-tekijäsivun kuvauksen. Se korjattiin hermoston vasteeksi, vaimennukseksi ja resonanssiksi.
- Testisarja: **375 läpäistyä testiä, 32 tiedostoa**. Navigaation 52 testiä kattavat vanhat kohteet, viisi kieltä, ryhmien omistajuuden, näppäimistön, fokuksen, mobiilin, reitinvaihdon ja ankkurilinkit.
- Lopullisen tuotantokäännöksen tyyppi-, tiukka lint-, viite-, rekisteri- ja ankkuritarkistukset läpäisivät. **522 esirenderöityä sivua:** ei raakaviitetunnisteita, tyhjiä tekstielementtejä tai tyhjiä linkkejä. Käännösrakenteen 86 sivua: ei tyhjiä englanninkielisiä avaimia.
- Rekisterin 14 aiempaa DKC-varoitusta säilyvät. Ne koskevat kandidaatin hyväksymistä kalibroiduksi DKC-julkaisuksi; tämä navigaatiopäivitys ei muuta kandidaatin tilaa.
- Selaimessa tarkastettu 1 440 ja 1 280 pikselin työpöytänäkymät sekä 390 pikselin mobiilinäkymä: valikot, Escape ja fokus, suorat käyttäytymisosiot, Tietoa/Epistemologia sekä FI/EN-sisältö ja japanin käännösilmoitus. Mobiilin sisältö pysyy näyttöleveydessä.
- [Paikallinen HTTP/HTML-varmennus](NAVIGATION_LOCAL_CHECKS_2026-09-07.md): 20 hubisivua, 400 erilaista reittikohdetta, 1 725 sisäistä linkki-/kohdetarkistusta ja 345 ankkuria ilman virheitä. Mukana ovat 140 lähdetietosivua, vanhat 38 valikkokohdetta viidellä kielellä sekä epistemologian aktiiviset Tietoa-välilehdet.

Julkaisukopio sisältää 444 tiedostoa: kaikki aiemman julkaisun 432 polkua ja 12 uutta. Kaikki 56 julkista tiedostoa säilyvät, mukaan lukien `global_panel.csv`. Kaikki 444 tiedostoa tarkistettiin SHA-256-tunnisteilla uudelleen lopullisen tuotantokäännöksen jälkeen: kopio vastaa testattua lähdettä.

## Julkaisu

Julkaisu valmistui **7.9.2026 klo 22.14 (Europe/Helsinki)**. Versio `dpl_59eQAmCE111ZrZC5QQXXQdV2czrH` on **READY**, ja `www.extinctionfield.com` osoittaa siihen. Julkaisupalvelun oma tuotantokäännös ja 522 sivun HTML-tarkistus läpäisivät. CLI:n lokiseuranta katkesi kerran kesken rakentamisen; erillinen tilatarkistus varmisti rakentamisen jatkuvan ja myöhemmin valmistuvan. Uutta julkaisuyritystä ei tarvittu.

Selaimessa tarkistettiin myös julkisen version konvergenssisivu ja mobiilin siirtymä käyttäytymisen halu/kiintymys/hoiva-osioon. Linkki kohdistuu oikeaan osioon ja sulkee valikon. Sisältö pysyy näyttöleveydessä, eikä tarkistuksessa tullut selaimen virhelokeja.

Tuotannon **55 kohteen varmennus läpäisi**: 20 uutta hubisivua, 12 FI/EN nykyistä sivua ja etusivua, 19 uutta lähdetietosivua sekä neljä ladattavaa aineistoa. Kaikki seitsemän navigaatioryhmää, yhdeksän uutta väitettä ja epistemologian Tietoa-välilehdet löytyvät oikein. `references_full.json`, `modulome-state.json`, `conditional-scenarios.json` ja `global_panel.csv` vastaavat SHA-256-tunnisteiltaan julkaistua lähdekopiota. Ensimmäinen CSV-siirto ylitti aikarajan; täydellinen uusintalataus varmisti sisällön vastaavuuden.

Julkaisukopio ja tiivisteet: [444 tiedoston manifesti](NAVIGATION_RELEASE_MANIFEST_2026-09-07.json). Kaikki testatut tuotantokohteet ja aineistotiivisteet: [tuotantotarkistus](NAVIGATION_PRODUCTION_CHECKS_2026-09-07.json).

Julkiset aloituskohdat: [selitysketjun fysiikka](https://www.extinctionfield.com/fi/physics), [biologia](https://www.extinctionfield.com/fi/biology), [käyttäytyminen](https://www.extinctionfield.com/fi/behavior) ja [näytön konvergenssi](https://www.extinctionfield.com/fi/evidence/convergence).
