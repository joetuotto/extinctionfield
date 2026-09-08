# Proxy masking: proksiselittäjät ja yhdistävä rakenne

8.9.2026. Jatko julkaistulle proxy masking -alasivulle. Käyttäjä pyysi käyrävisualisointeja, selittäjien EMF-yhteyksien avaamista sekä BERM:n parsimonian ja eri tarkastelutasojen selkeämpää perustelua.

## Teoreettinen lähtökohta

Lähtökohtana säilyy Lindgrenin, Kovacsin ja Liukkosen vuoden 2025 muotoilu: [alkuperäisen tekstin yhtälö 5](https://www.preprints.org/manuscript/202503.2321). Paperin normalisoinnissa `g = η + A⊗A`. BERM:n fysikaalisen asteikon eksplisiittinen versio on `g = η + κA⊗A`; vuoden 2021 singularista muotoilua ei yhdistetä tähän.

Kun `A = A_bio + a_ext`, lähtötilan vähennys antaa tensorimuodossa

```
δg_μν = κ(A_bio,μ a_ext,ν + a_ext,μ A_bio,ν + a_ext,μ a_ext,ν).
```

Tämä on ilmoitetusta premissistä johdettu geometrinen erotus. Kudoshavainto tarvitsee erillisen BERM-operaattorin `δO_i = Ξ_i[S_i](δg)`. Valohistorian ja biologisen tilan sisältävä vastaanotto on ehdollinen BERM-liitos. Gauge-resepti, asteikko, kudosytimet, etumerkki, viive ja päätemuuttujien kalibrointi säilyvät avoimina. Biologiset osatutkimukset eivät siirry geometrian tai tämän liitoksen vahvistukseksi. Sivun matemaattinen osuus säilyttää tämän rajan.

## Esitystapa

Lukupolussa on nyt kymmenen pääosaa. Yhteisen muutoksen ja välittymisen havainnollistus tulee ensin, proksiselittäjien selain toisena ja eri tasoja yhdistävä parsimoniaosuus ennen matemaattista synteesiä.

- **Käyrävertailu:** seuraus ja proksi näkyvät ensin, oletettu EMF-haara paljastetaan painikkeella. Yhteinen muutos ja välivaihe käyttävät samoja havaintokäyriä; syyrakenne muuttuu niiden alla. Molemmat akselit ovat yksiköttömiä. Arvot ovat kaaviokäyriä, eivät historiallista aineistoa, vaikutuskokosovitusta tai ennusteita.
- **Kymmenen selittäjää:** BKT, kaupungistuminen, ruutuaika, yövalo, ruokavalio, liikkuminen, kemikaalit, ehkäisy/koulutus/ajoitus, ilmasto/elinympäristö sekä diagnostiikka. Kukin valinta avaa yhteiskehityksen mahdollisen reitin, peittyvän osuuden ja BERM:n selitykseen lisäämän vaiheen.
- **Tasojen yhdistäminen:** sama viiden havaintotason joukko näytetään erillisinä lähiselityksinä tai BERM:n ehdollisena ketjuna. Vastaanotto, hormonaalinen/aistiprosessi, käyttäytyminen ja populaatio liittyvät toisiinsa nimetyin askelin. Palaute kohdistuu myöhempään ympäristöön.

Parsimonia kuvataan samojen määriteltyjen osamekanismien, vastaanottotilojen ja kokoamissääntöjen uudelleenkäyttönä. Empiirinen paremmuus erotetaan tästä rakenteellisesta perustelusta. Lajivertailu laajentaa selityksen alaa, mutta ei poissulje kemikaalien, optisen valon, lämpötilan tai elinympäristön omia vaikutuksia. Syntymien aggregointi avataan parisuhteiksi, raskausyrityksiksi, hedelmöittymiseksi ja raskauksien lopputuloksiksi ikäryhmittäin ja ajassa.

## Lähteet ja toteutus

Lähdeauditointi on tiedostossa [BERM_proxy_visuals_source_audit_2026-09-08.md](BERM_proxy_visuals_source_audit_2026-09-08.md). Bibliografiaan lisättiin Frein henkilökohtaisen RF-altistuksen arviointitutkimus ja Birksin mallinnettua kudosannosta käsittelevä tutkimus. Nykyisiä Belmin- ja Chang-lähteitä käytetään proksien avaamiseen; niiden `finding`-kuvaukset korjattiin alkuperäisiin koe- ja havaintoasetelmiin.

Uusi proksiaineisto on `website/lib/proxyExplanationsData.ts`. Aineisto ilmoittaa viitteensä renderöivän `ProxyExplanationsExplorer`-komponentin viitevalidoinnin olemassa olevalla ilmoitusmekanismilla. Kaksi kaaviota ovat `ProxyCausalVisuals.tsx`-tiedostossa. Sisältö on suomeksi ja englanniksi; muut kielireitit käyttävät ilmoitettua englanninkielistä varasisältöä.

Julkaisu rajataan näihin muutoksiin ja niistä uudelleen muodostettuihin indekseihin. Työpuun rinnakkaiset teknologia- ja mallisivumuutokset säilytetään erillään julkaisusta.

## Tarkistus

Eristetty julkaisuversio läpäisi 110 kohdistettua testiä, joihin sisältyy SSR/hydration-regressiotesti kaikille viidelle kielelle. Tyyppitarkistus, tiukka lint, lähde- ja rekisterivalidointi sekä kielikattavuuden tarkistus läpäisivät. Tuotantokäännös onnistui ja 547 esirenderöidyn reitin tarkistus ei löytänyt raakaviitetunnisteita, tyhjiä tekstielementtejä tai tyhjiä linkkejä. Selaimessa tarkistettiin kenttähaaran paljastaminen, kausaalitapauksen vaihto, proksivalinnat ja tasojen yhdistäminen. Tuoreen latauksen konsolissa ei ollut virheitä; 390 ja 320 pikselin mobiilileveyksillä ei ollut sivuttaista ylivuotoa.
