# Pending: TUTKIMUSPROMPT 2026-09-01 — verifioimatta jääneet kohdat

Lähde: docs/analysis/BERM_evidenssiaukot_tutkimusprompt_2026-09-01.md

## Tehtävä 1 (polku A)
- [ ] Sheppard, Swicord & Balzano 2008 (10.1097/01.hp.0000319903.20660.37): 3000-kertoimen sisältö (maksumuuri; oma johto 1.5R/d = 3000 tukee)
- [ ] Wood & Karipidis 2021 kokoteksti (vain abstrakti verifioitu)
- [ ] Pall 2015 primäärisitaatti ε = 120 (403)
- [ ] Cav2.3 gating charge 9 e₀ (verifioimatta); Cav1.2 gating charge
- [ ] Pallin 26 salpaajatutkimuksen laadunarviointi yksitellen
- [ ] Alakohdat 1.b (taajuus-vaste/IFO) ja 1.d (CatSper) — toinen agentti käynnissä
- [ ] [KOODI] v16.py / pathways.py / metadata.py: PALL_AMPLIFICATION → vgcc_gain(f); PATHWAY_WEIGHTS A → A_ELF/A_RF, jäännös B; Cav3.2 E / Cav1.2 H; TRPC1; LAB_BASELINE_BIAS empiirinen (Yap 2020); E-BIO-1..3 predictions-sivulle

## Tehtävä 4.e (alkuperäiskansojen ikäkaltevuus)
- [ ] Ellison ym. 2002 (10.1093/humrep/17.12.3251): N ja pmol/L ikäkaistoittain (OUP 403)
- [ ] Alvarado ym. 2019 ja Campbell ym. 2003: numeeriset ikäkaltevuudet (maksumuuri)
- [ ] Hadzan ikäkohtainen T-data (ei julkaistu)
- [ ] Selvitä Bribiescas & Hill 2010 vs Amir ym. 2015 -sitaattiristiriita Achén ikäkaltevuudesta alkuperäisdatasta
- [ ] Aronoff & Trumble 2026 -esipainos (inflammaging medioi T-ikälaskun, UK Biobank n = 18 347): verifioi ja arvioi kilpailevana selityksenä
- [ ] [KOODI] E-ACT-1/E-ACT-3: tasomuotoinen ennuste → kaltevuusmuotoinen; uusi E-ACT-4 (kylätason sähköistys × ikä -interaktio) predictions-sivulle
- [ ] [KOODI] A_bio: eksplisiittinen patogeeni-/immuuniaktivaatiotermi (v16.py / metadata.py)
- [ ] [KOODI] Reittikohtainen LH/FSH-ennuste: B ja D sentraalisia → T↓ ilman LH-nousua; EMAS:n kohoava LH avoimeksi ongelmaksi (docs/audit)
- [ ] AVOIN ONGELMA: Ariaal 2003 — nomadeilla jyrkempi ikälasku kuin asettuneilla (vastaesimerkki naiiville sähköistysennusteelle)
- [ ] AVOIN ONGELMA: määritysmenetelmä (RIA/EIA vs LC-MS) kollineaarinen väestön kanssa; Marriott 2023 (LC-MS, ikälasku ≈ 0 ennen 70 v) heikentää länsimaista vertailukaltevuutta
- [ ] KORKEIN TUOTTO: Amish-miesten sylki-T ikäkaistoittain — ei ole olemassa; katkaisee proxy-nipun (länsimainen ravinto + matala patogeenikuorma + korkea aktiivisuus + ei verkkosähköä)

## Tehtävät 5, 7, 8 — mallimuutokset (hakuagentti, 34 DOI:ta varmennettu)
- [ ] [KOODI] POISTA pandemia–SSN-yhteys tukievidenssistä ja merkitse FALSIFIOIDUKSI (Towers 2017, 10.1017/S095026881700173X: laskuvirheet kaikissa neljässä positiivisessa työssä; ~30 % vuosista osuu ±1 v aurinkomaksimista joka tapauksessa)
- [ ] [KOODI] LISÄÄ tapahtumaharvinaisuus-sääntö: χ_B-ennusteita ei esitetä harvinaisista endogeenisesti ajautuvista tapahtumista, vain jatkuvista tiheästi mitatuista päätemuuttujista
- [ ] [KOODI] POISTA "ISS-hedelmällisyys" ennustelistalta → korvaa "hypomagneettinen ympäristö (<100 nT) alentaa hedelmällisyyttä"; ISS on magnetosfäärin sisällä, kentän vektori kiertyy 16×/vrk
- [ ] [KOODI] KIRJAA vastaevidenssi reitille D: 12 uroshiirtä 35 vrk ISS:llä siittivät terveitä jälkeläisiä, elimet ja geeniekspressio lähes muuttumattomia
- [ ] [KOODI] PAKOTA valinta χ_B:n ajurista (geomagneettinen häiriöisyys vs kosminen säteily) — Maunderissa ne liikkuvat vastakkain; nykyinen muotoilu on alimääritelty ja falsifioimaton. Poista Maunder tukievidenssistä siihen asti
- [ ] [KOODI] SIIRRÄ CCD pois tukievidenssistä → korvaa Treder 2023 (homing, 10.1016/j.scitotenv.2023.165211) + Vilić 2017 (modulaatio-ikkuna 23 V/m) + Thielens 2020 (dosimetria, +390–570 % >3 GHz)
- [ ] [KOODI] POISTA agronominen PEMF/magneto-priming tukievidenssistä (30–500 mT = 600–10 000× maan kenttä, ei testaa χ_B:tä); kirjaa parametrirajaus: χ_B = nT–satoja µT + ELF
- [ ] [KOODI] POISTA "vertikaaliviljelyn ravintotiheys" havainnollisena testinä (valospektri selittää ilman jäännöstä); säilytä vain vakioidun valon kokeellisena ennusteena
- [ ] [KOODI] LISÄÄ väliaineen läpäisytaulukko: merivesi δ ≈ 0.8–1.2 cm RF:llä mutta ≈ 36 m @ 50 Hz → merieliöissä χ_B on ELF/DC-vetoinen, ei RF; kaikki merilajiennusteet uusiksi
- [ ] [KOODI] NOSTA reitti C (melatoniini) ihmisellä M|P → M|C; kvantitatiivinen ankkuri RR 1.3–1.5 (Gaisenok 2025, 10.4103/jmp.jmp_122_24); magneettisen leveysasteen gradientti = seuraava pakollinen testi
- [ ] [KOODI] LISÄÄ mittausartefaktin ehto: siittiöaikasarja ei kelpaa vartijaevidenssiksi ilman menetelmävakioinnin dokumentointia (nauta-KE 1980–85 käänne)
- [ ] [KOODI] NOSTA hevosdata (Harris 2023, 10.1530/REP-22-0490, −0.96 %-yks./v) vartijaevidenssin kärkeen Lea 2016:n sijaan
- [ ] EHDOTETUT KOKEET prioriteettijärjestyksessä: (1) teräs/alumiini/puu-tunnelikoe mehiläisillä + Helmholtz-haara, optiikka vakioituna (~10 k€); (2) valoriippuvuustesti (CRY vs magnetiitti); (3) kasvihuoneen magneettikenttämittaus fluxgatella; (4) Hallmannin 63 kohdetta × Bundesnetzagenturin tukiasemahistoria; (5) hypomagneettinen kammio vs säteilytys vs hindlimb unloading
