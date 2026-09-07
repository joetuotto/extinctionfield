# Odottava projektipäätös

- **Lähdeohje:** Moduloomin tilamallilaajennus (2026-09-07, käyttäjän ohje sessiossa)
- **Askel:** Vasteikkunan lukitun vertailuehdokkaan keskitaajuus
- **Tila:** ODOTTAA — vaatii projektidokumentin päätöksen
- **Suorittava työkalu:** Claude-sessio, jolla on pääsy projektin knowledge baseen
- **Kirjattu:** 2026-09-07

## Ristiriita

Ohjeessa lukittu vertailuikkuna nimetään **25,4 Hz**:n ikkunaksi. Repossa
lukittu arvo on **25,2 Hz**, joka tulee synteesin §15:stä ja on käytössä
kahdessa paikassa:

- `berm/berm/physics/ipr_mechanism.py` (`KOCH_2003_EXAMPLE`, f_c = 25.2 Hz)
- `website/lib/mechanism.ts` (sama arvo, vitest pitää molemmat samassa luvussa)

Uusi moduuli `berm/berm/modulome/window.py` käyttää samaa 25,2 Hz:n arvoa
`LOCKED_COMPARISON_WINDOW`-vakiossa, jotta lukittu ehdokas pysyy yhtenä ja
samana kaikkialla. Arvoa ei ole muutettu.

## Mitä pitää päättää

1. Onko 25,4 Hz eri suure (esim. eri B₀ tai eri efektiivinen massa) vai
   ohjeen kirjoitusasu 25,2 Hz:stä?
2. Jos 25,4 Hz on itsenäinen lukittu ehdokas, se lisätään omana
   `ResonanceWindow`-vakiona ja `compare_windows` ajaa kolme ikkunaa
   (25,2 Hz, 25,4 Hz, tilariippuvainen) samaa ajurispektriä vastaan.
3. Aiempi avoin kysymys on yhä auki: synteesin pitäisi kertoa, kumpi B₀ tai
   mikä efektiivinen massa on 25,2 Hz:n takana
   (ks. `docs/codelle/pending/2026-09-07_tutkimussynteesi_lahdedokumentti.md`).

Kunnes tämä on ratkaistu, sivusto ja malli näyttävät 25,2 Hz:n lukittuna
vertailuikkunana.
