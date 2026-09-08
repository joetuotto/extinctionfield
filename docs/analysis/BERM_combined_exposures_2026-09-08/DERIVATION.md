# BERM: lääketila, materiaalirajapinta ja laitekenttä

8.9.2026. Nykyinen lähdeliite on käyttäjän v2.0, `0b7b7067-2c32-4336-86f5-04aad072b9dd/pasted-text.txt`. Se korvaa saman aiheen v1.0-liitteen. Toteutus jatkaa olemassa olevaa mallia ja julkaistua sivustoa; uusia ennusteita tai hoito-ohjeita ei lisätä.

## Ennen biologisten lähteiden valintaa tarkistettu lähtökohta

Lindgren–Kovacs–Liukkonen 2025, DOI https://doi.org/10.1088/1742-6596/2987/1/012001; alkuperäisteksti https://www.preprints.org/manuscript/202503.2321, yhtälö 5:

`g_mu_nu = eta_mu_nu + A_mu A_nu`.

Kun BERM:n fysikaalinen skaala κ kirjoitetaan eksplisiittisesti ja `A = A0 + a`, geometrinen erotus on

`delta_g_mu_nu = kappa (A0_mu a_nu + a_mu A0_nu + a_mu a_nu)`.

Usean fysikaalisen syötteen tapauksessa `a = sum_p a_p`. Erotus sisältää saman syötteen neliötermien lisäksi `kappa (a_p_mu a_q_nu + a_q_mu a_p_nu)` pareille `p < q`. Aikakeskiarvossa säilyvä osa edellyttää määrättyä keskiarvo-operaattoria ja historiaa. Geometrinen ristiosa ei yksin määrää biologisen yhteisvaikutuksen merkkiä eikä suuruutta.

## Ehdollinen L2-liitos ja jatkaminen

`r_i(t) = Xi_i[S_i(history)](delta_g)` on BERM:n ehdollinen liitos. Gauge-valinta, fysikaalinen skaala, kudosytimet, merkki, viive ja ihmisen päätemuuttujien kalibrointi pysyvät avoimina. Yhdistelmäehkäisy muuttaa farmakologista ja biologista tilaa; se ei ole uusi samassa yksikössä laskettava kenttä. Materiaali voi muuttaa lähteen rajapintaa sekä laitteen ja kudoksen välistä siirtoa. Ihon kemiallinen läpäisevyys ei sellaisenaan ole sähköisen siirron kerroin.

Komponenttien synteesi etenee näillä ehdoilla vastaanottotilasta kalsium/redox-varantoon, hormonien tuotantoon ja sitoutumiseen, lisääntymiskapasiteettiin ja motivaation/toiminnan edellytyksiin. Lääketilan suorat vaikutukset säilyvät omana reittinään. FieldState voi kuvata fysikaalisen syötteen mittauksen; biologinen operaattori kuuluu BERM:lle. Empiiriset osatutkimukset rajaavat omia liitoksiaan, eivät vahvista geometriaa takautuvasti.

## Integraation keskeiset erottelut

- Lähde, siirtoreitti, vastaanottotila ja vaste ovat eri suureita.
- Staattinen tai liikkeessä muuttuva sähkökenttä, ELF/IF, RF, lämpö sekä kemiallinen altistus pidetään erillisinä mittauksina.
- Biologinen yhteisvaikutus määritetään nimetylle vasteelle, aikapisteelle ja asteikolle; esimerkiksi `Y11 - Y10 - Y01 + Y00` on additiivisen asteikon kontrasti, ei yleispätevä synergiakerroin.
- OC, materiaali ja puhelimen kenttä ovat kolme mahdollista syötetason tekijää. Materiaali × puhelin on niiden yhteisvaikutus, eikä sitä lasketa neljänneksi riippumattomaksi altisteeksi.
- Jaettua kalsium/redox-reittiä ei lasketa uudestaan jokaisen mekanismiehdokkaan nimellä. Historiallisia ennusteita ei muuteta kalibroimattomilla kertoimilla.

Biologinen lähdehaku ja alkuperäislähteiden auditointi alkaa tästä rajatusta rakenteesta. Tarkoitus on rakentaa vahvin lähteiden sallima ehdollinen synteesi ja toteuttaa se mallin rakenteeseen.
