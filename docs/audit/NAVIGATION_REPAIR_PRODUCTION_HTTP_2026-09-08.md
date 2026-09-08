# BERMin korjatun sivuston toimintavarmennus 2026-09-08

Tulos: **pass**. Kohde: https://www.extinctionfield.com. Tarkistus alkoi 2026-09-08T05:30:40.504398+00:00; päättyi 2026-09-08T05:34:01.291525+00:00.

Tarkistettu 1909 HTTP-kohdetta, 20 uutta hubia, 1892 HTML-sivua, 3272 ankkurilinkkiä ja 65 korjattua sisällysluettelokohdetta. Lähderekisterissä on 1191 yksilöllistä tunnistetta; 1307 lähdetietosivua kattaa 1191 yksilöllistä lähdettä. 17 julkisen JSON/CSV-tiedoston SHA-256 on verrattu nykyiseen korjaustyöpuuhun.

Molemmat navigaatiohistoriat (38 vanhaa ja 40 nyky-mainin kohdetta) sekä 101 mainin sivutiedostoa tarkistettiin säilyviksi. Seitsemän pääryhmää, aktiivinen ryhmä ja Tietoa-välilehdet tarkistettiin palvellusta HTML:stä.

HTTP-, ankkuri-, navigaatio-, lähde- tai tiedostohajautusvirheitä ei havaittu.

Tämä on uusi tarkistusajo. Alkuperäistä 8.9. epäonnistuneen julkaisun auditointia ei muutettu. Palvelimen HTML-tarkistus täydentää erillistä selaintestausta; ulkoisia tutkimusjulkaisujen osoitteita ei haettu.

Toistettava tarkistus: [arkistoitu tarkistusskripti](tools/navigation_repair_http_check_2026_09_08.py). Aja komento arkiston juuresta valmiin tuotantobuildin ja käynnistetyn palvelimen päällä. Valitse uusi raporttitiedosto: aiempien raporttien ylikirjoitus on estetty. Pelkkä --preflight-only tekee lähdevertailun ilman HTTP-pyyntöjä.

```bash
python3 docs/audit/tools/navigation_repair_http_check_2026_09_08.py \
  --workspace /polku/korjaustyopuuhun \
  --base-url https://www.extinctionfield.com \
  --report /polku/uuteen-tarkistusraporttiin.json
```
