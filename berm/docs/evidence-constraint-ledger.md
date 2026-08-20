# EvidenceConstraint-ledger: BERM:n evidenssi aktiivisina priorirajoitteina

## Mikä muuttuu

BERM:n tutkimusnäyttöä ei käsitellä enää binäärisesti: joko paikalliseen
FieldState-paneeliin kalibroitavana tai sivuun jätettävänä. Jokainen
lähdekelpoinen tutkimus voi rajoittaa mallia jo ennen yhtä numeerista
ihmisparametria. `EvidenceConstraint` tekee tämän koneellisesti näkyväksi.

Se erottaa neljä eri inferenssitehtävää:

| Mitä tutkimus osoittaa | Mitä se tekee BERM:ssä | Mitä se ei väitä yksin |
|---|---|---|
| Vektori, tausta, kulma, spektri, pulssi tai polarisaatio muuttaa vastetta | Pakottaa säilyttämään kyseisen FieldState-ominaisuuden ja sen laji-/reseptorikohtaisen siirron. | Yleistä ihmis-TFR-kerrointa. |
| Solu-, elin- tai lisääntymispäätepiste muuttuu kontrolloidussa protokollassa | Antaa suunnan, päätepisteluokan, elin- ja elinvaihehaaran sekä viiveperheen. | Väestötason vaikutuksen suuruutta toisessa altistusgeometriassa. |
| Usea tutkimus tai katsaus yhtyy samaan haaraan | Kaventaa vaihtoehtoisia topologioita ja prioriperheitä riippuvuudet huomioon ottaen. | Katsauksessa olevien primäärilähteiden kaksinkertaista painottamista. |
| Kohortti-, sentinelli- tai ekologinen kuvio | Määrittää ennustettavan ajoitus-, ikä-, laji- tai heterogeenisyysallekirjoituksen. | Paikallisen fysikaalisen annoksen korviketta. |

Tämä on nimenomaan BERM:n omasta logiikasta seuraava tulkinta: Lindgrenin
FieldState on vektori-, spektri-, geometria- ja aikarakenteinen, joten
biologinen evidenssi saa määrätä, mitkä ominaisuudet eivät saa hävitä yhdelle
altistusluvulle. Numeerinen FieldState → endpoint → ASFR/TFR -mapping on
erillinen vaihe, ei evidenssin hylkäämisen ehto.

## Konvergentti ketju

| Evidenssivirta | Aktiivinen mallirajoite | Ennustettava allekirjoitus |
|---|---|---|
| Blackman, Ritz, Usselman, Majewska, Engels, Yoshii, Thielens | `FIELDSTATE_VECTOR`, `FIELDSTATE_ENVELOPE`, `B_RPM_CRY`: tausta, kulma, reseptorigeometria, spektri ja elin-/lajisiirto pidetään erillään. | Sama ulkoinen kenttä voi antaa eri vasteen kulman, taustan, reseptorin, kehon geometrian tai taajuusikkunan mukaan. |
| Pall 2013/2018, Yakymenko, Lai–Singh, Sherrard sekä kontrolloidut ROS-lähteet | `A_VGCC_ROS`: Ca²⁺/redox on aktiivinen mekanismiprior, jossa pidetään kanava-, pulssi-, solu- ja antioksidanttitila näkyvänä. | Vasteiden pitäisi jakautua redox-/kanavatilan, pulssin, taajuuden ja altistusajan mukaan, ei yhden universaalin kulmakertoimen mukaan. |
| De Iuliis, Agarwal, Avendaño, Baldini, Adams, Houston, La Vignera, Yu, Meena, Naderi | `MALE_SPERM`, `BARRIER_BTB`, `MALE_GERMLINE_RESERVE`, `MALE_STEROIDOGENESIS`: akuutti gamettivaste, spermatogeeninen viive ja persistentti BTB/germline-haara erotetaan. | MitoROS, DNA, motiliteetti, vitaalisuus, spermatogeneesi ja tight junction -tilat voivat muuttua eri aikaskaaloilla. |
| Ahmadi, Calis, Yousefi, Manta, Sempou, Liu, He | `VMEM_MTOR`, `BIOELECTRIC_DEVELOPMENT`, `OVARIAN_RESERVE`, `OOCYTE_REDOX`, `OVULATION_CLOCK`, `IMPLANTATION`: naispuoli sisältää sekä palautuvan redox-/kellokomponentin että kehityksellisen muistin. | Prenataali- ja neonataalivaiheen herkkyys voi näkyä myöhempänä reservi- tai laatusignaalina; se ei ole sama asia kuin lyhyt aikuisen ovulaatiovaikutus. |
| Salford, Lochhead, Chakraborty, Yu | BBB ja BTB ovat elinkohtaisia esteitä: redox → tight junction -silta on yhteinen rakenne, mutta kudos, siirto ja viive ovat eri. | Ei yhtä “barrier multiplieria”; paikallinen eliö-/elinarkkitehtuuri määrää vasteen. |
| Shafik, Dincmen, England, Colin, Mallinson, García-Robledo, Shepherd, Šofranková, Morley | `STATIC_TRIBO_INTERFACE`, `FIELDSTATE_LOW_FREQUENCY_ELECTRIC`, `ECOLOGICAL_ENCOUNTER`: staattinen, ELF ja RF pidetään eri kenttäluokkina ja sähköinen kohtaaminen omana ekologisena siirtofunktionaan. | Lajikohtainen kohtaaminen, foraging, kiinnittyminen ja dispersaali muuttuvat materiaalin, varauksen, gradientin, polariteetin, modu­laation ja morfologian mukaan. |
| WPP/WB-kohortti-ASFR | `COUPLE_FECUNDABILITY → ASFR → TFR`: ikä-kohorttiallekirjoitus testataan ennen aggregoitua TFR:ää. | Nuorten ja vanhempien ikäryhmien ero voi edeltää tai poiketa TFR:n summamuutoksesta; demand, tempo ja ART säilyvät erillisinä. |

## Priorit ovat leveitä ja kilpailevia, eivät piilotettu nollaoletus

Ledger käyttää viittä prioritasoa:

1. `ACTIVE_STRUCTURAL_PRIOR`: topologia, välitila tai FieldState-ominaisuus on
   säilytettävä; suuruus jätetään avoimeksi.
2. `SEMI_QUANTITATIVE_PROTOCOL_PRIOR`: kontrolloitu protokolla rajoittaa
   järjestyksen, vasteperheen tai mahdollisen viiveen; siirto kohde-elimeen tai
   -lajiin pysyy leveänä.
3. `DIRECT_ENDPOINT_PROTOCOL_PRIOR`: samaa biologista päätepistettä koskeva
   tutkimus voi informoida protokollasidonnaista endpoint-aluetta. Se ei ole
   automaattisesti väestöparametri.
4. `SYNTHESIS_CONVERGENCE_PRIOR`: katsaus tai meta-analyysi kaventaa
   topologia-/suuntaepävarmuutta, kun riippuvat primäärilähteet lasketaan vain
   kerran.
5. `DESCRIPTIVE_SIGNATURE_PRIOR`: väestö- tai occupational-kuvio rajoittaa
   havaittavaa allekirjoitusta, ei fysikaalista annosta.

Jokainen myöhempi numeerinen ajo raportoidaan ainakin neljällä
herkkyysperheellä: mekanismipainotettu, eläin-/endpoint-painotettu,
ihmispäätepistepainotettu ja heikosti informatiivinen. Kovat rajoitteet ovat
vain fyysinen solmu-/protokollaidentiteetti ja lähteen mittaamat
FieldState-erottelevuudet. Magnitudi-, populaatio- ja lajisiirtopriorit ovat
leveitä; puuttuva paikallinen paneeli ei saa tarkoittaa nollavaikutusprioria.

## Laji–elin–reseptorisiirto ja liikkuva FieldState

Jokaisella rajoitteella on `ReceptorTransferSignature`:

`FieldState features → receptor/interface → endpoint class → species sensitivity signature`.

Esimerkiksi punkin isäntäkohtaamista kuvaava allekirjoitus tarvitsee staattisen
kenttägradientin, ilmarakon, isännän varauksen ja kutikulan/polarisoituvuuden;
se ei ole sama siirtofunktio kuin ihmisen kivesten paikallinen RF-siirto tai
mehiläisen 50 Hz foraging-vaste. Silti ne ovat aktiivisia testijärjestelmiä
saman BERM-periaatteen alla: eliön suhteellinen vaste seuraa sen reseptori-
ja rajapintageometriaa.

`FieldStateMatchContext` hyväksyy myös `MOBILITY_WEIGHTED_CATCHMENT`- ja
`CATCHMENT_RECONSTRUCTED`-liitokset. Ihminen tai eläin voi liikkua koti-,
työ-, koulu-, rehu-, laidun- ja kuljetusympäristöjen välillä. Tällöin
liikkuvuusmalli, peitto, ajallinen kohdistus ja spatiaalinen epävarmuus viedään
likelihoodiin/sensitiivisyysanalyysiin; samaa mittauspaikka-ID:tä ei vaadita
universaalina kelpoisuusehtona.

## 129 lähteen säilyttäminen

`legacy_reference_migration_v1.json` säilyttää kaikki 129 tietuetta.
`legacy_evidence_qualification_v1.json` lisää lähdekohtaisen DOI/PMID-
varmennuksen ja sijoittaa merkittävät lähteet aktiiviseksi laajaksi prioriksi,
aktiiviseksi kandidaattiprioriksi, vertailu-/kontekstirajoitteeksi tai
provenienssiksi. Jokaisella 129 tietueella on `LegacyEvidencePlacement`.

Varmennetut ja aktiivisesti malliin kytketyt lähteet sisältävät mm. Pall
2013/2018, Yakymenko 2016, Adams 2014, Avendaño 2012, Agarwal 2009, Engels
2014, Salford 2003, Yoshii 2009, Shepherd 2018, Panagopoulos 2004, Lai–Singh
2004, Houston 2016, La Vignera 2012, Manta 2014, Thielens 2018 ja Sempou 2022.

Friedman 2007 on erotettu retraction-provenienssiksi eikä saa aktiivista
painoa. Diem 2005 säilyy vakavasti kiistettynä provenance-tietueena eikä saa
aktiivista painoa. Tämä on lähdetarkistusta, ei koko mekanismihaaran tai
aiheeseen liittyvän evidenssin hylkäämistä.

## Käyttö

- Koneellinen ledger: `berm/evidence_constraints.py`
- Kanoniset lähdeprofiilit:
  `data/evidence/fieldstate_evidence_constraints_v1.json`
- Legacy-lähteiden varmennus:
  `data/evidence/legacy_evidence_qualification_v1.json`
- Julkinen yhteenveto: `berm.evidence_constraint_summary()`
- Solmukohtainen haku: `berm.constraints_for_node("MALE_SPERM")`
- FieldState-liitoksen epävarmuus: `FieldStateMatchContext`

FieldState–ASFR-v2:n julkinen tulos palauttaa ledgerin kohdassa
`evidence_constraint_ledger`. Näin mallin käyttäjä näkee, millä solmuilla on
suoraa, epäsuoraa, eri lajeissa konvergoivaa tai kuvailevaa tukea ilman että
yksikään näistä muunnetaan peitetysti TFR-kertoimeksi.
