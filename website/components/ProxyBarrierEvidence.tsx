import { InlineReferenceText } from "@/components/InlineReferenceText";
import { MathBlock } from "@/components/MathBlock";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "RF, the blood–brain barrier and internal metal dose",
    eyebrow: "Three measured components, one assembled mechanism",
    lead: "Tissue metal exposure depends on transport as well as blood concentration. Three experimental components connect RF, transport and chemical-specific toxicity.",
    components: [
      {
        title: "RF changes uptake and barrier-related transport",
        text: "Pulsed 2.45 GHz increased tracer uptake into brain capillary endothelial cells; colchicine almost abolished uptake. Separately, GSM-900 exposure increased albumin extravasation. [[ref:neubauer1990_rf_endothelial_uptake|Neubauer 1990]]; [[ref:nittby2009_gsm_bbb|Nittby 2009]].",
        takeaway: "The field branch reaches a transport-related biological process.",
      },
      {
        title: "A transport intervention changes metal entry into the brain",
        text: "Methionine and BCH reduced brain uptake of radiolabelled methylmercury–L-cysteine by competing with amino-acid transport. Entry depended on the metal’s chemical form and transport pathway. [[ref:kerper1992_methylmercury_bbb|Kerper 1992]].",
        takeaway: "Blood concentration alone does not determine the metal’s entry into tissue.",
      },
      {
        title: "RF modifies a chemical-specific toxic response",
        text: "In mouse embryonic fibroblasts, Cr(VI) pretreatment followed by 1800 MHz RF at SAR 4 W/kg increased DNA damage. Cadmium, hydrogen peroxide and 4NQO did not show that additional response. [[ref:zhu2026_rf_chromium_dna|Zhu 2026]].",
        takeaway: "The combined effect depends on the chemical and biological conditions.",
      },
    ],
    synthesisTitle: "BERM connects transport to internal dose",
    synthesis: "Transport controls internal exposure; RF changes transport-related processes and metal-related damage under the studied protocols. BERM connects these components through a metal-form-specific transfer coefficient dependent on field input and receiving state.",
    equationLabel: "Local transport schematic · BERM composition",
    terms: [
      { symbol: "Jⱼ", meaning: "Inward metal flux per unit tissue volume: amount / volume / time." },
      { symbol: "Tⱼ", meaning: "Transfer coefficient for metal form j, normalised to tissue volume: 1 / time." },
      { symbol: "C_blood,j", meaning: "Blood concentration of the transportable metal form j: amount / volume." },
      { symbol: "E, S", meaning: "The specified field input and the receiving tissue’s state." },
    ],
    derivativeLead: "Holding blood concentration and receiving state fixed, the field dependence of influx follows the field dependence of the transfer coefficient:",
    coefficientScope: "Tⱼ(E, S) is BERM’s composed field-sensitive link. Its metal-specific magnitude and sign remain to be calibrated. This local linear approximation describes influx; tissue accumulation also depends on clearance.",
    conclusionTitle: "Why a metal-only explanation misses part of the chain",
    conclusion: "At the same blood concentration, a change in the transfer coefficient changes the inward metal flux. The metal remains a causal exposure, while the measured metal–outcome relationship incorporates the conditions governing entry and response. BERM makes the field-dependent part of those conditions explicit.",
    wifiTitle: "Where Wi-Fi enters the model",
    wifi: "BERM includes Wi-Fi in the RF input family using its actual spectrum, modulation, traffic pattern and timing. The Wi-Fi application is derived here from the RF components through BERM; the cited experimental protocols used laboratory pulses, GSM-900 and 1800 MHz exposure.",
    details: "Study protocols and what each endpoint measures",
    protocols: [
      { title: "Neubauer 1990 · endothelial uptake", text: "Male rats; 2.45 GHz, 10 µs pulses at 100 pulses/s, 10 mW/cm², SAR approximately 2 W/kg, 30–120 minutes. The endpoint was rhodamine–ferritin uptake into cortical capillary endothelium, not metal delivery into brain tissue. [[ref:neubauer1990_rf_endothelial_uptake|Neubauer 1990]]." },
      { title: "Nittby 2009 · albumin extravasation", text: "Forty-eight rats; GSM-900 for two hours, SAR 0–120 mW/kg, assessed seven days later. Pooled extravasation increased; the dose-specific difference was at 12 mW/kg. Albumin passage is distinct from metal flux. [[ref:nittby2009_gsm_bbb|Nittby 2009]]." },
      { title: "Kerper 1992 · methylmercury uptake", text: "Anaesthetised rats received rapid carotid methylmercury–L-cysteine infusion. Uptake was partly saturable. The inhibited amino-acid route differs from endothelial tracer uptake and albumin leakage; there was no field intervention. [[ref:kerper1992_methylmercury_bbb|Kerper 1992]]." },
      { title: "Zhu 2026 · DNA damage", text: "Fibroblasts; 12-hour chemical pretreatment, then 1800 MHz RF, SAR 4 W/kg, for 15 minutes. RF alone produced no detectable damage. Genotoxicity was measured, not the blood–brain barrier or metal transport. [[ref:zhu2026_rf_chromium_dna|Zhu 2026]]." },
      { title: "Cosquer 2005 · no detected leakage", text: "Rats; 2.45 GHz, 2 µs pulses at 500 pulses/s, 45 minutes, whole-body SAR 2 W/kg, average brain SAR 3 W/kg. No Evans blue leakage was detected. Signal, timing and endpoint therefore remain part of the transport specification. [[ref:cosquer2005|Cosquer 2005]]." },
    ],
  },
  fi: {
    title: "RF, veri-aivoeste ja metallin sisäinen annos",
    eyebrow: "Kolme mitattua osaa, yksi koostettu mekanismi",
    lead: "Kohdekudokseen päätyvä metallimäärä riippuu veren pitoisuuden lisäksi kuljetuksesta. Kokeet paikantavat selityksestä kolme toisiinsa liittyvää osaa: kenttä muuttaa kuljetusprosessia, metallin kemiallinen muoto määrää sen reittiä aivoihin, ja RF muuttaa metalliin liittyvää toksista vastetta.",
    components: [
      {
        title: "RF muuttaa ottoa ja esteeseen liittyvää kuljetusta",
        text: "Neubauerin pulssitettu 2,45 GHz:n altistus lisäsi merkkiaineen ottoa aivojen kapillaarien endoteelisoluihin; kolkisiini esti oton lähes kokonaan. Nittbyn GSM-900-kokeessa havaittiin lisääntynyttä albumiinin ekstravasaatiota. Nämä ovat mitattuja vaikutuksia endoteelin ottoon ja veri-aivoesteen läpäisyyn. [[ref:neubauer1990_rf_endothelial_uptake|Neubauer 1990]]; [[ref:nittby2009_gsm_bbb|Nittby 2009]].",
        takeaway: "Kenttähaara ulottuu kuljetukseen liittyvään biologiseen prosessiin.",
      },
      {
        title: "Kuljetukseen puuttuminen muuttaa metallin pääsyä aivoihin",
        text: "Kerper mittasi radioleimatun, L-kysteiinikompleksina kulkevan metyylielohopean aivoihinottoa. Metioniini ja BCH vähensivät ottoa kilpailemalla aminohappokuljetuksesta. Pääsy riippui siis sekä metallin kemiallisesta muodosta että kuljetusreitistä. [[ref:kerper1992_methylmercury_bbb|Kerper 1992]].",
        takeaway: "Veren pitoisuus ei yksin määrää metallin pääsyä kudokseen.",
      },
      {
        title: "RF muuttaa kemikaalikohtaista toksista vastetta",
        text: "Zhun hiiren alkion fibroblasteissa Cr(VI)-esikäsittelyä seurannut 1800 MHz:n RF-altistus SAR-arvolla 4 W/kg lisäsi DNA-vauriota. Kadmium, vetyperoksidi ja 4NQO eivät tuottaneet samaa lisävastetta. Koe mittaa RF:n ja kemikaalin vuorovaikutusta vaurion päätepisteessä. [[ref:zhu2026_rf_chromium_dna|Zhu 2026]].",
        takeaway: "Yhteisvaikutus riippuu kemikaalista ja biologisista olosuhteista.",
      },
    ],
    synthesisTitle: "BERM yhdistää kuljetuksen sisäiseen annokseen",
    synthesis: "Kuljetusinterventiot osoittavat, että sisäänpääsyn muuttaminen muuttaa sisäistä altistusta. RF-kokeet osoittavat muutoksia kuljetukseen liittyvissä prosesseissa ja metalliin liittyvässä vauriovasteessa omilla altistusprotokollillaan. BERM yhdistää nämä osat metallimuotokohtaiseksi siirtokertoimeksi, joka riippuu kenttäsyötteestä ja vastaanottotilasta.",
    equationLabel: "Paikallinen kuljetuskaavio · BERM:n kokoaminen",
    terms: [
      { symbol: "Jⱼ", meaning: "Metallin sisäänvirtaus kudostilavuutta kohti: määrä / tilavuus / aika." },
      { symbol: "Tⱼ", meaning: "Metallimuodon j siirtokerroin suhteutettuna kudostilavuuteen: 1 / aika." },
      { symbol: "C_blood,j", meaning: "Kuljetettavan metallimuodon j pitoisuus veressä: määrä / tilavuus." },
      { symbol: "E, S", meaning: "Määritetty kenttäsyöte ja vastaanottavan kudoksen tila." },
    ],
    derivativeLead: "Kun veren pitoisuus ja vastaanottotila pidetään samoina, sisäänvirtauksen kenttäriippuvuus seuraa siirtokertoimen kenttäriippuvuudesta:",
    coefficientScope: "Tⱼ(E, S) on BERM:n kokoama kentästä riippuva liitos. Sen metallimuotokohtainen suuruus ja etumerkki jäävät kalibroitaviksi. Paikallinen lineaarinen kuljetuslikimäärä kuvaa sisäänvirtausta; kudokseen kertymiseen vaikuttaa myös poistuma.",
    conclusionTitle: "Miksi pelkkä metalliselitys ohittaa osan ketjusta",
    conclusion: "Samalla veren pitoisuudella siirtokertoimen muutos muuttaa metallin sisäänvirtausta. Metalli säilyy kausaalisena altisteena, ja mitattu metalli–seuraussuhde sisältää myös sisäänpääsyä ja vastetta säätelevät olosuhteet. BERM tekee näiden olosuhteiden kentästä riippuvan osuuden näkyväksi.",
    wifiTitle: "Mihin Wi-Fi sijoittuu mallissa",
    wifi: "BERM sijoittaa Wi-Fi-signaalit samaan RF-syöteperheeseen ja käyttää niiden todellista spektriä, modulaatiota, liikennerytmiä ja ajoitusta. Tässä Wi-Fi-sovellus johdetaan RF-komponenteista BERM:n kautta; viitatut kokeelliset protokollat ovat laboratoriopulsseja, GSM-900 ja 1800 MHz:n altistus.",
    details: "Tutkimusprotokollat ja kunkin päätemuuttujan merkitys",
    protocols: [
      { title: "Neubauer 1990 · endoteelin otto", text: "Urosrotat; 2,45 GHz, 10 µs:n pulssit, 100 pulssia/s, 10 mW/cm², SAR noin 2 W/kg, 30–120 minuuttia. Rhodamiini–ferritiinin otto aivokuoren kapillaarien endoteeliin lisääntyi, ja kolkisiini esti oton lähes kokonaan. Päätemuuttuja oli pääsy endoteelisoluihin, ei metallin osoitettu siirtyminen aivokudokseen. [[ref:neubauer1990_rf_endothelial_uptake|Neubauer 1990]]." },
      { title: "Nittby 2009 · albumiinin ekstravasaatio", text: "48 rottaa; kaksi tuntia GSM-900-altistusta, SAR 0–120 mW/kg, arvio seitsemän päivää myöhemmin. Albumiinin ekstravasaatio lisääntyi yhteistesteissä; annoskohtainen ero oli 12 mW/kg:ssa. Albumiinivuoto mittaa makromolekyylin läpäisyä, ei tietyn metallimuodon vuota. [[ref:nittby2009_gsm_bbb|Nittby 2009]]." },
      { title: "Kerper 1992 · metyylielohopean otto", text: "Nukutetut rotat saivat nopean radioleimatun metyylielohopea–L-kysteiinin kaulavaltimoinfuusion. Otto oli osin saturoituvaa, ja metioniini sekä BCH estivät sitä. Kyse on aminohappokuljetusreitistä, joka eroaa endoteelin merkkiaineotosta ja albumiinivuodosta; kokeessa ei ollut kenttäinterventiota. [[ref:kerper1992_methylmercury_bbb|Kerper 1992]]." },
      { title: "Zhu 2026 · DNA-vaurio", text: "Hiiren alkion fibroblastit; kemikaaliesikäsittely 12 tuntia ja sen jälkeen 1800 MHz:n RF, SAR 4 W/kg, 15 minuuttia. Cr(VI) tuotti DNA-vaurion lisävasteen; Cd²⁺, H₂O₂ ja 4NQO eivät. RF yksin ei tuottanut havaittavaa vauriota. Mitattu päätepiste oli genotoksisuus, ei veri-aivoeste tai metallin kuljetus. [[ref:zhu2026_rf_chromium_dna|Zhu 2026]]." },
      { title: "Cosquer 2005 · protokolla ilman havaittua vuotoa", text: "Rotat; pulssitettu 2,45 GHz, 2 µs:n pulssit, 500 pulssia/s, 45 minuuttia, koko kehon SAR 2 W/kg ja aivojen keskimääräinen SAR 3 W/kg. Evans blue -vuotoa ei havaittu. Yhdessä positiivisten kokeiden kanssa tulos tekee signaalista, ajoituksesta ja päätemuuttujasta osan kuljetuksen määrittelyä; pelkkä 2,45 GHz ei määrää tulosta. [[ref:cosquer2005|Cosquer 2005]]." },
    ],
  },
};

export function ProxyBarrierEvidence({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  return (
    <section aria-labelledby="proxy-barrier-evidence-title" className="my-8 min-w-0 space-y-6 rounded-xl border border-card-border bg-[var(--figure-bg)] p-4 sm:p-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">{c.eyebrow}</p>
        <h3 id="proxy-barrier-evidence-title" className="font-serif text-2xl leading-snug">{c.title}</h3>
        <p className="text-base leading-relaxed text-foreground-muted">{c.lead}</p>
      </div>

      <ol className="space-y-4">
        {c.components.map((component, index) => (
          <li key={component.title} className="rounded-lg border border-card-border bg-background p-4">
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm text-accent">{index + 1}</span>
              <h4 className="pt-1 text-base font-semibold leading-snug">{component.title}</h4>
            </div>
            <p className="mt-3 text-base leading-relaxed text-foreground-muted"><InlineReferenceText text={component.text} locale={locale} /></p>
            <p className="mt-3 border-l-2 border-accent/60 pl-3 text-base font-medium leading-relaxed">{component.takeaway}</p>
          </li>
        ))}
      </ol>

      <div className="space-y-3">
        <h4 className="font-serif text-xl leading-snug">{c.synthesisTitle}</h4>
        <p className="text-base leading-relaxed text-foreground-muted">{c.synthesis}</p>
      </div>

      <figure className="min-w-0 space-y-4 rounded-lg border border-card-border bg-background p-4">
        <figcaption className="text-sm font-semibold text-foreground-muted">{c.equationLabel}</figcaption>
        <MathBlock tex={String.raw`J_j=T_j(E,S)\,C_{\mathrm{blood},j}`} />
        <dl className="space-y-3 text-sm leading-relaxed">
          {c.terms.map((term) => (
            <div key={term.symbol} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3">
              <dt className="font-mono text-foreground">{term.symbol}</dt>
              <dd className="text-foreground-muted">{term.meaning}</dd>
            </div>
          ))}
        </dl>
        <p className="text-base leading-relaxed text-foreground-muted">{c.derivativeLead}</p>
        <MathBlock tex={String.raw`\frac{\partial J_j}{\partial E}=C_{\mathrm{blood},j}\,\frac{\partial T_j}{\partial E}`} />
        <p className="border-t border-card-border pt-3 text-sm leading-relaxed text-foreground-muted">{c.coefficientScope}</p>
      </figure>

      <div className="space-y-3 border-l-2 border-accent pl-4">
        <h4 className="text-base font-semibold">{c.conclusionTitle}</h4>
        <p className="text-base leading-relaxed">{c.conclusion}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-semibold">{c.wifiTitle}</h4>
        <p className="text-base leading-relaxed text-foreground-muted">{c.wifi}</p>
      </div>

      <details className="rounded-lg border border-card-border bg-background">
        <summary className="cursor-pointer rounded-lg px-4 py-3 text-base font-medium leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{c.details}</summary>
        <ul className="space-y-5 border-t border-card-border p-4">
          {c.protocols.map((protocol) => (
            <li key={protocol.title}>
              <h5 className="text-base font-semibold leading-snug">{protocol.title}</h5>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted"><InlineReferenceText text={protocol.text} locale={locale} /></p>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
