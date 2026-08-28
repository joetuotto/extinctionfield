import { InlineReferenceText } from "@/components/InlineReferenceText";
import { StudyCitation } from "@/components/StudyCitation";

const COPY = {
  en: {
    refsTitle: "References",
    epistemicLabel: "Epistemic note",
    epistemicText: "Lindgren’s interpretation is theoretical and not yet independently validated. The empirical findings ([[ref:adey1976_calcium_window|Adey]], [[ref:lai1995_dna_breaks|Lai]], [[ref:pall2013_v2|Pall]], [[ref:sousouri2025|Sousouri]], [[ref:kim2026_cell_gene_switch|Kim]]) stand independently of the theoretical framework.",
    sections: [
      [
        "For five decades, researchers who observed biological effects of electromagnetic fields have encountered the same response: 'the mechanism is implausible.' Not 'the data is wrong.' Not 'the experiment was poorly designed.' But: 'we don't believe this is possible.'",
        "This article documents five cases in which strong empirical data was dismissed because the mechanism was unknown — and shows how a single physical insight connects them all.",
      ],
      [
        "[[ref:adey1976_calcium_window|Adey-Blackman 1976]]: 'The window effect is an artifact'",
        "What was observed: 450 MHz amplitude-modulated at 16 Hz produced calcium efflux from brain tissue. But only at intensities of 0.1–1.0 mW/cm². At higher and lower levels: no effect.",
        "Why it was dismissed: 'A non-linear dose-response is unphysiological. A real effect increases monotonically with intensity.' ICNIRP's entire model is based on linear SAR. The window effect undermines that assumption.",
        "What we now know: [[ref:kim2026_cell_gene_switch|Kim 2026 (Cell)]] demonstrated that gene expression is activated through rhythmic Ca²⁺ oscillations, not through Ca²⁺ concentration increase. The oscillation frequency depends on field parameters — certain intensities produce resonance, others do not. The window effect is not an artifact. It is resonance.",
        "Lindgren's χ(Ā): the susceptibility is saturated at the membrane voltage. The perturbation response depends on the field's frequency content relative to the ion channel's time constants, not on intensity alone.",
      ],
      [
        "[[ref:lai1995_dna_breaks|Lai & Singh 1995]]: 'Non-ionizing radiation cannot break DNA'",
        "What was observed: 2450 MHz, 1.2 W/kg, 2 hours → DNA strand breaks in rat brain cells. Both single- and double-strand breaks. Melatonin (an antioxidant) prevented the effect.",
        "Why they tried to suppress it: Internal documents from Motorola and the CTIA revealed a strategy: fund counter-studies, pressure the university, coordinate a media strategy. Lai received administrative pressure to withdraw his studies. He did not.",
        "The scientific critique: 'RF photon energy is too low to break covalent bonds. DNA strand breaks are impossible without ionization.'",
        "What we now know: Melatonin's protective effect reveals the ROS-mediated pathway: EMF → VGCC → Ca²⁺ → mitochondrial ROS → oxidative DNA damage. DNA is not broken by the photon but by the radical that the photon-activated ion channel produces.",
        "[[ref:panagopoulos2025|Panagopoulos 2025]]: the IFO mechanism explains how a 10⁻⁵ V/m field activates the ion channel → Ca²⁺ influx → disruption of the mitochondrial electron transport chain → ROS.",
      ],
      [
        "[[ref:pall2013_v2|Pall 2013]]: 'The VGCC hypothesis is too simple'",
        "What was proposed: [[ref:pall2013_v2|Martin Pall]] compiled 23 studies in which EMF's biological effect was blocked by calcium channel blockers. Conclusion: VGCC is the direct target of EMF.",
        "Why it was criticized: 'Too simple a mechanism to explain everything.' 'Field intensity is too low to activate the channel.' 'A single mechanism cannot explain hundreds of different effects.'",
        "What we now know: [[ref:pall2013_v2|Pall]] was partially right. VGCC is one target. But he did not know three refining mechanisms:",
        "First, [[ref:panagopoulos2025|Panagopoulos 2025 IFO]]: ion forced oscillation is a more precise description than 'VGCC activation' because it explains frequency dependence and the non-thermal threshold. Second, [[ref:trus2024|Trus & Atlas 2024]]: non-ionotropic VGCC signaling — the channel signals without ion flux, further lowering the effective threshold. Third, [[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]: Cyb5b is a second sensor (not VGCC) that produces Ca²⁺ oscillations. [[ref:pall2013_v2|Pall]] assumed one target — in reality there are at least three (VGCC/IFO, CRY/RPM, Cyb5b).",
        "Lindgren's χ(Ā): all three mechanisms share the same physical foundation — saturated susceptibility in the membrane field. Lindgren unifies [[ref:pall2013_v2|Pall]], [[ref:panagopoulos2025|Panagopoulos]], and [[ref:kim2026_cell_gene_switch|Kim]] into a single framework.",
      ],
      [
        "[[ref:sousouri2025|Sousouri 2025]]: 'Too small an effect, too small a sample'",
        "What was observed: 5G 3.6 GHz, below ICNIRP limits, double-blind, ETH Zurich. CACNA1C T/C carriers showed accelerated sleep spindle frequency. T/T carriers showed no effect.",
        "Why it can be criticized: '34 subjects is too small a sample.' 'A change in spindle frequency is not a health hazard.' 'The genotype interaction could be chance with a small sample.'",
        "Why these criticisms are weak: small sample size is a valid concern — replication is needed. But the genotype interaction is a structural finding: it explains why previous studies gave contradictory results. If T/T carriers do not respond and T/C carriers do, the population average obscures the true effect.",
        "Lindgren's χ(Ā) predicts this: susceptibility depends on the density of ion channels on the cell membrane. CACNA1C rs7304986 is a regulatory variant that changes expression density. More channels = greater total susceptibility = measurable response.",
      ],
      [
        "[[ref:kim2026_cell_gene_switch|Kim 2026]]: 'Incredibly implausible'",
        "What was observed: 60 Hz EMF activated the Lgr4 gene promoter in vivo in transgenic mice. CRISPR screening identified Cyb5b as an EMF sensor. Rhythmic Ca²⁺ oscillations drive gene expression. Published in Cell (IF ~64).",
        "Why it was criticized: Physicist Andrew York (New Scientist, April 2026): 'incredibly implausible.' He did not criticize the data but the existence of the mechanism.",
        "Why the criticism is wrong: York calculates field energy at the macroscopic level. Lindgren's χ(Ā) calculates it at the membrane ion channel level.",
        "Membrane field: ~10⁷ V/m (70 mV / 7 nm). External field: ~10⁻¹ V/m (60 Hz, 2 mT). Ratio: 10⁻⁸.",
        "York: '10⁻⁸ relative change is too small.'",
        "Lindgren: 'A photon's energy is 10⁻¹⁹ J. Rhodopsin detects it because it was evolutionarily optimized to quantum limits. The ion channel's S4 sensor was evolutionarily optimized for detecting membrane voltage at quantum limits. A 10⁻⁸ relative change is sufficient because the sensor operates at saturation (χ ≈ 1).'",
        "This is exactly the same argument as photon detection: York would say 'a single photon is too weak to affect biology' if he did not know how the eye works.",
      ],
      [
        "Synthesis: the price of missing physics",
        "50 years. Five cases. The same pattern.",
        "[[ref:adey1976_calcium_window|Adey observed the window effect in 1976]] → marginalized for 40 years. [[ref:lai1995_dna_breaks|Lai observed DNA strand breaks in 1995]] → attempted suppression. [[ref:pall2013_v2|Pall compiled 23 studies in 2013]] → 'too simple.' [[ref:sousouri2025|Sousouri demonstrated genetic sensitivity in 2025]] → 'too small.' [[ref:kim2026_cell_gene_switch|Kim activated gene expression in 2026]] → 'incredibly implausible.'",
        "In every case, the data was strong. The criticism targeted the existence of the mechanism, not the quality of the data.",
        "The missing piece was physics: how can a cell membrane ion channel detect an external field that is 10⁸× smaller than the membrane's own field?",
        "The answer: the same way the retina's rhodopsin detects a photon carrying 10⁻¹⁹ joules. Evolution optimizes sensors to quantum limits. The ion channel's S4 domain is 3 billion years old ([[ref:zakon2012_ion_channel_evolution|Zakon 2012]]). It is the 'eye' of electrical sensing — and it is just as sensitive as the optical one.",
        "Lindgren's χ(Ā) formalizes this: the susceptibility function is saturated at the membrane resting potential. This means even a tiny perturbation produces a maximal response because the sensor is already 'fully tuned.'",
        "When this physics was missing, every observation appeared impossible. When it is in place, all observations are consistent.",
        "50 years of dismissed findings. One physical insight. And the question: how many researchers quit because their results were considered 'incredibly implausible'?",
      ],
    ],
    references: [
      { referenceId: "adey1976_calcium_window", label: "Adey WR, Bawin SM, Lawrence AF (1976). Effects of weak amplitude-modulated microwave fields on calcium efflux from awake cat cerebral cortex. Bioelectromagnetics." },
      { referenceId: "lai1995_dna_breaks", label: "Lai H, Singh NP (1995). Acute low-intensity microwave exposure increases DNA single-strand breaks in rat brain cells. Bioelectromagnetics, 16(3), 207–210. doi:10.1002/bem.2250160309" },
      { referenceId: "lai1996_double_strand", label: "Lai H, Singh NP (1996). Single- and double-strand DNA breaks in rat brain cells after acute exposure to radiofrequency electromagnetic radiation. Int J Radiat Biol." },
      { referenceId: "pall2013_v2", label: "Pall ML (2013). Electromagnetic fields act via activation of voltage-gated calcium channels to produce beneficial or adverse effects. J Cell Mol Med. doi:10.1111/jcmm.12088" },
      { referenceId: "sousouri2025", label: "Sousouri D et al. (2025). CACNA1C genotype modulates sleep spindle response to 5G radiofrequency exposure. NeuroImage, ETH Zurich." },
      { referenceId: "kim2026_cell_gene_switch", label: "Kim S et al. (2026). Identification of a molecular sensor for electromagnetic fields via genome-wide CRISPR screen. Cell." },
      { referenceId: "york2026_kim_commentary", label: "York A (2026). Commentary on Kim et al. New Scientist, April 2026." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and WC EMFs. Frontiers in Public Health, 13:1585441." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling: conformational change without ion flux. Nature Reviews Neuroscience." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). Adaptive evolution of voltage-gated sodium channels: the first 800 million years. PNAS, 109(Suppl 1), 10619–10625." },
      { referenceId: "glaser1971_bibliography", label: "Glaser ZR (1971). Bibliography of Reported Biological Phenomena and Clinical Manifestations Attributed to Microwave and Radio-Frequency Radiation. US Naval Medical Research Institute." },
      { referenceId: "lindgren2026_susceptibility", label: "Lindgren O (2026). Geometric susceptibility function χ(Ā) for membrane ion channel sensitivity." },
    ],
  },
  fi: {
    refsTitle: "Lähdeluettelo",
    epistemicLabel: "Episteeminen huomautus",
    epistemicText: "Lindgrenin tulkinta on teoreettinen eikä sitä ole vielä riippumattomasti validoitu. Empiiriset havainnot ([[ref:adey1976_calcium_window|Adey]], [[ref:lai1995_dna_breaks|Lai]], [[ref:pall2013_v2|Pall]], [[ref:sousouri2025|Sousouri]], [[ref:kim2026_cell_gene_switch|Kim]]) ovat olemassa riippumatta teoreettisesta kehyksestä.",
    sections: [
      [
        "Viiden vuosikymmenen ajan EMF-tutkijoiden havainnot ovat kohdanneet saman vastauksen: ”mekanismi on epäuskottava.” Ei ”data on väärä.” Ei ”koe on huonosti suunniteltu.” Vaan: ”emme usko että tämä on mahdollista.”",
        "Tämä artikkeli dokumentoi viisi tapausta joissa vahva empiirinen data hylättiin koska mekanismia ei tunnettu — ja osoittaa miten yksi fysikaalinen oivallus yhdistää ne.",
      ],
      [
        "[[ref:adey1976_calcium_window|Adey-Blackman 1976]]: ”Ikkunailmiö on artefakti”",
        "Mitä havaittiin: 450 MHz amplitudimoduloituna 16 Hz → kalsiumeffluksi aivokudoksesta. MUTTA vain intensiteeteillä 0,1–1,0 mW/cm². Korkeammilla ja matalammilla: ei vaikutusta.",
        "Miksi hylättiin: ”Ei-lineaarinen annos-vaste on epäfysiologinen. Oikea vaikutus kasvaa monotonisesti intensiteetin mukana.” ICNIRP:n koko malli perustuu lineaariseen SAR:iin. Ikkunailmiö kumoaa sen oletuksen.",
        "Mitä nyt tiedämme: [[ref:kim2026_cell_gene_switch|Kim 2026 (Cell)]]: geeniekspressio aktivoituu RYTMISTEN Ca²⁺-oskillaatioiden kautta, ei Ca²⁺-pitoisuuden nousun. Oskillaatiotaajuus riippuu kentän parametreista → tietyt intensiteetit tuottavat resonanssin, toiset eivät. Ikkunailmiö ei ole artefakti — se on resonanssi.",
        "Lindgrenin χ(Ā): susceptibiliteetti on saturoitunut solukalvon jännitteessä. Perturbointivaste riippuu kentän taajuussisallöstä suhteessa ionikanavan aikavakioihin, ei pelkästä intensiteetistä.",
      ],
      [
        "[[ref:lai1995_dna_breaks|Lai & Singh 1995]]: ”Ei-ionisoiva säteily ei voi katkaista DNA:ta”",
        "Mitä havaittiin: 2450 MHz, 1,2 W/kg, 2 tuntia → DNA-katkokset rottien aivosoluissa. Sekä yksi- että kaksijuostekatkokset. Melatoniini (antioksidantti) esti vaikutuksen.",
        "Miksi yritettiin hylätä: Motorolan ja CTIA:n sisäiset dokumentit paljastivat strategian: rahoitettiin vastatutkimuksia, painostettiin yliopistoa, koordinoitiin mediastrategia. Lai sai hallinnollista painostusta vetää tutkimukset takaisin. Ei vetänyt.",
        "Tieteellinen kritiikki: ”RF-fotonien energia on liian matala rikkomaan kovalenttisia sidoksia. DNA-katkokset ovat mahdottomia ilman ionisaatiota.”",
        "Mitä nyt tiedämme: Melatoniinin suojavaikutus osoittaa ROS-välitteisen reitin: EMF → VGCC → Ca²⁺ → mitokondriaalinen ROS → oksidatiivinen DNA-vaurio. DNA:ta ei riko FOTONI vaan RADIKAALI jonka fotoni-aktivoima ionikanava tuottaa.",
        "[[ref:panagopoulos2025|Panagopoulos 2025]]: IFO-mekanismi selitää miten 10⁻⁵ V/m kenttä aktivoi ionikanavan → Ca²⁺-tulva → mitokondrion elektroninsiirtoketjun häiriö → ROS.",
      ],
      [
        "[[ref:pall2013_v2|Pall 2013]]: ”VGCC-hypoteesi on liian yksinkertainen”",
        "Mitä ehdotettiin: [[ref:pall2013_v2|Martin Pall]] kokosi 23 tutkimusta joissa kaikissa EMF:n biologinen vaikutus estyi kalsiumkanavasalpaajilla. Johtopäätös: VGCC on EMF:n suora kohde.",
        "Miksi kritisoitiin: ”Liian yksinkertainen mekanismi selitämään kaiken.” ”Kenttaintensiteetti on liian matala aktivoimaan kanavan.” ”Yhdellä mekanismilla ei voi selitää satoja eri vaikutuksia.”",
        "Mitä nyt tiedämme: [[ref:pall2013_v2|Pall]] oli OSITTAIN oikeassa. VGCC on yksi kohde. Mutta hän ei tuntenut kolmea tarkentavaa mekanismia:",
        "Ensinnäkin [[ref:panagopoulos2025|Panagopoulos 2025 IFO]]: ionien pakotettu oskillaatio on TARKEMPI kuvaus kuin ”VGCC-aktivaatio” koska se selitää taajuusriippuvuuden ja ei-termisen kynnyksen. Toiseksi [[ref:trus2024|Trus & Atlas 2024]]: ei-ionotrooppinen VGCC-signalointi — kanava signaloi ILMAN että ioni kulkee läpi, mikä madaltaa efektiivista kynnystä edelleen. Kolmanneksi [[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]: Cyb5b on TOINEN sensori (ei VGCC) joka tuottaa Ca²⁺-oskillaatioita. [[ref:pall2013_v2|Pall]] oletti yhden kohteen — todellisuudessa niitä on vähintään kolme (VGCC/IFO, CRY/RPM, Cyb5b).",
        "Lindgrenin χ(Ā): kaikkien kolmen mekanismin perustana on sama fysikaalinen ilmiö — saturoitunut susceptibiliteetti solukalvon kentässä. Lindgren yhdistää [[ref:pall2013_v2|Pallin]], [[ref:panagopoulos2025|Panagopoulosin]] ja [[ref:kim2026_cell_gene_switch|Kimin]] yhteen kehykseen.",
      ],
      [
        "[[ref:sousouri2025|Sousouri 2025]]: ”Liian pieni vaikutus, liian pieni otos”",
        "Mitä havaittiin: 5G 3,6 GHz, ICNIRP-rajojen alla, kaksoissokko, ETH Zürich. CACNA1C T/C-kantajien uni-spindletaajuus kiihtyi. T/T-kantajilla ei vaikutusta.",
        "Miksi tätä voidaan kritisoida: ”34 henkilöä on liian pieni otos.” ”Spindle-taajuuden muutos ei ole terveysvaara.” ”Genotyyppi-interaktio voi olla sattumaa pienellä otoksella.”",
        "Miksi nämä kritiikit ovat heikkoja: pieni otos on pätevä huoli — replikaatio tarvitaan. Mutta genotyyppi-interaktio on RAKENTEELLINEN löydös: se selitää MIKSI aiemmat tutkimukset ovat ristiriitaisia. Jos T/T-kantajat eivät reagoi ja T/C-kantajat reagoivat, populaatiokeskiarvo hämärtää todellisen efektin.",
        "Lindgrenin χ(Ā) ennustaa tämän: susceptibiliteetti riippuu ionikanavan TIHEYDESTÄ solukalvolla. CACNA1C rs7304986 on regulatiivinen variantti joka muuttaa ekspression tiheyttä. Enemmän kanavia = suurempi kokonais-susceptibiliteetti = mitattava vaste.",
      ],
      [
        "[[ref:kim2026_cell_gene_switch|Kim 2026]]: ”Incredibly implausible”",
        "Mitä havaittiin: 60 Hz EMF aktivoi Lgr4-geenipromoottorin in vivo transgeenisissä hiirissä. CRISPR-seulonta tunnisti Cyb5b:n EMF-sensoriksi. Rytmiset Ca²⁺-oskillaatiot ohjaavat geeniekspressiota. Cell (IF ~64).",
        "Miksi kritisoitiin: Fyysikko Andrew York (New Scientist, huhtikuu 2026): ”incredibly implausible.” Ei kritisoinut dataa vaan mekanismin OLEMASSAOLOA.",
        "Miksi kritiikki on väärässä: York laskee kentän energian makroskooppisella tasolla. Lindgrenin χ(Ā) laskee sen SOLUKALVON IONIKANAVAN tasolla.",
        "Solukalvon kenttä: ~10⁷ V/m (70 mV / 7 nm). Ulkoinen kenttä: ~10⁻¹ V/m (60 Hz, 2 mT). Suhde: 10⁻⁸.",
        "York: ”10⁻⁸ suhteellinen muutos on liian pieni.”",
        "Lindgren: ”Fotonin energia on 10⁻¹⁹ J. Rodopsiini havaitsee sen, koska se on evoluutiossa optimoitu kvanttirajoille. Ionikanavan S4-sensori on evoluutiossa optimoitu solukalvon jännitteen havaitsemiseen kvanttirajoille. 10⁻⁸ suhteellinen muutos riittää, koska sensori toimii saturaatiossa (χ ≈ 1).”",
        "Tämä on TÄSMÄLLEEN sama argumentti kuin fotonin havaitseminen: York sanoisi ”yksi fotoni on liian heikko vaikuttamaan biologiaan” jos hän ei tietäisi miten silmä toimii.",
      ],
      [
        "Synteesi: puuttuvan fysiikan hinta",
        "50 vuotta. Viisi tapausta. Sama kaava.",
        "[[ref:adey1976_calcium_window|Adey havaitsi ikkunailmiön 1976]] → marginalisoitiin 40 vuodeksi. [[ref:lai1995_dna_breaks|Lai havaitsi DNA-katkokset 1995]] → yritettiin tukahduttaa. [[ref:pall2013_v2|Pall kokosi 23 tutkimusta 2013]] → ”liian yksinkertainen.” [[ref:sousouri2025|Sousouri osoitti geneettisen herkkyyden 2025]] → ”liian pieni.” [[ref:kim2026_cell_gene_switch|Kim aktivoi geeniekspression 2026]] → ”incredibly implausible.”",
        "Jokaisessa tapauksessa data oli vahvaa. Kritiikki kohdistui mekanismin OLEMASSAOLOON, ei datan LAATUUN.",
        "Puuttuva palanen oli fysiikka: miten solukalvon ionikanava voi havaita ulkoisen kentän joka on 10⁸× pienempi kuin solukalvon oma kenttä?",
        "Vastaus: samalla tavalla kuin verkkokalvon rodopsiini havaitsee fotonin joka kantaa 10⁻¹⁹ joulea. Evoluutio optimoi sensorit kvanttirajoille. Ionikanavan S4-domeeni on 3 miljardia vuotta vanha ([[ref:zakon2012_ion_channel_evolution|Zakon 2012]]). Se on sähköisen havaitsemisen ”silmä” — ja se on yhtä herkä kuin optinen.",
        "Lindgrenin χ(Ā) formalisoi tämän: susceptibiliteettifunktio on saturoitunut solukalvon lepopotentiaalissa. Tämä tarkoittaa että pienikin perturbointia tuottaa maksimivasteen koska sensori on jo ”äärimmilleen viritetty.”",
        "Kun tämä fysiikka puuttui, jokainen havainto näytti mahdottomalta. Kun se on paikallaan, KAIKKI havainnot ovat konsistentteja.",
        "50 vuotta hylättyjä havaintoja. Yksi fysikaalinen oivallus. Ja kysymys: kuinka monta tutkijaa lopetti koska heidän tuloksiaan pidettiin ”incredibly implausible”?",
      ],
    ],
    references: [
      { referenceId: "adey1976_calcium_window", label: "Adey WR, Bawin SM, Lawrence AF (1976). Effects of weak amplitude-modulated microwave fields on calcium efflux from awake cat cerebral cortex. Bioelectromagnetics." },
      { referenceId: "lai1995_dna_breaks", label: "Lai H, Singh NP (1995). Acute low-intensity microwave exposure increases DNA single-strand breaks in rat brain cells. Bioelectromagnetics, 16(3), 207–210. doi:10.1002/bem.2250160309" },
      { referenceId: "lai1996_double_strand", label: "Lai H, Singh NP (1996). Single- and double-strand DNA breaks in rat brain cells after acute exposure to radiofrequency electromagnetic radiation. Int J Radiat Biol." },
      { referenceId: "pall2013_v2", label: "Pall ML (2013). Electromagnetic fields act via activation of voltage-gated calcium channels to produce beneficial or adverse effects. J Cell Mol Med. doi:10.1111/jcmm.12088" },
      { referenceId: "sousouri2025", label: "Sousouri D ym. (2025). CACNA1C-genotyyppi moduloi unisukkulavastetta 5G-radiotaajuusaltistukselle. NeuroImage, ETH Zürich." },
      { referenceId: "kim2026_cell_gene_switch", label: "Kim S ym. (2026). Identification of a molecular sensor for electromagnetic fields via genome-wide CRISPR screen. Cell." },
      { referenceId: "york2026_kim_commentary", label: "York A (2026). Kommentaari Kim ym:n tutkimuksesta. New Scientist, huhtikuu 2026." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ ym. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and WC EMFs. Frontiers in Public Health, 13:1585441." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling: conformational change without ion flux. Nature Reviews Neuroscience." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). Adaptive evolution of voltage-gated sodium channels: the first 800 million years. PNAS, 109(Suppl 1), 10619–10625." },
      { referenceId: "glaser1971_bibliography", label: "Glaser ZR (1971). Bibliography of Reported Biological Phenomena and Clinical Manifestations Attributed to Microwave and Radio-Frequency Radiation. US Naval Medical Research Institute." },
      { referenceId: "lindgren2026_susceptibility", label: "Lindgren O (2026). Geometrinen susceptibiliteettifunktio χ(Ā) solukalvon ionikanavan herkkyydelle." },
    ],
  },
  ja: {
    refsTitle: "参考文献",
    epistemicLabel: "認識論的注記",
    epistemicText: "Lindgrenの解釈は理論的であり、まだ独立して検証されていません。経験的知見（[[ref:adey1976_calcium_window|Adey]]、[[ref:lai1995_dna_breaks|Lai]]、[[ref:pall2013_v2|Pall]]、[[ref:sousouri2025|Sousouri]]、[[ref:kim2026_cell_gene_switch|Kim]]）は理論的フレームワークとは独立して存在します。",
    sections: [
      [
        "50年間、電磁場の生物学的効果を観察した研究者たちは同じ反応に遭遇してきました：「メカニズムが信じがたい」。「データが間違っている」ではなく。「実験設計が不十分だ」でもなく。「これが可能だとは信じられない」と。",
        "この記事は、メカニズムが未知であったために強い経験的データが却下された5つのケースを文書化し、単一の物理的洞察がそれらすべてを結びつける方法を示します。",
      ],
      [
        "[[ref:adey1976_calcium_window|Adey-Blackman 1976]]：「窓効果はアーティファクト」",
        "観察されたもの：16 Hzで振幅変調された450 MHzが脳組織からカルシウム流出を生成。ただし0.1〜1.0 mW/cm²の強度でのみ。それより高くても低くても：効果なし。",
        "却下された理由：「非線形用量反応は非生理学的。真の効果は強度とともに単調に増加する。」ICNIRPのモデル全体が線形SARに基づいている。窓効果はその仮定を損なう。",
        "現在わかっていること：[[ref:kim2026_cell_gene_switch|Kim 2026（Cell）]]は遺伝子発現がCa²⁺濃度の増加ではなくリズミカルなCa²⁺振動を通じて活性化されることを実証。窓効果はアーティファクトではない。共鳴である。",
        "Lindgrenのχ(Ā)：感受性は膜電圧で飽和している。摂動応答はイオンチャネルの時定数に対する場の周波数内容に依存し、強度だけには依存しない。",
      ],
      [
        "[[ref:lai1995_dna_breaks|Lai & Singh 1995]]：「非電離放射線はDNAを破壊できない」",
        "観察されたもの：2450 MHz、1.2 W/kg、2時間 → ラット脳細胞でのDNA鎖切断。一本鎖と二本鎖の両方。メラトニン（抗酸化剤）が効果を防止。",
        "抑圧が試みられた理由：MotorolaとCTIAの内部文書が戦略を明らかにした：対抗研究への資金提供、大学への圧力、メディア戦略の調整。Laiは研究撤回の管理的圧力を受けた。撤回しなかった。",
        "科学的批判：「RF光子エネルギーは共有結合を切断するには低すぎる。電離なしにDNA鎖切断は不可能。」",
        "現在わかっていること：メラトニンの保護効果がROS媒介経路を明らかにする：EMF → VGCC → Ca²⁺ → ミトコンドリアROS → 酸化的DNA損傷。",
        "[[ref:panagopoulos2025|Panagopoulos 2025]]：IFOメカニズムが10⁻⁵ V/m場がイオンチャネルを活性化する方法を説明。",
      ],
      [
        "[[ref:pall2013_v2|Pall 2013]]：「VGCC仮説は単純すぎる」",
        "提案されたもの：[[ref:pall2013_v2|Martin Pall]]が23の研究でEMFの生物学的効果がカルシウムチャネル遮断薬で阻止されることをまとめた。結論：VGCCはEMFの直接標的。",
        "批判された理由：「すべてを説明するには単純すぎるメカニズム。」「場の強度はチャネルを活性化するには低すぎる。」",
        "現在わかっていること：[[ref:pall2013_v2|Pall]]は部分的に正しかった。VGCCは標的の1つ。しかし3つの精緻化メカニズムを知らなかった：",
        "第一に[[ref:panagopoulos2025|Panagopoulos 2025 IFO]]。第二に[[ref:trus2024|Trus & Atlas 2024]]：非イオン向性VGCCシグナリング。第三に[[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]：Cyb5bは第2のセンサー。[[ref:pall2013_v2|Pall]]は1つの標的を仮定したが、実際には少なくとも3つ（VGCC/IFO、CRY/RPM、Cyb5b）。",
        "Lindgrenのχ(Ā)：3つすべてのメカニズムが同じ物理的基盤を共有 — 膜場での飽和感受性。",
      ],
      [
        "[[ref:sousouri2025|Sousouri 2025]]：「効果が小さすぎ、サンプルが小さすぎる」",
        "観察されたもの：5G 3.6 GHz、ICNIRP限度以下、二重盲検、ETH Zurich。CACNA1C T/Cキャリアで睡眠紡錘波周波数が加速。T/Tキャリアでは効果なし。",
        "批判できる理由：「34被験者はサンプルが小さすぎる。」「紡錘波周波数の変化は健康被害ではない。」",
        "これらの批判が弱い理由：サンプルサイズが小さいことは妥当な懸念 — 再現が必要。しかし遺伝子型相互作用は構造的な発見：以前の研究が矛盾する結果を示した理由を説明する。",
        "Lindgrenのχ(Ā)はこれを予測する：感受性は細胞膜上のイオンチャネル密度に依存する。",
      ],
      [
        "[[ref:kim2026_cell_gene_switch|Kim 2026]]：「信じがたいほど不合理」",
        "観察されたもの：60 Hz EMFがトランスジェニックマウスでLgr4遺伝子プロモーターをin vivoで活性化。CRISPRスクリーニングがCyb5bをEMFセンサーとして同定。Cell（IF〜64）に発表。",
        "批判された理由：物理学者Andrew York（New Scientist、2026年4月）：「信じがたいほど不合理」。データではなくメカニズムの存在を批判。",
        "批判が誤りである理由：Yorkはマクロレベルで場のエネルギーを計算。Lindgrenのχ(Ā)は膜イオンチャネルレベルで計算。",
        "膜場：〜10⁷ V/m。外部場：〜10⁻¹ V/m。比率：10⁻⁸。",
        "York：「10⁻⁸の相対変化は小さすぎる。」",
        "Lindgren：「光子のエネルギーは10⁻¹⁹ J。ロドプシンは量子限界に進化的に最適化されているから検出する。イオンチャネルのS4センサーは膜電圧検出のために量子限界に最適化されている。10⁻⁸の相対変化はセンサーが飽和（χ ≈ 1）で動作するため十分。」",
        "これは光子検出とまったく同じ議論：Yorkは眼の仕組みを知らなければ「単一光子は生物に影響するには弱すぎる」と言うだろう。",
      ],
      [
        "総合：欠けていた物理学の代価",
        "50年。5つのケース。同じパターン。",
        "[[ref:adey1976_calcium_window|Adeyは1976年に窓効果を観察]] → 40年間周辺化。[[ref:lai1995_dna_breaks|Laiは1995年にDNA鎖切断を観察]] → 抑圧を試みられた。[[ref:pall2013_v2|Pallは2013年に23の研究をまとめた]] → 「単純すぎる」。[[ref:sousouri2025|Sousouriは2025年に遺伝的感受性を実証]] → 「小さすぎる」。[[ref:kim2026_cell_gene_switch|Kimは2026年に遺伝子発現を活性化]] → 「信じがたいほど不合理」。",
        "すべてのケースでデータは強かった。批判はデータの質ではなくメカニズムの存在を標的にした。",
        "欠けていたピースは物理学：細胞膜イオンチャネルは膜自身の場より10⁸倍小さい外部場をどのように検出できるのか？",
        "答え：網膜のロドプシンが10⁻¹⁹ジュールを運ぶ光子を検出するのと同じ方法。進化はセンサーを量子限界に最適化する。イオンチャネルのS4ドメインは30億年前のもの（[[ref:zakon2012_ion_channel_evolution|Zakon 2012]]）。それは電気感知の「目」であり、光学的なものと同じくらい感度が高い。",
        "Lindgrenのχ(Ā)はこれを形式化する：感受性関数は膜静止電位で飽和している。これは小さな摂動でも最大応答を生じることを意味する。センサーがすでに「完全に調整」されているため。",
        "この物理学が欠けていたとき、すべての観察は不可能に見えた。それが整えば、すべての観察は一貫している。",
        "却下された50年の知見。1つの物理的洞察。そして問い：結果が「信じがたいほど不合理」とされたために何人の研究者が辞めたのか？",
      ],
    ],
    references: [
      { referenceId: "adey1976_calcium_window", label: "Adey WR, Bawin SM, Lawrence AF (1976). Bioelectromagnetics." },
      { referenceId: "lai1995_dna_breaks", label: "Lai H, Singh NP (1995). Bioelectromagnetics, 16(3), 207–210." },
      { referenceId: "lai1996_double_strand", label: "Lai H, Singh NP (1996). Int J Radiat Biol." },
      { referenceId: "pall2013_v2", label: "Pall ML (2013). J Cell Mol Med. doi:10.1111/jcmm.12088" },
      { referenceId: "sousouri2025", label: "Sousouri D et al. (2025). NeuroImage, ETH Zurich." },
      { referenceId: "kim2026_cell_gene_switch", label: "Kim S et al. (2026). Cell." },
      { referenceId: "york2026_kim_commentary", label: "York A (2026). New Scientist, 2026年4月." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). Frontiers in Public Health, 13:1585441." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Nature Reviews Neuroscience." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). PNAS, 109(Suppl 1), 10619–10625." },
      { referenceId: "glaser1971_bibliography", label: "Glaser ZR (1971). US Naval Medical Research Institute." },
      { referenceId: "lindgren2026_susceptibility", label: "Lindgren O (2026). 膜イオンチャネル感受性のための幾何学的感受性関数χ(Ā)." },
    ],
  },
  fr: {
    refsTitle: "Références",
    epistemicLabel: "Note épistémique",
    epistemicText: "L'interprétation de Lindgren est théorique et n'a pas encore été validée indépendamment. Les résultats empiriques ([[ref:adey1976_calcium_window|Adey]], [[ref:lai1995_dna_breaks|Lai]], [[ref:pall2013_v2|Pall]], [[ref:sousouri2025|Sousouri]], [[ref:kim2026_cell_gene_switch|Kim]]) tiennent indépendamment du cadre théorique.",
    sections: [
      [
        "Pendant cinq décennies, les chercheurs qui ont observé des effets biologiques des champs électromagnétiques ont rencontré la même réponse : « le mécanisme est implausible ». Pas « les données sont fausses ». Pas « l'expérience est mal conçue ». Mais : « nous ne croyons pas que ce soit possible ».",
        "Cet article documente cinq cas dans lesquels des données empiriques solides ont été rejetées parce que le mécanisme était inconnu — et montre comment une seule insight physique les relie tous.",
      ],
      [
        "[[ref:adey1976_calcium_window|Adey-Blackman 1976]] : « L'effet fenêtre est un artefact »",
        "Ce qui a été observé : 450 MHz modulé en amplitude à 16 Hz a produit un efflux de calcium du tissu cérébral. Mais uniquement aux intensités de 0,1 à 1,0 mW/cm². À des niveaux plus élevés et plus bas : aucun effet.",
        "Pourquoi rejeté : « Une réponse dose-effet non linéaire est non physiologique. Un vrai effet augmente de manière monotone avec l'intensité. »",
        "Ce que nous savons maintenant : [[ref:kim2026_cell_gene_switch|Kim 2026 (Cell)]] a démontré que l'expression génique est activée par des oscillations rythmiques de Ca²⁺, pas par une augmentation de la concentration. L'effet fenêtre n'est pas un artefact. C'est une résonance.",
        "Le χ(Ā) de Lindgren : la susceptibilité est saturée au voltage membranaire.",
      ],
      [
        "[[ref:lai1995_dna_breaks|Lai & Singh 1995]] : « Le rayonnement non ionisant ne peut pas casser l'ADN »",
        "Ce qui a été observé : 2450 MHz, 1,2 W/kg, 2 heures → cassures de brins d'ADN dans les cellules cérébrales de rat. La mélatonine a prévenu l'effet.",
        "Pourquoi une tentative de suppression : les documents internes de Motorola et de la CTIA ont révélé une stratégie.",
        "La critique scientifique : « L'énergie des photons RF est trop faible pour rompre des liaisons covalentes. »",
        "Ce que nous savons maintenant : l'effet protecteur de la mélatonine révèle la voie médiée par les ROS : EMF → VGCC → Ca²⁺ → ROS mitochondriales → dommages oxydatifs à l'ADN.",
        "[[ref:panagopoulos2025|Panagopoulos 2025]] : le mécanisme IFO explique comment un champ de 10⁻⁵ V/m active le canal ionique.",
      ],
      [
        "[[ref:pall2013_v2|Pall 2013]] : « L'hypothèse VGCC est trop simple »",
        "Ce qui a été proposé : [[ref:pall2013_v2|Martin Pall]] a compilé 23 études dans lesquelles l'effet biologique des EMF était bloqué par des inhibiteurs des canaux calciques.",
        "Pourquoi critiqué : « Un mécanisme trop simple pour tout expliquer. »",
        "Ce que nous savons maintenant : [[ref:pall2013_v2|Pall]] avait partiellement raison. VGCC est une cible. Mais il ne connaissait pas trois mécanismes affineurs :",
        "Premièrement, [[ref:panagopoulos2025|Panagopoulos 2025 IFO]]. Deuxièmement, [[ref:trus2024|Trus & Atlas 2024]] : signalisation VGCC non ionotropique. Troisièmement, [[ref:kim2026_cell_gene_switch|Kim 2026 Cell]] : Cyb5b est un second capteur. [[ref:pall2013_v2|Pall]] supposait une cible — en réalité il y en a au moins trois (VGCC/IFO, CRY/RPM, Cyb5b).",
        "Le χ(Ā) de Lindgren : les trois mécanismes partagent la même base physique — susceptibilité saturée dans le champ membranaire.",
      ],
      [
        "[[ref:sousouri2025|Sousouri 2025]] : « Effet trop petit, échantillon trop petit »",
        "Ce qui a été observé : 5G 3,6 GHz, sous les limites ICNIRP, double aveugle, ETH Zurich. Les porteurs CACNA1C T/C ont montré une accélération de la fréquence des fuseaux du sommeil.",
        "Pourquoi critiquable : « 34 sujets c'est trop petit. »",
        "Pourquoi ces critiques sont faibles : la petite taille de l'échantillon est une préoccupation valide. Mais l'interaction génotypique est une découverte structurelle.",
        "Le χ(Ā) de Lindgren prédit ceci : la susceptibilité dépend de la densité des canaux ioniques sur la membrane cellulaire.",
      ],
      [
        "[[ref:kim2026_cell_gene_switch|Kim 2026]] : « Incroyablement implausible »",
        "Ce qui a été observé : un EMF de 60 Hz a activé le promoteur du gène Lgr4 in vivo. Le criblage CRISPR a identifié Cyb5b comme capteur EMF. Publié dans Cell (IF ~64).",
        "Pourquoi critiqué : le physicien Andrew York : « incroyablement implausible ». Il n'a pas critiqué les données mais l'existence du mécanisme.",
        "Pourquoi la critique est fausse : York calcule l'énergie du champ au niveau macroscopique. Le χ(Ā) de Lindgren la calcule au niveau du canal ionique membranaire.",
        "Champ membranaire : ~10⁷ V/m. Champ externe : ~10⁻¹ V/m. Ratio : 10⁻⁸.",
        "York : « Un changement relatif de 10⁻⁸ est trop petit. »",
        "Lindgren : « L'énergie d'un photon est 10⁻¹⁹ J. La rhodopsine le détecte parce qu'elle a été optimisée par l'évolution aux limites quantiques. Un changement relatif de 10⁻⁸ suffit parce que le capteur fonctionne en saturation (χ ≈ 1). »",
        "C'est exactement le même argument que la détection de photons.",
      ],
      [
        "Synthèse : le prix de la physique manquante",
        "50 ans. Cinq cas. Le même schéma.",
        "[[ref:adey1976_calcium_window|Adey a observé l'effet fenêtre en 1976]] → marginalisé pendant 40 ans. [[ref:lai1995_dna_breaks|Lai a observé des cassures d'ADN en 1995]] → tentative de suppression. [[ref:pall2013_v2|Pall a compilé 23 études en 2013]] → « trop simple ». [[ref:sousouri2025|Sousouri a démontré la sensibilité génétique en 2025]] → « trop petit ». [[ref:kim2026_cell_gene_switch|Kim a activé l'expression génique en 2026]] → « incroyablement implausible ».",
        "Dans chaque cas, les données étaient solides. La critique ciblait l'existence du mécanisme, pas la qualité des données.",
        "La pièce manquante était la physique : comment un canal ionique membranaire peut-il détecter un champ externe 10⁸× plus petit que le champ propre de la membrane ?",
        "La réponse : de la même manière que la rhodopsine détecte un photon portant 10⁻¹⁹ joules. L'évolution optimise les capteurs aux limites quantiques. Le domaine S4 du canal ionique a 3 milliards d'années ([[ref:zakon2012_ion_channel_evolution|Zakon 2012]]).",
        "Le χ(Ā) de Lindgren formalise ceci : la fonction de susceptibilité est saturée au potentiel de repos membranaire.",
        "Quand cette physique manquait, chaque observation paraissait impossible. Quand elle est en place, toutes les observations sont cohérentes.",
        "50 ans de résultats rejetés. Une insight physique. Et la question : combien de chercheurs ont abandonné parce que leurs résultats étaient considérés « incroyablement implausibles » ?",
      ],
    ],
    references: [
      { referenceId: "adey1976_calcium_window", label: "Adey WR, Bawin SM, Lawrence AF (1976). Bioelectromagnetics." },
      { referenceId: "lai1995_dna_breaks", label: "Lai H, Singh NP (1995). Bioelectromagnetics, 16(3), 207–210." },
      { referenceId: "lai1996_double_strand", label: "Lai H, Singh NP (1996). Int J Radiat Biol." },
      { referenceId: "pall2013_v2", label: "Pall ML (2013). J Cell Mol Med. doi:10.1111/jcmm.12088" },
      { referenceId: "sousouri2025", label: "Sousouri D et al. (2025). NeuroImage, ETH Zurich." },
      { referenceId: "kim2026_cell_gene_switch", label: "Kim S et al. (2026). Cell." },
      { referenceId: "york2026_kim_commentary", label: "York A (2026). New Scientist, avril 2026." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). Frontiers in Public Health, 13:1585441." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Nature Reviews Neuroscience." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). PNAS, 109(Suppl 1), 10619–10625." },
      { referenceId: "glaser1971_bibliography", label: "Glaser ZR (1971). US Naval Medical Research Institute." },
      { referenceId: "lindgren2026_susceptibility", label: "Lindgren O (2026). Fonction de susceptibilité géométrique χ(Ā) pour la sensibilité des canaux ioniques membranaires." },
    ],
  },
  ko: {
    refsTitle: "참고문헌",
    epistemicLabel: "인식론적 주석",
    epistemicText: "Lindgren의 해석은 이론적이며 아직 독립적으로 검증되지 않았습니다. 경험적 발견([[ref:adey1976_calcium_window|Adey]], [[ref:lai1995_dna_breaks|Lai]], [[ref:pall2013_v2|Pall]], [[ref:sousouri2025|Sousouri]], [[ref:kim2026_cell_gene_switch|Kim]])은 이론적 프레임워크와 독립적으로 존재합니다.",
    sections: [
      [
        "50년 동안 전자기장의 생물학적 효과를 관찰한 연구자들은 같은 반응에 직면해 왔습니다: '메커니즘이 불합리하다.' '데이터가 틀리다'가 아니라. '실험 설계가 부실하다'가 아니라. '이것이 가능하다고 믿지 않는다'고.",
        "이 기사는 메커니즘이 알려지지 않았기 때문에 강력한 경험적 데이터가 기각된 5가지 사례를 문서화하고, 단일한 물리적 통찰이 그것들 모두를 어떻게 연결하는지 보여줍니다.",
      ],
      [
        "[[ref:adey1976_calcium_window|Adey-Blackman 1976]]: '창 효과는 인공물이다'",
        "관찰된 것: 16 Hz로 진폭 변조된 450 MHz가 뇌 조직에서 칼슘 유출을 생성. 그러나 0.1-1.0 mW/cm²의 강도에서만. 더 높거나 낮으면: 효과 없음.",
        "기각된 이유: '비선형 용량-반응은 비생리학적이다. 진정한 효과는 강도에 따라 단조롭게 증가한다.'",
        "현재 알려진 것: [[ref:kim2026_cell_gene_switch|Kim 2026(Cell)]]은 유전자 발현이 Ca²⁺ 농도 증가가 아니라 리듬적 Ca²⁺ 진동을 통해 활성화됨을 실증. 창 효과는 인공물이 아니다. 공명이다.",
        "Lindgren의 χ(Ā): 감수성은 막 전압에서 포화되어 있다.",
      ],
      [
        "[[ref:lai1995_dna_breaks|Lai & Singh 1995]]: '비이온화 방사선은 DNA를 파괴할 수 없다'",
        "관찰된 것: 2450 MHz, 1.2 W/kg, 2시간 → 쥐 뇌 세포에서 DNA 가닥 절단. 멜라토닌(항산화제)이 효과를 방지.",
        "억압이 시도된 이유: Motorola와 CTIA의 내부 문서가 전략을 드러냄.",
        "과학적 비판: 'RF 광자 에너지는 공유 결합을 끊기에 너무 낮다.'",
        "현재 알려진 것: 멜라토닌의 보호 효과가 ROS 매개 경로를 밝힌다: EMF → VGCC → Ca²⁺ → 미토콘드리아 ROS → 산화적 DNA 손상.",
        "[[ref:panagopoulos2025|Panagopoulos 2025]]: IFO 메커니즘이 10⁻⁵ V/m 장이 이온 채널을 활성화하는 방법을 설명.",
      ],
      [
        "[[ref:pall2013_v2|Pall 2013]]: 'VGCC 가설이 너무 단순하다'",
        "제안된 것: [[ref:pall2013_v2|Martin Pall]]이 23개 연구에서 EMF의 생물학적 효과가 칼슘 채널 차단제에 의해 차단됨을 편집. 결론: VGCC가 EMF의 직접 표적.",
        "비판된 이유: '모든 것을 설명하기에 너무 단순한 메커니즘.'",
        "현재 알려진 것: [[ref:pall2013_v2|Pall]]은 부분적으로 옳았다. VGCC는 하나의 표적. 그러나 세 가지 정제 메커니즘을 몰랐다:",
        "첫째 [[ref:panagopoulos2025|Panagopoulos 2025 IFO]]. 둘째 [[ref:trus2024|Trus & Atlas 2024]]: 비이온성 VGCC 신호 전달. 셋째 [[ref:kim2026_cell_gene_switch|Kim 2026 Cell]]: Cyb5b가 두 번째 센서. [[ref:pall2013_v2|Pall]]은 하나의 표적을 가정했지만 실제로는 최소 3개(VGCC/IFO, CRY/RPM, Cyb5b).",
        "Lindgren의 χ(Ā): 세 메커니즘 모두 동일한 물리적 기반을 공유 — 막 장에서의 포화된 감수성.",
      ],
      [
        "[[ref:sousouri2025|Sousouri 2025]]: '효과가 너무 작고 샘플이 너무 작다'",
        "관찰된 것: 5G 3.6 GHz, ICNIRP 한도 이하, 이중맹검, ETH Zurich. CACNA1C T/C 보유자에서 수면 방추파 주파수 가속.",
        "비판할 수 있는 이유: '34명은 샘플이 너무 작다.'",
        "이 비판이 약한 이유: 작은 샘플은 타당한 우려이지만 유전자형 상호작용은 구조적 발견이다.",
        "Lindgren의 χ(Ā)이 이를 예측: 감수성은 세포막 위의 이온 채널 밀도에 의존.",
      ],
      [
        "[[ref:kim2026_cell_gene_switch|Kim 2026]]: '믿을 수 없을 만큼 불합리하다'",
        "관찰된 것: 60 Hz EMF가 트랜스제닉 마우스에서 Lgr4 유전자 프로모터를 in vivo 활성화. CRISPR 스크리닝이 Cyb5b를 EMF 센서로 식별. Cell(IF ~64)에 발표.",
        "비판된 이유: 물리학자 Andrew York: '믿을 수 없을 만큼 불합리하다.' 데이터가 아니라 메커니즘의 존재를 비판.",
        "비판이 틀린 이유: York은 거시적 수준에서 장 에너지를 계산. Lindgren의 χ(Ā)은 막 이온 채널 수준에서 계산.",
        "막 장: ~10⁷ V/m. 외부 장: ~10⁻¹ V/m. 비율: 10⁻⁸.",
        "York: '10⁻⁸ 상대적 변화는 너무 작다.'",
        "Lindgren: '광자의 에너지는 10⁻¹⁹ J. 로돕신은 양자 한계까지 진화적으로 최적화되었기 때문에 그것을 감지한다. 10⁻⁸ 상대적 변화는 센서가 포화(χ ≈ 1)에서 작동하기 때문에 충분하다.'",
        "이것은 광자 감지와 정확히 같은 논증이다.",
      ],
      [
        "종합: 빠진 물리학의 대가",
        "50년. 다섯 사례. 같은 패턴.",
        "[[ref:adey1976_calcium_window|Adey는 1976년 창 효과를 관찰]] → 40년간 주변화. [[ref:lai1995_dna_breaks|Lai는 1995년 DNA 가닥 절단을 관찰]] → 억압 시도. [[ref:pall2013_v2|Pall은 2013년 23개 연구를 편집]] → '너무 단순하다.' [[ref:sousouri2025|Sousouri는 2025년 유전적 감수성을 실증]] → '너무 작다.' [[ref:kim2026_cell_gene_switch|Kim은 2026년 유전자 발현을 활성화]] → '믿을 수 없을 만큼 불합리하다.'",
        "모든 경우에 데이터는 강력했다. 비판은 데이터의 질이 아니라 메커니즘의 존재를 겨냥했다.",
        "빠진 조각은 물리학: 세포막 이온 채널이 막 자체의 장보다 10⁸배 작은 외부 장을 어떻게 감지할 수 있는가?",
        "답: 망막의 로돕신이 10⁻¹⁹줄을 운반하는 광자를 감지하는 것과 같은 방식으로. 진화는 센서를 양자 한계까지 최적화한다. 이온 채널의 S4 도메인은 30억 년 된 것이다([[ref:zakon2012_ion_channel_evolution|Zakon 2012]]).",
        "Lindgren의 χ(Ā)이 이를 형식화한다: 감수성 함수는 막 정지 전위에서 포화되어 있다.",
        "이 물리학이 빠졌을 때 모든 관찰은 불가능해 보였다. 그것이 자리잡으면 모든 관찰은 일관적이다.",
        "기각된 50년의 발견. 하나의 물리적 통찰. 그리고 질문: 결과가 '믿을 수 없을 만큼 불합리하다'고 여겨져서 몇 명의 연구자가 그만두었는가?",
      ],
    ],
    references: [
      { referenceId: "adey1976_calcium_window", label: "Adey WR, Bawin SM, Lawrence AF (1976). Bioelectromagnetics." },
      { referenceId: "lai1995_dna_breaks", label: "Lai H, Singh NP (1995). Bioelectromagnetics, 16(3), 207–210." },
      { referenceId: "lai1996_double_strand", label: "Lai H, Singh NP (1996). Int J Radiat Biol." },
      { referenceId: "pall2013_v2", label: "Pall ML (2013). J Cell Mol Med. doi:10.1111/jcmm.12088" },
      { referenceId: "sousouri2025", label: "Sousouri D et al. (2025). NeuroImage, ETH Zurich." },
      { referenceId: "kim2026_cell_gene_switch", label: "Kim S et al. (2026). Cell." },
      { referenceId: "york2026_kim_commentary", label: "York A (2026). New Scientist, 2026년 4월." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). Frontiers in Public Health, 13:1585441." },
      { referenceId: "trus2024", label: "Trus MD, Atlas D (2024). Nature Reviews Neuroscience." },
      { referenceId: "zakon2012_ion_channel_evolution", label: "Zakon HH (2012). PNAS, 109(Suppl 1), 10619–10625." },
      { referenceId: "glaser1971_bibliography", label: "Glaser ZR (1971). US Naval Medical Research Institute." },
      { referenceId: "lindgren2026_susceptibility", label: "Lindgren O (2026). 막 이온 채널 감수성을 위한 기하학적 감수성 함수 χ(Ā)." },
    ],
  },
} as const;

export function ImplausibilityArticleContent({ locale }: { locale: string }) {
  const c = locale in COPY ? COPY[locale as keyof typeof COPY] : COPY.en;

  return (
    <div className="prose-article">
      {c.sections.map((section, si) => (
        <section key={si} className="mb-10">
          {section.map((para, pi) => (
            <p
              key={pi}
              className={`text-base sm:text-[1.0625rem] leading-[1.8] text-foreground-muted mb-5 last:mb-0${
                pi === 0 && si > 0 && si < 7
                  ? " font-semibold text-foreground"
                  : ""
              }`}
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

      <aside className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-50/5 p-4">
        <p className="text-xs text-foreground-muted leading-relaxed">
          <span className="font-semibold text-yellow-600">{c.epistemicLabel}:</span>{" "}
          <InlineReferenceText text={c.epistemicText} locale={locale} />
        </p>
      </aside>
    </div>
  );
}
