import type { Locale } from "@/lib/i18n";

const COPY = {
  en: {
    refsTitle: "References",
    sections: [
      [
        "For five decades, researchers who observed biological effects of electromagnetic fields have encountered the same response: 'the mechanism is implausible.' Not 'the data is wrong.' Not 'the experiment was poorly designed.' But: 'we don't believe this is possible.'",
        "This article documents five cases in which strong empirical data was dismissed because the mechanism was unknown — and shows how a single physical insight connects them all.",
      ],
      [
        "Adey-Blackman 1976: 'The window effect is an artifact'",
        "What was observed: 450 MHz amplitude-modulated at 16 Hz produced calcium efflux from brain tissue. But only at intensities of 0.1–1.0 mW/cm². At higher and lower levels: no effect.",
        "Why it was dismissed: 'A non-linear dose-response is unphysiological. A real effect increases monotonically with intensity.' ICNIRP's entire model is based on linear SAR. The window effect undermines that assumption.",
        "What we now know: Kim 2026 (Cell) demonstrated that gene expression is activated through rhythmic Ca²⁺ oscillations, not through Ca²⁺ concentration increase. The oscillation frequency depends on field parameters — certain intensities produce resonance, others do not. The window effect is not an artifact. It is resonance.",
        "Lindgren's χ(Ā): the susceptibility is saturated at the membrane voltage. The perturbation response depends on the field's frequency content relative to the ion channel's time constants, not on intensity alone.",
      ],
      [
        "Lai & Singh 1995: 'Non-ionizing radiation cannot break DNA'",
        "What was observed: 2450 MHz, 1.2 W/kg, 2 hours → DNA strand breaks in rat brain cells. Both single- and double-strand breaks. Melatonin (an antioxidant) prevented the effect.",
        "Why they tried to suppress it: Internal documents from Motorola and the CTIA revealed a strategy: fund counter-studies, pressure the university, coordinate a media strategy. Lai received administrative pressure to withdraw his studies. He did not.",
        "The scientific critique: 'RF photon energy is too low to break covalent bonds. DNA strand breaks are impossible without ionization.'",
        "What we now know: Melatonin's protective effect reveals the ROS-mediated pathway: EMF → VGCC → Ca²⁺ → mitochondrial ROS → oxidative DNA damage. DNA is not broken by the photon but by the radical that the photon-activated ion channel produces.",
        "Panagopoulos 2025: the IFO mechanism explains how a 10⁻⁵ V/m field activates the ion channel → Ca²⁺ influx → disruption of the mitochondrial electron transport chain → ROS.",
      ],
      [
        "Pall 2013: 'The VGCC hypothesis is too simple'",
        "What was proposed: Martin Pall compiled 23 studies in which EMF's biological effect was blocked by calcium channel blockers. Conclusion: VGCC is the direct target of EMF.",
        "Why it was criticized: 'Too simple a mechanism to explain everything.' 'Field intensity is too low to activate the channel.' 'A single mechanism cannot explain hundreds of different effects.'",
        "What we now know: Pall was partially right. VGCC is one target. But he did not know three refining mechanisms:",
        "First, Panagopoulos 2025 IFO: ion forced oscillation is a more precise description than 'VGCC activation' because it explains frequency dependence and the non-thermal threshold. Second, Trus & Atlas 2024: non-ionotropic VGCC signaling — the channel signals without ion flux, further lowering the effective threshold. Third, Kim 2026 Cell: Cyb5b is a second sensor (not VGCC) that produces Ca²⁺ oscillations. Pall assumed one target — in reality there are at least three (VGCC/IFO, CRY/RPM, Cyb5b).",
        "Lindgren's χ(Ā): all three mechanisms share the same physical foundation — saturated susceptibility in the membrane field. Lindgren unifies Pall, Panagopoulos, and Kim into a single framework.",
      ],
      [
        "Sousouri 2025: 'Too small an effect, too small a sample'",
        "What was observed: 5G 3.6 GHz, below ICNIRP limits, double-blind, ETH Zurich. CACNA1C T/C carriers showed accelerated sleep spindle frequency. T/T carriers showed no effect.",
        "Why it can be criticized: '34 subjects is too small a sample.' 'A change in spindle frequency is not a health hazard.' 'The genotype interaction could be chance with a small sample.'",
        "Why these criticisms are weak: small sample size is a valid concern — replication is needed. But the genotype interaction is a structural finding: it explains why previous studies gave contradictory results. If T/T carriers do not respond and T/C carriers do, the population average obscures the true effect.",
        "Lindgren's χ(Ā) predicts this: susceptibility depends on the density of ion channels on the cell membrane. CACNA1C rs7304986 is a regulatory variant that changes expression density. More channels = greater total susceptibility = measurable response.",
      ],
      [
        "Kim 2026: 'Incredibly implausible'",
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
        "Adey observed the window effect in 1976 → marginalized for 40 years. Lai observed DNA strand breaks in 1995 → attempted suppression. Pall compiled 23 studies in 2013 → 'too simple.' Sousouri demonstrated genetic sensitivity in 2025 → 'too small.' Kim activated gene expression in 2026 → 'incredibly implausible.'",
        "In every case, the data was strong. The criticism targeted the existence of the mechanism, not the quality of the data.",
        "The missing piece was physics: how can a cell membrane ion channel detect an external field that is 10⁸× smaller than the membrane's own field?",
        "The answer: the same way the retina's rhodopsin detects a photon carrying 10⁻¹⁹ joules. Evolution optimizes sensors to quantum limits. The ion channel's S4 domain is 3 billion years old (Zakon 2012). It is the 'eye' of electrical sensing — and it is just as sensitive as the optical one.",
        "Lindgren's χ(Ā) formalizes this: the susceptibility function is saturated at the membrane resting potential. This means even a tiny perturbation produces a maximal response because the sensor is already 'fully tuned.'",
        "When this physics was missing, every observation appeared impossible. When it is in place, all observations are consistent.",
        "50 years of dismissed findings. One physical insight. And the question: how many researchers quit because their results were considered 'incredibly implausible'?",
      ],
    ],
    references: [
      "Adey WR, Bawin SM, Lawrence AF (1976). Effects of weak amplitude-modulated microwave fields on calcium efflux from awake cat cerebral cortex. Bioelectromagnetics.",
      "Lai H, Singh NP (1995). Acute low-intensity microwave exposure increases DNA single-strand breaks in rat brain cells. Bioelectromagnetics, 16(3), 207–210. doi:10.1002/bem.2250160309",
      "Lai H, Singh NP (1996). Single- and double-strand DNA breaks in rat brain cells after acute exposure to radiofrequency electromagnetic radiation. Int J Radiat Biol.",
      "Pall ML (2013). Electromagnetic fields act via activation of voltage-gated calcium channels to produce beneficial or adverse effects. J Cell Mol Med. doi:10.1111/jcmm.12088",
      "Sousouri D et al. (2025). CACNA1C genotype modulates sleep spindle response to 5G radiofrequency exposure. NeuroImage, ETH Zurich.",
      "Kim S et al. (2026). Identification of a molecular sensor for electromagnetic fields via genome-wide CRISPR screen. Cell.",
      "York A (2026). Commentary on Kim et al. New Scientist, April 2026.",
      "Panagopoulos DJ et al. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and WC EMFs. Frontiers in Public Health, 13:1585441.",
      "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling: conformational change without ion flux. Nature Reviews Neuroscience.",
      "Zakon HH (2012). Adaptive evolution of voltage-gated sodium channels: the first 800 million years. PNAS, 109(Suppl 1), 10619–10625.",
      "Glaser ZR (1971). Bibliography of Reported Biological Phenomena and Clinical Manifestations Attributed to Microwave and Radio-Frequency Radiation. US Naval Medical Research Institute.",
      "Lindgren O (2026). Geometric susceptibility function χ(Ā) for membrane ion channel sensitivity.",
    ],
  },
  fi: {
    refsTitle: "Lähdeluettelo",
    sections: [
      [
        "Viiden vuosikymmenen ajan EMF-tutkijoiden havainnot ovat kohdanneet saman vastauksen: ”mekanismi on epäuskottava.” Ei ”data on väärä.” Ei ”koe on huonosti suunniteltu.” Vaan: ”emme usko että tämä on mahdollista.”",
        "Tämä artikkeli dokumentoi viisi tapausta joissa vahva empiirinen data hylättiin koska mekanismia ei tunnettu — ja osoittaa miten yksi fysikaalinen oivallus yhdistää ne.",
      ],
      [
        "Adey-Blackman 1976: ”Ikkunailmiö on artefakti”",
        "Mitä havaittiin: 450 MHz amplitudimoduloituna 16 Hz → kalsiumeffluksi aivokudoksesta. MUTTA vain intensiteeteillä 0,1–1,0 mW/cm². Korkeammilla ja matalammilla: ei vaikutusta.",
        "Miksi hylättiin: ”Ei-lineaarinen annos-vaste on epäfysiologinen. Oikea vaikutus kasvaa monotonisesti intensiteetin mukana.” ICNIRP:n koko malli perustuu lineaariseen SAR:iin. Ikkunailmiö kumoaa sen oletuksen.",
        "Mitä nyt tiedämme: Kim 2026 (Cell): geeniekspressio aktivoituu RYTMISTEN Ca²⁺-oskillaatioiden kautta, ei Ca²⁺-pitoisuuden nousun. Oskillaatiotaajuus riippuu kentän parametreista → tietyt intensiteetit tuottavat resonanssin, toiset eivät. Ikkunailmiö ei ole artefakti — se on resonanssi.",
        "Lindgrenin χ(Ā): susceptibiliteetti on saturoitunut solukalvon jännitteessä. Perturbointivaste riippuu kentän taajuussisallöstä suhteessa ionikanavan aikavakioihin, ei pelkästä intensiteetistä.",
      ],
      [
        "Lai & Singh 1995: ”Ei-ionisoiva säteily ei voi katkaista DNA:ta”",
        "Mitä havaittiin: 2450 MHz, 1,2 W/kg, 2 tuntia → DNA-katkokset rottien aivosoluissa. Sekä yksi- että kaksijuostekatkokset. Melatoniini (antioksidantti) esti vaikutuksen.",
        "Miksi yritettiin hylätä: Motorolan ja CTIA:n sisäiset dokumentit paljastivat strategian: rahoitettiin vastatutkimuksia, painostettiin yliopistoa, koordinoitiin mediastrategia. Lai sai hallinnollista painostusta vetää tutkimukset takaisin. Ei vetänyt.",
        "Tieteellinen kritiikki: ”RF-fotonien energia on liian matala rikkomaan kovalenttisia sidoksia. DNA-katkokset ovat mahdottomia ilman ionisaatiota.”",
        "Mitä nyt tiedämme: Melatoniinin suojavaikutus osoittaa ROS-välitteisen reitin: EMF → VGCC → Ca²⁺ → mitokondriaalinen ROS → oksidatiivinen DNA-vaurio. DNA:ta ei riko FOTONI vaan RADIKAALI jonka fotoni-aktivoima ionikanava tuottaa.",
        "Panagopoulos 2025: IFO-mekanismi selitää miten 10⁻⁵ V/m kenttä aktivoi ionikanavan → Ca²⁺-tulva → mitokondrion elektroninsiirtoketjun häiriö → ROS.",
      ],
      [
        "Pall 2013: ”VGCC-hypoteesi on liian yksinkertainen”",
        "Mitä ehdotettiin: Martin Pall kokosi 23 tutkimusta joissa kaikissa EMF:n biologinen vaikutus estyi kalsiumkanavasalpaajilla. Johtopäätös: VGCC on EMF:n suora kohde.",
        "Miksi kritisoitiin: ”Liian yksinkertainen mekanismi selitämään kaiken.” ”Kenttaintensiteetti on liian matala aktivoimaan kanavan.” ”Yhdellä mekanismilla ei voi selitää satoja eri vaikutuksia.”",
        "Mitä nyt tiedämme: Pall oli OSITTAIN oikeassa. VGCC on yksi kohde. Mutta hän ei tuntenut kolmea tarkentavaa mekanismia:",
        "Ensinnäkin Panagopoulos 2025 IFO: ionien pakotettu oskillaatio on TARKEMPI kuvaus kuin ”VGCC-aktivaatio” koska se selitää taajuusriippuvuuden ja ei-termisen kynnyksen. Toiseksi Trus & Atlas 2024: ei-ionotrooppinen VGCC-signalointi — kanava signaloi ILMAN että ioni kulkee läpi, mikä madaltaa efektiivista kynnystä edelleen. Kolmanneksi Kim 2026 Cell: Cyb5b on TOINEN sensori (ei VGCC) joka tuottaa Ca²⁺-oskillaatioita. Pall oletti yhden kohteen — todellisuudessa niitä on vähintään kolme (VGCC/IFO, CRY/RPM, Cyb5b).",
        "Lindgrenin χ(Ā): kaikkien kolmen mekanismin perustana on sama fysikaalinen ilmiö — saturoitunut susceptibiliteetti solukalvon kentässä. Lindgren yhdistää Pallin, Panagopoulosin ja Kimin yhteen kehykseen.",
      ],
      [
        "Sousouri 2025: ”Liian pieni vaikutus, liian pieni otos”",
        "Mitä havaittiin: 5G 3,6 GHz, ICNIRP-rajojen alla, kaksoissokko, ETH Zürich. CACNA1C T/C-kantajien uni-spindletaajuus kiihtyi. T/T-kantajilla ei vaikutusta.",
        "Miksi tätä voidaan kritisoida: ”34 henkilöä on liian pieni otos.” ”Spindle-taajuuden muutos ei ole terveysvaara.” ”Genotyyppi-interaktio voi olla sattumaa pienellä otoksella.”",
        "Miksi nämä kritiikit ovat heikkoja: pieni otos on pätevä huoli — replikaatio tarvitaan. Mutta genotyyppi-interaktio on RAKENTEELLINEN löydös: se selitää MIKSI aiemmat tutkimukset ovat ristiriitaisia. Jos T/T-kantajat eivät reagoi ja T/C-kantajat reagoivat, populaatiokeskiarvo hämärtää todellisen efektin.",
        "Lindgrenin χ(Ā) ennustaa tämän: susceptibiliteetti riippuu ionikanavan TIHEYDESTÄ solukalvolla. CACNA1C rs7304986 on regulatiivinen variantti joka muuttaa ekspression tiheyttä. Enemmän kanavia = suurempi kokonais-susceptibiliteetti = mitattava vaste.",
      ],
      [
        "Kim 2026: ”Incredibly implausible”",
        "Mitä havaittiin: 60 Hz EMF aktivoi Lgr4-geenipromoottorin in vivo transgeenisissä hiirissä. CRISPR-seulonta tunnisti Cyb5b:n EMF-sensoriksi. Rytmiset Ca²⁺-oskillaatiot ohjaavat geeniekspressiota. Cell (IF ~64).",
        "Miksi kritisoitiin: Fyysikko Andrew York (New Scientist, huhtikuu 2026): ”incredibly implausible.” Ei kritisoinut dataa vaan mekanismin OLEMASSAOLOA.",
        "Miksi kritiikki on väärässä: York laskee kentän energian makroskooppisella tasolla. Lindgrenin χ(Ā) laskee sen SOLUKALVON IONIKANAVAN tasolla.",
        "Solukalvon kenttä: ~10⁷ V/m (70 mV / 7 nm). Ulkoinen kenttä: ~10⁻¹ V/m (60 Hz, 2 mT). Suhde: 10⁻⁸.",
        "York: ”10⁻⁸ suhteellinen muutos on liian pieni.”",
        "Lindgren: ”Fotonin energia on 10⁻¹⁹ J. Rodopsiini havaitsee sen koska se on evoluutiossa optimoitu kvanttirajoille. Ionikanavan S4-sensori on evoluutiossa optimoitu solukalvon jännitteen havaitsemiseen kvanttirajoille. 10⁻⁸ suhteellinen muutos riittää koska sensori operoi saturaatiossa (χ ≈ 1).”",
        "Tämä on TÄSMÄLLEEN sama argumentti kuin fotonin havaitseminen: York sanoisi ”yksi fotoni on liian heikko vaikuttamaan biologiaan” jos hän ei tietäisi miten silmä toimii.",
      ],
      [
        "Synteesi: puuttuvan fysiikan hinta",
        "50 vuotta. Viisi tapausta. Sama kaava.",
        "Adey havaitsi ikkunailmiön 1976 → marginalisoitiin 40 vuodeksi. Lai havaitsi DNA-katkokset 1995 → yritettiin tukahduttaa. Pall kokosi 23 tutkimusta 2013 → ”liian yksinkertainen.” Sousouri osoitti geneettisen herkkyyden 2025 → ”liian pieni.” Kim aktivoi geeniekspression 2026 → ”incredibly implausible.”",
        "Jokaisessa tapauksessa data oli vahvaa. Kritiikki kohdistui mekanismin OLEMASSAOLOON, ei datan LAATUUN.",
        "Puuttuva palanen oli fysiikka: miten solukalvon ionikanava voi havaita ulkoisen kentän joka on 10⁸× pienempi kuin solukalvon oma kenttä?",
        "Vastaus: samalla tavalla kuin verkkokalvon rodopsiini havaitsee fotonin joka kantaa 10⁻¹⁹ joulea. Evoluutio optimoi sensorit kvanttirajoille. Ionikanavan S4-domeeni on 3 miljardia vuotta vanha (Zakon 2012). Se on sähköisen havaitsemisen ”silmä” — ja se on yhtä herkä kuin optinen.",
        "Lindgrenin χ(Ā) formalisoi tämän: susceptibiliteettifunktio on saturoitunut solukalvon lepopotentiaalissa. Tämä tarkoittaa että pienikin perturbointia tuottaa maksimivasteen koska sensori on jo ”äärimmilleen viritetty.”",
        "Kun tämä fysiikka puuttui, jokainen havainto näytti mahdottomalta. Kun se on paikallaan, KAIKKI havainnot ovat konsistentteja.",
        "50 vuotta hylättyjä havaintoja. Yksi fysikaalinen oivallus. Ja kysymys: kuinka monta tutkijaa lopetti koska heidän tuloksiaan pidettiin ”incredibly implausible”?",
      ],
    ],
    references: [
      "Adey WR, Bawin SM, Lawrence AF (1976). Effects of weak amplitude-modulated microwave fields on calcium efflux from awake cat cerebral cortex. Bioelectromagnetics.",
      "Lai H, Singh NP (1995). Acute low-intensity microwave exposure increases DNA single-strand breaks in rat brain cells. Bioelectromagnetics, 16(3), 207–210. doi:10.1002/bem.2250160309",
      "Lai H, Singh NP (1996). Single- and double-strand DNA breaks in rat brain cells after acute exposure to radiofrequency electromagnetic radiation. Int J Radiat Biol.",
      "Pall ML (2013). Electromagnetic fields act via activation of voltage-gated calcium channels to produce beneficial or adverse effects. J Cell Mol Med. doi:10.1111/jcmm.12088",
      "Sousouri D ym. (2025). CACNA1C-genotyyppi moduloi unisukkulavastetta 5G-radiotaajuusaltistukselle. NeuroImage, ETH Zürich.",
      "Kim S ym. (2026). Identification of a molecular sensor for electromagnetic fields via genome-wide CRISPR screen. Cell.",
      "York A (2026). Kommentaari Kim ym:n tutkimuksesta. New Scientist, huhtikuu 2026.",
      "Panagopoulos DJ ym. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and WC EMFs. Frontiers in Public Health, 13:1585441.",
      "Trus MD, Atlas D (2024). Non-ionotropic VGCC signaling: conformational change without ion flux. Nature Reviews Neuroscience.",
      "Zakon HH (2012). Adaptive evolution of voltage-gated sodium channels: the first 800 million years. PNAS, 109(Suppl 1), 10619–10625.",
      "Glaser ZR (1971). Bibliography of Reported Biological Phenomena and Clinical Manifestations Attributed to Microwave and Radio-Frequency Radiation. US Naval Medical Research Institute.",
      "Lindgren O (2026). Geometrinen susceptibiliteettifunktio χ(Ā) solukalvon ionikanavan herkkyydelle.",
    ],
  },
} as const;

export function ImplausibilityArticleContent({ locale }: { locale: Locale }) {
  const c = COPY[locale];

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
              {para}
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
              {ref}
            </li>
          ))}
        </ol>
      </footer>

      <aside className="mt-8 rounded-lg border border-yellow-500/30 bg-yellow-50/5 p-4">
        <p className="text-xs text-foreground-muted leading-relaxed">
          <span className="font-semibold text-yellow-600">{locale === "fi" ? "Episteeminen huomautus" : "Epistemic note"}:</span>{" "}
          {locale === "fi"
            ? "Lindgrenin tulkinta on teoreettinen eikä sitä ole vielä riippumattomasti validoitu. Empiiriset havainnot (Adey, Lai, Pall, Sousouri, Kim) ovat olemassa riippumatta teoreettisesta kehyksestä."
            : "Lindgren’s interpretation is theoretical and not yet independently validated. The empirical findings (Adey, Lai, Pall, Sousouri, Kim) stand independently of the theoretical framework."}
        </p>
      </aside>
    </div>
  );
}
