# Kausaalikaavion visuaalinen viimeistely — 8.9.2026

Julkaisupohja: `8fd36d03e0cf2aab4700613a8151cb1bdec9b255`.

Käyttäjän pyynnöstä kaaviolle toteutettiin sivuston paperimaiseen ulkoasuun sopiva rauhallisempi esitys. Muutokset rajoittuvat `BermCausalDiagram.tsx`-komponenttiin ja sen CSS-moduuliin.

- Yhtenäinen työkalupalkki, kuvakkeelliset näkymäpainikkeet ja selkeästi ryhmitellyt korostustoiminnot.
- Taso-otsikoiden serif-typografia, hillityt tasonumerot sekä kaavion todelliseen leveyteen perustuva rivitys.
- Kevyet korttirajat, tasaiset alatunnisteet, peittävät korttipinnat ja pienet luokkatunnisteet aiempien voimakkaiden reunavärien tilalla.
- Ohuemmat taustayhteydet ja selvä valitun solmun/reitin korostus.
- Tietopaneelin, sulkemispainikkeen ja yhteysluettelon sama visuaalinen tyyli.

Kanoniset 47 solmua ja 97 suunnattua yhteyttä, mekanismit, tutkimusankkurit, luokitukset, kalibrointitekstit ja toimintakäsittelijät säilyvät. Muutos ei koske mallin dataa, parametreja tai hypoteeseja. Pitkät nimet eivät katkea, ja näppäimistökohdistus säilyy näkyvänä. Liikkeen vähentämisen asetus poistaa siirtymäefektit.

## Varmennus ennen julkaisua

- Kaavion ja esitysdatan nykyiset **11 testiä läpäisivät**; pelkkää ulkoasua jäljitteleviä uusia testejä ei lisätty.
- Tuotantokäännös, lähde-/rekisteritarkistukset, tyyppitarkistus ja tiukka lint läpäisivät.
- **557 esirenderöidyn reitin tarkistus** läpäisi, samoin viiden kielen hakuindeksien muodostus.
- Tuotantoversiota tarkistettiin selaimessa **390, 760, 897 ja 1280 pikselin leveyksillä**. Kaikki 47 korttia ja 97 SVG-yhteyttä sekä yhteysluettelon 97 riviä säilyvät. Leikkautuvia korttisisältöjä, vaakasuuntaista ylivuotoa tai otsikkojen päällekkäisyyksiä ei havaittu.
- Tarkistettiin vaalea ja tumma teema, 14 solmun reittikorostus, Leydigin solmun tietopaneeli, Escape-sulkeminen ja kohdistuksen palautuminen.
- Alkuperäiseen työtilaan tehtiin sama kahden tiedoston muutos. Lähtötiedostot varmistettiin samoiksi julkaisupohjan kanssa ja varmuuskopioitiin; muu keskeneräinen työ säilyi.
