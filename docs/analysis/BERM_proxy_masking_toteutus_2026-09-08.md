# Proxy masking -alasivun toteutus ja esitystapa

8.9.2026. Toteutettu paikalliseen työpuuhun sivu `/fi/model/proxy-masking` ja englanninkielinen vastine. Japanin, ranskan ja korean reitit käyttävät englanninkielistä sisältöä ja näyttävät käännösilmoituksen. Navigaation nimi on käännetty kaikille viidelle kielelle.

## Lukijan eteneminen

Johdanto aloittaa ruokahalun ja painon tutusta suhteesta. Se erottaa lähiselityksen ja sen aikaisemman syyn, määrittelee proxy-käsitteen sekä kertoo BERM:n ehdotuksen ennen erikoistermejä tai yhtälöitä. Mallin keskeinen kysymys nostetaan näkyviin: tunnistaako selitys prosessin alun vai myöhemmän vaiheen?

Kahdeksan osan lukujärjestys on **kausaalinen rooli → vastaanottaja → yhteisaltistus → kompensaatio → lajivertailut → yhteisömittarit → koetut syyt → BERM-synteesi**. Järjestys esittelee mekanismin ennen siihen perustuvaa aineistojen kokoamista. Ihmisen motivaation pidempi liitos tulee vasta konkreettisten biologisten ja mittauksellisten esimerkkien jälkeen.

Jokaisessa osassa on kontekstia avaava johdanto ja ”Miksi tämä on olennaista?” -kappale. Lähteet ovat lähellä niitä koskevaa väitettä. Leveällä näytöllä lukupolku pysyy vasemmalla mukana; mobiilissa se on avattava sisällysluettelo. Yhtälöt avautuvat lopussa erillisestä osiosta. Tavallisen tekstin palsta ja väljä riviväli säilyvät myös kuvaajien ympärillä.

## Neljä havainnollistusta

| Havainnollistus | Lukijalle näkyvä toiminto | Peruste |
|---|---|---|
| Mistä selitys alkaa? | Aiemmat vaiheet avataan painikkeella; ketju kulkee aina pystysuunnassa. | Osoittaa välivaiheen ja aikaisemman ehdon eron. Katkoviiva ja teksti nimeävät BERM:n ehdollisen osuuden. |
| Sama vihje, erilainen vastaanotto | Vertailu-, heikompi ja myöhempi vaste; vihje pysyy samana. | Erottaa syötteen, vastaanottotilan, vasteen voimakkuuden ja ajoituksen. |
| Kemiallinen vaikutus eri olosuhteissa | Valittavana vertailu, voimistuva ja vaimentuva vaikutus. | Näyttää vaikutuksen muokkaamisen ilman kaikkia kemikaaleja koskevaa yhtä etumerkkiä. |
| Amish-aktiivisuuden kaksi mittaria | Erilliset pylväspaneelit terveysliikunnan osuudelle ja ikävakioiduille askelille. | Käyttää Katzin julkaistuja miesryhmien arvoja; mittarit järjestävät ryhmät vastakkaisesti. |

Käyrät ovat nimettyjä yksiköttömiä havainnollistuksia. Niihin ei liitetä ympäristöannosta, historiallista vuosikäyrää tai väestöennustetta. Empiirisen kuvan prosentti- ja askelasteikot alkavat nollasta ja esitetään erikseen. Havainnollistuksissa on tekstiselitteet, kuvaukset ruudunlukijalle, näppäimistöllä käytettävät valinnat ja valintatilan ilmoitus.

## Yhteydet sivustoon ja lähteisiin

Malli-valikko ja etusivun uusi tiivis nosto vievät alasivulle. Raskasmetalli-, Klimentidis-, ekologia- ja Amish-sivut sisältävät oman roolinsa selittävän paluulinkin. Pääsivun lopussa nämä neljä näyttöhaaraa kootaan yhteen.

Viisi uutta luonnosvaiheen väitettä ankkuroidaan olemassa oleviin semanttisiin solmuihin. Biologiset komponentit, BERM:n ehdolliset liitokset ja avoimet kalibroinnit erotetaan. Lähteet käyttävät kanonisia viitetunnisteita; bibliografiaan lisättiin 12 alkuperäisjulkaisun metatiedot. Klimentidisin vanhaa ravintokontrollin kuvausta täsmennettiin. Sivun luominen ei lisää uutta itsenäistä evidenssireittiä.

## Tarkistus

Sivua tarkasteltiin selaimessa tavallisella työpöytäleveydellä sekä 390 ja 320 pikselin mobiilileveyksillä. Sivusuuntaista ylivuotoa ei havaittu. Molemmat vastevalitsimet, ketjun avaaminen ja yhtälöosion avaaminen toimivat; selain ei raportoinut virheitä. Suomen-, englannin-, japanin-, ranskan- ja koreankieliset reitit palauttivat 200, sisältävät kahdeksan pääotsikkoa ja kuusi väiteankkuria, eikä niissä ollut raakaviitetunnisteita tai puuttuvia sisäisiä ankkureita.

Kohdistetut verkkosivutestit: 98/98. Pythonin mallin identiteettisopimus: 12/12. Lähdevalidointi, TypeScript, tiukka lint ja kielikattavuustarkistus läpäisivät. Tuotantokäännös läpäisi kaikki vaiheet. Rakennetun HTML:n tarkistus kävi läpi 547 esirenderöityä reittiä: ei raakaviitetunnisteita, tyhjiä tekstielementtejä tai tyhjiä linkkejä. Lopullinen kaavioteksti ja käsitteiden täsmennykset varmennettiin myös tuotanto-HTML:stä. Samassa työpuussa rinnakkain lisätyn teknologiasivun testin kuudesta roolihausta poistettiin kirjaston tukematon exact-valinta; tekstihaut säilyivät ennallaan. Tämän testitiedoston ja proxy masking -komponenttien yhdeksän testiä läpäisivät korjauksen jälkeen.

Toteutus: [alasivu](../../website/app/[locale]/model/proxy-masking/page.tsx), [havainnollistukset](../../website/components/ProxyMaskingExplorers.tsx), [etusivun nosto](../../website/components/ProxyMaskingInfographic.tsx). Sisältöpohja: [lähdesynteesi](BERM_proxy_masking_lisat_2026-09-08/README.md).
