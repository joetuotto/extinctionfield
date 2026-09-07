# BERM/DKC — aineistohaun ja testauksen auditointiprotokolla

**Versio:** 1.0  
**Päiväys:** 2026-09-04  
**Soveltamisala:** DKC-rekisterin V1–V25-pisteiden aineistohaku, seulonta,
poiminta, analyysi, mallivertailu ja julkaisuportti.

## 1. Periaate

Täydellistä vinoumattomuutta ei voida todistaa booleanilla. Tässä protokollassa
"ilman biasia" tarkoittaa, että ennalta ehkäistävät vinoumat estetään
rakenteellisesti, jäljelle jäävät riskit arvioidaan symmetrisesti ja kaikki
päätökset ovat jäljitettävissä alkuperäiseen hakuun ja lukittuun analyysiin.

Protokolla noudattaa neljää erottelua:

1. V-pisteen rekisteröity kriteeri joko täyttyy tai ei täyty.
2. Tulos voi olla BERM:n, konventionaalisen mallin ja nollamallin yhteinen.
3. Yhteensopivuus ei ole sama asia kuin erottelukyky tai mallin validointi.
4. Menetelmäauditin läpäisy ei muuta tieteellistä FAIL-tulosta PASS-tulokseksi.

Menetelmäpohjana ovat [PRISMA 2020](https://www.prisma-statement.org/prisma-2020),
[PRISMA-S](https://www.prisma-statement.org/prisma-search), Cochranen
[haku- ja valintaohje](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-04)
sekä tuloskohtainen
[risk-of-bias-ohje](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-08).
Protokollan julkinen aikaleimattu lukitus voidaan tehdä esimerkiksi
[OSF-rekisteröinnillä](https://help.osf.io/article/330-welcome-to-registrations).

## 2. Pakollinen Lindgren-first-portti

Ennen ensimmäistä hakua jokaiselle testattavalle V-pisteelle kirjataan:

- täsmällinen L0-premissi ja käytetty Lindgren-versio;
- kyseisessä testissä aidosti johdettu L1-suure;
- mahdollinen L2-kytkentä ja sen tila (`JOHDETTU`, `EMERGENTTI`, `TUOTU`,
  `AVOIN`);
- L3-mekanismi ja L4-päätepiste erillisinä komponentteina;
- BERM-ennuste, konventionaalisen mallin ennuste ja nollaennuste samalla
  tarkkuudella;
- ominaisuus, joka erottaisi mallit toisistaan.

Jos testissä ei mitata avointa L2-kytkentää, tulos ei saa siirtyä todistamaan
sitä. Jos sama tulos seuraa tavallisesta EMF-, biologisesta tai demografisesta
mallista, `modelComparison` on `NON_DISCRIMINATING`, vaikka V-pisteen oma
kriteeri täyttyisi.

## 3. Protokollan lukitus ennen aineistoa

`protocol`-osa viimeistellään ennen hakua ja sisältää vähintään:

- tutkimuskysymyksen ja suunnitellut V-pisteet;
- sisään- ja poissulkukriteerit;
- vähintään kaksi eri riippumattomuusryhmään kuuluvaa lähdejärjestelmää;
- bibliografisen tietokannan sekä tutkimusrekisterin, primääridatan tai
  virallisen tilastolähteen;
- jokaisen lähteen täsmällisen hakulausekkeen;
- riippumattoman informaatioasiantuntijan hakustrategiakatselmuksen ja siihen
  annetun vastineen;
- haun päättymissäännön;
- puuttuvan datan, monivertailun ja herkkyysanalyysien suunnitelmat;
- BERM-, konventionaalisen ja nollamallin ennusteet;
- saman päätöskynnyksen kaikille malleille;
- seitsemän yhteistä risk-of-bias-aluetta;
- automaation tai kielimallin käytön sekä ihmistarkastuksen rajat.

Täsmälliset kyselyt ovat `directionAgnostic=true`: hakulausekkeeseen ei lisätä
"harm", "benefit", "supports" tai vastaavaa tuloksen suuntaa, ellei samaa
suuntapeittoa toteuteta eksplisiittisesti ja symmetrisesti.

Protokollasta lasketaan sisältötiiviste:

```bash
PYTHONPATH=berm python3 berm/audit_evidence_bundle.py digest protocol.json
```

Saatu SHA-256 lisätään kenttään `protocolDigestSha256`, protokolla talletetaan
aikaleimattuun muuttumattomaan paikkaan ja sama tiiviste kopioidaan
`execution.protocolDigestSha256`-kenttään. Protokollan muuttaminen tämän jälkeen
on poikkeama, ei alkuperäisen suunnitelman hiljainen päivitys.

## 4. Aineistohaku

1. Suorita jokainen lukittu hakustrategia.
2. Tallenna tietokanta, täsmällinen kysely, suoritusaika, osumamäärä ja
   muuttamattoman raakaviennin SHA-256.
3. Hae myös tutkimusrekisterit, julkaisemattomat tulokset, viralliset
   tietoaineistot, korjaukset ja takaisinvedot soveltuvin osin.
4. Ryhmitä useat raportit yhden tutkimuksen alle. Tutkimus, ei artikkeli, on
   analyysin yksikkö.
5. Raportoi PRISMA-virta: tunnistetut, poistuneet duplikaatit, seulotut,
   kokotekstinä arvioidut ja sisällytetyt.
6. Älä lopeta hakua suotuisaan tulokseen. Lopeta vain lukitun päättymissäännön
   täytyttyä.

## 5. Seulonta ja poiminta

- Vähintään kaksi arvioijaa seuloo riippumattomasti.
- Kelpoisuuspäätös tehdään näkemättä tuloksen suuntaa aina kun aineisto sen
  sallii (`outcomeBlindEligibility=true`).
- Jokainen kokotekstipoissulku saa yksilöllisen syyn.
- Kaikki poiminnat ja poissulut varmennetaan ihmisen toimesta; automaatio saa
  avustaa, ei tehdä lopullista julkaisupäätöstä.
- Pakolliset poimintakentät ovat altistus/prediktori, vertailu, päätepiste,
  efektikoko, epävarmuus, rahoitus, sidonnaisuudet ja esirekisteröinti.
- Tukevat, ristiriitaiset, sekoittuneet ja nolla-/epäselvät tulokset säilytetään.

## 6. Symmetrinen risk-of-bias-arvio

Jokaiselle sisällytetylle tulokselle arvioidaan samat alueet:

1. valikoituminen;
2. altistuksen tai prediktorin mittaus;
3. lopputuloksen mittaus;
4. sekoittuminen;
5. puuttuva data;
6. valikoiva raportointi;
7. rahoitus ja sidonnaisuudet.

Arvio on `LOW`, `SOME_CONCERNS`, `HIGH` tai `NO_INFORMATION`, ja jokainen arvio
saa kirjallisen perustelun. Biasin suunta kirjataan vain silloin, kun sille on
konkreettinen kausaalinen tai tilastollinen perustelu. Muuten se on
`UNPREDICTABLE`. Risk-of-bias-arvio tehdään tulokselle, ei tutkijaryhmän,
julkaisukanavan tai teorian maineelle.

Samaa evidenssikynnystä käytetään BERM:lle ja kilpailijoille. Proksimittauksen,
kontrollikontaminaation tai sekoittajan vaikutus arvioidaan samalla tavalla
riippumatta siitä, ketä havaittu suunta suosii. Mitään oletettua biasia ei
automaattisesti vähennetä tai lisätä efektikokoon.

## 7. Analyysi ja päätös

Jokaisen V-pisteen tulostietueessa on:

- `PASS` tai `FAIL` ja sanallinen syy;
- käytettyjen sisällytettyjen tutkimusten tunnisteet;
- kolme ennustetta: BERM, konventionaalinen ja nolla;
- `modelComparison` ja `discriminatingPower`;
- efektikoko ja epävarmuus;
- analyysiartefaktin SHA-256;
- risk-of-bias-arvion integrointi;
- vastakkaisen evidenssin haun vahvistus;
- herkkyysanalyysit;
- kaikki protokollapoikkeamat.

`PASS` tarkoittaa vain, että lukittu V-pistekriteeri täyttyi. Se ei yksin tarkoita
BERM:n validointia. `FAIL` sisältää myös riittämättömän tai puuttuvan aineiston;
puuttuvaa arviointia ei koskaan muuteta PASS-tulokseksi.

## 8. Ohjelmallinen portti

Valmis bundle tarkistetaan:

```bash
PYTHONPATH=berm python3 berm/audit_evidence_bundle.py validate evaluation-bundle.json
```

Tarkistin hylkää muun muassa:

- protokollan tiivisteen jälkikäteisen muutoksen;
- ennen lukitusta alkaneen haun;
- rekisteröimättömän tai puuttuvan haun;
- tuloksen suuntaan rajatun hakustrategian;
- yhden arvioijan seulonnan;
- puuttuvan konventionaalisen tai nollamallin;
- epäsymmetriset bias-alueet;
- perustelemattomat poissulut;
- yhteensopimattoman PRISMA-virran;
- PASS-tuloksen ilman sisällytettyä evidenssiä;
- puuttuvan analyysitiivisteen, epävarmuuden tai herkkyysanalyysin.

Vasta tämän jälkeen julkaisuartefakti voidaan luoda:

```bash
PYTHONPATH=berm python3 berm/export_dkc_framework.py \
  --evaluation-bundle evaluation-bundle.json
```

Julkaisu sallitaan vain, kun sekä kaikki V1–V10 ovat PASS että
`protocolAudit.passed=true`. Pelkkä `{ "V1": { "result": "PASS" } }` -tiedosto
ei enää voi avata porttia.

## 9. Raportointimuoto

Jokaisen analyysin yhteenveto esitetään näin:

| Kenttä | Sisältö |
|---|---|
| Rekisteröity V-piste | Tunniste ja muuttumaton kriteeri |
| BERM-ennuste | Polku, suure ja vasteen muoto |
| Konventionaalinen ennuste | Sama tarkkuus ja päätöskynnys |
| Nollaennuste | Etukäteen määritelty |
| Tulos | Efektikoko ja epävarmuus |
| V-pistepäätös | PASS/FAIL + syy |
| Mallivertailu | Kumpi malli ennusti paremmin vai ei erottelua |
| Erottelukyky | HIGH/MODERATE/LOW/NONE |
| Risk of bias | Kaikki alueet, perustelut ja mahdollinen suunta |
| Ristiriitainen evidenssi | Sisällytetty, ei selitetty pois |
| Poikkeamat | Kaikki lukitusta suunnitelmasta tehdyt muutokset |

Tämä rakenne estää sekä BERM-myönteisen valikoinnin että konsensusmallin
automaattisen etuoikeuttamisen. Se ei takaa, ettei arvioijilla ole vinoumia;
se tekee niiden vaikutusreitit näkyviksi ja tarkistettaviksi.
