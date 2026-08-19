# Eläinlääketieteellisten lisääntymisrekisterien hankintaloki

Tarkistettu: 2026-08-19  
Rajaus: tässä ovat vain uudet, viralliset tai tutkimusarkistoissa julkaistut
pitkittäis- tai monipaikkaiset lähteet. Lista on hankintakartta, **ei
evidenssirekisteri**. Mikään rivi ei ole RF-vaikutuksen testi ilman mitattua,
samalle paikka-ajalle kohdistettavaa RF-altistusta ja tärkeimpiä sekoittajia.

## Tunnistetut lähteet

| Lähde | Asetelma | Tila | Mitä se voisi antaa | Mikä estää sentinellin |
| --- | --- | --- | --- | --- |
| [Eastham ym. UK dairy, Zenodo-mirror](https://zenodo.org/records/4965051) | 396 534 primiparous Holstein/Friesian -lehmää, 6 985 UK:n milk-recorded herd -yksikköä; ensipoikiminen 2006--2008 | `CANDIDATE_NOT_HELD` (CC0) | yksilö-/herdtason ikä ensipoikimisessa, hedelmällisyys-, poikimisväli- ja selviytymisvasteita | vain kolmen vuoden ensipoikimisikkuna; raakapaikka on anonymisoitu eikä RF:tä ole |
| [Irish Cattle Breeding Federation database](https://www.icbf.com/the-icbf-database/) | kansallinen eläintapahtuma- ja dairy-performance-ekosysteemi; calving-, fertility- ja health-tietoja | `ACCESS_REQUIRED` | potentiaalisesti yksilö×aika×herd-reproduktiorekisteri | tutkimusportaali on tällä hetkellä keskeytetty; tarvitaan hyväksytty tietopyyntö ja paikka-/aika-/lisenssiauditointi ([portaali](https://www.icbf.com/research-portal-landing/)) |
| [DairyNZ DIGAD](https://dairynz-web.aueast01.umbraco.io/animal/breeding-decisions/animal-database/) | NZ:n osallistuvien maitotilojen yksilöiden tuotanto-, fertility-, health- ja conformation-tiedot; tietokanta perustettu 2014 | `ACCESS_REQUIRED` | monipaikkainen lehmätason fertility- ja health-kohortti | Core Data Access Panel ja ehdot; paikka- ja aikakentät sekä RF-liitos tarkistetaan vasta luvallisesta otteesta |
| [South African Holstein INTERGIS metadata](https://data.mendeley.com/datasets/7pf4p6xrhs/1) | pedigree- ja life-history-tietoja 1945--2020; syntymä, vanhemmat, alue, emän ikä poikimisessa ja kuolema | `ACCESS_REQUIRED` | erittäin pitkä alueellinen cattle life-history-/calving-konteksti | metatieto ilmoittaa, että data on saatavissa vain pyynnöstä; fertility-/stillbirth-kentät ja alueavain on nähtävä ennen ingestia |
| [The Kennel Club: 10-year breed registrations](https://www.thekennelclub.org.uk/media/cfodkslt/10-yearly-breeds-stats-pastoral.pdf) | rotu×vuosi UK; nykyinen julkinen taulukko 2015--2024, useita ryhmäkohtaisia julkaisuja | `PUBLIC_REUSE_UNVERIFIED` | koirarekisteröintien 10 vuoden lajike-/rotukonteksti | rekisteröinnit eivät ole sama kuin syntymät/pentueet; massaulosvienti, täydellinen ryhmäkattavuus ja tutkimuskäyttölupa täytyy selvittää |
| [The Jockey Club Fact Book: registered foal crop](https://www.jockeyclub.com/default.asp?area=2&section=FB) | USA, Kanada ja Puerto Rico; vuosittaiset rekisteröidyt täysiveristen varsat vuodesta 1990 | `PUBLIC_REUSE_UNVERIFIED` | pitkä virallinen registered-foal -aikasarja, vähintään maa-taso | verkkotaulukko, ei tarkistettua bulk-tiedostoa; myöhäisrekisteröinti erottaa sarjan todellisesta foal crop -mittauksesta, eikä RF:tä ole |
| [DEFRA June Survey cattle and calves, 1984--2006](https://www.data.gov.uk/dataset/c5004352-fe97-4bd5-8f2e-02554c02c2ba/june-survey-of-agriculture-and-horticulture-uk/datafile/181cc6c7-256c-4b30-ba70-8fc8346732e5/preview) ja [2005--2014](https://www.data.gov.uk/dataset/c5004352-fe97-4bd5-8f2e-02554c02c2ba/june_survey_of_agriculture_and_horticulture_uk/datafile/967f362b-77c6-4ce0-82a9-34c513effeb2/preview) | UK:n vuosittaiset kansalliset cattle/breeding-herd -aggregaatit | `CANDIDATE_NOT_HELD` | riippumaton historiallinen kansallinen breeding-herd-kontekstisarja | aggregaatti eikä yksilö-, semen- tai fertility-outcome-pinta; rajavuoden/harmonisaation tarkistus vaaditaan |

## Avoin UK dairy -tiedosto: täsmällinen hankintastatus

Eastham-aineisto on julkaistu CC0-lisenssillä Dryadissa ja sen avoin
[Zenodo-mirror](https://zenodo.org/api/records/4965051) ilmoittaa yhden CSV:n:
`AFC paper data.csv`, 156 547 427 tavua, MD5
`55621757e46003553b66d82e16e61c53`. Lähde on siten aito avoin,
monipaikkainen lisääntymistutkimus, ei pelkkä artikkelikuvaaja.

Tässä työtilassa useat pitkän latauksen yritykset keskeytyivät ennen kuin
paketin MD5 täsmäsi. Viallista osittaista tiedostoa ei säilytetty eikä
manifestia, normalisoitua tuotetta tai malliliitosta luotu. Uusi haku saa
muuttaa tilan `HELD_ISOLATED`-tilaan vasta, kun täysi lähdetiedosto ja sen
julkaistu tarkistussumma täsmäävät.

## Hankintajärjestys

1. Ensiksi luvallinen mikroaineistopyyntö ICBF:lle ja DairyNZ:lle: pyydä
   data dictionary, havaintograin, täsmällinen aika, de-identifioitu
   herd-/alueavain, calving/fertility-kentät, protokollaversiot ja lisenssi.
2. Kun Eastham-tiedosto on kokonaan noudettu, lukitse lähteen MD5 sekä uusi
   SHA-256 manifestiin ja normalisoi erilliseksi `BENCHMARK_ONLY_NOT_SENTINEL`
   -tuotteeksi. Älä tulkitse kolmea vuotta pitkänä RF-viivepaneelina.
3. Käytä Kennel Club-, Jockey Club- ja DEFRA-aggregaatteja vain, jos
   julkaisuoikeus ja mittarimääritelmä on vahvistettu. Ne voivat toimia
   populaatiorakenteen kontekstina, eivät hedelmällisyysannos-vastetesteinä.
4. Vasta sen jälkeen arvioidaan tarkka, mitattu RF-kerros. Tukiasema-,
   liittymä- tai teknologiankäyttötilasto ei korvaa eläimen ympäristöannosta.
