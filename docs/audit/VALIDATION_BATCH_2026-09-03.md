# BERM-validointierä — 2026-09-03

**Tyyppi:** empiirinen vastakkainasettelu (blokit 2–4, 6)
**Metodi:** 30+ rinnakkaista tutkimusagenttia; DOI:t tarkistettu Crossref-API:lla; WB-data haettu suoraan API:sta; kaikki numerot agenttien alkuperäisistä lähteistä, ei muistista.
**Lähdesessio:** `839702d6` (2026-09-02 illasta, keskeytyi konteksti-ikkunan ja rate-limitin täyttyessä klo ~22:26).

---

## Yhteenveto: 1 + 1 + 3

Tämä on laaja ja mallin kannalta ratkaiseva erä:
- **1 selkeä falsifikaatio** (empiirisen mallin kattoluku kumottu)
- **1 onnistunut ennakkokielto** (pronatalismi 8/8)
- **3 johtamisvirhettä** (virhe ennusteen johdossa, ei datassa)

Lisäksi merkittäviä vahvistavia löydöksiä ja uusia diskriminoivia testejä.

---

## F: FALSIFIKAATIO — Empiirisen mallin katto 5,66 kumottu

**Kohde:** TFR-kaava `TFR = 4,11·exp(−54·EMF_index) + 1,55`, jossa nolla-altistuksen katto = 4,11 + 1,55 = **5,66**.

**Data:**
| Väestö | Lähde | TFR | Ylitys |
|---|---|---|---|
| Amissit (jaksollinen) | Anderson & Thiehoff 2025, Pop Studies 80(2), DOI 10.1080/00324728.2025.2592576 | **6,1** | +0,44 |
| Amissit (loppuunsaatettu) | sama | **7,2** | +1,54 |
| Hutteriitit | Sato ym. 1994, Human Biology 66(3) | **8,56–10,9** | +2,9–5,2 |

**Miksi falsifikaatio:** Malli on sovitettu 54 maahan, joista yhdelläkään EMF_index ei ole ≈ 0. Vakiotermi 4,11 on puhtaasti ekstrapoloitu. Amissit ja hutteriitit tarjoavat puuttuvan ankkuripisteen, ja ne ylittävät katon yksiselitteisesti.

**Mallimuutos:** Vakiotermi 4,11 on nostettava tai funktiomuoto vaihdettava. Nolla-altistuksen TFR on ≥ 6,1 (jaksollinen) ja historiallisesti 8–11 (loppuunsaatettu). Ratkaistuna nykyisellä kaavalla EMF_index olisi −0,0019 (mahdoton).

**Episteeminen taso:** E (julkaistuista rekistereistä, N = 263 158 henkeä / 50 065 taloutta).

---

## E: ENNAKKOKIELTO — Pronatalismi 8/8 alle korvaustasolle

**BERM:n ennuste:** Politiikka subventoi preferenssiä; sitova rajoite on kapasiteetti. Siis: lyhyt nousu (tempo), ei pysyvää quantum-nousua, ei kertaakaan korvaustasoa 2,1.

**Data (WB SP.DYN.TFRT.IN, API-haku):**
| Maa | Politiikka | Ennen | Huippu | 2024 | Nousu kesti |
|---|---|---|---|---|---|
| Unkari | Orbán 2011– | 1,23 | **1,63** (2021) | 1,41 | 10 v |
| Ranska | pitkä perinne | 2,03 | 2,03 (2010) | **1,61** | — (−0,42) |
| Viro | vanh.etuus 2004 | 1,36 | 1,72 (2010) | **1,18** | 6 v |
| Etelä-Korea | perussuunn. 2006– | 1,48 | — | **0,75** | ei nousua |
| Japani | Angel Plan 1994– | 1,26 | 1,45 (2015) | **1,15** | 10 v |
| Puola | Rodzina 500+ 2016 | 1,22 | 1,48 (2017) | **1,14** | 1 v |
| Venäjä | äitiyspääoma 2007 | 1,20 | **1,78** (2015) | 1,42 | 8 v |
| Singapore | Baby Bonus 2001– | 1,60 | — | **0,97** | ei nousua |

- **0/8 saavutti korvaustason 2,1.**
- Viro (1,18 < 1,36) ja Puola (1,14 < 1,22) ovat nyt alle politiikkaa edeltäneen lähtötason.
- Etelä-Korea käytti ~270 mrd USD vuodesta 2006 ja TFR puolittui.
- Synkroninen romahdus 2021→2024: 8/8 maa laskussa, keskimäärin −0,188 (−13 %).

**Tukevat lähteet:**
- Spéder & Kapitány 2014, Pop Res Pol Rev 33(3):393–418, DOI 10.1007/s11113-013-9313-6 — "failure to realize fertility intentions"
- Beaujouan 2024, European Sociological Review — Suomi/UK/Itävalta: 46–56 % haluaisi kaksi lasta, vain 33–45 % saa

**Episteeminen taso:** E (primääridata, kaikki 8 maata, kaikki trendit samansuuntaiset).

---

## J1: JOHTAMISVIRHE — IVF: väärä nimittäjä

**BERM:n alkuperäinen ennuste:** IVF-tulosten pitäisi laskea kun tekninen paraneminen netotetaan pois.

**Data — kolme eri nimittäjää, kolme eri vastausta:**
| Nimittäjä | Trendi | Valikointi |
|---|---|---|
| Per siirretty alkio (HFEA UK) | 18 % → 24 % (2012→2022) **NOUSEE** | maksimaalinen (PGT + blastokystiviljely) |
| Per punktio (ESHRE 2020, DOI 10.1093/humrep/deaf179) | ~22 % **TASAINEN** | kohtalainen |
| Per aloitettu sykli (Gleicher ym. 2021, DOI 10.1186/s12958-021-00793-2) | 30,2 % → 22,2 % (2010→2016, p < 0,0001) **LASKEE −26,5 %** | minimaalinen |

**Luovuttajamunasolut (puhtain signaali):**
- Braun ym. 2024, DOI 10.1016/j.fertnstert.2024.07.004: 135 085 siirtoa 2013–2020. **Tasainen tai hieman nousussa.**
- ESHRE 2020: luovutusraskausluku 51,3 % vs. 50,5 % — **nousussa.**

**Miksi johtamisvirhe:** Luovuttajamunasolut ovat BERM:n puhtain testi (nuori luovuttaja, vakioitu ikä ja protokolla), ja ne antavat negatiivisen tuloksen. HFEA:n nouseva luku on valikoinnin mittari, ei gameettien laadun. Ennuste käytti väärää nimittäjää. **Data ei ole ristiriidassa — ennusteen johtaminen oli virheellinen.**

**Mallimuutos:** Poista munasolujen laadun laskuväite kunnes euploidia-aste vakioidussa äidin iässä on tarkastettu PGT-A-datasta. Rajaa väite per-aloitettu-sykli-autologisiin tuloksiin.

---

## J2: JOHTAMISVIRHE — Siittiöt: universaali lasku vs. parametrikohtainen gradientti

**BERM:n alkuperäinen ennuste:** Universaali siemennesteen lasku.

**Data:**
- Levine ym. 2023, DOI 10.1093/humupd/dmac035: SC −51,6 % globaalisti, **mutta SAA marginaalinen** (p = 0,045; TSC p = 0,133).
- Liu ym. 2020, DOI 10.1038/s41598-020-67707-x: Henan, SC 62→32, −3,9 %/v.
- Huang ym. 2017, DOI 10.1016/j.fertnstert.2016.09.035: Hunan, hyväksyttyjen luovuttajien osuus 55,78 % → 17,80 %.

**Nollatulokset (ristiriitaiset):**
- Ramírez ym. 2022, DOI 10.1007/s10815-022-02458-4: Argentiina N = 23 130, selkeä nolla.
- Etelä-Intia N = 12 151, 2006–2022: tasainen.
- Dama & Rajender 2012, DOI 10.2164/jandrol.111.015057: Intia N = 19 734, **nousi**.
- **Tanska: ei ole koskaan laskenut** (Lassen ym. 2024, DOI 10.1093/humrep/deae115; nousi 1977–95, tasainen 1996–2016).

**Eläinsentinellit (vahvin löydös):**
- Harris ym. 2023, DOI 10.1530/REP-22-0490: orien liikkuvuus **−33,5 %** 1984–2019; läntinen/ei-läntinen gradientti ~2×.
- Lea ym. 2016, DOI 10.1038/srep31281: UK:n koirat 26 v lasku.

**Miksi johtamisvirhe:** Malli ennusti universaalia laskua kaikissa parametreissa, mutta **liikkuvuus ja morfologia laskevat paljon johdonmukaisemmin kuin konsentraatio**. Tanska, Argentiina ja Etelä-Intia ovat puhtaita nollatuloksia konsentraatiossa. Ennuste oli liian laaja. Data ei kumoa mallia — data kertoo, että malli ennustaa väärää endpointia.

**Mallimuutos:** Vaihda ensisijainen endpoint konsentraatiosta liikkuvuuteen/morfologiaan. Lopeta universaalin ihmislaskun väittäminen. Eläinsentinellit ovat vahvin tuki (ei koulutus-, älypuhelin-, lykkäys- tai stressiselitystä), mutta niiden tulkinnassa on huomioitava EDC-rehusekoittaja.

---

## J3: JOHTAMISVIRHE — Puberteetti: testaamaton ennuste esitetty tuettuna

**BERM:n alkuperäinen ennuste:** Pathway C (melatoniini) → puberteetin aikaistuminen seuraa altistusgradienttia.

**Data (mitä on selitettävä):**
- Aksglaede ym. 2009, DOI 10.1542/peds.2008-2491: Kööpenhamina N = 2 095, telarke −1,02 v / 15 v **ilman LH/FSH-nousua ja matalammalla estradiolilla**. **BMI-vakioinnin jälkeen säilyi.**
- Wang ym. 2024, DOI 10.1001/jamanetworkopen.2024.12854: N = 71 341, **54 % jää selittämättä** BMI-mediaation jälkeen.
- Uğurlu ym. 2023, DOI 10.3389/fendo.2023.1190445: rotat, sininen valo, puberteetti 38→28 pv **FSH/LH/T muuttumatta**; melatoniini r = −0,537.

**EMF-gradientti:**
- **Nolla tutkimusta** — ei yhtään tutkimusta, jossa RF/ELF/EMF × puberteetin ajoitus. SCAMP ja HERMES mittaavat puberteettimerkkejä mutta käsittelevät niitä sekoittajana, eivät lopputuloksena.
- Eskander ym. 2012, DOI 10.1016/j.clinbiochem.2011.11.006: **ei N:ää, ei arvoja, ei p-arvoja; raportoitu suunta on hormonien vaimeneminen** = poispäin puberteetin aikaistumisesta. Ei saa käyttää tukena.

**Miksi johtamisvirhe:** BERM johti ennusteen mekanismista (CRY → melatoniini → HPG), mutta ennustetta ei ole koskaan testattu. Se ei ole "kumottu" — se on **testaamaton**. Ainoa siteerattu evidenssi (Eskander) ei kanna painoa. Anomalia on olemassa (telarke–gonadotropiini-dissosiaatio) ja sinivalorottamalli toistaa sen, mutta EMF-kenttäattribuutio on puhdas hypoteesi.

**Mallimuutos:** (1) Poista kaikki EMF–puberteetti-väitteet ja Eskander-viittaus. (2) Merkitse pathway C:n puberteettihaara hypoteesiksi (H). (3) Kirjaa SCAMP/HERMES-uudelleenanalyysi tutkimusehdotuksena — se on yksittäinen halvin testi koko BERM-ohjelmassa.

---

## Vahvistavat löydökset (eivät vaadi mallimuutosta)

### V1: Eläinsentinellit poistavat käyttäytymisselitykset
- Oriiden liikkuvuus −33,5 % (Harris 2023); koirien siemenneste 26 v lasku (Lea 2016). Eläimillä ei ole koulutussiirtymää, älypuhelimia, lykättyä vanhemmuutta eikä stressiä. Läntinen/ei-läntinen gradientti ~2×.

### V2: Testosteronin kohorttiefekti BMI:n netotuksen jälkeen
- Mazur ym. 2013, DOI 10.1371/journal.pone.0076178: **−19 % / 20 v painostabiileissa/laihtuneissa** (N = 991, 6 mittauskierrosta).
- Perheentupa ym. 2013, DOI 10.1530/EJE-12-0288: Suomi N = 3 271, **−37 %** kohorttien välillä BMI-vakioituna.
- Chodick ym. 2020, DOI 10.1186/s12958-020-00575-2: Israel N = 102 334, yksi laboratorio, **−9,8 % / 10 v**, BMI muuttumaton.
- **Varauma:** Andersson ym. 2007, DOI 10.1210/jc.2006-2633: Tanska, **vapaa T: nollatulos** BMI-vakioinnin jälkeen.

### V3: Sharpen konundrum — EDC-jäännös
- Sharpe 2024, DOI 10.1093/humrep/deae143: "ftalaattipitoisuudet epidemiologisissa tutkimuksissa ovat tuhatkertaisesti alhaisemmat kuin ne, joita tarvitaan sikiön androgeenituotannon vaimentamiseen rotissa"; "This conundrum is unexplained."
- NHANES: klassiset anti-androgeeniset ftalaatit (MEP −42 %, ΣDEHP −37 %) laskivat 2001–2010 samalla kun siittiömäärät laskivat (Zota ym. 2014, DOI 10.1289/ehp.1306681).
- BTB:n läpäisevyyttä RF-altistuksessa ei ole koskaan mitattu (systemaattinen haku Europe PMC:stä).

### V4: Matkapuhelinviive: mitattu profiili
- Hudson & Moscoso Boedo 2026 (työpaperi): 3 133 piirikuntaa, viiveprofiili φ₃ > φ₂ > φ₁ > φ₀ (kasvaa monotonisesti), kointegraation puoliintumisaika 1,7 v. **Mittari on peitto, ei käyttö** — ambient-annosmuuttuja.
- Myers & Hooper, NBER WP 35310 (2026): iPhonen AT&T-yksinoikeus, **33–52 %** hedelmällisyysluvun laskusta.
- **Varauma:** molemmat vertaisarvioimattomia työpapereita.

### V5: CRY-KO nisäkkäillä (Blokki 2)
- Semo ym. 2025, bioRxiv DOI 10.1101/2025.05.12.653455: 100 µT muuttaa c-Fos-ilmentymää hiiren verkkokalvossa; **vaikutus katoaa Cry1⁻/⁻/Cry2⁻/⁻-hiirillä** (p = 0,48). Fedele ym. 2014 vahvistaa saman Drosophilassa.
- **Varauma:** vertaisarvioimaton esijulkaisu.

---

## Avoimet mallipäätökset (omistajalle)

| # | Päätös | Nykytila | Vaihtoehdot |
|---|---|---|---|
| M1 | Nolla-altistuksen TFR-katto | 5,66 (falsifioitu) | (a) Nosta vakiotermi ≥ 6,1; (b) vaihda funktiomuoto; (c) lisää ankkuripiste EMF=0 |
| M2 | Munasolujen laadun laskuväite | sivustolla | Poista tai rajaa "per-aloitettu-sykli, autologinen" |
| M3 | Universaali siittiölasku | sivustolla | Vaihda endpoint liikkuvuuteen/morfologiaan; nimeä nollamaat |
| M4 | EMF–puberteetti | sivustolla + Eskander-viite | Poista väite; merkitse H; ehdota SCAMP/HERMES-testi |
| M5 | EDC-kehys | "EMF kilpailee EDC:n kanssa" | "EMF × EDC" (multiplikatiivinen interaktio) |
| M6 | Vapaa T / kokonais-T | implisiittinen kokonais-T | Lisää Anderssonin vapaa-T-nollatulos rajaehdoksi |

---

## Halvimmat ratkaisevat testit (ei tehty)

1. **SCAMP/HERMES-uudelleenanalyysi:** regressoi puberteetti RF-dosimetrialla, BMI vakioituna. Kustannus: 0 € (data olemassa). → J3.
2. **BTB-läpäisevyys RF-altistuksessa:** okludiini, ZO-1, klaudiini-11 jyrsijän kiveksessä ei-termisellä RF:llä ± ftalaatti. → V3.
3. **Hudsonin viivepidennys k = 8–10:** testaa BERM:n 5–10 v ikkuna. → V4.
4. **Peiton vaikutus ei-käyttäjiin:** erota peitto käytöstä; BERM ennustaa > 0, behavioraalinen malli ennustaa ≈ 0. → V4.
5. **Amissien TFR × mastoetäisyys × puhelinstatus:** CAPED-rekisteristä, Ordnung vakioituna. → F.

---

*Tämän dokumentin lähteet ovat kahden agentin (ac72e5ed, acbccb6dc) alkuperäisistä raporteista, jotka on palautettu session `839702d6` jsonl-tiedostoista 2026-09-03. Alkuperäiset agenttilähdöt on tallennettu scratchpadiin.*
