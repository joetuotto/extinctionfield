# BERM: data-aukkorekisteri

Versio: 2026-09-03
Liittyy: [`data-lineage-audit.md`](data-lineage-audit.md) (mikä on rikki),
[`data-integration-plan.md`](data-integration-plan.md) (missä järjestyksessä korjataan)

Jokainen aukko kertoo, **mikä testi jää tekemättä**, ei vain mikä sarake puuttuu.
Prioriteetti on määritelty sen mukaan, kuinka monta tavoitearkkitehtuurin vaihetta
aukko estää:

```
E_ambient, E_personal, E_night, E_developmental → R_reproductive → Φ_couple → ASFR → TFR
```

| Prioriteetti | Merkitys |
|---|---|
| **P0** | Estää tavoitearkkitehtuurin kokonaisen vaiheen. Mikään myöhempi työ ei ole validoitavissa |
| **P1** | Estää alue-, kohortti- tai sentinellitestin |
| **P2** | Heikentää tarkkuutta tai läpinäkyvyyttä, ei estä testiä |

---

## P0 — estävät aukot

### ~~G-1 · ASFR-perustaso ei täsmää TFR:ään~~ · **SULJETTU 2026-08-19**
- **Oli:** `berm/data/asfr.py:17`, käsin kirjoitettu, rikkoi identiteetin `TFR = 5·ΣASFR/1000` 57/57 maassa, keskim. 30.8 %
- **Hankittu:** UN WPP 2024, Standard Projections, CSV. `WPP2024_Fertility_by_Age5.csv.gz` (82.9 MB) ja `WPP2024_Demographic_Indicators_Medium.csv.gz` (16.6 MB), CC-BY-3.0-IGO
- **Tuotettu:** `processed/fertility_asfr_region_age_year.csv` (250 509 riviä) ja `processed/fertility_tfr_region_year.csv` (35 787 riviä), molemmat sopimusvalidoituja. 237 maata, 1950–2100, 7 ikäryhmää
- **Tulos:** tilinpitojäännös keskim. **0.39 %**, 99.2 % maa-vuosista 2 %:n sisällä
- **Bonus:** WPP julkaisee 95 %:n ennustevälit projektiovuosille 2024–2100, joten sopimuksen vaatimat epävarmuusvälit tulevat aidosta lähteestä eikä keksittyinä
- **Rekisteröity:** `UN_WPP_2024_ASFR` ja `UN_WPP_2024_TFR`, molemmat `OPEN` tarkistussummin
- **Vartija:** `tests/test_wpp_asfr.py` (23 testiä), `tests/test_provenance.py::test_legacy_asfr_table_is_documented_as_diverging_from_the_acquired_source`
- **Jäljelle jää:** ASFR-reitin siirto uuteen lähteeseen. Legacy-taulukko on koskemattomana paikallaan sääntöjen 5 ja 10 mukaisesti

### G-2 · Monikanavaista henkilökohtaista FieldState–lisääntymispaneelia ei ole
- **Puuttuu:** samaan henkilöön ja aikaan kohdistettu vektori-, polarisaatio-, vaihe-, koherenssiaika-, verhokäyrä- ja elinsiirtomittaus sekä lisääntymispäätepiste. Käyttötunnit, kehon läheisyys, yökäyttö ja wearable-prevalenssi ovat tämän proxysyötteitä, eivät fysikaalinen annos.
- **Nykytila:** yksi globaali porrasfunktio (`exposure/personal.py:14`), ei ikää, ei sukupuolta, ei maata
- **Estää:** koko `E_personal`- ja `E_night`-kanavan. Ilman tätä `E_developmental` on ikäpainotettu integraali vakiosta
- **Ehdokaslähteet:** Eurobarometer / Eurostat ICT-kotitalouskyselyt (avoin, ikäryhmitelty); OFCOM Online Nation (avoin, UK); Pew Research mobile surveys (avoin, USA); kaupalliset paneelit (App Annie, Statista) — `ACCESS_REQUIRED`
- **Huom:** yksikään näistä ei mittaa RF-annosta. Ne mittaavat *käyttöä*. Annos vaatii dosimetrian
- **Työmäärä:** suuri. Väliratkaisu: siirrä nykyiset arvot `SCENARIO_PARAMETER`-luokkaan versioituun taulukkoon (tehty rekisterissä) ja pidä rajapinta korvattavana

### G-3 · RF-altistusta ei ole mitattu samaan biologiseen paneeliin
- **Puuttuu:** dosimetria tai validoitu kenttämittaus, joka voidaan liittää biologiseen päätetapahtumaan samalla ennalta määritellyllä (paikka, aika) -avaimella
- **Nykytila:** ANFR:n erillinen `measured_rf_site_time`-kerros sisältää 1 474 010 mitattua kiinteän anturin V/m-havaintoa 158 paikasta Ranskassa vuosilta 2020–2024. Se ei ole henkilö- tai eläinannos eikä sitä ole liitetty yhteenkään biologiseen päätetapahtumaan. Sentinellitiedostoissa RF on yhä merkkijono (`"low"`, `"high"`), ja ainoa laaja malliproxy on mobiililiittymät.
- **Estää:** jokaisen annos-vaste-väitteen, F4:n kokonaan, ja tekee kaikista lajikontrasteista tulkinnanvaraisia
- **Ehdokaslähteet:** kansalliset kentänvoimakkuusmittausrekisterit (Ofcom UK, BNetzA DE, ANFR FR, Traficom FI) — useimmat avoimia; OpenCellID / tukiasemarekisterit — avoin mutta epätäydellinen
- **Työmäärä:** suuri, mutta BNetzA:n ja ANFR:n aineistot ovat julkisia ja paikkatietoisia

### G-4 · Parity- ja ajoitusdataa ei ole lainkaan
- **Puuttuu:** ikä ensimmäisessä ja viimeisessä synnytyksessä, 1→2→3-siirtymät, syntymävälit, completed fertility, ikä ensimmäisessä unionissa
- **Nykytila:** ei mitään. Repossa ei ole yhtään parity-riviä
- **Estää:** erottelun **lykkääminen vs. lopullisesti toteutumatta jäänyt hedelmällisyys**. Ilman tätä TFR:n lasku on tulkinnaltaan monikäsitteinen, ja "biologinen kapasiteetti" ja "ajoituksen siirtymä" ovat erottamattomia
- **Ehdokaslähteet:** Human Fertility Database (avoin, rekisteröinti vaaditaan); Eurostat `demo_fasec`/`demo_find` (avoin); GGS (Generations & Gender Survey, rekisteröinti)
- **Työmäärä:** keskisuuri. HFD kattaa ~35 maata täydellä parity-rakenteella

---

## P1 — testin estävät aukot

### G-5 · Koira-aineisto on yksi laitos yhdessä maassa
- **Puuttuu:** monialueinen tai monimaainen koirasperma-paneeli, sama alue ja aika kuin ihmisen biomarkkerisarjalla
- **Nykytila:** `lea2016_dog_sperm.json` = Guide Dogs for the Blind, UK, 1988–2014, digitoitu kuvaajasta. `berm.data.sentinel_normalize` tuottaa siitä 92 provenanssilla varustettua kanonista riviä, mutta aineisto on yhä yksi SITE eikä sitä käytetä CSLI- tai ennustepolkuna.
- **Estää:** F1 (koira→ihminen-viive), F2 (koira vs. sosioekonominen), F5 (spatiaalinen johdonmukaisuus)
- **Ks.** [`sentinel-data-requirements.md`](sentinel-data-requirements.md)

### G-6 · Härkä-/karjuvertailulta puuttuu analyysikelpoinen pitkä kontrollipaneeli
- **Puuttuu:** vähintään viiden vuoden rivi- tai vuosi×asema-tason härkä-/karju-aineisto, jossa ovat mukana keräyspaikka ja -aika, jalostus- ja laboratorioprotokollat, olennaiset husbandry-kovariaatit sekä mitattu RF-altistus tai realistinen liitosavain siihen.
- **Nykytila:** `livestock_negative_control.json` sisältää edelleen **nolla havaintoa** — vain kolme sitaattia ja laadullisia merkkijonoja. Erillinen `FERNANDEZ_LOPEZ_2022_BOAR_BENCHMARK` on nyt hallussa (221 inseminaatiotapahtumaa, 36 ejakulaattia ja 98 020 CASA-soluriviä), mutta se on yksi asema ja neljä kuukautta vuonna 2017 ilman RF- tai ympäristökovariaatteja; se on siksi vain seminologinen benchmark, ei kontrollipaneeli.
- **Tarkistettu 2026-08-19:** Hensel et al. 2026:n PubMed-abstrakti vahvistaa julkaisutason luvut 47 757 härkäejakulaattia (1997–2019) ja 619 368 karjuejakulaattia (2005–2023), mutta niitä ei pidetä havaintopaneelina. Aiempi ristiriita on korjattu; puuttuvat yhä rivi-/vuosi×asema-taso, RF-altistus ja selektio-/protokollakovariaatit.
- **Estää:** F3, F4
- **Hankinta:** Wahl 2009, Karoui 2011 ja Hensel 2026:n varsinaiset aineistot ovat edelleen `ACCESS_REQUIRED`

### G-7 · Ihmisen biomarkkerisarja on rekonstruoitu, ei havaittu
- **Puuttuu:** Levine 2023:n tutkimustason liitetaulukko
- **Nykytila:** `sperm_by_country.json` toteaa itse, ettei maatason sarjaa ole julkaistu; arvot ovat rekonstruktioita. Ei luottamusväliä, ei n-lukua, ei pidättäytymisajan vakiointia
- **Estää:** minkä tahansa biomarkkerin käytön kalibrointikohteena. `stats/csli.py`:n lag-invarianssitesti ajaa tällä n=3 maalla ja raportoi CV 1.414
- **Rekisteröity:** `LEVINE_2023_SPERM_RECON`, `PROXY`, `ACCESS_REQUIRED`

### G-8 · Ei alakansallista altistus- eikä hedelmällisyysaineistoa
- **Puuttuu:** NUTS-2/3- tai vastaava taso sekä altistukselle että ASFR:lle
- **Nykytila:** ainoa alakansallinen aineisto koko repossa on 4 UK:n mehiläisaluetta, ja ne pudottavat EMF-liitoksessa koodin puuttuessa
- **Estää:** koko alueellisen analyysin (validointivaihe 5) ja F5:n
- **Ehdokaslähteet:** Eurostat `demo_r_frate3` (NUTS-3 hedelmällisyys, avoin); GHSL-väestöruudukko (avoin)

### G-9 · Kulttuurinen kysyntä on yksi additiivinen luku
- **Puuttuu:** `fertility_intentions`, `ideal_family_size`, `contraceptive_prevalence`, `unmet_need`, `marriage_rate`, `age_at_first_union`, koulutus, työllisyys, asuminen, lastenhoito, perhepolitiikka
- **Nykytila:** `CULTURAL_PRONATALISM`, staattinen skalaari maata kohti, ulottuu arvoon +5.5. 32/54 merkitty "auto-generated" ilman menettelyä
- **Estää:** `D_{a,c,t}`-kysyntätilan kokonaan. Nykymuodossa kulttuuri on jäännöstermi, ei mallinnettu suure
- **Ehdokaslähteet:** DHS Program (avoin, rekisteröinti); UN World Contraceptive Use (avoin); Eurobarometer fertility intentions (avoin); OECD Family Database (avoin)

### G-10 · ART-ilmiö tunnetaan, mutta havaintokerrosta ei ole integroitu
- **Puuttuu:** `art_outcomes_age_year` — sykli-, siirto-, syntymä- ja ikäjakaumat erikseen
- **Nykytila:** `IVF_SHARES` × lineaarinen 0.5 pp/v -ekstrapolaatio, käytetään kertoimena `observed × (1 − ivf)`
- **Estää:** tavoitearkkitehtuurin nelijaon `spontaani fecundability / ART-kysyntä / ART-tulos / ART-syntymät`
- **Ehdokaslähteet:** CDC ART Surveillance (avoin, USA); ESHRE EIM-raportit (avoin PDF, poiminta vaaditaan); HFEA (avoin, UK)

### G-11 · TTP-, keskenmeno- ja kuolleena syntymisen dataa ei ole integroitu
- **Puuttuu mallisyötteistä:** `time_to_pregnancy`, `infertility_prevalence`, `miscarriage`, `stillbirth`
- **Nykytila:** ilmiöistä ja erillisistä kohorteista on kirjallisuutta, mutta repossa ei ole yhteiseen avain- ja provenienssisopimukseen muunnettua paneelia. Kyse on integraatioaukosta, ei väitteestä ettei tutkimustietoa olisi.
- **Estää:** vaiheen 6 kolmesta valitusta välituloksesta kaksi. Ilman näitä `R_reproductive` ei kytkeydy yhteenkään mitattuun päätetapahtumaan
- **Ehdokaslähteet:** WHO infertility prevalence -raportit (avoin); kansalliset syntymärekisterit; Euro-Peristat (avoin)

---

## P2 — tarkkuus- ja läpinäkyvyysaukot

| Tunnus | Aukko | Nykytila | Korjaus |
|---|---|---|---|
| G-12 | Väestötiheydellä ei ole vuosiulottuvuutta | `COUNTRY_PARAMS` staattinen; 1995 ja 2050 sama tiheys | GHSL-ruudukko + `SP.URB.TOTL.IN.ZS` (jo ladattu, ei luettu) |
| G-13 | 47/57 maata putoaa `NUTRITION_PROFILES`-oletukseen hiljaisesti | `v16.py:483` | Joko kattavuus tai eksplisiittinen varoitus; ei hiljaista oletusta |
| G-14 | Maahanmuutolla ei ole ikä- eikä sukupolvirakennetta | `MIGRATION_DATA`, vakio kaikille vuosille | `migration_generation_fertility`; Eurostat `demo_faeduc`, kansalliset rekisterit |
| G-15 | 2G–5G-sukupolvet ovat käsin kirjoitettuja, ja haku on kuollutta koodia | `TECH_DIFFUSION` + `personal.py:81–91` | GSMA Intelligence (`ACCESS_REQUIRED`); tai poista kuollut koodi ja merkitse rehellisesti oletukseksi |
| G-16 | Epävarmuusvälejä ei ole käytännössä millään syötteellä | koko `countries.py` | Sopimus vaatii ne `SCENARIO_PARAMETER`-riveiltä; laajenna kaikkiin |
| G-17 | `berm/data/itu.py` ei toimi (Parquet ilman `pyarrow`) eikä sitä kutsuta | `itu.py:73` | Joko lisää `pyarrow` valinnaiseksi riippuvuudeksi tai vaihda CSV:hen |
| G-18 | Kaupungistumisilmiö tunnetaan, mutta `urban_by_country_year.csv` (17 160 riviä) ei ole kytketty malliin | `data/processed/` | Kytke eksplisiittiseen kysyntä-/altistusreittiin tai poista jäsennys; integraatioaukko, ei kirjallisuusaukko |
| G-19 | Kaksi eri lajibiologiataulukkoa eri arvoilla | `csli/species_data.py:27` vs. `stats/csli.py:258` | Yksi lähde totuudelle |
| G-20 | Mehiläisilmiö tunnetaan, mutta ajallisesti kohdistettu monisyypaneeli puuttuu | `coloss_winter_loss.json` | Varroa, patogeenit, torjunta-aineet, ravinto, sää, maankäyttö sekä mitattu RF. MUST-B:stä hallussa oleva 7 tarhapaikan ja 453 kasvipolygonin paikkakonteksti ei sisällä näitä vasteita tai ajallista biologista kovariaattipaneelia. |

---

## Hankintajärjestys

Riippuvuudet huomioiden:

1. ~~**G-1** (WPP ASFR)~~ — **valmis 2026-08-19**
2. **G-4** (parity, HFD) — avoin, avaa lykkäys/toteutumattomuus-erottelun
3. **G-8** (Eurostat NUTS-3) — avoin, avaa alueellisen tason, jota G-3 ja G-5 tarvitsevat
4. **G-9** (kysyntädata) — avoin, poistaa jäännöstermin
5. **G-3** (kohdistettu kenttämittaus + biologinen paneeli) — ANFR:n mitattu kerros on nyt hallussa, mutta ilman samaan paikkaan ja aikaan sidottua biologista asetelmaa mikään annos-vaste ei ole testattavissa
6. **G-2** (henkilöaltistus) — osin avoin, osin `ACCESS_REQUIRED`
7. **G-10, G-11** (ART, TTP) — avoin, mutta poiminta PDF:istä
8. **G-5, G-6, G-7** (sentinellit) — vaativat joko julkaisijalupaa tai uutta aineistonkeruuta

Kohdat 1–4 ovat kaikki avoimia aineistoja, jotka voi hakea ilman lupaa, ja ne yhdessä
poistavat neljä P0/P1-estettä. **Tämä on suositeltu ensimmäinen työjakso.**
