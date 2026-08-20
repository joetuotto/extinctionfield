# BERM: evidenssi- ja FieldState-päättelyn auditointi

**Päiväys:** 2026-08-20  
**Tavoite:** varmistaa, ettei mittaus-, provenance- tai
kalibrointivaatimus muutu virheellisesti olemassa olevan BERM-evidenssin
poissulkusäännöksi.

## Johtopäätös

BERM:n tutkimusohjelmassa on neljä eri asiaa, joille ei saa käyttää samaa
`BLOCKED`-, `PARTIAL`- tai `STRUCTURAL_ONLY`-tulkintaa:

| Taso | Kysymys | Nykyinen oikea tulkinta |
| --- | --- | --- |
| Tutkimusevidenssi | Mitä reittiä, suuntaa, lajia, elintä, viivettä tai kenttäallekirjoitusta lähde informoi? | **Aktiivinen constraint/prior**; se voi tukea suoraan tai epäsuorasti. |
| Fyysinen mittaus | Mitä FieldState-komponenttia havainto mittaa? | **Aktiivinen likelihood-/ankkurikerros**, vaikka se ei vielä mittaa kaikkia kentän komponentteja. |
| Endpoint-kerroin | Kuinka kapea vaikutusväli voidaan antaa tietylle organismille, elimelle ja ajalle? | **Tarkentuva kalibrointikysymys**, ei evidenssin pääsykoe. |
| ASFR/TFR | Toteutuuko ennustettu kohortti-, ikä-, viive- ja maantieteellinen allekirjoitus? | **Posterior-prediktiivinen arviointi**, ei upstream-biologian takaperin sovitus. |

## Mitä pidetään tarkoituksella kovana vartijana

Seuraavat rajaukset suojaavat signaalia eivätkä suodata sitä pois:

1. Lähde-, manifesti- ja checksum-provenienssi säilyvät. Ne estävät
   havaintojen vaihtumisen tai hiljaisen imputoinnin.
2. Kenttäluokkaa ei vaihdeta huomaamatta: staattinen rajapinta, ELF-E/B,
   geomagneettinen `B0` ja RF/spektri ovat erillisiä FieldState-komponentteja.
3. ASFR/TFR ei saa optimoida takaisin molekyyli-, elin-, viive- tai
   liikkuvuusparametreja. Se on ennustetestin suoja, ei lähteiden raja.
4. Suoraa F1–F6-sentinelli→ihmisendpoint-väitettä ei esitetä toteutuneena
   ennen kuin kyseinen ennalta määritelty vertailu on aidosti laskettu.

## Mitä on korjattu pois sulkuportista

| Aiemmin epäselvä tulkinta | Korjattu tulkinta | Missä |
| --- | --- | --- |
| `STRUCTURAL_ONLY` saattoi näyttää passiiviselta tai hylätyltä | Aktiivinen topologia-, suunta-, viive-, herkkyys- tai kenttäallekirjoituspriori | [discovery-first-ohje](fieldstate-discovery-inference.md) ja evidenssirekisteri |
| `PARTIAL_FIELD_STATE` saattoi näyttää käyttökelvottomalta | Mitattu osa FieldStatesta; se päivittää paikallista latenttia kenttätilaa ja pitää puuttuvat komponentit epävarmuutena | [ANFR-silta](anfr-fieldstate-bridge.md) |
| Samapaikkaisuus näytti ainoalta hyväksyttävältä liitokselta | `EXACT_SITE`, `MOBILITY_WEIGHTED_CATCHMENT` ja `LOCAL_AREA_ESTIMATE` ovat eri tarkkuustasoja | [discovery-first-ohje](fieldstate-discovery-inference.md) ja [sentinelliprotokolla](sentinel-hindcast-protocol.md) |
| F1–F6 `BLOCKED` näytti koko sentinellievidenssin nollalta | Se tarkoittaa vain alkuperäisen, suoran sentinelli→ihmisendpoint-kriteerin odottavan laskentaa | [sentinellivaatimukset](sentinel-data-requirements.md) |
| Legacy-bibliografia näytti vain arkistolta | Lähteet käsitellään lähdekohtaisina suorina tai epäsuorina constraint-evidensseinä; epävarma bibliografia tarkistetaan DOI-/PMID-tasolla ennen tarkempaa sijoitusta | [legacy-siirtokerros](legacy-evidence-migration.md) |

## Bayesilainen käytäntö

Jokaisella kaavion aktiivisella haaralla käytetään rinnakkain vähintään
mekanismi-, endpoint-, ihmisendpoint- ja heikosti informatiivista
prioriperhettä. Prioriperheiden tarkoitus on säilyttää mahdollinen signaali
näkyvissä eri mittakaavoilla, ei painaa sitä oletusarvoisesti nollaan.

Lähde voi päivittää esimerkiksi vain `T_s,o`-siirtofunktiota,
`W_s,o(f)`-taajuus-/kulmaherkkyyttä, vaikutussuunnan todennäköisyyttä tai
`R/P`-muistin viiveperhettä. Se ei tarvitse samaan aikaan todistaa kaikkia
ketjun myöhempiä tasoja ollakseen käyttökelpoinen.

## Jäljellä olevat avoimet tehtävät

- Ennalta määritellyt, liikkuvuuspainotetut FieldState–biologia-paneelit
  kaventavat organi- ja lajikohtaisia posteriorivälejä.
- 129 legacy-tietueen bibliografia varmennetaan lähdekohtaisesti ja liitetään
  evidenssiconstraint-ledgeriin; lähdettä ei hylätä vain siksi, että se on
  vanhassa A–F/T-nimistössä.
- Historian ASFR/TFR-signatuurit arvioidaan posterior-prediktiivisesti useilla
  prioriperheillä, ei yhdellä piilo-oletuksella.

Tämä auditointi ei tee epätäydellisestä aineistosta täydellistä. Se varmistaa,
että epätäydellisyys kulkee mallissa epävarmuutena eikä virheellisenä
johtopäätöksenä siitä, ettei signaalia olisi.
