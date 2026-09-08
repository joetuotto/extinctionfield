# Proxy masking -sivun evidenssitäydennys 8.9.2026

Toteutus perustuu käyttäjän liitteen kymmeneen prioriteettiin ja jatkopyyntöön: tarkista sivuston tutkimukset, etsi uusia alkuperäislähteitä ja laske määrälliset ankkurit uudelleen ennen kuin lukujen käyttö ratkaistaan.

## Toteutetut kokonaisuudet

1. **Mekanismi ennen abstraktia proksipäättelyä.** Viisi vaihetta kentästä kudoksen vastaanottotilaan, kalsiumiin/redoxiin, hormonitoimintaan ja lisääntymistoimintaan. Eri kudosten interventiot nimetään. Ihmisen siittiön suora haara säilyy hormonireitistä erillisenä. Pallin alkuperäinen katsausmäärä on23; Yakymenkon93/100 on katsauksen julkaisumäärä, ei riippumattomien replikaatioiden todennäköisyys.
2. **Kahdeksan käyttäytymisen vertailuakselia.** Hoiva, läheisyys, stressi, seksuaalinen motivaatio, signalointi, sosiaalinen palaute, hormonitila ja vaivannäkö yhdistetään määriteltyihin ihmismittareihin. Kartta esitetään BERM:n mekanistisena jäsentelynä, ei henkilöiden mieltymyksistä tehtävänä diagnoosina.
3. **Eläin–ihminen-siirtymä.** Sumner2019 tutkii ihmisen ja koiran siittiöitä samassa kemikaalikokeessa. Olson2000:n71% ja Ineichen2024:nRR0,86 esitetään alkuperäisillä nimittäjillään ja suunnillaan. Niistä ei johdeta universaalia siirtotodennäköisyyttä tai riippumattomuuteen perustuvaa Bayes-tuloa.
4. **Määrälliset ankkurit.** Levine2017:n ihmisaineisto, Lea2016:n koiratrendi ja Harris2023:n hevostrendi esitetään alkuperäisissä yksiköissä. Rahban2023:n viisi käyttöryhmää piirretään julkaistuista mediaaneista. Li2010:n henkilökohtainen kenttämittaus ja Belminin julkaistu sekä uudelleen laskettu aluepaneeli tuovat varsinaisen altistus- ja infrastruktuurivertailun.
5. **Jokaiseen proksiin konkreettinen raja.** Kymmenessä proksikortissa on uusi “Miksi tämä ei riitä” -kohta tutkimusesimerkkeineen. Stone2025:n amish-lähde korjattiin bibliografisesti; vertailua ei esitetä kokeena, joka vakioisi kaikki yhteisöerot.
6. **Ihmisen sensorinen ulottuvuus.** Vauvanhaju, oksitosiini ja kosketus, iltavalo sekä kisspeptiinin tilariippuvainen vaste muodostavat nimettyjä osia. Kenttä–ihmisvastaanotto ja väestön kontaktipalaute esitetään BERM:n kokoamina liitoksina.
7. **Tulkkimekanismi.** Gazzanigan tulkkiselitys, Johanssonin valintasokeuskoe ja Desmurget’n aivokuoristimulaatio erottavat syyn kokemisen sen alkuperän tunnistamisesta. Pew57% koskee770 lapsettoman18–49-vuotiaan alaryhmää, joka pitää tulevaa vanhemmuutta epätodennäköisenä.
8. **Seitsemän järjestelmän vertailumatriisi.** Koe, havaintoyhteys, kokeessa säilynyt vaste, mallin yhdistämä reitti ja ihmisinstituution soveltamisala näkyvät erikseen. Koiran RF-koe ja hevosen RF+kontaktielektrodikoe on lisätty uuden haun perusteella, niiden todellisine vasteineen.
9. **Konkreettinen data ennen kaavoja.** Julkaistut määrät, vaikutukset ja ryhmämediaanit ovat näkyvissä; yksityiskohtaiset protokollat, hajonnat ja matemaattiset johdot avautuvat erikseen.
10. **Neljä peittymisen tasoa ja neljä lukupolkua.** Alkuun tilastollinen, sensorinen, fenomenologinen ja episteeminen taso. Loppuun mekanistinen ketju, lajivertailut, yhteisövertailut ja farmakologiset interventiot. Vanhat sivuankkurit säilyvät.

## Mitä alkuperäisille poikkeuksellisen vahvoille luvuille tapahtui?

- Liitteen R²=.394/.433/.448 ja osittaiskorrelaatiot−.37/−.25 eivät saaneet jäljitettävää otosta/määrittelyä. Projektin54 maan CSV ja Belminin julkinen aineisto laskettiin uudelleen; ne antavat muita, toistettavia lukuja. Tarkat koodit, aineistojen alkuperä ja tulokset: `regression_followup.py` ja `regression_followup.md`.
- Liitteen kolmella lajilla on eri siemennestepäätemuuttujat ja ajanjaksot. Altistusakseli on sanallinen “korkein/keskitaso/matalin”, ei numeerinen paikallisen kentän mittaus. Täydellistä Pearson-korrelaatiota r=1,000 ei johdeta tällaisesta asteikosta. Projektin seitsemän lajin r≈.842 käyttää annettuja indeksipisteitä ja eri biologisia päätemuuttujia; se ei korvaa puuttuvaa dosimetriaa.
- R²-luvut eivät katoa sivulta periaatteellisista syistä. DeIuliis2009 tarjoaa mekanismitasonR²=.861 ja.727 nimetyille solunsisäisille suureille; Belminin aluepaneeli tarjoaa toistettavan infrastruktuurin regressioarvion. Niiden merkitys säilytetään alkuperäisenä.
- M1:n ja M3:n sähkökerrointen ero ei ole puhdas välittymisosuus: myös otos muuttuu. R²-osuuksien suhde ei yksin jaa kausaalista omistajuutta korreloivien muuttujien kesken.

## Auditoitava lähdepolku

- `mechanism.md`: alkuperäiset salpaaja-, redox- ja siittiölähteet sekä korjaukset.
- `dose_response_followup.md`: annos×aika- ja interventiokokeet, mukaan lukien vasteen eri suunnat.
- `quantitative.md` ja `cross_species_followup.md`: siemennestetrendit, lajisiirtymä, koiran ja hevosen suorat kokeet.
- `behavioral.md`: ihmisen aisti-, tulkki- ja käyttäytymisnäyttö.
- `human_exposure_followup.md`: Li2010/Rahban2023:n alkuperäiset luvut ja kuvaajan poiminta.
- `regression_followup.md` ja `.py`: täsmälukujen lähdejäljitys ja toistettavat laskennat.
- Viite-JSONit ovat lähdeauditoinnin välituotteita. Julkaistava kanoninen bibliografia sisältää bibliografiset metatiedot; tulkinta on sivutekstissä ja väiterekisterissä.

## Arkkitehtuuri

BERM on selittävä malli. Lindgren2025:n tensorigeometria, avoin L2-kytkentä, tuotu empiirinen biologia ja avoin kalibrointi pysyvät erillään. FieldState on vain valinnainen fysikaalisen syötteen mittaus- ja estimointimoduuli. Uudet mekanismin koostamista ja käyttäytymisprofiilin jäsentämistä koskevat väitteet on rekisteröity draft-tilaan; biologista näyttöä ei siirretä geometrian todistukseksi.
