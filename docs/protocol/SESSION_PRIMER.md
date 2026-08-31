# BERM — Session Primer

> Liitä tämä jokaisen BERM-analyysin alkuun.

## Kuusi sääntöä

1. JOHDA BERM:n ennuste eksplisiittisesti ennen testaamista (polku, suure, muoto)
2. TUNNISTA erotteleeko testi malleja vai ennustavatko molemmat samaa
3. SOVELLA evidenssitaakkaa symmetrisesti — sama standardi EMF:lle ja kilpailijoille
4. TARKISTA 8 liukumavirhettä: terminen kynnys, skalaarireduktio, VGCC-oletuspolku, proxy=annos, konsensusmalli BERM-etiketillä, yksipuolinen falsifikaatio, biasien symmetrisointi, katsausargumentti
5. RAPORTOI kolmiosaisesti: BERM-ennuste / konsensusennuste / erottelukyky
6. MERKITSE premissit: [JOHDETTU] / [EMERGENTTI] / [TUOTU] / [AVOIN]

## Polkuhierarkia

| Polku | Mekanismi | Status | Skaala |
|-------|-----------|--------|--------|
| B (RPM) | CRY → melatoniini → HPG | PRIMÄÄRINEN, 4/5 termiä johdettu | nT |
| A (VGCC) | δV_m → Ca²⁺ → ROS | SEKUNDAARINEN, vaatii vahvistimia | mV |
| C–D | BBB (HPA), HPA→HPG -ristikkäisinhibitio | EI JOHDETTU geometriasta | vaihtelee |

## Erottelevat ennusteet (BERM vs. konsensus)

- Suuntariippuvuus (B₀ kulma) — konsensus: isotrooppinen
- ELF-modulaatioikkunat — konsensus: ei ikkunoita
- χ-kyllästyminen — konsensus: lineaarinen dose-response
- Kudosspesifisyys (A_bio) — konsensus: sama vaste kaikkialla
- Kohorttiporrashypoteesi — konsensus: ei kohorttivaikutusta
- Lajihierarkia (CRY spin-koherenssi) — konsensus: ei ennustetta

## Mitä primer ei ratkaise

Primer ei kerro onko BERM oikein. Se estää yhden päättelyvirheen: BERM:n
ennusteen huomaamattoman korvaamisen konsensusmallilla (tai päinvastoin).
Täysi protokolla: [REASONING_PROTOCOL_v1.md](REASONING_PROTOCOL_v1.md).
Havaintojen luokittelu: [../audit/CLASSIFICATION_TABLE.json](../audit/CLASSIFICATION_TABLE.json).
