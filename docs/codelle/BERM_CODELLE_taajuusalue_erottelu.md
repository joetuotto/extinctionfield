# Polkujen taajuusalue-erottelu

**Versio:** 2026-08-24
**Tyyppi:** CODELLE-referenssi

## Polkujen taajuusvastuualueet

| Polku | Komponentti E*:stä | Taajuusalue | Resonanssimaksimi | Lähde |
|-------|-------------------|-------------|-------------------|-------|
| B (CRY/RPM) | B_DC, m(t) | DC – ~22,5 MHz | 22,5 MHz | Talbi ym. 2025 |
| A (VGIC) | E_AC, P_pk | ELF – GHz | IFO: 100 Hz–300 GHz | Panagopoulos 2025 |
| BBB | B_DC | DC – ELF | Ei resonanssia | Salford 2003 |
| HPA | E_AC | ELF – RF | Ei resonanssia | HPA-akselitutkimus |

## Telecom-signaali sisältää molempia

- RF-kantoaalto (900 MHz – 3,5 GHz) → polku A
- ELF-modulaatio (GSM 217 Hz, WiFi 10 Hz) → polku B (CRY/RPM)
- Staattinen kenttä (laitteen magneetti) → polku BBB

## Huomio nimeämiskäytännöstä

Sivuston model/page.tsx käyttää nimeämistä A/B missä B = CRY/RPM.
Fieldstate-sivu ja primer käyttävät nimeämistä A/B/C/D missä C = CRY/RPM.
Python v16.py käyttää "pathway B" CRY/RPM:lle.

Tämä ristiriita on dokumentoitu. Kanoninen nimeäminen on avoin päätös.

## v17_night_fraction() -konteksti

v17_night_fraction()-funktio mallintaa tilannetta jossa MOLEMMAT komponentit
(RF-kantoaalto polun A kautta, ELF-modulaatio polun B kautta) ovat
samanaikaisesti aktiivisia yöllä. Tämä on biologisesti perusteltu koska
yöllinen altistus (puhelin yöpöydällä) tuottaa sekä staattisen/ELF-kentän
(CRY/RPM-aktiivinen) että RF-kentän (VGIC-aktiivinen) samanaikaisesti.
