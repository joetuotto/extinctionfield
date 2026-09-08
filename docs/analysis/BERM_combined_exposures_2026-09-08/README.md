# Yhteisaltistusten integraatio, 8.9.2026

Tämä toteutus käyttää päivitettyä liitettä «BERM-synergiat: E-pillerit × EMF, synteettiset materiaalit × EMF ja vaatteet…» aiemman kaksiosaisen version sijasta. Mallin omat premissit on avattu ensin DERIVATION.md:ssä. Lähteet jäljitettiin alkuperäiskokeisiin ja niiden väliset liitokset kirjattiin erikseen.

## Lopputulos

- Uusi `/fi/evidence/combined-exposures` ja vastaava englanninkielinen sivu. Muut kolme kieliversiota käyttävät näkyvästi englannin varatekstiä.
- Valittava nelivaiheinen prosessikuva: lähde → siirtoreitti → vastaanottotila → vaste. Kolme tarkastelukohtaa paikantaa materiaalin, lääkkeen ja yhteisen biologisen reitin.
- Julkaistuista Kursawe2021-luvuista piirretty kuvaaja näyttää DC-, AC- ja hybridiprotokollien havaintokynnykset. Hybridipalkki esittää vain DC-komponentin; lisäksi annettu 4 kV/m AC on nimetty vieressä. Otoskoot ovat kynnyskelpoisia osajoukkoja.
- Viisi ehkäisyn tilareittiä: kanavat ja ajoitus, redox, hormonin sitoutuminen, palautumishistoria sekä mikrobiomi. Materiaalille erotetaan RF-siirto, tribosähköinen kontakti, lämpö ja kemiallinen reitti.
- Aihekohtaiset sisääntulot 24 olemassa olevalta sivulta, mukaan lukien proxy masking, farmakologia, testosteroni, teknologia, mikrobiomi, ekologia, raskasmetallit, mittaaminen ja moduloomi. Lisäksi näyttörekisterin ja päävalikon uusi sivulinkki. Tarkka sivuinventaario on `affected_routes.json`.
- Pythonin `berm.biology.combined_exposures` liittää yhteen olemassa olevat fysikaalisen rajapinnan, solutilan, steroidituotannon ja hormonisitoutumisen tietueet. Hormonin poistuma säilyy omana mittauksena. Kolmen tekijän protokollasta voidaan laskea sovitettu kahden tekijän additiivinen kontrasti kolmas tekijä vakioituna.
- Mallirakenne viedään sivustolle; Python ja sivusto käyttävät samaa arkkitehtuurisopimusta. FieldState säilyy valinnaisena fysikaalisen syötteen mittaushaarana.
- Ru360–RF-koe lisättiin varsinaiseen interventioprofiilien selaimeen ja nykyiseen kalsiumin osastokiertoa kuvaavaan karttayhteyteen. Uusi profiili ei peri muiden profiilien havainnollistavaa laskentakäyrää.

## Mitä tutkimukset vahvistavat ja tarkentavat

30 lähteen auditoinnista lisättiin 26 uutta bibliografista tietuetta ja täsmennettiin neljää olemassa olevaa. Tulkinnat ovat 30 erillisessä evidenssisuhteessa ja kolmessa luonnosväitteessä; bibliografia sisältää vain lähdemetatiedot. Katsaukset, teoreettiset mallit ja preprint säilyttävät oman roolinsa. Fullerin ja Clapp Organskin sekä Terrazasin ja Paulin jaetut aineistoperheet on kirjattu.

Suora Ru360–RF-yhteiskoe ja Luukkosen menadioni–RF-koe tukevat vastaanottotilan ja protokollan merkitystä. Estradiolin kanavakokeet, valmistekohtaiset redox-, SHBG- ja suolistohavainnot yhdistävät lääkkeen näihin tilamuuttujiin. Puhelimen phantom-kokeet ja erikoistekstiilin SAR-mittaukset paikantavat fysikaalisen siirtovaikutuksen. Näistä muodostetaan BERM:n ehdollinen yhteisaltistusketju.

Liitteen keskeiset täsmennykset ovat Ru360:n vauriota **lisäävä** vaikutussuunta; hydrokortisonin imeytymistä koskevan 42-kertaisen luvun oikea suure; Petri-katsauksen korvaaminen suoralla Kursawe-kokeella; Shafikin kaksi eri tutkimusta ja Moeloekin riippumaton osatoisto; mikrobiomitutkimusten laji, suolistoalue ja aineistoperhe; sekä ICNIRP:n olemassa olevat monitaajuussäännöt. Kang2014 rajaa Luukkosen tuloksen siirtämistä toiseen signaaliprotokollaan.

Lääketila, materiaalirajapinta ja laiteprotokolla ovat kolme tekijää. Niiden yhteisvaikutus ei ole neljäs riippumaton altiste. Sama kalsium/redox-välivaihe kuljetetaan eteenpäin kerran. Tähän integraatioon ei sisälly uusia väestöennusteita, yleisiä vahvistuskertoimia tai lääkesuosituksia. L2-kytkentä ja ihmisen päätemuuttujien kalibrointi on nimetty erikseen.

## Tutkimusjälki

- `DERIVATION.md`: Lindgren2025-tensorijohdos ja eksplisiittinen BERM L2 -liitos.
- `pharma_sources.md` ja `pharma_references.json`: farmakologinen lähdejäljitys, järjestelmät, annokset, suunta ja synteesi.
- `material_sources.md` ja `material_references.json`: materiaalit, iho, puhelindosimetria, tutkimusten erot sekä julkaistut numerot.
- `affected_routes.json`: sivuston integraatiokohdat.

## Tarkistukset

Uuden mallimoduulin ja sen käyttämien biologisten osien 102 testiä läpäisi. Arkkitehtuurin ja uuden sivustoviennin 13 testiä läpäisi. Sivuston yhteisaltistus-, kuvaaja-, proxy-, navigaatio- ja rekisteritestien 111 testiä läpäisi. Ru360-profiilin erilliset 19 Python-testiä ja 28 käyttöliittymä-/karttatestiä läpäisivät. Lopullinen tuotantokäännös ja julkaisutarkistus kirjataan julkaisutietueeseen.
