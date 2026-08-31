# Pending: Bioelectromagnetics-kirjallisuuskatsauksen projektidokumenttipäivitykset
**Päiväys:** 2026-08-24
**Lähde-CODELLE:** CODELLE_bioelectromagnetics_integraatio.md
**Status:** Odottaa projektidokumenttien päivitystä

## 1. EXTINCTIONFIELD_kausaaliketju_ohjeet.md (5 muutosta)

### Muutos 1: Tason 4 "vgic" keyReferences
Lisää: Bertagna 2025 (RyR/SERCA-reitti, Ann NY Acad Sci 1550(1), doi:10.1111/nyas.15386)

### Muutos 2: Tason 4 "vgic" kuvaus
Lisää monireittiisen Ca²⁺-häiriön konsepti: suora S4-oskillaatio (Panagopoulos 2025) + solunsisäiset Ca²⁺-varastot (Bertagna 2025). Kaksi farmakologisesti vahvistettua itsenäistä reittiä.

### Muutos 3: Nuoli pathway_a → sdf/concentration
Lisää: Bektas 2026 (3.5 GHz testisdata, CoQ10 rescue, bem.70043)

### Muutos 4: Tason 5C "pathway_c" keyReferences
Lisää: Tbahriti 2026 (PRISMA 55 tutkimusta, melatoniinisuppressio 88 %, Sleep Biol Rhythms)

### Muutos 5: Tason 5E "pathway_e" evidenssi
Lisää kontekstina: Gao 2024 (tight junction -mekanismi, EMP ≠ RF, bem.22494)

## 2. analyysi_yhteenveto.md (1 muutos)

Lisää:
"2026-08-24: Bioelectromagnetics-kirjallisuuskatsaus (BERM_Bioelectromagnetics_kirjallisuuskatsaus_2026-08-24.md, 20 artikkelia, 2024–2026) integroitu CODELLE_bioelectromagnetics_integraatio.md -ohjeen kautta. Kolme prioriteettilähdettä lisätty viiterekisteriin (Bertagna 2025 [E], Bektas 2026 [C], Tbahriti 2026 [M|C]) sekä kaksi sekundaarista (Gao 2024 [C], Deprez 2025 [C]). Negatiiviset tulokset (Meyer 2026, Haidar 2025) dokumentoitu kudosspesifisyysevidenssinä."

## 3. LBERM_v16_mekanismien_mallinnus.md (2 muutosta)

### Muutos 1: VGIC/Ca²⁺-osio
Lisää Bertagnan monireittiinen mekanismi: IFO-VGIC (suora S4) + solunsisäiset Ca²⁺-varastot (RyR/SERCA). Farmakologinen vahvistus: dantroleeni + CPA estävät EMF-vaikutukset.

### Muutos 2: Polun C osio
Lisää Tbahriti 2026:n kvantitatiivinen data: PRISMA 55 tutkimusta, 88 % korkealaatuisista eläintutkimuksista raportoi melatoniinisuppressiota 20–50 %. Metodologinen varoitus: vain 27 % tutkimuksista täytti korkeat standardit.

## 4. Episteemisten tasojen arviointi

Yksikään episteeminen taso ei muutu näiden lähteiden perusteella:
- vgic (taso 4): E — Bertagna 2025 tukee, ei muutosta
- vgic → pathway_a: E — Bertagna laajentaa, ei muutosta
- pathway_c: nykyinen taso — Tbahriti 2026 tukee, eläinkoe-evidenssin vahvuus dokumentoitu
- pathway_a → sdf/concentration: C — Bektas 2026 tukee, ei muutosta
- pathway_e: C — Gao 2024 mekanistinen tuki (EMP ≠ RF), ei muutosta

## 5. Poikkileikkaavat dokumentaatiot (toteutettu koodissa)

### 5a. Kudosspesifisyys ja χ(Ā)
Bektas 2026 (3.5 GHz → testis-ROS) vs. Haidar 2025 (3.5 GHz → ei ROS ihossa) vs. Meyer 2026 (ELF → ei DNA-vauriota ihossa). Dokumentoitu: evidence-sivu, model/page.tsx, v16.py docstring, causalChainData.ts.

### 5b. Recovery window
Bektas 2026 CoQ10 rescue = farmakologinen recovery window -laajennus. Dokumentoitu: evidence-sivu (recovery-narratiivi), model/page.tsx.

### 5c. 5G-altistuskonteksti
Deprez 2025 spektraalimittaukset. Dokumentoitu: causalChainData.ts (ambient-solmu), evidence-sivu (5g-ambient-spectral -narratiivi).
