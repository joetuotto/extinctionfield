# Legacy-evidenssin säilyttävä FieldState–ASFR-v2-siirtymä

## Tarkoitus

`data/evidence/legacy_reference_migration_v1.json` säilyttää aiemman
129-tietueisen A–F-bibliografian **tietuekohtaisena siirtokerroksena**. Se ei
palauta vanhaa A–F-kaaviota aktiiviseksi malliksi eikä kopioi sen aiempia
`finding`-tekstejä nykyisiksi väitteiksi.

Tällä erotetaan kaksi asiaa, joita ei pidä sekoittaa:

| Kerros | Tiedosto | Käyttö |
|---|---|---|
| Aktiivinen FieldState-evidenssi | `data/evidence/fieldstate_causal_evidence.json` | Rajatut, lähde- ja solmukohtaiset rakenneväitteet. Ei TFR-kerrointa. |
| Legacy-siirtokerros | `data/evidence/legacy_reference_migration_v1.json` | Kaikkien 129 historiallisen viitteen säilytys, semanttinen alias ja uudelleentulkinnan tila. Raakamanifesti ei itsessään luo numeerista parametria; lähdevarmennettu tietue voi olla aktiivinen laaja rakenne-, suunta-, viive- tai heterogeenisyyspriori. |

Legacy-aineiston alkuperäinen sisältö on ankkuroitu Git-objektiin
`505f761b3b4d79dbfe8b6cfcb52d3fa79a793ae8` (polku ennen poistoa
`website/public/data/references.json`). Näin bibliografia ja historiallinen
sanamuoto ovat auditointia varten palautettavissa ilman, että vanha sanamuoto
näkyy uusina malliväitteinä.

Manifestin `preserved_metadata_sha256` ja testi varmistavat lisäksi, että
kaikkien 129 tietueen säilytetty bibliografinen metatieto, legacy-polku ja tagit
ovat muuttumattomat suhteessa tähän arkistolähteeseen.

Vanha A–F/T-tunniste on tässä vain provenienssimerkintä. Se ei ole ilman
namespacea kanoninen solmu-ID, koska eri legacy-kerrokset käyttivät samoja
kirjaimia eri merkityksissä. Historiallinen tulkinta tehdään vain
namespace-kelpoisella `berm.biology.legacy_compat`-adapterilla.

## Tietueen rakenne

Jokaisella legacy-ID:llä on:

- säilytetty bibliografinen viite sekä vanha tyyppi, tasotunniste, polku ja tagit;
- `canonical_nodes`: vain nykyiset semanttiset solmu-ID:t;
- `model_domain`: esimerkiksi fysiikka, mekanismi, sentinel, palautumisikkuna,
  farmakologia tai demografinen konteksti;
- `evidence_role`, `status`, `translation_scope` ja `limitations`;
- ainoastaan `STRUCTURAL_ONLY`- tai `CONTEXT_ONLY`-kalibrointirooli.

Tyhjä `canonical_nodes` on tarkoituksellinen. Sitä käytetään esimerkiksi
sentinel-, COVID-/palautumisikkuna-, farmakologia-, oire-, demografia- ja
metodologiatietueissa, kun niiden pakottaminen lisääntymissolmuun loisi uuden
kausaalireunan ilman suoraa evidenssiä. Tietue säilyy tällöin aktiivisena
hypoteesi-, vertailu- tai lähdevarmennusjonona eikä katoa. Se ei vain saa
teeskentelemällä nimettyä biologista reunaa tai piilotettua painoa.

## Tilat

| Tila | Merkitys |
|---|---|
| `SUPERSEDED_BY_ACTIVE_RECORD` | Täsmällinen bibliografinen alias aktiiviseen, rajattuun FieldState-tietueeseen. |
| `MIGRATION_CANDIDATE` | Mahdollisesti solmulle relevantti lähde; aktiivinen kandidaattipriorijono, joka vaatii DOI/PMID-, protokolla- ja päätepistetason tarkistuksen ennen täsmällistä solmu-/suuntaprofiilia. |
| `CONTEXT_ONLY` | Päätepiste-, kovariaatti-, ekologinen tai vaihtoehtoinen konteksti; aktiivinen vertailu- ja heterogeenisyysrajoite, ei automaattinen kausaalinen kerroin. |
| `HISTORICAL_CONTEXT` | Historiallinen tai teoreettinen tausta; aktiivinen hypoteesihaku- ja prioriperheen konteksti, ei yksin mittaussopimuksen mukainen parametrilähde. |
| `UNVERIFIED_CITATION` | Legacy-metatieto on puutteellinen tai placeholder-tyyppinen; lähde säilytetään ja tunnistetaan ennen painotusta, ei oleteta negatiiviseksi näytöksi. |
| `OUTSIDE_ACTIVE_GRAPH` | Lähde säilytetään discovery-arkistossa; se voi tukea tulevaa solmua, vertailijaa tai siirtofunktiota, mutta sitä ei pakoteta väärään nykyreunaan. |

## Miten lähde aktivoidaan myöhemmin

`MIGRATION_CANDIDATE` ei muutu massamuunnoksella numeeriseksi painoksi. Se voi
kuitenkin nousta **aktiiviseksi laajaksi prioriksi** lähdekohtaisessa
[`evidence-constraint-ledger.md`](evidence-constraint-ledger.md)-kerroksessa,
kun DOI/PMID ja tutkimusprotokolla on varmennettu. Kullekin lähteelle tehdään
erillinen solmu-/suunta-/siirtoprofiili, kun:

1. bibliografia, URL/DOI ja ensisijainen lähde on varmennettu;
2. järjestelmä, kenttäluokka, paikallinen altistus/geometria ja päätepiste on
   rajattu;
3. se kytketään vain siihen semanttiseen solmuun, jota tutkimus todella koskee;
4. suoruus, tulkintaraja ja rajoitukset kirjataan; ja
5. sille ilmoitetaan aktiivinen prioritaso (`ACTIVE_STRUCTURAL`,
   `SEMI_QUANTITATIVE_PROTOCOL`, `DIRECT_ENDPOINT_PROTOCOL`,
   `SYNTHESIS_CONVERGENCE` tai `DESCRIPTIVE_SIGNATURE`) ja leveä
   epävarmuusperhe; ja
6. mahdollinen numeerinen endpoint-kalibrointi erotetaan tästä erilliseksi,
   ennalta määritetyksi vaiheeksi.

Tämä mahdollistaa aiemman evidenssin säilymisen, aktiivisen käytön ja
tarkentumisen ilman retroaktiivista TFR-vaikutuskertoimen tai yleisen
EMF-annosväitteen lisäämistä. `STRUCTURAL_ONLY` tarkoittaa tässä, ettei lähde
yksin päätä yhtä numeerista populaatiokerrointa — ei sitä, ettei sen tukea
käytetä BERM:n topologia-, suunta-, viive- tai suskeptibiliteettipriorina.
