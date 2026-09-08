# Navigaatiosisältöjen kolmen version yhdistäminen

Tarkastuspäivä 8.9.2026. Yhdistäminen tehtiin korjaustyöpuussa `/Users/ottojuote/.berm-navigation-repair-20260908`. Lähtökohtana oli nykyinen `origin/main`, ja siihen sovellettiin ennen navigaatiotyötä otetun tilannekuvan sekä 7.9. valmistuneen paikallisen navigaatioversion erot. Pitkiä nykyisiä sivuja ei korvattu kokonaan vanhan työpuun versioilla.

## Tiedostot ja konfliktit

- Neljä uutta koontisivua ja viisi uutta yhteiskomponenttia kopioitiin uusina tiedostoina: fysiikka, biologia, käyttäytyminen ja konvergenssi sekä niiden lukupolut ja johdannot.
- Viisi vanhaa sisältösivua yhdistettiin kolmen version menetelmällä: Malli, Tietoa, Näyttö, Epistemologia ja Sivilisaatio.
- Sivukarttaan ja viitevalidatoriin sovellettiin vain navigaatiotyön erot. Niiden main-versio vastasi lähtötilannekuvaa.
- **Malli: viisi konfliktia**, yksi joka kielellä. Laajempi ketjua kuvaava metakuvaus säilytettiin navigaatioversiosta; mainin uusi ehdollisen formaalin L2-operaattorin `specNote` säilytettiin täsmälleen.
- **Sivilisaatio: kaksi konfliktia.** Epistapege-kortti säilytettiin uudessa seitsemän sovelluksen järjestyksessä. Sekä mainin Epistapege-tekstien että uuden lukupolun paikalliset muuttujat säilytettiin. Sovellusten lukumäärä ja Epistapege-lisänimi päivitettiin kaikille viidelle kielelle.
- Tietoa, Näyttö ja Epistemologia yhdistyivät ilman tekstikonflikteja. Mainin uudet fysiikka-, farmakologia- ja Epistapege-sisällöt säilyivät.

## Säilyvyyden tarkistus

Viidestä vanhasta sisältösivusta verrattiin mainin ja lopputuloksen lähdetunnisteet, suorat väiteankkurit sekä suorat DOM-tunnisteet esiintymiskertoineen. Lisäksi tunnistettiin lähtötilannekuvan ja mainin väliset lisätyt tai muutetut rivit ja varmistettiin, että jokainen niistä on lopputuloksessa.

| Sivu | Mainin viitetunnisteiden esiintymät | Suorat väiteankkurit | Suorat DOM-tunnisteet | Mainin muuttuneet/lisätyt rivit | Kadonneita |
|---|---:|---:|---:|---:|---:|
| Malli | 475 | 14 | 71 | 690 | 0 |
| Tietoa | 0 | 0 | 0 | 10 | 0 |
| Näyttö | 35 | 0 | 18 | 112 | 0 |
| Epistemologia | 101 | 0 | 0 | 72 | 0 |
| Sivilisaatio | 0 | 0 | 1 | 70 | 0 |

Taulukko mittaa näiden tiedostojen suoraan kirjoitettuja tunnisteita. Tuodut yhteiskomponentit voivat sisältää muita ankkureita. JSON-rekisterit yhdistää root erillisenä tehtävänä; niitä ei muokattu tässä osatyössä.

## Uusien koontien sovitus nykyiseen fysiikkaan

Fysiikan, biologian ja konvergenssin L2-kuvaus päivitettiin mainin nykyistä rakennetta vastaavaksi. BERM johtaa operaattorin formaalin muodon ehdollisesti minimaalisen materia–metriikka-kytkennän ja kausaalisen vastefunktioteorian kautta. Gauge-resepti, mittakaava, kudosytimet, merkki, viive ja päätepistekalibraatio pysyvät erikseen avoimina. Lindgrenin metriikkapremissiä, sen tensorista seurausta ja lisäpremisseihin perustuvaa BERM-operaattoria ei samasteta.

Fysiikan koonti linkittää nykyiseen `/mathematics#l2-response`-johtoon. Uusien sivujen kaikki lähde- ja väitetunnisteet tarkistettiin yhdistettyjen rekisterien nykytilasta; puuttuvia tunnisteita ei löytynyt. `git diff --check` läpäisi. Kohdistetun ESLint-ajon lokissa oli vain suuren mallisivun tunnettu Babelin muotoiluhuomautus, eikä siinä ollut lint-havaintoja.

## Erillinen toiminnallinen linkkikorjaus

Live-auditoinnin `/model`-hash-viat paikantuivat `ModelTableOfContents.tsx`-komponenttiin. Osa sen kohteista on siirtynyt mittaussivulle ja osa sisällöstä renderöityy malliin vasta suljetun `CollapsibleSection`-osion avaamisen jälkeen. Havainto ja nykyiset kohdereitit toimitettiin rootille ja navigaatioagentille. TOC:n korjaus sekä koko sivuston build ja selaintestaus tehdään erillään tästä sisältöjen yhdistämisestä.

Julkaisua tai commitia ei tehty tässä osatyössä.
