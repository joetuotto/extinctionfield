# Polkujen taajuusalue-erottelu

**Päiväys:** 2026-08-24
**Status:** Toteutettu koodissa (model/page.tsx rpmFrequencyNote)

## Polkujen taajuusalueet

| Polku | Komponentti E*:stä | Taajuusalue | Resonanssimaksimi | Lähde |
|-------|-------------------|-------------|-------------------|-------|
| B (CRY/RPM) | B_DC, m(t) | DC – ~22,5 MHz | 22,5 MHz | Talbi ym. 2025 |
| A (VGIC) | E_AC, P_pk | ELF – GHz | IFO: 100 Hz–300 GHz | Panagopoulos 2025 |
| C (BBB) | B_DC | DC – ELF | Ei resonanssia | Salford 2003 |
| D (HPA) | E_AC | ELF – RF | Ei resonanssia | HPA-akselitutkimus |

## Telecom-signaali sisältää molempia:
- **RF-kantoaalto** (900 MHz – 3,5 GHz) → polku A
- **ELF-modulaatio** (GSM 217 Hz, WiFi 10 Hz beacon) → polku B
- **Staattinen kenttä** (laitteen magneetti) → polku C

## Implikaatio

v17_night_fraction()-funktio mallintaa tilannetta jossa MOLEMMAT
komponentit ovat samanaikaisesti aktiivisia yöllä.

Talbi ym. 2025 (Front. Quantum Sci. Technol. 4:1544473) ei ole BERM:n
vastainen tutkimus. Se vahvistaa taajuusalue-erottelun: RPM resonoi
DC–22,5 MHz alueella, ei GHz-kantoaalloilla. Telecom-kantoaallon
vaikutukset kulkevat polun A (VGIC, sähkökenttäkomponentti) kautta.
