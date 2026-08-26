# Kerrostumamalli — DEFINITIVE-ohje

**Versio:** 2026-08-26
**Tunnisteet käytössä:** [KOODI]
**Konteksti:** Etusivun osio 5A¾ + Model-sivun layered-exposure-model-ankkuri

---

## MIKSI TÄMÄ ON MERKITTÄVÄ

Kerrostumamalli (Layered Exposure Model) on BERM:n selittävin yksittäinen konsepti. Se vastaa viiteen anomaliaan, joihin perinteiset selitykset eivät vastaa. Ilman kerrostumista EMF-altistuksen vaikutusten ajoitus ja maantieteellinen leviäminen jäävät selittämättä.

---

## VIISI ANOMALIAA

### 1. Amerikkalaiset syövät vähemmän mutta painavat enemmän
- **Fakta:** USDA-data osoittaa kalorien saannin tasaantuneen/laskeneen 2000-luvulla
- **Perinteinen selitys:** Ei selitystä — "kalorit sisään, kalorit ulos" ei toimi
- **Kerrostuma:** WiFi (1999) + 3G/4G + LED (2009) lisäsivät kumulatiivista Ca²⁺-kuormaa → metabolinen häiriö

### 2. Nuorten mielenterveyskriisi alkoi 2012, ei 2003
- **Fakta:** Some syntyi 2003 (MySpace/Facebook) — ei kriisiä. Kriisi alkoi 2012.
- **Perinteinen selitys:** "Sosiaaliset vertailut" — mutta miksi vasta 9 vuotta myöhemmin?
- **Kerrostuma:** 2012 = smartphone 50% adoption teineillä + EU:n hehkulamppukielto (2009–2012) → jatkuva kehokontakti-RF + IF-kerros LED:istä. CaMKII-kynnys ylittyi.

### 3. T2D kiihtyi COVID-sulkujen aikana
- **Fakta:** Liikunta ei lisääntynyt, mutta T2D-insidenssit kasvoivat
- **Perinteinen selitys:** Stressi, terveydenhuollon viiveet
- **Kerrostuma:** Kotona vietetty aika kasvoi → WiFi-altistus 24/7 + LED-valaistus koko valveillaoloaika → IF + RF -kerrokset kasvoivat

### 4. Kehitysmaat seuraavat samaa trajektoria 15–30 vuotta myöhässä
- **Fakta:** Intia, Indonesia, Nigeria — samat trendit, mutta 1–2 teknologiasukupolven viiveellä
- **Perinteinen selitys:** "Modernisaatio" (kehämäinen selitys)
- **Kerrostuma:** Teknologiakerrokset saapuvat järjestyksessä — ensin sähköverkko, sitten radio, sitten matkapuhelimet. Kukin maa kokee saman kerrostumisen eri vuosikymmenellä.

### 5. Amishit ovat immuuneja
- **Fakta:** Old Order Amish TFR 6.1, lähes nolla lihavuutta, T2D, autismia
- **Perinteinen selitys:** "Elämäntapa, ruokavalio, yhteisö"
- **Kerrostuma:** Amishit hylkäävät sähköverkon, Wi-Fin, älypuhelimet, LED:t — kerroksia 0–1 viiden sijaan. TFR vastaa 1960-luvun länsimaista tasoa ennen laajamittaista kerrostumista.

---

## KERROSTUMISPERIAATE

```
Kokonais-Ca²⁺-kuorma = Σ(kerros_i × altistusaika_i × χ_tissue)
```

Jokainen teknologiasukupolvi lisää EMF:ää olemassa olevien kerrosten PÄÄLLE, ei korvaa niitä:

1. **Sähköverkko** (1880–) primaa solut: jatkuva 50/60 Hz ELF pitää VGCC-kanavia osittain auki
2. **WiFi** (1999–) lisää piilotetun ELF-komponentin: 10 Hz beacon on ELF-taajuudella
3. **LED-valaistus** (2009–) avaa IF-kanavan: >100 kHz PWM-ohjaus
4. **Älypuhelimet** (2007–) tuovat jatkuvan kehokontakti-RF:n
5. **IoT** (2015–) nostaa tausta-RF-tasoa kumulatiivisesti

**Kynnysperiaate:** Yksikään kerros yksinään ei välttämättä ylitä CaMKII:n autofosforylaatiokynnystä. Mutta kerrosten YHDISTELMÄ ylittää sen — ja tämä selittää, miksi yksittäisten teknologioiden tutkimuksissa tulokset ovat ristiriitaisia ("joskus löytyy, joskus ei").

---

## TEKNOLOGIAKRONOLOGIA JA EPIDEMIA-AJOITUS

| Vuosi | Teknologia | Terveysvaste (viive 10–30 v) |
|-------|-----------|------------------------------|
| 1880 | AC-sähköverkko | — |
| 1920 | AM-radio | — |
| 1945 | Tutka + FM | — |
| 1960 | Loisteputket yleistyvät | Siittiökato alkaa ~1973 |
| 1983 | 1G-matkapuhelimet | Lihavuusepidemia ~1990 |
| 1999 | WiFi standardoituu | T2D-kiihtyminen ~2000 |
| 2007 | iPhone / smartphone | Autismispektrin kasvu |
| 2009 | EU hehkulamppukielto alkaa | Nuorten mielenterveysaallot ~2012 |
| 2019 | 5G | Ennusteet BERM v17:ssa |

---

## RISTIVIITTAUKSET

- **Etusivu:** Osio "Viisi anomaliaa, jotka vain kerrostuminen selittää" (fiveAnomalies*)
- **Model-sivu:** Ankkuri `#layered-exposure-model`
- **Evidence-sivu:** Teknologia-aikajana ja lighting transition
- **BermMasterInfographic:** LAYERS-data (5 pinotun alueen kerrostumat)

---

## EPISTEEMINEN HUOMAUTUS

Kerrostumismalli on BERM:n oma konstruktio. Se ei ole suoraan peräisin yhdestäkään yksittäisestä tutkimuksesta, vaan synteesi kolmesta havainnosta:
1. EMF-vaikutustutkimusten epäjohdonmukaisuus (yksittäinen taajuus vs kumulatiivinen)
2. Epidemioiden ajallinen korrelaatio teknologiasukupolvien kanssa
3. Amish-poikkeama kontrollina
