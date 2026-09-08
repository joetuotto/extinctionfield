# Biologian ja hormonisivujen kuvitusauditointi

Tarkastettu julkaistu snapshot `8fd36d0` hakemistossa `/Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908`. Menetelmä: sivujen ja niiden käyttämien komponenttien lähdekoodin lukeminen. Tämä on kuvitussuunnitelma, ei selaimen ulkoasutestaus, uusi tutkimuskatsaus tai toteutus. Sivuston tiedostoja ei muutettu.

Suurin hyöty syntyy anatomisen sijainnin ja mittakaavan näyttämisestä. Sivustolla on jo paljon prosessikaavioita. Uusi nuoliketju toistaisi usein olemassa olevaa; elin–kudos–solu–soluelin-kuva näyttää, missä sama ketju tapahtuu ja mitä mittaus tavoittaa.

BERM-raja säilyy kaikissa ehdotuksissa: vuoden 2025 premissistä `g = η + κ A⊗A`, kun `A=A₀+a`, seuraa tensorisesti `Δg=κ(A₀⊗a+a⊗A₀+a⊗a)`. Kuvan geometriaosuus ei itsessään johda hormonivasteeseen. Kudoksen tilasta riippuva L2-vastesilta on BERM:n ehdollinen osa; anatomia ja solubiologia ovat tuotuja biologisia komponentteja. Yhteyksien kuvitus ei siirrä niiden näyttöä upstream-geometrian vahvistukseksi. Tämä perustuu luettuun BERM-skilliin ja julkaistuun mallisopimukseen.

## 1. Kiveksen solut ja kompartimentit — P1

**Sijoitus:** `/modulome/testes#components`, osio 01, ennen kanavaprofiilin kortteja. [Lähdekoodi](</Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908/website/app/[locale]/modulome/testes/page.tsx:853>).

**Nyt:** johdantoteksti, neljä kanava-/solukorttia, myöhemmin kaksi mekanismihaaraa ja androgeenisaatavuuden yhtälöt. Anatomista leikkauskuvaa ei ole. Leydig-, Sertoli- ja sukusolut esiintyvät rinnakkaisina nimikkeinä, vaikka niiden sijainnin ymmärtäminen ratkaisee esimerkiksi veren hormonimittauksen tulkintaa.

**Kuva:** kuusi selkeästi nimettyä elementtiä: 1) kiveksen yleiskuva, 2) suurennettu siementiehyen poikkileikkaus, 3) välitilan Leydig-solut ja verisuoni, 4) Sertoli-solujen liitokset ja veri–kiveseste, 5) kehittyvät sukusolut, 6) erillinen kypsän siittiön detalji CatSper-merkintää varten. Veren ja paikallisen hormonitilan ero osoitetaan sanallisilla kompartimenttiselitteillä. Kuvan täytyy estää tulkinta, että kypsän siittiön toiminta ja hormonituotanto ovat sama soluprosessi.

**Muoto:** anatominen vektorikuvitus, staattinen SVG; yksityiskohtien avaaminen voi tulla myöhemmin. Ei punaiseksi väritettyä koko elintä tai kenttää automaattisesti vaurioksi muuttavaa nuolta. Solujen sijainti on biologista taustaa; protokollakohtaiset kenttävasteet ja BERM-synteesi nimetään erikseen. Tämä on ensimmäisenä toteutettava kohde.

## 2. Steroidituotannon soluelinkuva — P1

**Sijoitus:** `/biology/calcium-redox-steroidogenesis#convergence`, nykyisen konvergenssikuvan yhteyteen. [Nykyinen kuva](</Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908/website/components/SteroidogenesisEvidenceExplorer.tsx:105>).

**Nyt:** lähteistetty kuva yhdistää kenttäkokeet kolmeen haaraan: kalsiumsignalointi, paikallinen kello ja kolesterolihuolto. Haarat avaavat tutkimusselaimen suodatuksen. Lisäksi näkyvät yhteinen tuotantovaihe ja redox-varanto. Tätä toimivaa interaktiivista rakennetta kannattaa käyttää uudelleen, ei korvata uudella yleisellä nuolikaaviolla.

**Kuva:** olemassa olevan kuvan anatominen rinnakkaisnäkymä: 1) solukalvo ja solulima, 2) ER-kalsiumvarasto, 3) tuma ja geenisäätely, 4) kolesterolihuolto/autofagia, 5) mitokondrion kalvot ja StAR-kuljetusvaihe, 6) steroidituotannon ulostulo. Nykyisten haarojen valinta korostaa vastaavaa paikkaa solussa ja avaa saman tutkimuksen. Mittakaava nimetään kaaviomaiseksi; välimatkoilla ei kuvata mitattua kinetiikkaa.

**Muoto:** staattinen soluleikkaus SVG:nä, nykyiseen tutkimusvalintaan sidottu kevyt korostus. Kuva näyttää koneiston sijainnin, ei uusia reittejä. TM3-, MA-10- ja ihmiskudoskokeita ei yhdistetä yhden kuvitteellisen kokeen havainnoiksi. Fysikaalinen syöte sijoitetaan erilliseen BERM-vastesillan kehykseen; soluelinten väliin ei piiloteta geometria→hormoni-kalibrointia.

## 3. Mitä testosteroniverikoe mittaa — P1

**Sijoitus:** `/evidence/testosterone`, ”Mitä kokonais-testosteronimittaus voi jättää piiloon” -osio; nykyinen osio on ilman omaa ID:tä. [Lähdekoodi](</Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908/website/app/[locale]/evidence/testosterone/page.tsx:366>).

**Nyt:** kaksi korttia, sitoutumisen massatasapainoyhtälö, reseptorivasteen yhtälö ja lähteistetty näyttöraja. Muualla sivulla on jo trendi-/lajienvälisiä vertailuja, ja atlakseen pääsee linkillä. Tarvitaan mittauksen selitys, ei uusi laskukäyrä.

**Kuva:** 1) verinäyte, 2) verenkierrossa vapaa T, SHBG:hen ja albumiiniin sitoutunut T, 3) sama kokonaismäärä kahdessa erilaisessa jakaumaesimerkissä, 4) kudoksen vastaanottava solu, 5) toisistaan erotetut AR/ZIP9 ja niiden jälkeinen vaste, 6) erillinen intratestikulaarinen kompartimentti. Jakaumaesimerkeissä ei anneta keksittyjä prosenttiosuuksia.

**Muoto:** staattinen kompartimenttikuva, mahdollisesti yksi ”mitattu / johdettu / avoin” -korostusvalinta. Sitoutuminen, kudostoiminta ja BERM:n AEC-sulku erotetaan. Normaali kokonais-T ei kuvassa tarkoita automaattisesti piilevää vauriota. Sama kuvitus voidaan käyttää tiivistettynä `/modulome/testes`-sivun 03b-osiossa.

## 4. Hypotalamus ja aivolisäkkeen verisuoniyhteydet — P2, sisältörajaus ensin

**Sijoitus:** `/modulome/pituitary#outside-bbb`, osio 01. [Lähdekoodi](</Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908/website/app/[locale]/modulome/pituitary/page.tsx:631>).

**Nyt:** anatomiset väitteet ovat tekstissä, hormonisolut korteissa ja GnRH-pulssien tulkinta myöhemmässä sanallisessa ketjussa. Yleinen aivoikoni ei näytä aivolisäkkeen paikkaa tai kudosten rajoja.

**Kuva:** 1) pään/aivojen pieni sagittaalinen paikannin, 2) hypotalamus, 3) etu- ja takalohkon erottelu, 4) hormonaalisen viestin verisuonireitti, 5) kohde-elimiin jatkuvat LH/FSH-yhteydet. Paikat ja kulkureitit tarkistetaan anatomialähteestä ennen tuotantoa.

**Muoto:** anatominen SVG. Nykyisen tekstin ilmaisuja ”ei suojaavaa estettä” ja `chi_barrier = 1.0` ei saa muuttaa kuvan mitatuksi EMF-vaimennukseksi. Verisuoniraja ja fysikaalinen kenttäkytkentä ovat erikseen perusteltavia asioita. Siksi tämä kuva tarvitsee samalla nykyisen kuvatekstin rajauksen; muutoin se vahvistaisi juuri lukijan väärää mielikuvaa sähkömagneettisesta suojamuurista.

## 5. Haiman saareke ja insuliinin eritys — P2

**Sijoitus:** `/modulome/pancreas`, osio 02 ”Glukoosin stimuloima insuliinieritys”, ilman omaa ID:tä. [Lähdekoodi](</Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908/website/app/[locale]/modulome/pancreas/page.tsx:606>).

**Nyt:** kanavataulukko, peräkkäiset fysiologiakappaleet ja seuraavan osion tekstimuotoinen ateriaikkuna. Modulomin yleissivun kalsiumkiertokuva on jo olemassa, mutta se ei paikanna haiman saareketta tai eritysrakkuloita.

**Kuva:** 1) haima→saareke-suurennos, 2) β-solu, 3) glukoosi/metabolinen tila, 4) ATP/K_ATP ja kalvojännite, 5) kalsiumkanava, 6) insuliinirakkulan eritys verenkiertoon. Samaa soluleikkauspohjaa voi käyttää kohteessa 2, mutta hormonin synteesiä ja rakkulaeritystä ei yhdistetä samaksi ulostuloksi.

**Muoto:** aluksi staattinen SVG, ilman kuvitteellista ateriavastetta. Laji-/solujärjestelmäkohtaiset kuljettaja- ja kanavamäärittelyt tarkistetaan ennen piirtämistä. BERM:n ateriatilasta riippuva kenttävaste näkyy erillisenä ehdollisena kysymyksenä; fysiologian kuvasta ei johdeta yleistä EMF→diabetes-vaikutusta.

## 6. Modulomin anatominen hakemisto — P2

**Sijoitus:** `/modulome`, osio 14 ”Kaksitoista kohde-elintä”, ilman omaa ID:tä. [Lähdekoodi](</Volumes/kovalevy 3/berm-release-worktrees/atlas-calibration-20260908/website/app/[locale]/modulome/page.tsx:753>).

**Nyt:** `ORGAN_PROFILES` tuottaa korttiruudukon. Sitä ennen on jo kerrospino, vastaanottajatilojen vertailu, kalsiumkierto, valohistoria, suuntariippuvuus, vasteikkuna ja palautumisen vakaus. Niitä ei tarvitse piirtää uudelleen.

**Kuva:** 1) neutraali kehon sijaintikartta, 2) suurennettu aivoalueiden paikannin, 3) umpierityselinten paikat, 4) valitun elimen yksi solu-/toimintotieto, 5) linkki samaan olemassa olevaan elinprofiiliin. Elinluettelo säilyy rinnalla tekstinä ja näppäimistöllä käytettävänä.

**Muoto:** interaktiivinen anatominen hakemisto, ei lämpökartta. Väri tarkoittaa valintaa tai elintyyppiä; värikylläisyys ei saa esittää kalibroimatonta herkkyyttä, elinten paremmuusjärjestystä tai näyttötasoa. Hakemisto toimii myös biologian yleissivun tiiviinä sisääntulona ilman uutta koko mallin kausaalikaaviota.

## Toteutusjärjestys

Ensimmäinen yhtenäinen kuvituspaketti on kiveksen anatomia, steroidituotannon soluleikkaus ja testosteronimittauksen kompartimentit. Niiden yhteinen kuvakieli opettaa siirtymän elimestä soluun ja mittauksesta toimintoon. Kuvateksti, suorat nimilaput ja mobiilissa allekkain asettuvat suurennokset ovat hyödyllisempiä kuin runsas animaatio. Jokaisella kuvalla tulee olla tekstivastine ja lähdekohtainen selite. Tämän auditin perusteella kuvitusta ei tarvitse lisätä kaikkialle: nykyiset konvergenssi- ja tilakaaviot ovat uudelleenkäytettävää sisältöä.
