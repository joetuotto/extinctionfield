# DEFRA FAnGR: UK:n eläinrotujen jalostusrakennebenchmark

Tila: `HELD_ISOLATED`, `BENCHMARK_ONLY_NOT_SENTINEL`  
Tarkistettu: 2026-08-19

Tämä kerros perustuu DEFRA:n viralliseen, koneellisesti ladattavaan
[UK Farm Animal Genetic Resources (FAnGR) -aikasarjaan](https://www.gov.uk/government/statistics/uk-farm-animal-genetic-resources-fangr-breed-inventory-results).
Se on Open Government Licence v3.0 -lisensoitu vuosittainen rotuinventaario,
ei eläinten yksilö-, sperma- tai tiineysaikasarja.

## Mitä on hallussa

Alkuperäinen CSV on gitin ulkopuolella, mutta sen koko ja SHA-256 on lukittu
[manifestiin](../data/raw/manifests/defra_fangr_2026-08-19.manifest.json):

- 38 458 lähderiviä;
- vuodet 2000--2026;
- 204 UK:ssa rekisteröityä rotua ja seitsemän ryhmää: cattle, sheep, pigs,
  goats, horses, donkeys ja camelids;
- lähteen `dams`, `sires`, `females`, `males`, `fempop`, `effpop` ja `flocks`
  -muuttujat.

Muunnos `berm.data.fangr_benchmark` tuottaa yhden erillisen taulun
`fangr_uk_breed_population_annual.csv` ja yhteenvetotiedoston. Se säilyttää
myös tyhjät lähdearvot eksplisiittisesti `MISSING_IN_SOURCE`-tilassa. Nollaa
ei koskaan päätellä tyhjästä solusta.

## Mikä tämä on — ja mikä se ei ole

Lähde antaa pitkän ja toistettavan kuvan siitä, miten UK:n jalostusrotujen
**populaatio- ja jalostusrakenne** on muuttunut. Se voi olla hyödyllinen
ulkopuolisena eläinpopulaatioiden kontekstisarjana.

Se ei mittaa:

- sperman laatua, astutuksen onnistumista, tiineyttä, pentue-/varsakokoa tai
  jälkeläiskuolleisuutta;
- yksilöiden tai tilojen tarkkaa paikkaa;
- RF/EMF:tä, annosta tai edes RF-proxyä;
- lisääntymisen keskeisiä sekoittajia samalla havaintotasolla.

Siksi se on `NOT_ELIGIBLE` suorissa F1--F6-testeissä, eikä muunnos itsessään
muodosta RF–vastekerrointa, CSLI-lukua tai valmista kausaalijoinia. Tämä ei tee
pitkästä, manifestilukitusta jalostus-/populaatiorakennesarjasta passiivista:
se on aktiivinen ekologisen valinnan, lajikohtaisen herkkyyden ja historiallisen
allekirjoituksen kontekstikerros. Se voidaan liittää FieldState- ja
ympäristökovariaatteihin vasta erillisellä, näkyvällä crosswalkilla; tällöin
epävarmuus ja jalostuspolitiikan vaihtoehtoiset selitykset säilyvät mallissa.

Lisäksi lähteen `native`, `nbs_at_risk_current`, `bar_current` ja
`zr_current` ovat **nykyisiä** luokituksia, joita lähde toistaa historiallisten
rivien yhteydessä. Muunnos nimeää ne `*_current`; niitä ei saa tulkita vuoden
2000 historialliseen luokkaan kuuluviksi.

## Toistaminen

```bash
cd berm
python -m berm.data.fangr_benchmark
```

Uudelleenajo kieltäytyy muuttamasta eri tavua sisältävää johdettua tiedostoa
ilman `--replace`-valitsinta. Raakalähdettä ei koskaan kirjoiteta.
