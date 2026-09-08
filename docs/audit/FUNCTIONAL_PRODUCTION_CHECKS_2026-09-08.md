# Tuotantosivuston toiminnallinen tarkistus 8.9.2026

**Tulos: ei läpäissyt.** Kaikki pyynnöt suoritettiin uudelleen julkaistuun sivustoon. Nykyinen tuotantojulkaisu `dpl_GHMWCwMja7Js3E3YPsR4vVyCYeFV` eroaa työtilan hyväksytystä seitsemän pääryhmän kokonaisuudesta.

- Kaikki neljä uutta koontisivua palauttavat **404:n kaikilla viidellä kielellä**: Fysiikka, Biologia, Käyttäytyminen ja Näytön kokonaiskuva.
- Seitsemän ryhmän navigaation rakenne ja sivun omistajuusmerkinnät puuttuvat tuotanto-HTML:stä. Epistemologia ei kuulu tuotannossa uuteen Tietoa-välilehtirakenteeseen.
- Kaikki **38 vanhaa valikkokohdetta** ovat saavutettavissa viidellä kielellä. Niiden kohteiden toiminta ei korvaa puuttuvia uusia osioita.
- Live-lähderekisterissä on **1172 lähdettä**, työtilassa 1156. Live-versiosta puuttuu 19 tämän kokonaisuuden lisäämää lähdettä, ja siinä on 35 muuta uutta lähdettä. Korjauksessa tarvitaan molempien haarojen sisällöt; pelkkä vanhan julkaisupaketin palauttaminen kadottaisi uudempaa työtä.
- Julkiset `conditional-scenarios.json` ja `global_panel.csv` vastaavat työtilaa SHA-256-tarkistuksessa. `references_full.json` ja `modulome-state.json` eroavat työtilasta. Kaikki neljä latausta valmistuivat kokonaan HTTP 200 -vastauksella.

Tarkistuksessa tehtiin **1593 tuoretta HTTP-pyyntöä**, 2224 sisäisen linkin ja vanhan valikkokohteen tarkistusta sekä 250 fragmenttikohteen tarkistusta. Mukana oli 1154 lähdetietosivun reittiä. Linkkikeruuta laajennettiin olemassa oleviin pääsivuihin. Puuttuvien koontisivujen linkkejä ei voi löytää niiden 404-vastauksista; niiden lähdekoodin edellyttämät ankkurit ja väitteet on kirjattu puuttuviksi.

## Muut tarkennettavat ankkurikohteet

Staattisesta kohde-HTML:stä puuttui 14 eri fragmenttikohdetta kaikilla viidellä kielellä, yhteensä 70 havaintoa:

- Etusivun linkki `/mathematics#falsification`.
- Malli-sivun linkit `#asfr-tfr`, `#cohort`, `#evo-calibration`, `#fieldstate`, `#fieldstate-input`, `#gme`, `#organ-state`, `#organ-states`, `#premise`, `#static-interface`, `#static-interface-math`, `#three-channel-derivation` ja `#validation`.

Nämä tarvitsevat sisältösivujen tai selaimen tarkennuksen. HTTP/HTML-tarkistus ei yksin ratkaise, muodostuuko jokin kohde myöhemmässä asiakaspuolen vuorovaikutuksessa.

## Auditoinnin tulkinta

Valikkorakenteen sama poikkeama toistuu monilla sivuilla; raportin sivukohtaisia virheitä ei pidä tulkita yhtä moneksi itsenäiseksi viaksi. Työtilan rekisterille tuntematon tunniste voi kuulua uudemman live-haaran hyväksyttyyn aineistoon. Lähdetunnisteiden live-rekisterivertailu on siksi kirjattu erikseen raporttiin.

Tässä kierroksessa ei muokattu lähdekoodia eikä tehty julkaisua. Kaikki tuotantopyynnöt käyttivät normaalia TLS-varmennusta, pakattua siirtoa ja enintään kuutta samanaikaista HTTP-pyyntöä. Raakaviitteiden tarkistuksessa selaimen näkyvän tekstin ulkopuoliset script/style-sisällöt rajattiin pois. Selaimen vuorovaikutus ja ulkoiset artikkelilinkit eivät kuulu tähän HTTP-kierrokseen.

Täydellinen alkuperäinen havaintoaineisto, testatut reitit, linkit, puuttuvat ankkurit ja SHA-256-arvot: [JSON-raportti](FUNCTIONAL_PRODUCTION_CHECKS_2026-09-08.json).
