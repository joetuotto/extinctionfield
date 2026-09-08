# Paikallisen tuotantobuildin navigaatiotarkistus

**7.9.2026 — hyväksytty.** Tarkistus tehtiin käynnissä olevasta tuotantobuildista osoitteessa `http://localhost:3003`. HTTP-pyynnöt suoritettiin enintään kuuden pyynnön rinnakkaisuudella. Selainautomaatiota ei käytetty.

| Tarkistus | Laajuus | Tulos |
|---|---:|---|
| Fysiikka, Biologia, Käyttäytyminen ja Näytön kokonaiskuva | 4 sivua × 5 kieltä = 20 | Kaikki suoraan HTTP 200 |
| Vanhat valikkokohteet | 38 × 5 kieltä = 190 | Kaikki saavutettavissa |
| Erilaiset HTTP-kohteet | 400 | Kaikki päätyvät HTTP 200 -vastaukseen |
| Hubien sisäiset linkit ja vanhat valikkokohteet | 1725 | Ei rikkinäisiä kohteita |
| Kohdesivujen `#ankkurit` | 345 | Kaikki löytyvät kohdesivun HTML:stä |
| Lähdetietosivut | 140 erilaista reittiä | Kaikki saavutettavissa |
| Epistemologian Tietoa-välilehdet | 5 kieliversiota | Kaikki kuusi välilehteä löytyvät; Epistemologia aktiivinen |
| Epistemologian päävalikko | 5 kieliversiota | Ainoastaan Tietoa-ryhmä aktiivinen |

Hubien renderöidyssä tekstissä ei ole käsittelemättömiä `[[ref:…]]`-tokeneita. Jokainen lähdekoodissa eksplisiittisesti nimetty ClaimRef-väite löytyi vastaavan kieliversion HTML:stä. Kaikki renderöidyt väite- ja lähdetunnisteet löytyvät kanonisista rekistereistä; tuntemattomia lähdestatuksia ei löytynyt. Hubien aktiivinen päävalikkoryhmä on oikein kaikissa kielissä.

Vanhojen aliasosoitteiden `/data` ja `/objections` säilyneet uudelleenohjaukset päätyvät vastaavasti `/explore`- ja `/about/objections`-sivuille samalla kielellä. Molemmat toimivat kaikissa viidessä kielessä. Muita uudelleenohjauksia ei tarkastetussa joukossa ollut.

Tarkistus kattaa palvellun HTML:n, sisäiset reitit ja niiden ankkurit. Sivujen sisältämät ulkoiset tutkimusosoitteet eivät kuuluneet tähän kierrokseen. JavaScript-vuorovaikutuksen ja visuaalisen asettelun selainvarmennus tehdään erikseen; navigaation 52 kohdistettua toimintatestiä läpäisivät aiemmin.

Kaikki testatut reitit, linkit, ankkurit, sivukohtaiset tunnisteet sekä build-tunniste ovat [koneellisesti luettavassa tarkistusraportissa](NAVIGATION_LOCAL_CHECKS_2026-09-07.json).
