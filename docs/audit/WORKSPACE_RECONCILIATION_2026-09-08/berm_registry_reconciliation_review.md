# Rekisterien ja aineistojen kolmikantavertailu 2026-09-08

Tarkastetut versiot: alkuperäinen `/Volumes/kovalevy 3/extinctionfield` (7a938dd + työmuutokset), julkaistun lähde `/Users/ottojuote/.berm-navigation-repair-20260908` (0840703), yhteinen perusta 7a938dd. Tarkastus oli vain lukeva. Uutta syndroomakirjallisuutta ei integroitu.

## Päätös

Julkaistun version rekisterit ovat tutkituilta osin alkuperäisen tekemisen jatkokehitys, eivät kilpaileva sisältöhaara. Alkuperäisen muuttamia tai lisäämiä lähde-, väite-, evidenssisuhde- tai arviointitietueita ei löytynyt, joiden jokin alkuperäisessä muuttunut tietokenttä olisi kadonnut julkaistusta. Julkaistu versio säilyttää saman-ID-tietueiden alkuperäiset muutokset ja lisää tarkempia tietoja.

Tämä päätös perustuu ID-kohtaiseen ja kenttäkohtaiseen kolmikantavertailuun. Määrävertailu ei yksin ollut peruste. ID:tä sisältävät taulukot normalisoitiin ID-avaimiksi; graafien kaaret tunnistettiin from/to/relation-yhdistelmällä; sanakirjat käytiin rekursiivisesti läpi. Samankokoisetkin kokonaisuudet (150 legacy-tietuetta, 103 atlaslaajennussolmua ja 359 kaarta) tarkastettiin.

## Varsinaiset rekisterit

| Tiedosto | Tulos | Ratkaisu |
|---|---|---|
| website/data/claims.json | 64→99 väitettä, 131→186 suhdetta, 64→99 arviota, 5→5 reittiä. Kaikki 135 eroavaa lehteä ovat vain julkaistun jatkomuutoksia suhteessa perustaan. | Julkaistu kokonaisuus; alkuperäistä yksilöllistä tietoa ei menetetä. |
| website/public/data/references_full.json | 1156→1191 lähdettä. 131 tietokenttä-/tietue-eroa ovat vain julkaistun muutoksia; 4 muuta ovat johdettuja metadata-laskureita. | Julkaistu kanoninen lähderekisteri. |
| website/lib/referenceIndex.json | 159 julkaistun tietokenttä-/tietue-eroa ja 2 johdettua laskuria. Alias 46→47. | Regeneroi kanonisesta lähderekisteristä. |
| website/lib/referenceUsage.json | 393 julkaistun eroa ja 2 johdettua laskuria. Käyttävät lähteet 737→772. | Regeneroi lopullisesta yhdistetystä sivustosta; reitti-/rivisijainnit eivät ole käsin yhdistettävää lähdetietoa. |
| website/lib/legacyEvidence.json | 150→150 tietuetta; 8 julkaistun jatkomuutosta. | Julkaistu versio. |
| website/data/model-architecture.json | 20 julkaistun jatkomuutosta, schema 1→2, ehdollinen L2 ja evidenssisynteesi-/sivilisaatiokytkennät. | Generoi yhdistetystä Python-arkkitehtuurista. |
| website/data/causal-graph.json ja schema | Alkuperäinen sama kuin perusta; julkaistu lisää 8 semanttista solmua ja 13 kaarta (39/83→47/96) ja tarkentaa kaarilajit. | Julkaistu semantiikka + vastaava generaattori. |
| website/data/atlas-claim-bindings.json | 50→68 sidottua solmua; 18 uutta solmuavainta ja 6 vanhan avaimen listan laajennusta. Jokainen alkuperäinen claimId säilyy näissä listoissa. Kaaret 5→5. | Julkaistu versio. |
| website/data/causal-atlas-extensions.json | 103→103 solmua, 359→359 kaarta. 128 tekstilehtieroa jakautuu neljään toistuvaan EN/FI korvausmalliin. Kanavien varsinainen kuvaus säilyy: avoimen L2:n yleislause tarkentuu ehdolliseksi materia-/vasteoperaattoriksi, jonka gauge, skaala ja kalibrointi erotetaan. | Julkaistu tarkempi semantiikka; ei tarvetta liittää vanhaa yleislausetta takaisin. |
| website/data/modulome-state.json ja public-mirror | 10 julkaistun jatkomuutosta: korttien interventionProfileIds lisätään; alkuperäinen kortti- ja kuva-aineisto säilyy. | Yhdistetyn Pythonin export_modulome.py. |
| website/data/intervention-profiles.json | Vain julkaistussa, kanoninen toimitettu lähde. | Säilytä ja aja export_intervention_profiles.py tarvittaessa. |
| website/public/data/intervention-profiles.json ja berm/data/evidence/intervention_profiles_v1.json | Profiilirekisterin generoituja peilejä. | Säilytä synkronissa kanonisen lähteen kanssa. |
| website/data/intervention-scenarios.json ja public-mirror | Vain julkaistussa. | Säilytä + vastaava generaattori. |
| website/data/conditional-scenarios.json, public-mirror ja conditional-scenario-explorer.json | Alkuperäinen ja julkaistu jo täsmälleen samat. | Säilytä sellaisinaan. |
| website/public/data/berm_cultural_energy_model.json ja civilization_indices.json | Alkuperäinen sama kuin perusta; julkaistussa vain 2 ja 1 jatkomuutoslehteä. | Julkaistu vastaa edenneen mallin identiteettiä. |

## Lib-koodi, generaattorit ja infra

`website/lib/causalMapData.ts`, `claims/types.ts`, `evidence.ts`, `evolutionData.ts`, `modelArchitecture.ts`, `modulome/organDetailData.ts` sekä claim-registry-testi yhdistyvät kolmikantaisesti ilman konfliktia täsmälleen julkaistuksi versioksi.

Muut käsin luetut lib-erot:

- `causalAtlasData.ts`: interventioiden yhteisen graafin näkymä ja androgeenin saatavuus-/reseptoriankkurit lisätään; ehdollisen L2:n kuvaus tarkentuu.
- `causalAtlasRegistry.ts`: alkuperäiset solmut ja kaaret säilyvät. Julkaistu lisää semanttiset 8 solmua, interventiosolmut ja -kaaret, säilyttää olemassa olevat hakualiaset yhdistettäessä ja mapittaa uudet `conditional_response`/`derived_geometry`-kaarilajit oikein. Vanhaan `proposed_bridge`-haaraan palaaminen kadottaisi tämän erottelun.
- `modulome/layers.ts`: kaikilla viidellä kielellä lisätään esteen eheyttä ja kudosytimen moderaatiota käsittelevä alku. Alkuperäinen vastaanotinkalvon siirrettävyyttä koskeva sisältö säilyy sen perässä.
- `modulome/stateModel.ts`: lisätään `interventionProfileIds` ilman alkuperäisen tyypin poistoa.
- atlas-coverage-testi tarkastaa edelleen jokaisen semanttisen kaaren ja lisää johdetun geometrian tyypin. Atlas-evidence-testi saa kaikkien yhdistettyjen väitteiden sidonnan kattavuustestin. Claim-independence-testi saa lisää tapauksia, joista ei poisteta alkuperäisen testin vaatimusta.

`website/package.json`, `package-lock.json`, `tsconfig.json`, `.vercelignore`, `.gitignore` ja `berm/pyproject.toml` ovat molemmissa työtiloissa samat. `website/vitest.config.ts` on vain julkaistussa muuttunut: `.claude` ja `.agents` suljetaan testihakujen ulkopuolelle, jotta agenttityötilojen testejä ei ajeta tuotantotestien mukana. Riippuvuusversioita ei tarvitse yhdistämisen vuoksi vaihtaa.

`website/public/data/references_full.json` on kanoninen kirjallisuusrekisteri. `website/scripts/build-reference-index.mjs` rakentaa siitä `lib/referenceIndex.json` ja reittikohtaiset `lib/referenceUsage.json`-tiedot. `website/scripts/build-anchor-index.mjs` muodostaa ankkurit sivuista ja atlas-sidoksista. Näihin tuotettuihin sijaintitiedostoihin ei pidä tehdä rivikohtaista yhdistämistä.

## Alkuperäisessä säilytettävä paikallinen aineisto

Alkuperäisessä on 18 alla lueteltua tiedostoa, jotka ovat julkaistusta lähdetyötilasta poissa ja eivät ole Gitissä seurattuja. Ne ovat todellinen paikallisen työtilan lisäarvo: niitä ei saa poistaa hakemistojen peilaamisen tai siivouksen sivuvaikutuksena. Ne eivät ole ristiriitaisia julkaistun lähdetiedostojen kanssa, joten säilytä tavu tarkasti paikallaan ja varmuuskopiossa.

- berm/data/processed/anfr_autonomous_probes_site_time.csv
- berm/data/processed/anfr_autonomous_probes_summary.json
- berm/data/processed/fangr_uk_breed_population_annual.csv
- berm/data/processed/fangr_uk_breed_population_annual_summary.json
- berm/data/processed/ifce_sire_equid_breeding_panel.csv
- berm/data/processed/ifce_sire_equid_breeding_panel_summary.json
- berm/data/processed/mustb_apiary_site_context.csv
- berm/data/processed/mustb_botanical_survey_polygon_context.csv
- berm/data/processed/mustb_spatial_context_availability.json
- berm/data/processed/sentinel_readiness.json
- berm/data/processed/sentinel_species_region_year.csv
- berm/data/processed/sentinel_species_region_year_summary.json
- berm/data/processed/testosterone_secular/usa_t_timeseries.csv
- berm/data/processed/testosterone_tfr/joined_country_data.csv
- berm/data/processed/testosterone_tfr/model_coefficients.csv
- berm/data/processed/veterinary_sentinel_species_site_time.csv
- berm/data/processed/veterinary_sentinel_species_site_time_summary.json
- berm/data/raw/world_bank/wb_global_2026-08-19/country_metadata.json

## Validoi lopullinen yhdistelmä

1. Vertaile kaikkien yllä mainittujen paikallisten lisäaineistojen SHA256 ennen/jälkeen.
2. Tarkista lopullisten kanonisten rekisterien ID-uniikkius sekä kaikkien alkuperäisten ID:iden olemassaolo lopullisessa versiossa; tarkista kaikki julkaistutkin ID:t.
3. Aja Pythonin arkkitehtuuri-, causal-registry/graph-, modulome-, intervention-registry/protocol-, site-sync-, conditional-scenarios- ja civilization-site-sync-testit.
4. Regeneroi `berm/export_architecture.py`, `berm/export_causal_graph.py`, `berm/export_modulome.py`, `berm/export_intervention_profiles.py` ja vastaavat skenaariot vain yhdistetystä Python-lähteestä. Testaa peilien tavu-/JSON-yhtäsuuruus. Muita tulosdatageneraattoreita ei pidä ajaa tarpeettomasti uudelleen, jos niiden lähde tai riippuvuus ei muutu.
5. Sivustossa `npm run references:index`, `npm run references:validate`, `npm run registry:validate`, `node scripts/build-anchor-index.mjs`, `npm test`, `npm run build`. Buildin prebuild ajaa tyypit ja tiukan lintin; postbuild tarkastaa renderöidyn HTML:n.
6. Nykyinen rekisterivalidointi antaa DKC:n aiemmasta täydellisen validoinnin portista 14 varoitusta ja 0 virhettä; ne eivät ole yhdistämisessä syntyneitä uusia virheitä. Säilytä niiden tiedot, älä peitä laskureita.

Koneelliset tarkastusjäljet: `/tmp/berm_registry_threeway_files.json`, `/tmp/berm_registry_threeway_leaves.json`, `/tmp/berm_registry_ts_merges.json`, `/tmp/berm_registry_libdata.diff`. Vertailuskripti: `/tmp/berm_registry_review.py`.
