# Completed & Deferred: Bioelectromagnetics Literature Integration

Source: CODELLE Bioelectromagnetics-kirjallisuuskatsauksen BERM-integraatioohje (2026-08-31)
Date: 2026-08-31

## Completed items

### Step 1. [KOODI] references_full.json
- [x] bertagna2025 (Ann NY Acad Sci, Ca2+ stores RyR/SERCA, ELF, level E) — existed
- [x] bektas2026 (Bioelectromagnetics, 3.5 GHz testis-ROS, CoQ10, level C) — existed
- [x] tbahriti2026 (Sleep Biol Rhythms, PRISMA 55 studies, melatonin, level M) — existed
- [x] deprez2025 (Bioelectromagnetics, 5G spectral exposure, level C) — existed
- [x] gao2024 (Bioelectromagnetics, EMP BBB tight junction, level C) — added

### Step 2. [KOODI] Evidence page — Bertagna 2025 research card
- [x] EN + FI research card with ELF vs RF distinction noted

### Step 3. [KOODI] Evidence page — Bektas 2026 + Tbahriti 2026 cards
- [x] EN + FI cards with tissue-specificity and 27% quality caveat

### Step 4. [KOODI] Evidence page — Negative results + Gao 2024
- [x] Tissue-specific null results (Meyer 2026 + Haidar 2025) EN + FI
- [x] Gao 2024 BBB with EMP vs chronic RF distinction

### Step 5. [KOODI] CausalChain evidence popups
- [x] mech_vgcc_ros: Bertagna 2025 (RyR/SERCA) added to mechanism + keyRefs
- [x] mech_cry_melatonin: Tbahriti 2026 (PRISMA) added
- [x] mech_melatonin_fertility: Tbahriti 2026 added to keyRefs
- [x] tissue_bbb: Gao 2024 (tight junction) added
- [x] tissue_sperm: Bektas 2026 (3.5 GHz testis) added
- [x] ch_rf: Deprez 2025 (5G spectral) added

### Step 6. [KOODI] model/page.tsx
- [x] Already done (confirmed 2026-08-31 site inspection)

### Step 7. [KOODI] v16.py docstrings
- [x] v17_ovulation_vgic: Multi-pathway Ca2+ (Bertagna 2025), tissue-specificity
- [x] v17_sperm_ca2_fecundity: Bektas 2026 5G testicular data
- [x] v17_night_fraction: Tbahriti 2026 PRISMA melatonin suppression

### Step 8. [KOODI] metadata.py comments
- [x] Level 4, 5A->6, 5C, 5E comments added with all 6 references

### Step 9. [KOODI] Cross-cutting documentation
- [x] Tissue-specificity: covered in evidence page (Meyer/Haidar card), v16.py docstring, model page
- [x] Recovery window: covered in Bektas evidence card (CoQ10 rescue), v16.py docstring
- [x] 5G context: covered in Deprez reference + ch_rf causal node update

### Step 11. [PROJEKTI] Epistemic level assessment
- [x] No changes needed — all sources support existing levels, none require elevation
- vgic (Level 4): E — Bertagna 2025 adds support, no change
- pathway_a->sdf (Ca2+ influx): E — no change
- pathway_c (melatonin): existing level maintained, animal evidence strength noted
- pathway_a->sdf/concentration: C — Bektas 2026 supports, no change
- pathway_e (BBB): C — Gao 2024 mechanistic support (EMP != RF), no change

## Deferred items

### Step 10. [PROJEKTI] Project document updates
These require Claude project document access (not available in code sessions):

#### 10a. EXTINCTIONFIELD_kausaaliketju_ohjeet.md
- Level 4 "vgic": add Bertagna 2025 (RyR/SERCA) to keyReferences
- Level 4 "vgic": add multi-pathway Ca2+ concept to description
- pathway_a->sdf/concentration: add Bektas 2026 (3.5 GHz testis)
- Level 5C "pathway_c": add Tbahriti 2026 (PRISMA, 88%)
- Level 5E "pathway_e": add Gao 2024 (tight junction)

#### 10b. analyysi_yhteenveto.md
- Add: "2026-08-24: Bioelectromagnetics-kirjallisuuskatsaus (20 artikkelia, 2024-2026)
  integroitu. 3 prioriteettilahdetta (Bertagna 2025 [E], Bektas 2026 [C],
  Tbahriti 2026 [M|C]) + 2 sekundaarista (Gao 2024 [C], Deprez 2025 [C]).
  Negatiiviset tulokset (Meyer 2026, Haidar 2025) dokumentoitu kudosspesifisyysevidenttina."

#### 10c. LBERM_v16_mekanismien_mallinnus.md
- VGIC/Ca2+ section: add Bertagna multi-pathway mechanism
- Pathway B section: add Tbahriti 2026 quantitative data (88%, 20-50%)

### Previously deferred [PROJEKTI] items (from earlier Codelles)
- BERM_BERM_tilannekatsaus_ja_seuraavat_vaiheet.md — not created
- BERM_SESSIO_seuraava_tehtavat.md — not created
- BERM_README.md — not created
