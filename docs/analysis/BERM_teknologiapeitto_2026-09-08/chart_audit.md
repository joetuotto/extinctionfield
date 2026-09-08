# Teknologiakaavioiden auditointi ja korjaukset

8.9.2026. Rajaus: `LayersExplorer.tsx`, `TechnologyGradientChart.tsx`, `BermMasterInfographic.tsx` ja `LightingTransitionTimeline.tsx`. Teknologiahistorian rekisteri, pääsivu ja uusi selainkomponentti toteutetaan rinnakkaisessa työssä. Sivukoodin tai mallin muissa kohdissa olevia terveys- ja väestöväitteitä ei ole tässä korjattu.

BERM-portti: vuoden 2025 `g = η + κ A⊗A`; `A=A_b+a` tuottaa `δg=κ(A_b⊗a+a⊗A_b+a⊗a)`. Teknologian omaksumishistoria voi auttaa rekonstruoimaan lähteitä. Se ei anna itsessään kudosoperaattoria, vasteen merkkiä, fysiologista mittakaavaa tai populaatiovaikutuksen viivettä. Uusissa kaavioissa ei esitetä lähdeperheiden lukumäärää geometrian tai biologisen altistuksen mittana.

## 1. Mitä alkuperäiset kuviot todella sisälsivät

| Komponentti | Todellinen aineisto auditointihetkellä | Miksi esitys piti korjata |
|---|---|---|
| `TechnologyGradientChart` | Kahdeksan käsin kirjoitettua `tech`-arvoa: 0,05; 0,10; 0,18; 0,40; 0,55; 0,80; 0,90; 1,00. Samoihin tietueisiin liitetyt hedelmällisyysluvut: 6,5; 6,4; 5,5; 2,8; 2,5; 1,62; 1,26; 0,72. Ei lähteitä, havaintovuosia, tech-mittarin määritelmää tai otosten metadataa. | Yhteisöjä ja kokonaisia maita yhdisti laskeva viiva, jonka vaakakoordinaatit oli itse valittu. Kuvateksti väitti samaa maata, terveydenhuoltoa ja taloutta, vaikka mukana olivat USA, Suomi, Etelä-Korea ja eri yhteisöt. Perhe-/kohorttiluvun ja periodisen TFR:n vertailukelpoisuutta ei määritelty. |
| `BermMasterInfographic` | Viisi käsin laadittua lähdekerroksen numerosarjaa ja viisi käsin laadittua terveyskäyrää yhteisellä 1880–2025 akselilla. Ei sarjakohtaista alkuperäisdataa. Hover laski summan ja nimesi sen EMF-prosentiksi. Samassa kuviossa Korea 0,72 / Amish 6,1 ja 88 % / 58 % / 9 h ilman samassa esityksessä näkyvää populaatiota, vuotta tai kokeellista rajausta. | Pinta-alat ja tautikäyrät näyttivät mitatuilta historiallisilta sarjoilta; yhteinen peiliasettelu näytti määrälliseltä yhteydeltä. Merkintä ”yksi mekanismi” ei erottanut ehdollista BERM-ketjua sen biologisen sillan kalibroinnista. |
| `LayersExplorer` | 12 paikallista lähdeluokkaa, yksi aloitusvuosi/lähde, jatkuvat nauhat vuoteen 2030, käsin annettu 0–3-laji/lähde-matriisi ja erilliset ekotapahtumat. Lajipisteillä ei ollut lähde- eikä kriteerirekisteriä. | Alueeton aloitusvuosi näytti maailmanlaajuiselta käyttöönotolta. ”Vahva mekanistinen + havaintopohjainen yhteys” antoi pisteluokitukselle perusteettoman näytön aseman. Eri asennuspäätökset nimettiin riippumattomiksi instrumenteiksi ilman instrumenttiehtojen tutkimista. Tuulivoiman lavanohitus oli virheellisesti EMF-taajuus, näytön taajuudeksi annettiin myös erillisen Wi-Fi-yhteyden taajuus. |
| `LightingTransitionTimeline` | Käsin annettu `LED_SHARE`: 2005=0 %, 2008=2 %, 2010=5 %, 2012=15 %, 2014=30 %, 2016=50 %, 2018=65 %, 2020=78 %, 2022=87 %, 2024=92 %. Ei lähdettä eikä myynti/kanta/perusjoukko-määrittelyä. Lisäksi 2015–2022 varjostettu väestövaikutusikkuna ja 5–10 vuoden viive. | Myynti ja käytössä oleva kanta sekoittuivat; luvut eivät olleet tarkistettu sarja. EU- ja USA-säännöt nimettiin liian kattavasti kaikkien lamppujen kielloiksi. Jokaiselle LED-lampulle väitettiin yhtä hakkuritaajuusaluetta ja analogiaa TTFields-hoitoon ilman annoksen, kytkennän tai käyttötavan erottelua. |

Kyse ei ollut vain puuttuvasta kuvatekstistä. Keksittyjä mittapisteitä ei jätetty tosimaiden tai todellisten sairauksien nimillä näkyviin pienellä ”skenaario”-varauksella: se olisi säilyttänyt väärän empiirisen vaikutelman.

## 2. Toteutettu korjaus

- **Teknologiakerrokset:** `LayersExplorer` säilyttää vanhan julkisen exportin mutta on nyt ohut sovitin `TechnologyHistoryExplorer locale={locale} compact` -komponenttiin. Näin käyttöön tulee yhteinen rekisteri ja lähteistetyt alueelliset tapahtumat. Vanha 12-luokkainen taulukko, aloitusvuodet, lajipisteet ja spektrivirheet poistuivat tästä komponentista.
- **Teknologia ja hedelmällisyys:** kolme laadullista vertailuasetelmaa: ennen/jälkeen vertailuväestön kanssa; alueiden/kohorttien eri käyttöönottoajat; yhteisöjen teknologiakäytännöt. Ehdollinen BERM-ennuste säilyy näkyvänä, mutta scoret, pisteet, laskeva yhteysviiva ja perusteeton sama-maa-teksti poistuvat. Yhteisönäytön ja teknologiahistorian linkit säilyvät.
- **Yleiskuva:** kuusi esimerkinomaista lähdeperhettä ja kolme vaihetta: fysikaalinen ympäristö → ehdollinen BERM-vaste → eliöt/populaatiot. Laatikoiden pinta-ala tai määrä ei ole numeerinen paino. Ei lähteettömiä aikasarjoja, EMF-prosentteja tai terveyskäyriä. Malli-, historia- ja tutkimusnäyttölinkit säilyvät. Kuvion aiempia terveyslukuja ei yleisesti mitätöidä; niiden esittäminen vaatii kunkin alkuperäisen tutkimuksen omat rajaukset.
- **Valaistus:** todellinen vuosiasteikko ja kuusi nimettyä EU/USA-sääntelytapahtumaa. Tapahtuman yhteydessä on alkuperäinen lähdelinkki. Myyntisarjan lähteeseen pääsee suoraan, mutta varmentamattomia prosentteja ei piirretä. Optinen valo, ohjauselektroniikan kentät ja biologisen vasteen mallintaminen erotetaan.

Master ja Gradient ovat nyt **käsitteellisiä vertailu-/mallikuvia**. Lighting on **lähteistetty tapahtuma-aikajana**. Uusi Layers-näkymä käyttää **yhteisen historian rekisteriä**. Näitä neljää tyyppiä ei nimetä samaksi empiiriseksi aineistoksi.

## 3. Valaistuksen tarkistetut lähteet

1. [Komission asetus 244/2009](https://eur-lex.europa.eu/eli/reg/2009/244/oj/eng), artikla 3: vaiheet 1–4 alkoivat 1.9.2009, 1.9.2010, 1.9.2011 ja 1.9.2012. Tuoteryhmänä olivat asetuksen määrittelemät suuntaamattomat kotitalouslamput. Kuvio ei väitä jokaisen lampun tai asennetun kannan välitöntä kieltoa.
2. [Euroopan komission muistio syyskuun 2018 säännöistä](https://energy.ec.europa.eu/system/files/2018-08/memo-light_bulbs_applicable_from_september_2018_0.pdf): verkkojännitteiset suuntaamattomat halogeenit; lähde nimeää myös poikkeuksia. Siksi vanha yleinen ”halogeenit kielletty” on korvattu rajatulla ilmaisulla.
3. [US DOE:n vuoden 2025 viranomaismuistio](https://www.energy.gov/sites/default/files/2025-05/Enforcement%20Policy%20Statement%20-%20GSLs%20Marketed%20Exclusively%20for%20the%20Health%20and%20Care%20of%20Reptiles%20Amphibians%20and%20Other%20Small%20Animals.pdf): vuoden 2022 45 lm/W -vaatimuksen täytäntöönpano eteni asteittain 1.8.2023 saakka. Kuvio käyttää tätä **historiallisen toimeenpanopäivän** dokumentaationa, ei väitteenä nykyisen sääntelyn kaiken kattavuudesta.
4. [IEA:n vuonna 2023 julkaisema kotitalousvalaistuksen myyntikuva 2010–2030](https://www.iea.org/data-and-statistics/charts/global-residential-lighting-sales-share-by-technology-in-the-net-zero-scenario-2010-2030): nimetty perusjoukko on maailman kotitalousvalaistuksen myynti; mukana on Net Zero -skenaario. Pelkkä otsikko ei oikeuta kopioimaan kaikkia vuosia historiallisina havaintoina. Tarkat ensikäden CSV-arvot eivät olleet käytettävissä tämän komponentin auditoinnissa, joten kuvaan ei kirjoitettu oletettuja osuuksia.

Valaistuskuvio suodattaa yhteisestä `technology-history.json`-rekisteristä `indoor-lighting`-tapahtumat, joiden tunnus alkaa `lighting-policy-`. Tapahtumien otsikot, vuosiluvut ja lähteet tulevat samasta kanonisesta rekisteristä kuin teknologiasivulla. Komponentissa ei säilytetä erillistä tapahtumadataa tai prosenttisarjaa.

## 4. Mallisivun duplikaattien korjaus

`website/app/[locale]/model/page.tsx` sisälsi toisen 12-kerrostaulukon, kiinteän `Σ k=1..12` -summan, alueettomat aloitusvuodet ja käsin piirretyn pinotun pinta-alan. Nämä korvattiin integraatiossa kuudella yhteisestä rekisteristä luetulla ympäristöllä, `A = A_background + Σ_j a_j` -lähderekonstruktiolla sekä kompaktilla historia- ja aineistoselaimella. Myös otsikot ja kuvatekstit korjattiin kaikilla viidellä kielellä.

Muualla sivustolla voi yhä olla vastaavia historiallisia, spektri- ja päätepisteväitteitä. Tämä auditointi ei ole niiden hyväksyntä. Muun muassa ekologian sivun NEXRAD/Hallmann-aikavertailu on erillinen alueellista vertailukelpoisuutta vaativa väite.

## 5. Validointi

- `TechnologyCharts.test.tsx`: **20/20 läpi**. Kaikki viisi localea tuottavat nimettyjä kuvioita, toimivia paikallisia reittejä ja lähteistettyjä politiikkatapahtumia. Testit suojaavat keksittyjen prosenttien/scorejen ja liian yleisen sama-maa-väitteen palaamiselta sekä myynti/kanta-eron katoamiselta.
- Tuotantoselaimessa havaittu valaistuskuvion SVG-otsikon renderöintivirhe toistettiin viidellä uudella palvelinrenderöinti → HTML-jäsennys → React-hydraatio -testillä. Otsikkojen ja kuvausten yhdistäminen yhdeksi tekstisolmuksi poisti virheen. Testit varmistavat myös alkuperäisten SVG-solmujen säilymisen.
- Näiden neljän komponentin ja uuden testitiedoston ESLint: **0 virhettä, 0 varoitusta**.
- Aineistojen valmistuttua koko sivuston tyyppitarkistus, linttaus, rekisteritarkistus ja tuotantokäännös menivät läpi. Yhteisten testien ja selaintarkistusten lopulliset tulokset ovat [toteutusraportissa](</Volumes/kovalevy 3/extinctionfield/docs/analysis/BERM_teknologiapeitto_2026-09-08/implementation.md>).
- Uusi englannin- ja suomenkielinen teksti on kokonainen; ja/fr/ko käyttävät nykyisen `pickCopy`-sopimuksen mukaista englannin fallbackia. Vanhoja harhaanjohtavia käännöksiä ei jätetty näissä komponenteissa näkyviin.
- Lopullinen selain- ja mobiilitarkistus kuuluu yhteiseen sivuintegraatioon; tämän osatyön testit eivät yksin osoita koko sivun visuaalista toimivuutta.
