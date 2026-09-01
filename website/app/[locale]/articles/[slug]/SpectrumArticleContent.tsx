import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    refsTitle: "References",
    sections: [
      [
        "In December 2025, [[ref:tdcs_fda_depression_2025|the FDA granted premarket approval to a medical device that treats major depression by passing a direct current of 2 milliamps through electrodes placed on the forehead]]. The therapeutic electric field in the brain cortex is 0.3 to 1.0 volts per meter. At this intensity, neurons change their firing patterns, neurotransmitter release is modulated, and symptoms of treatment-resistant depression improve in randomized controlled trials.",
        "The same month, [[ref:icnirp2020|the International Commission on Non-Ionizing Radiation Protection]] maintained its position that non-thermal electromagnetic effects below established exposure limits do not occur in humans.",
        "These two statements cannot both be true.",
      ],
      [
        "The device — [[ref:tdcs_fda_depression_2025|Flow Neuroscience's tDCS headset]] — is not an anomaly. It is the latest entry in a catalogue of 24 or more FDA-approved device categories whose clinical efficacy depends entirely on non-thermal electromagnetic biological effects. Each approval required what the FDA calls 'substantial evidence of effectiveness': clinical trials demonstrating that electromagnetic energy produces a measurable biological response without heating tissue.",
        "The catalogue spans the entire electromagnetic spectrum. At the lowest frequencies, [[ref:pemf_bone_fda_review_2020|pulsed electromagnetic field (PEMF) bone growth stimulators have held FDA approval since 1979]]. They accelerate fracture healing at field strengths of 1 to 100 hertz — frequencies so low they overlap with Earth's geomagnetic field. TENS units for pain management hold over 12,000 individual 510(k) clearances. Deep brain stimulation, approved in 1997, uses implanted electrodes to deliver continuous electrical pulses that control Parkinson's tremors.",
        "Moving up the spectrum: repetitive transcranial magnetic stimulation (rTMS) for depression, cleared in 2008, induces currents in the brain without any physical contact. Vagus nerve stimulation treats epilepsy and depression. Cochlear implants convert sound into electrical signals that the auditory nerve interprets as hearing. None of these involve thermal heating. All require proof that electromagnetic energy changes biology.",
      ],
      [
        "Then comes the intermediate frequency range — 1 kilohertz to 1 megahertz — and the proof becomes impossible to ignore.",
        "In 2011, [[ref:ttfields_novocure_fda|the FDA approved Optune, a device manufactured by Novocure that treats glioblastoma brain cancer by applying alternating electric fields at 200 kilohertz]]. The fields — called Tumor Treating Fields, or TTFields — disrupt cell division by interfering with the molecular machinery of mitosis. They do not heat the tissue. The mechanism is purely electromagnetic: the alternating field exerts forces on charged and polarized molecules in dividing cells, disrupting the formation of the mitotic spindle and causing abnormal chromosome segregation.",
        "[[ref:ttfields_novocure_fda|Novocure received a second FDA approval in 2015 for mesothelioma, and a third in 2026. The EF-14 phase III trial demonstrated a median survival increase from 16 to 20.9 months]] — a result significant enough to change the standard of care for the deadliest brain cancer.",
        "[[ref:ttfields_novocure_fda|The Novocure patent — US 7,016,725]] — contains a sentence that should appear in every discussion of electromagnetic safety. In describing which cells are most susceptible to disruption by intermediate-frequency fields, the patent states that 'cells in the ovaries or testicles may be sensitive to the electric fields.' The patent identifies a cell size–frequency relationship: the optimal disruption frequency is inversely proportional to cell diameter. For spermatogonia — the precursor cells of sperm, approximately 12 micrometers in diameter — the predicted resonant frequency is approximately 310 kilohertz.",
        "This is the same frequency range produced by the switch-mode power supplies inside LED light bulbs: 20 to 200 kilohertz.",
      ],
      [
        "At the high end of the spectrum, the biological activity of electromagnetic radiation becomes so obvious that we have a special word for it: vision. [[ref:vaziri2016|The human retina responds to individual photons carrying approximately 10⁻¹⁹ joules of energy]]. Photobiomodulation therapy — red and near-infrared light applied to tissue — holds FDA clearance for wound healing and pain management. Blue light phototherapy for neonatal jaundice has been standard care for decades. Ultraviolet phototherapy treats psoriasis and eczema.",
        "Taken together, these 24+ device categories establish a single, inescapable fact: non-thermal electromagnetic biological effects are real, clinically proven, and regulatory-validated at every frequency from DC to ultraviolet light.",
        "Every frequency except one range.",
      ],
      [
        "The gap sits between 300 megahertz and 6 gigahertz — the frequencies used by mobile telecommunications. This is not a gap in biology. It is a gap in acknowledgment.",
        "The global telecommunications industry generates approximately $1.9 trillion in annual revenue. No regulatory body has approved a therapeutic device operating specifically in this band for non-thermal biological effects — not because such effects have been disproven, but because no manufacturer has submitted one for approval. The absence of a device approval is not evidence of absence of effect.",
        "The safety standards for this frequency range — [[ref:icnirp2020|ICNIRP guidelines]] and IEEE C95.1 — are based on a thermal model: they protect against tissue heating, nothing else. The specific absorption rate (SAR) limits were established on the assumption that if tissue is not heated, no biological effect occurs. This assumption is contradicted by every device approval in the catalogue.",
      ],
      [
        "Consider the arithmetic of field strength. The FDA approved tDCS at a therapeutic cortical field strength of 0.3 to 1.0 V/m. Independent measurements of urban ambient radiofrequency fields in European cities range from 0.67 to 1.51 V/m. These are the same order of magnitude.",
        "If 0.3 V/m of direct current is biologically active enough to treat major depression — active enough for the FDA to grant premarket approval based on clinical trial data — then 0.67 V/m of radiofrequency energy cannot be assumed biologically inert. The burden of proof has been inverted: it is no longer the responsibility of critics to prove that ambient EMF has biological effects. That proof already exists in the FDA's own device approval database. The responsibility now falls on safety standard-setters to explain why therapeutic-level fields are biologically active inside a clinic but biologically inert outside it.",
        "They cannot, because the fields do not know they have left the building.",
      ],
      [
        "There is a deeper principle at work. [[ref:zakon2012_ion_channel_evolution|The ion channels that mediate electromagnetic sensitivity in biological tissue are among the most evolutionarily conserved molecular structures on Earth]]. Voltage-gated calcium channels, potassium channels, and sodium channels are found in organisms from bacteria to humans. Their basic architecture has been preserved for approximately three billion years.",
        "These channels evolved in an electromagnetic environment that contained exactly two signals: Earth's steady geomagnetic field (approximately 25 to 65 microtesla) and the Schumann resonances (approximately 7.83 hertz and harmonics), generated by global lightning activity. For 3.8 billion years, there were no radiofrequencies. No intermediate frequencies. Nothing above a few hundred hertz.",
        "Evolution builds filters for signals that recur. Organisms evolved sophisticated mechanisms to use the geomagnetic field for navigation and the Schumann resonances for circadian synchronization. But they built no filter for electromagnetic frequencies that nature never produced — because there was nothing to filter against.",
        "This is the evolutionary calibration principle: biological electromagnetic sensitivity is calibrated to the natural environment. When the environment changes faster than evolution can respond, organisms are exposed to signals they have no mechanism to reject. The human electromagnetic environment has changed more in the last 130 years than in the preceding 3.8 billion. Mobile telephony — the dominant source of personal RF exposure — has existed for approximately 40 years. LED lighting — the dominant source of intermediate-frequency exposure — has been widespread for approximately 15 years.",
        "Evolution operates on timescales of thousands of generations. Forty years is not a generation.",
      ],
      [
        "The therapeutic device paradox is not a conspiracy theory. It is a logical observation about the internal consistency of regulatory frameworks. The FDA and ICNIRP are not adversaries; they are two regulatory bodies whose positions are mutually incompatible on a question of basic physics.",
        "The resolution is simple: either non-thermal electromagnetic biological effects exist (in which case safety standards must account for them) or they do not (in which case 24+ device categories are approved on a false premise and should be withdrawn). There is no third option in which electromagnetic fields are biologically active when applied by a physician but biologically inert when applied by a cell tower.",
        "No one is proposing to withdraw tDCS, TTFields, bone growth stimulators, cochlear implants, or photobiomodulation devices. The clinical evidence is overwhelming. These devices work.",
        "Which means the safety standards are incomplete.",
      ],
    ],
    references: [
      { referenceId: "tdcs_fda_depression_2025", label: "Flow Neuroscience tDCS (FDA PMA, December 2025). Therapeutic cortical field: 0.3–1.0 V/m DC." },
      { referenceId: "ttfields_novocure_fda", label: "Novocure Optune TTFields (FDA PMA P100034, 2011/2015/2026). EF-14: median OS 20.9 vs 16.0 months. Patent US 7,016,725." },
      { referenceId: "pemf_bone_fda_review_2020", label: "EBI Bone Healing System (FDA PMA, 1979). PEMF non-thermal bone healing, 1–100 Hz." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and WC EMFs. Frontiers in Public Health, 13:1585441. IFO threshold: 10⁻⁵ V/m." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling: conformational change without ion flux. Nature Reviews Neuroscience." },
      { referenceId: "vaziri2016", label: "Vaziri A, Bhatt D et al. (2016). Direct detection of a single photon by humans. Nature Communications, 7, 12172." },
      { referenceId: "icnirp2020", label: "ICNIRP (2020). Guidelines for limiting exposure to electromagnetic fields (100 kHz to 300 GHz). Health Physics, 118(5), 483–524." },
      { referenceId: "campisi2010", label: "Campisi A et al. (2010). Reactive oxygen species levels and DNA fragmentation on astrocytes in primary culture after acute exposure to low intensity microwave. Neuroscience Letters, 473(1), 52–55." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). Adaptive evolution of voltage-gated sodium channels: the first 800 million years. PNAS, 109(Suppl 1), 10619–10625." },
    ],
  },
  fi: {
    refsTitle: "Lähdeluettelo",
    sections: [
      [
        "Joulukuussa 2025 [[ref:tdcs_fda_depression_2025|FDA myönsi ennakkohyväksynnän lääkinnälliselle laitteelle, joka hoitaa vakavaa masennusta johtamalla 2 milliampeerin tasavirran otsalle asetettujen elektrodien läpi]]. Terapeuttinen sähkökenttä aivokuoressa on 0,3–1,0 volttia metrillä. Tällä intensiteetillä hermosolut muuttavat laukaisumallejaan, välittäjäaineiden vapautuminen muuttuu ja hoitoresistentin masennuksen oireet paranevat satunnaistetuissa kontrolloiduissa tutkimuksissa.",
        "Samana kuukautena [[ref:icnirp2020|kansainvälinen ionisoimattoman säteilyn suojelukomissio (ICNIRP)]] piti voimassa kantansa, jonka mukaan ei-termisiä sähkömagneettisia vaikutuksia ei esiinny vahvistettujen altistusrajojen alapuolella.",
        "Nämä kaksi väitettä eivät voi molemmat olla totta.",
      ],
      [
        "Laite — [[ref:tdcs_fda_depression_2025|Flow Neurosciencen tDCS-otsapanta]] — ei ole poikkeus. Se on viimeisin lisäys 24 tai useamman FDA-hyväksytyn laitekategorian luetteloon, joiden kliininen teho perustuu kokonaan ei-termisiin sähkömagneettisiin biologisiin vaikutuksiin. Jokainen hyväksyntä edellytti kliinisiä tutkimuksia, jotka osoittavat, että sähkömagneettinen energia tuottaa mitattavan biologisen vasteen ilman kudoksen kuumentamista.",
        "Luettelo kattaa koko sähkömagneettisen spektrin. Matalimmilla taajuuksilla [[ref:pemf_bone_fda_review_2020|pulssimaisen sähkömagneettisen kentän (PEMF) luunkasvustimulaattorit ovat saaneet FDA-hyväksynnän vuodesta 1979]]. Ne nopeuttavat murtumien paranemista 1–100 hertsin kenttävoimakkuuksilla. TENS-laitteilla on yli 12 000 yksittäistä 510(k)-hyväksyntää. Syväaivostimulaatio, hyväksytty 1997, käyttää implantoituja elektrodeja hallitsemaan Parkinsonin vapinaa.",
        "Ylöspäin spektrissä: repetatiivinen transkraniaalinen magneettistimulaatio (rTMS) masennukseen (2008) aiheuttaa virtoja aivoissa ilman fyysistä kontaktia. Vagushermostimulaatio hoitaa epilepsiaa ja masennusta. Sisäkorvaimplantit muuntavat äänen sähkösignaaleiksi. Mikään näistä ei sisällä termistä kuumentamista. Kaikki edellyttävät todistamista, että sähkömagneettinen energia muuttaa biologiaa.",
      ],
      [
        "Sitten tulee välitaajuusalue — 1 kilohertsistä 1 megahertsiin — ja todistusaineisto muuttuu mahdottomaksi sivuuttaa.",
        "Vuonna 2011 [[ref:ttfields_novocure_fda|FDA hyväksyi Optunen, Novocuren valmistaman laitteen, joka hoitaa glioblastoomaaivokasvaimia 200 kilohertsin vaihtokentillä]]. Kentät — nimeltään TTFields eli kasvaimia hoitavat kentät — häiritsevät solunjakautumista häiritsemällä mitoosin molekulaarikoneistoa. Ne eivät kuumenna kudosta. Mekanismi on puhtaasti sähkömagneettinen.",
        "[[ref:ttfields_novocure_fda|Novocure sai toisen FDA-hyväksynnän 2015 mesoteliooman hoitoon ja kolmannen 2026. EF-14-vaiheen III tutkimus osoitti mediaanin elossaoloajan pidentymisen 16:sta 20,9 kuukauteen]].",
        "[[ref:ttfields_novocure_fda|Novocuren patentti — US 7 016 725]] — sisältää lauseen, jonka pitäisi esiintyä jokaisessa sähkömagneettisen turvallisuuden keskustelussa. Patentti toteaa, että 'munasarjojen tai kivesten solut voivat olla herkkiä sähkökentille'. Patentti tunnistaa solukoko–taajuussuhteen: optimaalinen häiriötaajuus on kääntäen verrannollinen solun halkaisijaan. Spermatogonioille — siittiöiden esisoluille, halkaisijaltaan noin 12 mikrometriä — ennustettu resonanssitaajuus on noin 310 kilohertsiä.",
        "Tämä on sama taajuusalue, jonka LED-lamppujen hakkuriteholähteet tuottavat: 20–200 kilohertsiä.",
      ],
      [
        "Spektrin yläpäässä sähkömagneettisen säteilyn biologinen aktiivisuus on niin ilmeistä, että sille on oma sanansa: näkö. [[ref:vaziri2016|Ihmisen verkkokalvo reagoi yksittäisiin fotoneihin, joiden energia on noin 10⁻¹⁹ joulea]]. Fotobiomodulaatioterapia — punaista ja lähi-infrapunavaloa kudokseen — on FDA-hyväksytty haavan paranemiseen ja kivunlievitykseen. Sinivaloterapia vastasyntyneiden keltaisuuteen on ollut standardihoitoa vuosikymmeniä. UV-valohoito hoitaa psoriasista ja ekseemaa.",
        "Yhdessä nämä 24+ laitekategoriaa todistavat yhden kiistattoman tosiasian: ei-termiset sähkömagneettiset biologiset vaikutukset ovat todellisia, kliinisesti todistettuja ja regulatiivisesti validoituja jokaisella taajuudella DC:stä ultraviolettivaloon.",
        "Jokaisella taajuudella paitsi yhdellä alueella.",
      ],
      [
        "Aukko sijaitsee 300 megahertsin ja 6 gigahertsin välillä — taajuuksilla, joita mobiilitelekommunikaatio käyttää. Tämä ei ole biologian aukko. Se on tunnustamisen aukko.",
        "Globaali telekommunikaatioteollisuus tuottaa noin 1,9 biljoonan dollarin vuositulot. Yksikään sääntelijä ei ole hyväksynyt terapeuttista laitetta, joka toimisi nimenomaan tällä kaistalla ei-termisten biologisten vaikutusten perusteella — ei siksi, että tällaiset vaikutukset olisi kumottu, vaan koska kukaan valmistaja ei ole jättänyt sellaista hyväksyttäväksi. Laitehyväksynnän puuttuminen ei ole todiste vaikutuksen puuttumisesta.",
        "Tämän taajuusalueen turvallisuusstandardit — [[ref:icnirp2020|ICNIRPin ohjeet]] ja IEEE C95.1 — perustuvat termiseen malliin: ne suojaavat kudoksen kuumenemiselta, eivät miltään muulta.",
      ],
      [
        "Tarkastellaan kenttävoimakkuuksien aritmetiikkaa. FDA hyväksyi tDCS:n terapeuttisella aivokuoren kenttävoimakkuudella 0,3–1,0 V/m. Riippumattomat mittaukset eurooppalaisten kaupunkien radiotaajuuskentistä vaihtelevat 0,67–1,51 V/m. Nämä ovat samaa suuruusluokkaa.",
        "Jos 0,3 V/m tasavirtaa on biologisesti riittävän aktiivista vakavan masennuksen hoitoon — riittävän aktiivista FDA:n ennakkohyväksynnälle kliinisten tutkimusten perusteella — niin 0,67 V/m radiotaajuusenergiaa ei voida olettaa biologisesti inertiksi. Todistustaakka on kääntynyt: ei ole enää kriitikkojen vastuulla todistaa, että ambient-EMF:llä on biologisia vaikutuksia. Se todiste on jo olemassa FDA:n omassa laitehyväksyntätietokannassa.",
        "Kentät eivät tiedä poistuneensa klinikalta.",
      ],
      [
        "Taustalla on syvempi periaate. [[ref:zakon2012_ion_channel_evolution|Ionikanavat, jotka välittävät sähkömagneettista herkkyyttä biologisessa kudoksessa, ovat evoluution parhaiten säilyneitä molekulaarirakenteita]]. Jänniteohjatut kalsium-, kalium- ja natriumkanavat löytyvät bakteereista ihmisiin. Niiden perusrakenne on säilynyt noin kolme miljardia vuotta.",
        "Nämä kanavat kehittyivät sähkömagneettisessa ympäristössä, joka sisälsi täsmälleen kaksi signaalia: Maan tasaisen geomagneettisen kentän (noin 25–65 mikroteslaa) ja Schumannin resonanssit (noin 7,83 Hz ja harmoniset), jotka syntyivät maailmanlaajuisesta salamatoiminnasta. 3,8 miljardin vuoden ajan ei ollut radiotaajuuksia. Ei välitaajuuksia. Ei mitään muutaman sadan hertsin yläpuolella.",
        "Evoluutio rakentaa suodattimia signaaleille, jotka toistuvat. Organismit kehittivät hienostuneita mekanismeja käyttämään geomagneettista kenttää navigointiin ja Schumannin resonansseja sirkadiaaniseen synkronointiin. Mutta ne eivät rakentaneet suodatinta sähkömagneettisille taajuuksille, joita luonto ei koskaan tuottanut — koska ei ollut mitään suodatettavaa.",
        "Tämä on evoluutiokalibrointiperiaate: biologinen sähkömagneettinen herkkyys on kalibroitu luonnolliseen ympäristöön. Ihmisen sähkömagneettinen ympäristö on muuttunut viimeisen 130 vuoden aikana enemmän kuin edeltävän 3,8 miljardin vuoden aikana. Mobiilitelefonia on ollut olemassa noin 40 vuotta. LED-valaistus on ollut laajalle levinnyt noin 15 vuotta.",
        "Evoluutio toimii tuhansien sukupolvien aikajaksoilla. Neljäkymmentä vuotta ei ole sukupolvi.",
      ],
      [
        "Terapeuttisten laitteiden paradoksi ei ole salaliittoteoria. Se on looginen havainto sääntelykehysten sisäisestä johdonmukaisuudesta. FDA ja ICNIRP eivät ole vastustajia; ne ovat kaksi sääntelijää, joiden kannat ovat keskenään yhteensopimattomia perustavan fysiikan kysymyksessä.",
        "Ratkaisu on yksinkertainen: joko ei-termiset sähkömagneettiset biologiset vaikutukset ovat olemassa (jolloin turvallisuusstandardien on otettava ne huomioon) tai niitä ei ole (jolloin 24+ laitekategoriaa on hyväksytty väärällä perusteella ja ne pitäisi vetää markkinoilta). Kolmatta vaihtoehtoa ei ole, jossa sähkömagneettiset kentät olisivat biologisesti aktiivisia lääkärin antamina mutta biologisesti inerttejä tukiaseman lähettäminä.",
        "Kukaan ei ehdota tDCS:n, TTFieldsin, luunkasvustimulaattoreiden, sisäkorvaistutteiden tai fotobiomodulaatiolaitteiden vetämistä markkinoilta. Kliininen näyttö on ylivoimainen. Nämä laitteet toimivat.",
        "Mikä tarkoittaa, että turvallisuusstandardit ovat puutteelliset.",
      ],
    ],
    references: [
      { referenceId: "tdcs_fda_depression_2025", label: "Flow Neuroscience tDCS (FDA PMA, joulukuu 2025). Terapeuttinen aivokuoren kenttä: 0,3–1,0 V/m DC." },
      { referenceId: "ttfields_novocure_fda", label: "Novocure Optune TTFields (FDA PMA P100034, 2011/2015/2026). EF-14: mediaani OS 20,9 vs. 16,0 kk. Patentti US 7 016 725." },
      { referenceId: "pemf_bone_fda_review_2020", label: "EBI Bone Healing System (FDA PMA, 1979). PEMF:n ei-terminen luunparaneminen, 1–100 Hz." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ ym. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and WC EMFs. Frontiers in Public Health, 13:1585441. IFO-kynnys: 10⁻⁵ V/m." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling. Nature Reviews Neuroscience." },
      { referenceId: "vaziri2016", label: "Vaziri A, Bhatt D ym. (2016). Direct detection of a single photon by humans. Nature Communications, 7, 12172." },
      { referenceId: "icnirp2020", label: "ICNIRP (2020). Guidelines for limiting exposure to electromagnetic fields (100 kHz – 300 GHz). Health Physics, 118(5), 483–524." },
      { referenceId: "campisi2010", label: "Campisi A ym. (2010). Reactive oxygen species levels and DNA fragmentation. Neuroscience Letters, 473(1), 52–55." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). Adaptive evolution of voltage-gated sodium channels: the first 800 million years. PNAS, 109(Suppl 1), 10619–10625." },
    ],
  },
  ja: {
    refsTitle: "参考文献",
    sections: [
      [
        "2025年12月、[[ref:tdcs_fda_depression_2025|FDAは前額部に置いた電極を通じて2ミリアンペアの直流電流を流すことで大うつ病を治療する医療機器に市販前承認を与えました]]。脳皮質における治療用電場は0.3〜1.0ボルト/メートルです。この強度でニューロンは発火パターンを変え、神経伝達物質の放出が調節され、治療抵抗性うつ病の症状がランダム化比較試験で改善します。",
        "同じ月、[[ref:icnirp2020|国際非電離放射線防護委員会（ICNIRP）]]は、確立された曝露限度以下での非熱的電磁効果はヒトでは発生しないという立場を維持しました。",
        "これら2つの主張は同時に真であることはできません。",
      ],
      [
        "この機器 — [[ref:tdcs_fda_depression_2025|Flow NeuroscienceのtDCSヘッドセット]] — は異常ではありません。臨床的有効性が完全に非熱的電磁生物学的効果に依存する24以上のFDA承認機器カテゴリーのカタログの最新エントリーです。各承認には、電磁エネルギーが組織を加熱せずに測定可能な生物学的応答を生じることを実証する臨床試験が必要でした。",
        "カタログは電磁スペクトル全体にわたります。最低周波数では、[[ref:pemf_bone_fda_review_2020|パルス電磁場（PEMF）骨成長刺激装置が1979年以来FDA承認を保持しています]]。TEMSユニットには12,000以上の個別510(k)許可があります。深部脳刺激は1997年に承認され、パーキンソン病の震えを制御します。",
        "スペクトルの上方では：反復経頭蓋磁気刺激（rTMS）がうつ病に対して2008年に許可されました。迷走神経刺激はてんかんとうつ病を治療します。蝸牛インプラントは音を電気信号に変換します。これらのどれも熱加温を伴いません。",
      ],
      [
        "次に中間周波数範囲 — 1キロヘルツから1メガヘルツ — が来て、証拠は無視不可能になります。",
        "2011年に[[ref:ttfields_novocure_fda|FDAはOptuneを承認しました。Novocure社製のこの機器は200キロヘルツの交流電場を適用して膠芽腫脳腫瘍を治療します]]。これらのフィールド — 腫瘍治療電場（TTFields）— は有糸分裂の分子機構を妨害して細胞分裂を阻害します。組織を加熱しません。",
        "[[ref:ttfields_novocure_fda|Novocureは2015年に中皮腫で2番目のFDA承認を、2026年に3番目を受けました。EF-14第III相試験は生存期間中央値が16から20.9ヶ月に延長することを実証しました]]。",
        "[[ref:ttfields_novocure_fda|Novocureの特許 — US 7,016,725]] — には電磁安全性のあらゆる議論に現れるべき一文が含まれています。中間周波数場による攪乱に最も感受性の高い細胞について、特許は「卵巣または精巣の細胞は電場に感受性がある可能性がある」と述べています。精原細胞 — 精子の前駆細胞、直径約12マイクロメートル — の予測共鳴周波数は約310キロヘルツです。",
        "これはLED電球内のスイッチモード電源が生成するのと同じ周波数範囲です：20〜200キロヘルツ。",
      ],
      [
        "スペクトルの上端では、電磁放射線の生物学的活性は非常に明らかなため特別な言葉があります：視覚。[[ref:vaziri2016|ヒトの網膜は約10⁻¹⁹ジュールのエネルギーを持つ個々の光子に応答します]]。フォトバイオモジュレーション療法はFDA許可を保持しています。新生児黄疸に対する青色光光線療法は数十年間標準治療でした。",
        "これら24以上の機器カテゴリーを合わせると、単一の避けられない事実が確立されます：非熱的電磁生物学的効果はDCから紫外光までのあらゆる周波数で実在し、臨床的に証明され、規制上検証されています。",
        "1つの範囲を除くすべての周波数で。",
      ],
      [
        "ギャップは300メガヘルツと6ギガヘルツの間に位置します — 移動体通信で使用される周波数です。これは生物学のギャップではありません。認知のギャップです。",
        "世界の電気通信産業は年間約1.9兆ドルの収益を生み出しています。この周波数帯域での安全基準 — [[ref:icnirp2020|ICNIRPガイドライン]]とIEEE C95.1 — は熱モデルに基づいています：組織加熱からのみ保護します。",
      ],
      [
        "電場強度の算術を考えてみましょう。FDAは0.3〜1.0 V/mの治療的皮質電場強度でtDCSを承認しました。ヨーロッパの都市における都市部の周囲無線周波数場の独立測定は0.67〜1.51 V/mの範囲です。これらは同じ桁です。",
        "0.3 V/mの直流が大うつ病を治療するのに十分な生物学的活性がある場合、0.67 V/mの無線周波数エネルギーが生物学的に不活性であると仮定することはできません。立証責任が逆転しました。",
        "フィールドは建物を出たことを知りません。",
      ],
      [
        "より深い原理が働いています。[[ref:zakon2012_ion_channel_evolution|生体組織で電磁感受性を媒介するイオンチャネルは、地球上で最も進化的に保存された分子構造の一つです]]。電圧依存性カルシウムチャネル、カリウムチャネル、ナトリウムチャネルは細菌からヒトまでの生物に見られます。",
        "これらのチャネルは、正確に2つの信号を含む電磁環境で進化しました：地球の定常地磁気場（約25〜65マイクロテスラ）とシューマン共鳴（約7.83 Hzとその高調波）。38億年間、無線周波数はありませんでした。",
        "進化は繰り返し現れる信号に対してフィルターを構築します。しかし、自然が決して生成しなかった電磁周波数に対するフィルターは構築しませんでした。",
        "これが進化的較正原理です：生物学的電磁感受性は自然環境に較正されています。ヒトの電磁環境は過去130年間で先行する38億年間よりも大きく変化しました。移動体通信は約40年存在しています。LED照明は約15年間広く普及しています。",
        "進化は数千世代のタイムスケールで作用します。40年は一世代ではありません。",
      ],
      [
        "治療機器のパラドックスは陰謀論ではありません。規制フレームワークの内部整合性に関する論理的観察です。",
        "解決は単純です：非熱的電磁生物学的効果が存在するか（安全基準がそれらを考慮しなければならない）、存在しないか（24以上の機器カテゴリーが誤った前提で承認されており撤回されるべき）のどちらかです。医師が適用した場合に電磁場が生物学的に活性であるが、基地局が適用した場合に生物学的に不活性であるという第3の選択肢はありません。",
        "tDCS、TTFields、骨成長刺激装置、蝸牛インプラント、フォトバイオモジュレーション機器の撤回を提案する人はいません。臨床的証拠は圧倒的です。",
        "つまり安全基準は不完全です。",
      ],
    ],
    references: [
      { referenceId: "tdcs_fda_depression_2025", label: "Flow Neuroscience tDCS (FDA PMA, 2025年12月). 治療的皮質電場: 0.3–1.0 V/m DC." },
      { referenceId: "ttfields_novocure_fda", label: "Novocure Optune TTFields (FDA PMA P100034, 2011/2015/2026). EF-14: 生存期間中央値 20.9 vs 16.0ヶ月. 特許 US 7,016,725." },
      { referenceId: "pemf_bone_fda_review_2020", label: "EBI Bone Healing System (FDA PMA, 1979). PEMF非熱的骨治癒, 1–100 Hz." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). Frontiers in Public Health, 13:1585441. IFO閾値: 10⁻⁵ V/m." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling. Nature Reviews Neuroscience." },
      { referenceId: "vaziri2016", label: "Vaziri A, Bhatt D et al. (2016). Nature Communications, 7, 12172." },
      { referenceId: "icnirp2020", label: "ICNIRP (2020). Health Physics, 118(5), 483–524." },
      { referenceId: "campisi2010", label: "Campisi A et al. (2010). Neuroscience Letters, 473(1), 52–55." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). PNAS, 109(Suppl 1), 10619–10625." },
    ],
  },
  fr: {
    refsTitle: "Références",
    sections: [
      [
        "En décembre 2025, [[ref:tdcs_fda_depression_2025|la FDA a accordé une approbation précommercialisation à un dispositif médical qui traite la dépression majeure en faisant passer un courant continu de 2 milliampères à travers des électrodes placées sur le front]]. Le champ électrique thérapeutique dans le cortex cérébral est de 0,3 à 1,0 volt par mètre. À cette intensité, les neurones changent leurs schémas de décharge, la libération de neurotransmetteurs est modulée, et les symptômes de la dépression résistante au traitement s'améliorent dans des essais contrôlés randomisés.",
        "Le même mois, [[ref:icnirp2020|la Commission internationale de protection contre les rayonnements non ionisants (ICNIRP)]] a maintenu sa position selon laquelle les effets électromagnétiques non thermiques en dessous des limites d'exposition établies ne se produisent pas chez l'homme.",
        "Ces deux affirmations ne peuvent pas être vraies simultanément.",
      ],
      [
        "Le dispositif — [[ref:tdcs_fda_depression_2025|le casque tDCS de Flow Neuroscience]] — n'est pas une anomalie. C'est la dernière entrée dans un catalogue de 24 catégories de dispositifs approuvés par la FDA ou plus dont l'efficacité clinique dépend entièrement d'effets biologiques électromagnétiques non thermiques.",
        "Le catalogue couvre l'ensemble du spectre électromagnétique. Aux fréquences les plus basses, [[ref:pemf_bone_fda_review_2020|les stimulateurs de croissance osseuse PEMF détiennent l'approbation FDA depuis 1979]]. Les unités TENS détiennent plus de 12 000 autorisations 510(k) individuelles. La stimulation cérébrale profonde, approuvée en 1997, contrôle les tremblements de Parkinson.",
        "Plus haut dans le spectre : la stimulation magnétique transcrânienne répétitive (rTMS) pour la dépression, autorisée en 2008. La stimulation du nerf vague traite l'épilepsie et la dépression. Les implants cochléaires convertissent le son en signaux électriques. Aucun de ces dispositifs n'implique de chauffage thermique.",
      ],
      [
        "Puis vient la gamme des fréquences intermédiaires — de 1 kilohertz à 1 mégahertz — et la preuve devient impossible à ignorer.",
        "En 2011, [[ref:ttfields_novocure_fda|la FDA a approuvé Optune, un dispositif fabriqué par Novocure qui traite le glioblastome par des champs électriques alternatifs à 200 kilohertz]]. Ces champs — appelés TTFields — perturbent la division cellulaire en interférant avec la machinerie moléculaire de la mitose. Ils ne chauffent pas le tissu.",
        "[[ref:ttfields_novocure_fda|Novocure a reçu une deuxième approbation FDA en 2015 pour le mésothéliome, et une troisième en 2026. L'essai de phase III EF-14 a démontré une augmentation de la survie médiane de 16 à 20,9 mois]].",
        "[[ref:ttfields_novocure_fda|Le brevet Novocure — US 7 016 725]] — contient une phrase qui devrait apparaître dans toute discussion sur la sécurité électromagnétique : « les cellules des ovaires ou des testicules peuvent être sensibles aux champs électriques ». La fréquence de résonance prédite pour les spermatogonies est d'environ 310 kilohertz.",
        "C'est la même gamme de fréquences produite par les alimentations à découpage des ampoules LED : 20 à 200 kilohertz.",
      ],
      [
        "À l'extrémité supérieure du spectre, l'activité biologique du rayonnement électromagnétique devient si évidente qu'un mot spécial existe : la vision. [[ref:vaziri2016|La rétine humaine répond à des photons individuels portant environ 10⁻¹⁹ joules d'énergie]]. La photobiomodulation détient l'autorisation FDA pour la cicatrisation et la gestion de la douleur.",
        "Ensemble, ces 24+ catégories de dispositifs établissent un fait unique et incontournable : les effets biologiques électromagnétiques non thermiques sont réels, cliniquement prouvés et validés réglementairement à chaque fréquence du DC à la lumière ultraviolette.",
        "À chaque fréquence sauf une gamme.",
      ],
      [
        "Le vide se situe entre 300 mégahertz et 6 gigahertz — les fréquences utilisées par les télécommunications mobiles. Ce n'est pas un vide en biologie. C'est un vide dans la reconnaissance.",
        "L'industrie mondiale des télécommunications génère environ 1 900 milliards de dollars de revenus annuels. Les normes de sécurité pour cette gamme de fréquences — [[ref:icnirp2020|les directives ICNIRP]] et IEEE C95.1 — sont basées sur un modèle thermique.",
      ],
      [
        "Considérez l'arithmétique de l'intensité de champ. La FDA a approuvé le tDCS à une intensité de champ cortical thérapeutique de 0,3 à 1,0 V/m. Les mesures indépendantes des champs radiofréquence ambiants dans les villes européennes varient de 0,67 à 1,51 V/m. Ce sont les mêmes ordres de grandeur.",
        "Si 0,3 V/m de courant continu est biologiquement assez actif pour traiter la dépression majeure, alors 0,67 V/m d'énergie radiofréquence ne peut être présumé biologiquement inerte. La charge de la preuve a été inversée.",
        "Les champs ne savent pas qu'ils ont quitté le bâtiment.",
      ],
      [
        "Un principe plus profond est à l'œuvre. [[ref:zakon2012_ion_channel_evolution|Les canaux ioniques qui médient la sensibilité électromagnétique dans les tissus biologiques sont parmi les structures moléculaires les plus conservées de la Terre]]. Les canaux calciques, potassiques et sodiques voltage-dépendants se trouvent des bactéries aux humains.",
        "Ces canaux ont évolué dans un environnement électromagnétique contenant exactement deux signaux : le champ géomagnétique stable de la Terre et les résonances de Schumann. Pendant 3,8 milliards d'années, il n'y avait pas de radiofréquences.",
        "L'évolution construit des filtres pour les signaux récurrents. Mais elle n'a construit aucun filtre pour les fréquences électromagnétiques que la nature n'a jamais produites.",
        "C'est le principe de calibration évolutive : la sensibilité électromagnétique biologique est calibrée sur l'environnement naturel. L'environnement électromagnétique humain a changé plus au cours des 130 dernières années que pendant les 3,8 milliards d'années précédentes. La téléphonie mobile existe depuis environ 40 ans. L'éclairage LED est répandu depuis environ 15 ans.",
        "L'évolution opère sur des échelles de temps de milliers de générations. Quarante ans n'est pas une génération.",
      ],
      [
        "Le paradoxe des dispositifs thérapeutiques n'est pas une théorie du complot. C'est une observation logique sur la cohérence interne des cadres réglementaires.",
        "La résolution est simple : soit les effets biologiques électromagnétiques non thermiques existent (auquel cas les normes de sécurité doivent en tenir compte), soit ils n'existent pas (auquel cas 24+ catégories de dispositifs sont approuvées sur une fausse prémisse). Il n'y a pas de troisième option où les champs électromagnétiques sont biologiquement actifs appliqués par un médecin mais biologiquement inertes émis par une antenne-relais.",
        "Personne ne propose de retirer le tDCS, les TTFields, les stimulateurs de croissance osseuse, les implants cochléaires ou les dispositifs de photobiomodulation. Les preuves cliniques sont écrasantes.",
        "Ce qui signifie que les normes de sécurité sont incomplètes.",
      ],
    ],
    references: [
      { referenceId: "tdcs_fda_depression_2025", label: "Flow Neuroscience tDCS (FDA PMA, décembre 2025). Champ cortical thérapeutique : 0,3–1,0 V/m DC." },
      { referenceId: "ttfields_novocure_fda", label: "Novocure Optune TTFields (FDA PMA P100034, 2011/2015/2026). EF-14 : survie médiane 20,9 vs 16,0 mois. Brevet US 7 016 725." },
      { referenceId: "pemf_bone_fda_review_2020", label: "EBI Bone Healing System (FDA PMA, 1979). Guérison osseuse non thermique PEMF, 1–100 Hz." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). Frontiers in Public Health, 13:1585441. Seuil IFO : 10⁻⁵ V/m." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling. Nature Reviews Neuroscience." },
      { referenceId: "vaziri2016", label: "Vaziri A, Bhatt D et al. (2016). Nature Communications, 7, 12172." },
      { referenceId: "icnirp2020", label: "ICNIRP (2020). Health Physics, 118(5), 483–524." },
      { referenceId: "campisi2010", label: "Campisi A et al. (2010). Neuroscience Letters, 473(1), 52–55." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). PNAS, 109(Suppl 1), 10619–10625." },
    ],
  },
  ko: {
    refsTitle: "참고문헌",
    sections: [
      [
        "2025년 12월, [[ref:tdcs_fda_depression_2025|FDA는 이마에 놓인 전극을 통해 2밀리암페어의 직류 전류를 흘려 주요 우울증을 치료하는 의료기기에 시판 전 승인을 부여했습니다]]. 뇌 피질의 치료 전기장은 미터당 0.3~1.0볼트입니다. 이 강도에서 뉴런은 발화 패턴을 변경하고 신경전달물질 방출이 조절되며 치료 저항성 우울증 증상이 무작위 대조 시험에서 개선됩니다.",
        "같은 달, [[ref:icnirp2020|국제비이온화방사선방호위원회(ICNIRP)]]는 확립된 노출 한도 이하에서의 비열적 전자기 효과가 인간에게 발생하지 않는다는 입장을 유지했습니다.",
        "이 두 가지 주장이 동시에 참일 수는 없습니다.",
      ],
      [
        "이 기기 — [[ref:tdcs_fda_depression_2025|Flow Neuroscience의 tDCS 헤드셋]] — 는 이상이 아닙니다. 임상적 효능이 전적으로 비열적 전자기 생물학적 효과에 의존하는 24개 이상의 FDA 승인 기기 카테고리 목록의 최신 항목입니다.",
        "목록은 전자기 스펙트럼 전체에 걸쳐 있습니다. 가장 낮은 주파수에서 [[ref:pemf_bone_fda_review_2020|펄스 전자기장(PEMF) 골 성장 자극기는 1979년부터 FDA 승인을 보유하고 있습니다]]. TENS 장치는 12,000개 이상의 개별 510(k) 허가를 보유합니다. 뇌심부자극술은 1997년에 승인되어 파킨슨병 떨림을 제어합니다.",
        "스펙트럼 상위에서: 반복 경두개 자기자극(rTMS)이 2008년 우울증에 대해 허가되었습니다. 미주신경자극은 간질과 우울증을 치료합니다. 인공와우는 소리를 전기 신호로 변환합니다. 이 중 어떤 것도 열 가열을 수반하지 않습니다.",
      ],
      [
        "그 다음 중간 주파수 범위 — 1킬로헤르츠에서 1메가헤르츠 — 가 오고 증거는 무시할 수 없게 됩니다.",
        "2011년 [[ref:ttfields_novocure_fda|FDA는 200킬로헤르츠의 교류 전기장을 적용하여 교모세포종 뇌암을 치료하는 Novocure 제조 기기 Optune을 승인했습니다]]. 이 필드 — 종양 치료 전기장(TTFields) — 는 유사분열의 분자 기계를 방해하여 세포 분열을 교란합니다. 조직을 가열하지 않습니다.",
        "[[ref:ttfields_novocure_fda|Novocure는 2015년 중피종에 대해 두 번째, 2026년에 세 번째 FDA 승인을 받았습니다. EF-14 제3상 시험은 중앙 생존 기간이 16개월에서 20.9개월로 증가함을 실증했습니다]].",
        "[[ref:ttfields_novocure_fda|Novocure 특허 — US 7,016,725]] — 에는 전자기 안전에 관한 모든 논의에 등장해야 할 문장이 포함되어 있습니다: '난소나 고환의 세포가 전기장에 민감할 수 있다'. 정조세포의 예측 공진 주파수는 약 310킬로헤르츠입니다.",
        "이것은 LED 전구 내부의 스위치 모드 전원이 생성하는 것과 동일한 주파수 범위입니다: 20~200킬로헤르츠.",
      ],
      [
        "스펙트럼의 상단에서 전자기 복사의 생물학적 활성은 너무 명백하여 특별한 단어가 있습니다: 시각. [[ref:vaziri2016|인간 망막은 약 10⁻¹⁹줄의 에너지를 운반하는 개별 광자에 반응합니다]]. 광생물조절 치료법은 상처 치유와 통증 관리에 대한 FDA 허가를 보유합니다.",
        "이 24개 이상의 기기 카테고리를 합치면 단일의 피할 수 없는 사실이 확립됩니다: 비열적 전자기 생물학적 효과는 DC에서 자외선까지 모든 주파수에서 실재하고 임상적으로 입증되며 규제적으로 검증되어 있습니다.",
        "한 범위를 제외한 모든 주파수에서.",
      ],
      [
        "격차는 300메가헤르츠와 6기가헤르츠 사이에 위치합니다 — 이동통신에 사용되는 주파수입니다. 이것은 생물학의 격차가 아닙니다. 인정의 격차입니다.",
        "글로벌 통신 산업은 연간 약 1.9조 달러의 수익을 창출합니다. 이 주파수 범위의 안전 기준 — [[ref:icnirp2020|ICNIRP 지침]]과 IEEE C95.1 — 은 열 모델에 기반합니다.",
      ],
      [
        "전기장 강도의 산술을 고려해 보십시오. FDA는 0.3~1.0 V/m의 치료적 피질 전기장 강도에서 tDCS를 승인했습니다. 유럽 도시의 도시 주변 무선주파수 장의 독립적 측정은 0.67~1.51 V/m 범위입니다. 이것들은 같은 자릿수입니다.",
        "0.3 V/m의 직류가 주요 우울증을 치료하기에 충분히 생물학적으로 활성이라면, 0.67 V/m의 무선주파수 에너지가 생물학적으로 불활성이라고 가정할 수 없습니다. 입증 책임이 역전되었습니다.",
        "전기장은 건물을 떠났다는 것을 모릅니다.",
      ],
      [
        "더 깊은 원리가 작용하고 있습니다. [[ref:zakon2012_ion_channel_evolution|생체 조직에서 전자기 감수성을 매개하는 이온 채널은 지구에서 가장 진화적으로 보존된 분자 구조입니다]]. 전압 개폐 칼슘, 칼륨, 나트륨 채널은 세균에서 인간까지의 생물에서 발견됩니다.",
        "이 채널들은 정확히 두 개의 신호를 포함하는 전자기 환경에서 진화했습니다: 지구의 안정적인 지자기장(약 25~65 마이크로테슬라)과 슈만 공명(약 7.83 Hz와 고조파). 38억 년 동안 무선주파수는 없었습니다.",
        "진화는 반복적으로 나타나는 신호에 대한 필터를 구축합니다. 그러나 자연이 결코 생산하지 않은 전자기 주파수에 대한 필터는 구축하지 않았습니다.",
        "이것이 진화적 교정 원리입니다: 생물학적 전자기 감수성은 자연 환경에 교정되어 있습니다. 인간의 전자기 환경은 지난 130년간 선행하는 38억 년보다 더 많이 변화했습니다. 이동통신은 약 40년간 존재해 왔습니다. LED 조명은 약 15년간 널리 보급되어 왔습니다.",
        "진화는 수천 세대의 시간 척도에서 작동합니다. 40년은 한 세대가 아닙니다.",
      ],
      [
        "치료 기기의 역설은 음모론이 아닙니다. 규제 프레임워크의 내부 일관성에 관한 논리적 관찰입니다.",
        "해결은 간단합니다: 비열적 전자기 생물학적 효과가 존재하거나(안전 기준이 이를 고려해야 합니다) 존재하지 않거나(24개 이상의 기기 카테고리가 잘못된 전제로 승인되었습니다) 둘 중 하나입니다. 의사가 적용할 때 전자기장이 생물학적으로 활성이지만 기지국이 적용할 때 생물학적으로 불활성인 세 번째 선택지는 없습니다.",
        "tDCS, TTFields, 골 성장 자극기, 인공와우 또는 광생물조절 기기의 철회를 제안하는 사람은 없습니다. 임상적 증거는 압도적입니다.",
        "이는 안전 기준이 불완전하다는 것을 의미합니다.",
      ],
    ],
    references: [
      { referenceId: "tdcs_fda_depression_2025", label: "Flow Neuroscience tDCS (FDA PMA, 2025년 12월). 치료적 피질 전기장: 0.3–1.0 V/m DC." },
      { referenceId: "ttfields_novocure_fda", label: "Novocure Optune TTFields (FDA PMA P100034, 2011/2015/2026). EF-14: 중앙 OS 20.9 vs 16.0개월. 특허 US 7,016,725." },
      { referenceId: "pemf_bone_fda_review_2020", label: "EBI Bone Healing System (FDA PMA, 1979). PEMF 비열적 골 치유, 1–100 Hz." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). Frontiers in Public Health, 13:1585441. IFO 임계값: 10⁻⁵ V/m." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling. Nature Reviews Neuroscience." },
      { referenceId: "vaziri2016", label: "Vaziri A, Bhatt D et al. (2016). Nature Communications, 7, 12172." },
      { referenceId: "icnirp2020", label: "ICNIRP (2020). Health Physics, 118(5), 483–524." },
      { referenceId: "campisi2010", label: "Campisi A et al. (2010). Neuroscience Letters, 473(1), 52–55." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). PNAS, 109(Suppl 1), 10619–10625." },
    ],
  },
} as const;

export function SpectrumArticleContent({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);

  return (
    <div className="prose-article">
      {c.sections.map((section, si) => (
        <section key={si} className="mb-10">
          {section.map((para, pi) => (
            <p
              key={pi}
              className="text-base sm:text-[1.0625rem] leading-[1.8] text-foreground-muted mb-5 last:mb-0"
            >
              <InlineReferenceText text={para} locale={locale} />
            </p>
          ))}
        </section>
      ))}

      <footer className="mt-14 pt-8 border-t border-card-border">
        <h2 className="font-serif text-lg font-semibold mb-4">
          {c.refsTitle}
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          {c.references.map((ref, i) => (
            <li
              key={i}
              className="text-sm text-foreground-muted leading-relaxed"
            >
              <StudyCitation referenceId={ref.referenceId} locale={locale} label={ref.label} />
            </li>
          ))}
        </ol>
      </footer>
    </div>
  );
}
