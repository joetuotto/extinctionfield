# BERM v17: Rakenteelliset muutokset ja uudet datakerrokset

Versio: 2026-08-18
Status: Spesifikaatio — ei implementoitu vielä

---

## RAKENTEELLINEN MUUTOS 1: Monilähdeinterferenssi

Korvaa yksinkertaisen SAR-keskiarvon. Monilähdeympäristössä interferenssikuvio
tuottaa paikallisia hot spotteja: N koherenttia lahdetta -> I_max = N^2 * |E_avg|^2.

Beat-taajuudet (WiFi 2.4 GHz + BT 2.45 GHz = 50 MHz beat; useat 4G-tukiasemat
= Hz-alueen beat) tuottavat ELF-modulaation joka resonoi biologisten
oskillaattorien kanssa.

```python
def interference_multiplier(n_sources: int, coherence: float = 0.3) -> float:
    """Monilahdeinterferenssin vahvistuskerroin.

    N koherenttia lahdetta: I_max = N^2 * |E_avg|^2 (taysi koherenssi)
    Osittainen koherenssi: I_eff = N * (1 + (N-1) * coherence) * |E_avg|^2

    n_sources: laitteiden lukumaara tilassa (WiFi + BT + puhelin + ...)
    coherence: koherenssifaktori 0-1 (0 = epakoherentti, 1 = taysi)

    Lahde: #262, multi-source interferenssifysiikka
    Lindgren: A1_mu * A2_nu ristitermi metriikassa
    """
    return 1.0 + (n_sources - 1) * coherence


def beat_frequency_bio_coupling(freq_pairs: list[tuple]) -> float:
    """Beat-taajuuden biologinen kytkentakerroin.

    Jos beat osuu EEG-kaistalle (0.5-30 Hz), kytkenta on vahva.
    Lahde: #329, #334 (Regel: modulaatiotaajuus ratkaisee)
    Lindgren: Kuramoto/Adler vaihelukitus Arnoldin kielella
    """
    bio_bands = [(0.5, 4), (4, 8), (8, 13), (13, 30)]  # delta, theta, alfa, beta
    coupling = 0.0
    for f1, f2 in freq_pairs:
        beat = abs(f1 - f2)
        for low, high in bio_bands:
            if low <= beat <= high:
                coupling += 1.0 / (1.0 + abs(beat - (low + high) / 2))
    return 1.0 + 0.1 * coupling
```

Integraatio: `ambient_effective = ambient_raw * interference_multiplier(n_devices) * beat_coupling`
IoT-laitteiden lukumaara per kotitalous on jo mallissa ($IoTDevices2024).

---

## RAKENTEELLINEN MUUTOS 2: Asumistyyppi vaimennuskerrokseen

Rakennusfysiikka: kerrostalo vs omakotitalo, suojahuone (mamad), rakennusmateriaali.

```python
BUILDING_EMF_FACTOR = {
    "apartment_concrete": 1.4,   # betoni heijastaa RF:aa = resonaattorikammio
    "detached_wood": 0.8,        # puuseinat lapaaisevat, ei resonanssia
    "apartment_mamad": 0.7,      # mamadissa nukkuminen vahentaa yoaltistusta
}

HOUSING_MIX = {
    "Finland": {"apartment_concrete": 0.45, "detached_wood": 0.55},
    "SouthKorea": {"apartment_concrete": 0.85, "detached_wood": 0.15},
    "Israel": {"apartment_mamad": 0.60, "apartment_concrete": 0.30,
               "detached_wood": 0.10},
    "Niger": {"detached_wood": 0.95, "apartment_concrete": 0.05},
}

def housing_emf_factor(country: str) -> float:
    """Asumistyypin EMF-vaikutuskerroin.

    Lahde: #316 (kerrostalo resonaattorikammiona),
           #317 (makuuhuoneen 82% Wi-Fi/DECT),
           #320 (Israelin mamad -15 dB)
    Lindgren: seisovat aallot = stationaariset metriset kuviot
    """
    mix = HOUSING_MIX.get(country, {"apartment_concrete": 0.5, "detached_wood": 0.5})
    return sum(frac * BUILDING_EMF_FACTOR[typ] for typ, frac in mix.items())
```

Integraatio: `ambient_effective = ambient_raw * housing_emf_factor(country)`
Israel saa merkittavan vaimennuksen mamadista -> yksi osaselitys Israelin TFR-poikkeukselle.

---

## RAKENTEELLINEN MUUTOS 3: Palautumisikkunat biologisessa kapasiteetissa

Selye-dynamiikka ja Shabbat-efekti: saannolliset palautumisikkunat
estavat kolmanteen vaiheeseen (uupuminen) siirtymisen.

```python
WEEKLY_RECOVERY = {
    "Israel_haredi": 0.15,     # Shabbat 25h + juhlapaivat
    "Israel_dati": 0.10,       # Shabbat osittainen
    "Israel_secular": 0.02,    # lahes jatkuva
    "OldOrderAmish": 0.95,     # lahes ei EMF:aa koskaan
    "Finland": 0.02,           # ei systemaattista taukoa
    "SouthKorea": 0.01,        # 24/7 connectivity kulttuuri
}

def recovery_adjusted_cumulative(country: str, year: int) -> float:
    """Kumulatiivinen altistus palautumisikkunoilla korjattuna.

    Shabbat: 25h/viikko teknologia-abstinenssi = 15% viikosta
    Houston 2019: ROS palautuu 5 viikossa
    Selye: syklinen altistus estaa vaiheen 3 (uupuminen)

    Lindgren: syklinen perturbointia mahdollistaa metrisen tilan
    palautumisen stationaariseen ratkaisuun jokaisen syklin aikana.
    """
    raw_cum = cumulative_exposure(country, year)
    weekly_recovery = WEEKLY_RECOVERY.get(country, 0.0)
    alpha_recovery = 0.43  # Houston 2019
    recovery_factor = 1.0 - weekly_recovery * alpha_recovery
    return raw_cum * recovery_factor
```

Selittaa Israelin paradoksin kvantitatiivisesti: korkea ambient mutta matala
efektiivinen kumulatiivinen altistus Shabbat + mamad + kosher-puhelimet vuoksi.

---

## RAKENTEELLINEN MUUTOS 4: Laboratorion baseline-siirtyma

Diagnostinen tyokalu, ei numeerinen korjaus. Jos laboratorion EMF-tausta
on 5-20 V/m ja chi(A_bar) on saturoitunut, KAIKKI laboratoriotulokset ovat
EMF-altistettuja — myos kontrolliryhmä.

Todellinen vaikutus = (kokeellinen - kontrolli) + (kontrolli - luonnollinen).
Jalkimmainen termi puuttuu lahes kaikesta kirjallisuudesta.

```python
def lab_baseline_correction(observed_effect: float,
                            lab_emf_background: float = 10.0,
                            natural_background: float = 0.001) -> float:
    """Korjaa laboratorion EMF-taustan aiheuttama harha.

    Lahde: #277 (laboratorion EMF-kontaminaatio),
           #279 (historiallinen baseline shift)
    Lindgren: chi(A_lab) ~ 1.0 (saturoitunut) vs chi(A_natural) ~ 0
    """
    chi_lab = chi(lab_emf_background)        # ~ 1.0
    chi_natural = chi(natural_background)     # ~ 0.001
    control_excess = chi_lab - chi_natural    # ~ 0.999

    return {
        "observed_effect": observed_effect,
        "bias_direction": "toward_null",
        "bias_magnitude": "substantial",
        "chi_lab": chi_lab,
        "chi_natural": chi_natural,
        "note": "Kaikki laboratoriotulokset aliarvioivat todellista vaikutusta "
                "koska kontrolliryhmä on EMF-altistettu. Korjaus vaatii "
                "Faraday-suojattua kontrollilaboratoriota (#278)."
    }
```

Lisataan $BiasDirectionTable:een uutena yksisuuntaisena biasina (kohti nollaa).
L-BERM luku 9 "kuusi yksisuuntaista biasia" kasvaa seitsemaksi.

---

## UUSI DATAKERROS 1: Delgadon taajuusselektiivisyysdata

CRY-kanavan kalibrointi. 0.001 gaussin pulssikentta:
- 10 Hz: normaali
- 100 Hz: vakavat vauriot
- 1000 Hz: lievat vauriot

Resonanssipiikki ~100 Hz, ei monotoninen nousu.
CRY-kanavan vaste = taajuusriippuvainen ikkunafunktio.

## UUSI DATAKERROS 2: Czerskin siittiokromosomivauriodata

SDI-kaskadin kalibrointi. Koko turvaraja-alueen (100-10000 uW) lapi
kromosomivaurioita 2 viikon altistuksella, 1h/vrk.
Osoittaa: kynnys on jo luonnollisen taustan tasolla.
GAMMA_SDF:n on tuotettava mitattava SDF matalilla altistustasoilla.

## UUSI DATAKERROS 3: Universe 25

Calhounin metallikammion EMF-ymparisto: Schumann-tukahdutus + 60 Hz
teollisuustaajuus + valaistuksen EMF -> chi(A_bar)-anomalia.
Testattavissa: toista Universe 25 Faraday-suojatussa kammissa.

## UUSI DATAKERROS 4: Maakohtainen IoT/WiFi-laitetiheys

IoT Analytics 2025 (#324): kotitalouksissa 16+ laitetta.
Mordor Intelligence 2025 (#325): 890 miljoonaa Wi-Fi-reititinta.

Interference_multiplier syotteet:
- Suomi: ~20 laitetta/kotitalous -> kerroin 1 + 19*0.3 = 6.7
- Niger: ~2 laitetta/kotitalous -> kerroin 1 + 1*0.3 = 1.3

Selittaa miksi SAR-standardit (jotka mittaavat keskiarvoa) eivat suojaa
hot spoteilta.
