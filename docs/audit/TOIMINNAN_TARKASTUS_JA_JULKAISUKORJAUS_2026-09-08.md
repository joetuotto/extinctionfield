# Toiminnan tarkastus ja julkaisukorjaus 8.9.2026

**Tarkastettu, korjattu ja julkaistu.** Julkisen sivuston loppuvarmennus valmistui 8.9.2026 klo 08.34 Suomen aikaa ilman poikkeamia.

Myöhempi julkaisu oli pudottanut aiemmin toteutetun seitsemän pääryhmän navigaation ja neljä uutta koontisivua pois. Korjaus yhdistettiin uusimpaan päähaaraan, joten uudemmat fysiikka-, Epistapege- ja farmakologiapäivitykset säilyivät. Kaikki 1 191 lähdettä ovat mukana.

Samalla korjattiin 13 siirtynyttä sisällysluettelokohdetta, matematiikan vanha uudelleenohjaus, kolme atlaksen linkkiperhettä ja otsikoiden jääminen kiinteän valikon taakse. Yhteinen matematiikkasisältö siirrettiin teknisesti oikeaan moduuliin; tekstit ja kaavat säilyivät muuttumattomina. Uudet väitteet liitettiin atlakseen.

| Tarkistus | Tulos |
|---|---|
| Mallikoodin testit | 2 122/2 122 läpi, tavalliset ja hitaat erillisissä ajoissa |
| Sivustotestit | 446/446 läpi |
| Tuotantokäännös | Kaikki portit läpi, 542 renderöityä reittiä ilman virheitä |
| Julkiset osoitteet | 1 909/1 909 läpi |
| Sisäiset linkit ja osioankkurit | 15 174 linkkiä ja 3 272 ankkuria, ei virheitä |
| Lähteet | 1 191 tunnistetta varmennettu 1 307 lähdetietosivulta |
| Julkinen data | Kaikkien 17 JSON/CSV-tiedoston tarkistussummat täsmäävät |
| Selain | Työpöytä, mobiili, valikot, epistemologia, laskuri ja matematiikkasiirtymät toimivat |

Kyseessä on toiminnan ja sisältöjen säilymisen tarkastus. Ulkoisten tutkimusjulkaisujen osoitteita tai tutkimustulosten paikkansapitävyyttä ei tarkastettu uudelleen tässä vaiheessa. Rekisterin 14 aiempaa DKC-ehdokkaan varoitusta on dokumentoitu muuttumattomina.

## Julkaistu versio ja työpuut

- [Julkinen sivusto](https://www.extinctionfield.com/fi/evidence/convergence)
- Päähaaran commit: `92f9307df8d5b4cc26d9ccfdeef234a72732e8be`.
- Tuotantojulkaisu: `dpl_HW8F97ALyGsijhVZ1nb5SGSBbPzs`.
- Julkaistu lähdekoodi on päähaarassa ja korjaustyöpuussa `/Users/ottojuote/.berm-navigation-repair-20260908`.
- Alkuperäisen työpuun `/Volumes/kovalevy 3/extinctionfield` keskeneräinen haara säilytettiin. Kaikki 955 tarkistettua alkuperäistä lähdepolkua jäivät ennalleen; tähän työpuuhun lisättiin tämä yhteenveto.

## Tarkat auditit

- [Julkisen sivuston tarkistus](/Users/ottojuote/.berm-navigation-repair-20260908/docs/audit/NAVIGATION_REPAIR_PRODUCTION_HTTP_2026-09-08.md)
- [Sivuston testit ja korjaukset](/Users/ottojuote/.berm-navigation-repair-20260908/docs/audit/NAVIGATION_REPAIR_WEBSITE_CHECKS_2026-09-08.md)
- [Mallikoodin testit](/Users/ottojuote/.berm-navigation-repair-20260908/docs/audit/NAVIGATION_REPAIR_MODEL_CHECKS_2026-09-08.md)
- [Selainvarmennus](/Users/ottojuote/.berm-navigation-repair-20260908/docs/audit/NAVIGATION_REPAIR_BROWSER_CHECKS_2026-09-08.md)
- [Julkaisun ja säilymisen koonti](/Users/ottojuote/.berm-navigation-repair-20260908/docs/audit/NAVIGATION_REPAIR_RELEASE_2026-09-08.md)

Alkuperäinen tuotantovirhe ja välivaiheissa löytyneet ongelmat on säilytetty auditissa. Julkaisun jälkeen syntyneet loppuvarmennukset ovat paikallisia auditointitiedostoja; lähdekoodi ei muuttunut onnistuneen julkaisun jälkeen.
