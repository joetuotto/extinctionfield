# Sivuston tuore toiminnallinen build- ja testitarkistus

**Tarkastettu 8.9.2026 klo 07.55.30–07.56.16, Europe/Helsinki (EEST).** Tarkastus koskee nykyistä paikallista `website`-työtilaa. Kaikki kolme ajettua komentoa päättyivät koodiin 0. Julkaisua ei tehty.

Työpuun HEAD oli `7a938dd3b528a76008557632fdaf0dca72e13dea`. Käyttäjän aiempien hyväksyttyjen töiden muokattu työpuu säilytettiin sellaisenaan. Lähdekoodiin ei tehty korjauksia; build sai generoida normaalit lähde- ja ankkurihakemistonsa. Sivuston `AGENTS.md` ja nykyiset npm-komennot luettiin ennen ajoa. Tarkistukset ajettiin rinnakkain erillisinä prosesseina.

## Tulokset

| Tarkistus | Tuore tulos | Paluukoodi | Raakaloki |
|---|---|---:|---|
| `npm test` | **375 testiä läpäisi 32 testitiedostossa.** Vitestin ilmoittama kesto 8,97 s. | 0 | [vitest.log](functional-checks-2026-09-08/vitest.log) |
| `npm run build` | Prebuild, tuotantokäännös ja postbuild läpäisivät. Next.js generoi 526 staattista sivua. HTML-jälkitarkistus kattoi **522 esirenderöityä reittiä**. | 0 | [build.log](functional-checks-2026-09-08/build.log) |
| `npm run i18n:coverage -- --strict` | **86 COPY-sivua; 0 tyhjää englanninkielistä avainta.** | 0 | [i18n.log](functional-checks-2026-09-08/i18n.log) |

Tuotantokäännöksen suorittamat laadunvarmistukset:

- Lähdehakemiston generointi: 1 156 kanonista tietuetta, 46 aliasta, 737 käytettyä tietuetta.
- Lähdevalidointi: 1 156 kanonista tunnistetta, 46 aliasta, 734 rakenteista tunnistetta ja 489 julkaistavaa linkkiä; läpi.
- Rekisterivalidointi: **0 virhettä, 14 ennestään tunnettua DKC-julkaisuportin varoitusta**. Graafissa 39 solmua, 83 yhteyttä ja 13 käyttöliittymäryhmää. Rekisterissä 64 väitettä, 131 evidenssisuhdetta, 64 arviota ja viisi reittiä.
- Ankkurihakemisto: 102 ankkuria kymmenessä tiedostossa.
- TypeScript-tyyppitarkistus ja tiukka ESLint (`--max-warnings=0`): läpi.
- Next.js 16.3.1:n webpack-tuotantokäännös: läpi.
- Esirenderöidyn HTML:n tarkistus: **0 raakaviitetunnistetta, 0 tyhjää tarkistettavaa elementtiä, 0 tyhjää linkkiä**.

## Lokien huomautukset ja tarkistuksen rajaus

Rekisterin 14 varoitusta koskevat DKC-kandidaatin tieteellistä julkaisuporttia, eivät uutta sivuston käännös- tai navigaatiovirhettä. Portin tila säilyy näkyvänä; tämä tarkistus ei muuta kandidaattia hyväksytyksi kalibroiduksi tulokseksi.

Vitest ilmoittaa ennakoivan Vite-konfiguraatiovaroituksen: `vitest.config.ts` sisältää ESM-syntaksia CommonJS-kontekstissa, mitä tulevaksi oletukseksi suunniteltu `configLoader: 'native'` ei tue. Nykyinen Vitest 4.1.11 suoritti kaikki testit onnistuneesti. Build-lokissa olevat Babelin suurten tiedostojen muotoilun optimointihuomautukset eivät estäneet tiukan lintin tai käännöksen läpäisyä.

Käännösavainten strict-tarkistus varmistaa täydet englannin perusavaimet. Se ei tarkoita kaikkien kieliversioiden täydellistä käännöstä. Uusien Fysiikka-, Biologia-, Käyttäytyminen- ja Konvergenssi-sivujen suomi on raportissa 100 %; japani, ranska ja korea käyttävät niiden englanninkielistä sisältöä sivuston käännösilmoituksella. Selaimen käyttöliittymä- ja ilmoitustarkistukset sekä julkisen sivuston HTTP-tarkistukset tehdään erillisissä rinnakkaisissa tarkastuksissa.

Tämä ajo ei ollut uusi kirjallisuuden evidenssiarvio, Python-mallin testiajo tai tuotantojulkaisu. Sivuston tämänhetkiset automaattiset tarkistukset eivät löytäneet uutta korjattavaa toimintahäiriötä.

## Toistettavuus

[Koneellinen tulos- ja SHA-256-luettelo](functional-checks-2026-09-08/results.json) sisältää täsmälliset komennot, aikaleimat, paluukoodit ja tähän auditointiin kopioitujen raakalogien tarkistussummat. Logit on säilytetty tämän muistion rinnalla, joten tulokset eivät perustu edellisen päivän ajoihin tai poistuvaan väliaikaishakemistoon.
