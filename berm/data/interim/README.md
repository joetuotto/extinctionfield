# `data/interim/` — välivaiheet

Tänne kirjoitetaan muunnokset, jotka ovat matkalla `raw/`-hakemistosta `processed/`-hakemistoon:
yhdistetyt paneelit, harmonisoidut geokoodit, yksikkömuunnokset ennen validointia.

**Kaikki tämän hakemiston sisältö on uudelleenluotavissa `raw/`-hakemistosta.** Jos jokin
tiedosto ei ole, se ei kuulu tänne vaan `raw/`-hakemistoon manifestin kanssa.

Mikään täällä ei ole kanoninen datatuote. Kanoniset tuotteet läpäisevät
[`../../berm/data/contracts.py`](../../berm/data/contracts.py)-validoinnin ja asuvat
`processed/`-hakemistossa.

Hakemisto on tarkoituksella tyhjä toistaiseksi; ensimmäiset välivaiheet syntyvät
integraatiosuunnitelman vaiheessa B.
