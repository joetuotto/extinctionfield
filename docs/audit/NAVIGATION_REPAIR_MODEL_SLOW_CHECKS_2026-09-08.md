# Navigaatiokorjauksen kaksi hidasta mallin testiä 8.9.2026

**Molemmat hitaaksi merkityt testit läpäisivät täydentävän ajon.** Yhdessä aiemman [2 120 testin ajon](NAVIGATION_REPAIR_MODEL_CHECKS_2026-09-08.md) kanssa kaikki nykyiset **2 122 Python-testiä on nyt suoritettu onnistuneesti**. Ne suoritettiin kahdessa erillisessä ajossa; muita Python-testejä ei toistettu tässä täydennyksessä.

Työpuu on `/Users/ottojuote/.berm-navigation-repair-20260908`, ja mallikoodin lähtöversio `eb1b0621ee65ca611eb6abb94f472c49af7f9092`.

| Testi tiedostossa `berm/tests/test_dual_kernel.py` | Tulos | Varsinainen testilaskenta |
|---|---|---:|
| `test_dual_kernel_is_not_separable_on_the_fertility_panel` | Läpi | 5,09 s |
| `test_age_resolved_fast_kernel_and_declining_slope` | Läpi | 0,81 s |

Koko täydentävä ajo kesti **6,85 sekuntia**. Ensimmäinen testi laskee kolmen kerneliparin olemassa olevan paneelisovituksen ja tarkistaa rekisteröidyt laskentaehdot. Toinen tarkistaa ikäryhmäsovituksen 14 aikavakion avulla. Tässä tarkistuksessa ajettiin nykyiset ohjelmistotestit eikä niiden tuloksia tulkittu uudelleen tieteellisesti.

Ennen ajoa tarkastettiin testifunktiot, niiden kutsumat sovitusfunktiot ja paikalliset syötteet. Laskenta käyttää paikallisia JSON- ja Python-aineistoja sekä muistissa tapahtuvaa laskentaa; se ei hae dataa verkosta tai kirjoita mallin tai sivuston aineistoja.

Paneelitesti tarvitsi vielä Gitin sivuuttaman `berm/data/global/all_countries_panel.json`-tiedoston. Puuttuva 76 249 708 tavun tiedosto kopioitiin alkuperäisestä työpuusta ilman ylikirjoitusta. Sen SHA256 `4a68f9eaac06f0ec2d9d70814cb41c67f37e1f69d86100bdc985f1618caffa4c` vastasi mainin `website/public/data/global_panel_summary.json`-tiedostoa ja `berm/docs/merge-2026-09-07-data-manifest.json`-manifestia. Aineistoa ei muunnettu. Tämä on yksi lisäsyöte aiemmin dokumentoitujen 53 syötteen lisäksi.

Lopputarkistuksessa paneelisyötteen ja neljän käytetyn Python-lähdetiedoston tarkisteet säilyivät ennallaan. Koko seurattu `berm/`-puu vastasi edelleen lähtöversiota. Mallikoodia, seurattua dataa ja rekistereitä ei muutettu.

Ajon voi toistaa `berm/`-hakemistossa:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m pytest \
  tests/test_dual_kernel.py::test_dual_kernel_is_not_separable_on_the_fertility_panel \
  tests/test_dual_kernel.py::test_age_resolved_fast_kernel_and_declining_slope \
  -q -p no:cacheprovider --durations=2
```

[Koneellinen tulos ja syöteprovenienssi](NAVIGATION_REPAIR_MODEL_SLOW_CHECKS_2026-09-08.json) sekä [erillinen ajoloki](NAVIGATION_REPAIR_MODEL_SLOW_CHECKS_2026-09-08.log).
