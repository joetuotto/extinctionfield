/**
 * Derived results on field structure, signal calculation and identifiability.
 *
 * Source: berm/docs/berm-new-findings-and-refinements-2026-09-07.md, findings
 * 08–12, 17, 20–22, 23–30. Every entry carries the source document's own
 * evidence status. "Calculated" means a mathematical consequence under stated
 * assumptions; it is not an empirical confirmation of the premise.
 *
 * These results constrain the model as often as they extend it. Several
 * replace an earlier, broader assumption with a narrower one that holds.
 */

import type { LocalizedText } from "./correction_registry";

/** The five statuses used by the source document. */
export type FindingStatus =
  | "calculated"
  | "experimentally_bounded"
  | "observed_in_data"
  | "refined"
  | "test_hypothesis";

export const FINDING_STATUS_LABELS: Record<FindingStatus, LocalizedText> = {
  calculated: { en: "Calculated", fi: "Laskettu" },
  experimentally_bounded: { en: "Experimentally bounded", fi: "Kokeellisesti rajattu" },
  observed_in_data: { en: "Observed in data", fi: "Aineistossa havaittu" },
  refined: { en: "Refined", fi: "Tarkennettu" },
  test_hypothesis: { en: "Test hypothesis", fi: "Testihypoteesi" },
};

export const FINDING_STATUS_MEANING: Record<FindingStatus, LocalizedText> = {
  calculated: {
    en: "A mathematical consequence or checked numerical result under stated assumptions. The premise's description of nature is not confirmed by a calculation.",
    fi: "Matemaattinen seuraus tai tarkistettu numeerinen tulos ilmoitetuilla oletuksilla. Premissin luonnonkuvaus ei varmistu laskusta.",
  },
  experimentally_bounded: {
    en: "An original study's intervention or measurement supports the named claim under its own conditions. It does not by itself mean independent replication.",
    fi: "Alkuperäistutkimuksen interventio tai mittaus tukee nimettyä väitettä sen koeoloissa. Ei tarkoita automaattisesti riippumatonta replikaatiota.",
  },
  observed_in_data: {
    en: "A relation computed from a publication map or research dataset. It does not itself identify a causal mechanism.",
    fi: "Julkaisukartasta tai tutkimusaineistosta laskettu yhteys. Ei itsessään yksilöi kausaalista mekanismia.",
  },
  refined: {
    en: "An earlier formulation that was too broad or imprecise has been replaced with a more exact one.",
    fi: "Aiempi liian laaja tai epätäsmällinen muotoilu on korvattu täsmällisemmällä.",
  },
  test_hypothesis: {
    en: "A new relation, parametrisation or prediction whose discriminating empirical test has not yet been done.",
    fi: "Uusi yhteys, parametrisointi tai ennuste, jonka erottava empiirinen testi on vielä tekemättä.",
  },
};

export interface SignalResult {
  id: string;
  /** Finding numbers in the source document. */
  findings: string;
  title: LocalizedText;
  status: FindingStatus;
  /** Plain-text formula or numeric result. */
  quantitative: string;
  /** What the result establishes. */
  result: LocalizedText;
  /** What it does not establish — the bound, stated as explicitly as the result. */
  bound: LocalizedText;
  referenceIds?: string[];
}

/** Findings 08–12: what survives from the metric premise to a receptor timescale. */
export const FIELD_STRUCTURE_RESULTS: SignalResult[] = [
  {
    id: "cross_terms",
    findings: "08",
    title: { en: "Background cross terms follow from the premise", fi: "Taustan ristitermit seuraavat premissistä" },
    status: "calculated",
    quantitative: "g_μν = η_μν + κA_μA_ν,  A = A₀ + a\nΔg_μν = κ(A₀_μ a_ν + a_μ A₀_ν + a_μ a_ν)",
    result: {
      en: "For the stated ansatz and decomposition the cross structure is exact, so the background does not generally cancel out of a geometric exposure-versus-control difference. This replaces an earlier need to assume some background dependence: the structure follows from the premise.",
      fi: "Annetulle ansatzille ja hajotelmalle ristirakenne on täsmällinen, joten tausta ei yleisesti katoa geometrisesta koe–verrokkierosta. Tämä korvaa aiemman tarpeen olettaa jonkinlainen taustariippuvuus: rakenne seuraa premissistä.",
    },
    bound: {
      en: "κ carries the normalisation and A is the four-potential, not a meter's E or B reading. The biological consequence still has to be formed with a receptor operator; writing δH = Q^μν δg_μν makes the missing coupling visible without fixing its value.",
      fi: "κ sisältää normalisoinnin ja A on nelipotentiaali, ei mittarin E- tai B-lukema. Biologinen seuraus täytyy silti muodostaa vastaanottimen operaattorilla; δH = Q^μν δg_μν tekee puuttuvan kytkennän näkyväksi määräämättä sen arvoa.",
    },
    referenceIds: ["lindgren2025"],
  },
  {
    id: "time_averaging",
    findings: "09",
    title: { en: "Static-background cross terms average away over the carrier", fi: "Staattisen taustan ristitermit keskiarvoistuvat kantajan yli" },
    status: "calculated",
    quantitative: "a(t) = Re[u(t)e^{iω_c t}],  ⟨a⟩ = 0\n⟨a_μ a_ν⟩ = ½ Re[u_μ u_ν*]",
    result: {
      en: "Terms linear in a static A₀ average to zero over a zero-mean carrier, while the quadratic part survives. A slow power envelope can therefore persist in a quadratic driver even where the static background cross term vanishes in this approximation.",
      fi: "Staattisen A₀:n kanssa lineaariset termit keskiarvoistuvat nollaan nollakeskiarvoisen kantajan yli, kun neliöllinen osa säilyy. Hidas tehoverhokäyrä voi siis säilyä neliöllisessä ajurissa, vaikka staattinen taustaristitermi häviää tässä approksimaatiossa.",
    },
    bound: {
      en: "This is a correction to the broader earlier wording: not every algebraic cross product is automatically present at a biological timescale. The background can still act through the receptor's energy gap, its orientation or a second coherent frequency component — those are separate routes.",
      fi: "Tämä on korjaus aiempaan yleismuotoiluun: jokainen algebrallinen ristitulo ei ole automaattisesti läsnä biologisella aikaskaalalla. Tausta voi edelleen vaikuttaa vastaanottimen energiavälin, orientaation tai toisen koherentin taajuuskomponentin kautta — nämä ovat eri reittejä.",
    },
    referenceIds: ["lindgren2025"],
  },
  {
    id: "superposition",
    findings: "10",
    title: { en: "Superposition mixes frequencies; it does not square the harm", fi: "Superpositio sekoittaa taajuuksia, ei neliöi haittaa" },
    status: "calculated",
    quantitative: "N components → N(N−1)/2 distinct cross pairs\nproduct of two sines → sum and difference frequency",
    result: {
      en: "A difference frequency falling inside the receptor's band can be formed from two components, neither of which feeds that band alone. A single-frequency test therefore does not cover multi-source exposure.",
      fi: "Vastaanottimen kaistaan osuva erotustaajuus voi muodostua kahdesta komponentista, joista kumpikaan ei yksin syötä kyseistä kaistaa. Yksittäisen taajuuden testi ei siksi kata monilähdealtistusta.",
    },
    bound: {
      en: "The number of sources fixes neither the sign of the cross terms, nor phase coherence, tensor projection or averaging. A quadratic count of terms is not a quadratic growth in damage. A cross term that averages to zero can still leave temporal variation: a vanishing mean and vanishing variance are different things.",
      fi: "Lähteiden lukumäärä ei määrää ristiosien etumerkkiä, vaihekoherenssia, tensoriprojektiota eikä keskiarvoistumista. Neliömääräinen termien lukumäärä ei ole neliömääräinen vaurion kasvu. Nollaksi keskiarvoistuva ristiosa voi jättää ajallista vaihtelua: keskiarvon ja vaihtelutehon häviäminen ovat eri asioita.",
    },
  },
  {
    id: "direction_dependence",
    findings: "11",
    title: { en: "A sign-dependent response needs a symmetry-breaking term", fi: "Etumerkkiriippuvainen vaste tarvitsee symmetriaa rikkovan termin" },
    status: "calculated",
    quantitative: "a_μ a_ν is identical for a and −a\ng(A₀+a) − g(A₀−a) = 2κ(A₀_μ a_ν + a_μ A₀_ν)",
    result: {
      en: "A purely quadratic driver cannot distinguish a field from its reverse, so a direction-dependent response requires the background cross term or another symmetry-breaking structure. The up–down difference reported in the PEMF work makes such a bound experimentally relevant.",
      fi: "Puhtaasti neliöllinen ajuri ei erota kenttää sen käänteisestä, joten suuntariippuvainen vaste vaatii taustaristitermin tai muun symmetriaa rikkovan rakenteen. PEMF-työssä raportoitu ylös–alas-ero tekee tällaisesta rajauksesta kokeellisesti merkityksellisen.",
    },
    bound: {
      en: "Reversing a coil is not necessarily a clean sign flip of every local potential component: the induced electric field, cell orientation and geometry have to be checked too. The discriminating design reverses background and test exposure separately in pre-computed combinations, and in the radiofrequency case the carrier-averaging bound above applies as well.",
      fi: "Kelan kääntö ei välttämättä ole kaikkien paikallisten potentiaalikomponenttien puhdas etumerkin vaihto: indusoitu sähkökenttä, solujen orientaatio ja geometria on tarkistettava. Erottava asetelma kääntää taustan ja koealtisteen erikseen ennalta lasketuissa yhdistelmissä, ja RF-tapauksessa pätee lisäksi yllä oleva aikakeskiarvorajaus.",
    },
    referenceIds: ["lindgren2025", "iversen2025"],
  },
  {
    id: "f_vs_chi",
    findings: "12",
    title: { en: "F and χ saturation predict different additional response", fi: "F:n ja χ:n kyllästyminen ennustavat eri lisävasteen" },
    status: "calculated",
    quantitative: "F(q) = √(1+q²),  χ(q) = F′(q) = q/√(1+q²),  χ′(q) = (1+q²)^(−3/2)\nΔF ≈ χ(q)δq → δq   as q grows\nΔχ ≈ (1+q²)^(−3/2) δq → 0",
    result: {
      en: "If the biological quantity reads F, a small additional exposure does not vanish in this limit. If it reads χ, the additional response can vanish. The interpretation of a laboratory saturation observation therefore depends on which quantity the biological process reads — the two cases are mathematically different, not two wordings of one claim.",
      fi: "Jos biologinen suure lukee F:ää, pieni lisäaltistus ei tässä rajassa katoa. Jos se lukee χ:tä, lisävaste voi kadota. Laboratorion kyllästymishavainnon tulkinta riippuu siis siitä, mitä suuretta biologinen prosessi lukee — tapaukset ovat matemaattisesti erilaisia, eivät saman väitteen kaksi sanamuotoa.",
    },
    bound: {
      en: "q is a normalised geometric variable; identifying it with a chronic radiofrequency dose needs a separate mapping. So \"the non-linearity is in the premise\" is correct, while \"the premise proves laboratory saturation\" does not follow from it. The decisive choice sits in the biological observable.",
      fi: "q on normalisoitu geometrinen muuttuja; sen samastaminen krooniseen RF-annokseen vaatii erillisen kuvauksen. Siksi \"epälineaarisuus on premississä\" on oikein, mutta \"premissi todistaa laboratoriokyllästymisen\" ei seuraa siitä. Ratkaiseva valinta on biologisessa havaittavassa.",
    },
  },
];

/** Findings 23–30: what an idealised signal can and cannot carry. */
export const SIGNAL_CALCULATION_RESULTS: SignalResult[] = [
  {
    id: "gsm_25hz",
    findings: "23",
    title: { en: "The GSM 25 Hz component derives from the standard", fi: "GSM:n 25 Hz -komponentti johdetaan standardista" },
    status: "calculated",
    quantitative:
      "TCH/F: slot 3/5200 s, frame 3/650 s, 26-frame multiframe 120 ms\nc_k = sinc(k/208)·e^{−iπk/208}·Σ_{j=0..24} e^{−i2πkj/26} / 25,  f_k = k/0.120 s\n25 Hz is the third multiframe harmonic: cosine amplitude 0.0799726 (7.9973% of mean power)\n216.667 Hz cosine amplitude ≈ 1.94899",
    result: {
      en: "For the standard's own TCH/F example with a full one-slot burst in 25 frames and one idle frame, the 25 Hz power component is exact and calculable rather than assumed.",
      fi: "Standardin omalle TCH/F-esimerkille, jossa on täysi yhden aikavälin pulssi 25 kehyksessä ja yksi tyhjä kehys, 25 Hz:n tehokomponentti on täsmällinen ja laskettavissa eikä oletettu.",
    },
    bound: {
      en: "7.9973% is a share of mean power, not of total energy. Ramps, falls and guard periods are idealised. The result covers this standard example, not every GSM mode and not any individual study's recorded signal. Eight percent is not a health threshold.",
      fi: "7,9973 % on osuus keskimääräisestä tehosta, ei kokonaisenergiasta. Nousut, laskut ja suojavälit on idealisoitu. Tulos koskee tätä standardiesimerkkiä, ei kaikkia GSM-tiloja eikä yksittäisen tutkimuksen tallennettua signaalia. Kahdeksan prosenttia ei ole terveyshaitan kynnys.",
    },
    referenceIds: ["etsi_ts_145_002"],
  },
  {
    id: "idle_frame_control",
    findings: "24",
    title: { en: "Filling the idle frame is a usable discriminating control", fi: "Lepokehyksen täyttö on käyttökelpoinen erottelukontrolli" },
    status: "calculated",
    quantitative: "idle frame filled + burst level reduced to hold mean power → 25 Hz component vanishes;\nnormalised 216.667 Hz component survives",
    result: {
      en: "The control separates the multiframe structure's contribution from the plain TDMA frame period, at equal mean power. That is a concrete experimental advance over a bare GSM-versus-UMTS comparison.",
      fi: "Kontrolli erottaa monikehysrakenteen vaikutuksen pelkästä TDMA-kehysjaksosta samalla keskiteholla. Se on konkreettinen kokeellinen edistys pelkkään GSM–UMTS-vertailuun nähden.",
    },
    bound: {
      en: "The control also removes other harmonics of the 8.333 Hz multiframe structure, so a positive biological difference would localise the effect to that component set rather than to 25 Hz alone. The sharper follow-up selectively attenuates and re-adds the chosen intensity component while documenting mean, temperature and the other changing spectral parts.",
      fi: "Kontrolli poistaa myös muita 8,333 Hz:n monikehysrakenteen harmonisia, joten positiivinen biologinen ero paikantaisi vaikutuksen tähän komponenttijoukkoon eikä yksin 25 Hz:iin. Tarkempi jatkotesti vaimentaa ja lisää takaisin valitun intensiteettikomponentin, samalla kun keskiarvo, lämpötila ja muut muuttuvat spektriosat dokumentoidaan.",
    },
    referenceIds: ["etsi_ts_145_002"],
  },
  {
    id: "ordering_condition",
    findings: "26",
    title: { en: "The ordering switch is now an exact condition", fi: "Järjestyksen vaihtuminen on täsmällinen ehto" },
    status: "calculated",
    quantitative:
      "GSM example: R = 0.0545775\nsinusoidal 25 Hz power modulation p(t) = 1 + m_P cos(2π·25t) → R = m_P√[W(25)/2]\nthreshold to exceed the GSM point at equal carrier and mean local power: m_P = 0.0799726",
    result: {
      en: "A suitable slow power variation added to a UMTS-type carrier can exceed this GSM signal's window score without any UMTS-specific coefficient. That is a constructive answer to how strong UMTS responses are possible at all.",
      fi: "UMTS-tyyppiseen kantajaan lisätty sopiva hidas tehonvaihtelu voi ylittää tämän GSM-signaalin ikkunapisteen ilman UMTS-kerrointa. Se on konstruktiivinen vastaus siihen, miten voimakkaat UMTS-vasteet ovat ylipäätään mahdollisia.",
    },
    bound: {
      en: "Those sine waves are constructed test signals. The calculation does not show that this particular variation was present in the experiment that produced a strong biological UMTS result. The ordering of ideal signals has been computed; ordering tests on real experiments number zero.",
      fi: "Kyseiset siniaallot ovat rakennettuja testisignaaleja. Laskenta ei osoita, että juuri tämä vaihtelu esiintyi voimakkaan biologisen UMTS-tuloksen tuottaneessa kokeessa. Ideaalisten signaalien järjestys on laskettu; todellisten kokeiden järjestystestejä on tehty nolla.",
    },
  },
  {
    id: "field_vs_power_am",
    findings: "27",
    title: { en: "Power modulation, field modulation and carrier are separated", fi: "Teho-, kenttämodulaatio ja kantaja on erotettu" },
    status: "calculated",
    quantitative:
      "field envelope a₀[1 + m_E cos(Ωt)] → m_P = 2m_E/(1 + m_E²/2)\nm_P = 0.0799726 → m_E = 0.0400183 (≈ 4.002%)\ncarrier scaling of a conditional A² driver: ⟨E²⟩R/(2πf_c)²\n1947.4 MHz vs 915 MHz comparison → equivalent power-modulation threshold 36.23%, not 8%",
    result: {
      en: "Field-amplitude and power percentages are not the same number, and squaring additionally produces a second harmonic. The earlier threshold is now tied unambiguously to the normalisation, the carrier and the definition of modulation.",
      fi: "Kenttäamplitudin ja tehon prosentit eivät ole sama luku, ja neliöinti tuottaa lisäksi toisen harmonisen. Aiempi kynnys on nyt sidottu yksiselitteisesti normalisointiin, kantajaan ja modulaation määritelmään.",
    },
    bound: {
      en: "Changing the carrier changes the condition. Moving from SAR to E² requires the medium's properties. The A² driver is accepted conditionally here, not established.",
      fi: "Kantajan vaihto muuttaa ehtoa. SAR:sta E²:een siirtyminen vaatii väliaineen tiedot. A²-ajuri hyväksytään tässä ehdollisesti, ei osoitettuna.",
    },
  },
  {
    id: "phase_identifiability",
    findings: "28",
    title: { en: "The same RF power spectrum can give a different window score", fi: "Sama RF-tehospektri voi antaa eri ikkunapisteen" },
    status: "calculated",
    quantitative:
      "u_φ(t) = 1 + e^{iΩt} + e^{i(2Ωt+φ)},  Ω = 2π·25\nall φ: the three RF spectral lines carry powers 1, 1, 1\n|u_φ|²/3 = 1 + (2/3)Re[(1+e^{iφ})e^{iΩt} + e^{iφ}e^{i2Ωt}]\nφ = 0 → 25 Hz cosine amplitude 4/3;  φ = π → exactly zero (50 Hz component remains)\nR ≈ 0.909936  vs  2.39 × 10⁻⁵⁹",
    result: {
      en: "A constructive counterexample: the RF power spectrum and the mean power do not by themselves determine the spectrum of the slow intensity components. This is a firm identifiability limit, not a caution.",
      fi: "Rakentava vastaesimerkki: RF-tehospektri ja keskiteho eivät yksin määrää intensiteetin hitaiden komponenttien spektriä. Tämä on varma identifioitavuusraja, ei varaus.",
    },
    bound: {
      en: "Phase-bearing I/Q data, a measured power time trace or a sufficiently complete stochastic model is needed in addition. For a random signal the intensity correlation involves fourth-order field statistics. Missing exposure information cannot be uniquely recovered even by very good reasoning — so every technology comparison resting on a power spectrum alone is conditional on phase structure not changing the slow envelope in that case.",
      fi: "Lisäksi tarvitaan vaiheellinen I/Q-data, mitattu tehoaikajälki tai riittävän täydellinen stokastinen malli. Satunnaissignaalille intensiteettikorrelaatio liittyy kentän neljännen kertaluvun tilastoon. Puuttuvaa altistustietoa ei voi palauttaa yksikäsitteisesti edes erittäin hyvällä päättelyllä — joten jokainen pelkkään tehospektriin nojaava teknologiavertailu on ehdollinen sille, ettei vaiherakenne muuta hidasta verhoa kyseisessä tapauksessa.",
    },
  },
  {
    id: "nr_periodicity",
    findings: "29",
    title: { en: "An exactly repeating 10 ms NR frame carries no 25 Hz line", fi: "Täsmälleen toistuva 10 ms:n NR-kehys ei kanna 25 Hz:n viivaa" },
    status: "calculated",
    quantitative:
      "exact 10 ms repetition through a time-stable path → intensity spectral lines at integer multiples of 100 Hz\nnon-negative periodic power normalised to mean one: |c_k| ≤ 1\nwindow score upper bound: log₁₀ R ≈ −535.94",
    result: {
      en: "The narrow 25.4 Hz window receives only the tail of the Gaussian weight, so the reported null results for a repeating NR frame are consistent with a very small score. A negative result of this kind is informative: it bounds the prediction.",
      fi: "Kapea 25,4 Hz:n ikkuna saa vain Gauss-painon hännän, joten toistuvan NR-kehyksen raportoidut nollatulokset ovat yhteensopivia hyvin pienen pisteen kanssa. Tämänkaltainen negatiivinen tulos on informatiivinen: se rajaa ennustetta.",
    },
    bound: {
      en: "The local field around a moving animal need not be 10 ms periodic. The result does not cover all 5G traffic or all biological routes: real NR traffic carries scheduling, power control and beam management, whose slow components need measured traffic records rather than an idealised signal. One technology generation can contain very different slow exposure components.",
      fi: "Liikkuvan eläimen paikallinen kenttä ei välttämättä ole 10 ms -periodinen. Tulos ei koske kaikkea 5G-liikennettä eikä kaikkia biologisia reittejä: todellinen NR-liikenne sisältää skedulointia, tehonsäätöä ja keilanhallintaa, joiden hitaat komponentit vaativat mitattuja liikennetallenteita eikä idealisoitua signaalia. Sama teknologiasukupolvi voi sisältää hyvin erilaisia hitaita altistuskomponentteja.",
    },
    referenceIds: ["etsi_ts_138_211"],
  },
  {
    id: "background_sweep",
    findings: "30",
    title: { en: "The background sweep has pre-computed alignment points", fi: "Taustakentän pyyhkäisyllä on ennalta lasketut kohdistumiskohdat" },
    status: "test_hypothesis",
    quantitative:
      "if window centre and width scale as B/37 µT, GSM harmonics\n16.667 / 25 / 33.333 / 41.667 Hz hit the centre peak at\nB₀ = 24.28 / 36.42 / 48.56 / 60.70 µT",
    result: {
      en: "One of the chain's most discriminating new predictions: the same signal can produce a changing response when only the background field moves the receptor's window. These alignments are computed in advance rather than fitted to laboratory backgrounds after the fact.",
      fi: "Yksi ketjun erottelukykyisimmistä uusista ennusteista: sama signaali voi tuottaa muuttuvan vasteen, kun ainoastaan taustakenttä siirtää vastaanottimen ikkunaa. Kohdistumiset lasketaan etukäteen eikä sovitetaan laboratorioiden taustoihin jälkikäteen.",
    },
    bound: {
      en: "The σ versus FWHM reading of the width changes the depth of the minima, so succeeding at one field value is not enough. A strong test measures the whole sweep and compares peak positions and widths against the same pre-registered rule. A multi-peak receiver is its own prediction and must not be swapped in mid-comparison.",
      fi: "Leveyden σ/FWHM-tulkinta muuttaa minimien syvyyttä, joten onnistuminen yhdellä kentän arvolla ei riitä. Vahva testi mittaa koko pyyhkäisyn ja vertaa huippujen sijaintia ja leveyttä samaan ennalta rekisteröityyn sääntöön. Monihuippuinen vastaanotin on oma ennusteensa, jota ei vaihdeta kesken vertailun.",
    },
    referenceIds: ["baureuskoch2003_vesicle_ipr"],
  },
];

/** The window-score table the source document reports (finding 25–29). */
export interface WindowScore {
  signal: LocalizedText;
  score: string;
  reading: LocalizedText;
}

export const WINDOW_SCORES: WindowScore[] = [
  {
    signal: { en: "GSM, 25 active frames + one idle", fi: "GSM, 25 aktiivista kehystä + yksi tyhjä" },
    score: "0.054577",
    reading: { en: "Reference point of the locked window", fi: "Lukitun ikkunan vertailupiste" },
  },
  {
    signal: { en: "Same RF spectrum, phase φ = 0", fi: "Sama RF-spektri, vaihe φ = 0" },
    score: "0.909936",
    reading: { en: "Identical power spectrum, large score", fi: "Identtinen tehospektri, suuri piste" },
  },
  {
    signal: { en: "Same RF spectrum, phase φ = π", fi: "Sama RF-spektri, vaihe φ = π" },
    score: "2.39 × 10⁻⁵⁹",
    reading: { en: "Identical power spectrum, score vanishes", fi: "Identtinen tehospektri, piste häviää" },
  },
  {
    signal: { en: "Exactly periodic 10 ms NR frame", fi: "Täsmälleen periodinen 10 ms:n NR-kehys" },
    score: "log₁₀ R ≈ −535.94",
    reading: { en: "Upper bound from periodicity alone", fi: "Yläraja pelkästä periodisuudesta" },
  },
];

/** The window definition, stated so the score is reproducible. */
export const WINDOW_DEFINITION = {
  weight: "W(f) = exp[−4 ln2 ((f − 25.4)/2.5)²]",
  normalisation: "p(t) = q(t)/⟨q⟩ with the DC component removed, q = carrier-averaged local E²",
  score: "R² = Σ_{k>0} 2|c_k|² W(f_k)",
  note: {
    en: "R is a window-weighted RMS relative to mean local power. Equal weights across the 20.9 / 25.4 / 30.2 Hz peaks and the use of W as a power weight are choices of this calculation. The protocol was locked locally before the numerical run, but earlier biological results were already known: this was not an independent pre-registration or a blinded analysis.",
    fi: "R on keskimääräiseen paikalliseen tehoon suhteutettu, ikkunalla painotettu RMS. Yhtäsuuret painot huipuille 20,9 / 25,4 / 30,2 Hz ja W:n käyttö tehopainona ovat tämän laskennan valintoja. Protokolla lukittiin paikallisesti ennen numeerista ajoa, mutta aiemmat biologiset tulokset olivat jo tiedossa: kyse ei ollut riippumattomasta ennakkorekisteröinnistä eikä sokkoutuksesta.",
  },
} as const;
