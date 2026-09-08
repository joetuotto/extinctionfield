"use client";

import { useId, useState } from "react";
import styles from "./LaboratoryComparison.module.css";

const FACTORS = ["orientation", "light", "temperature", "history", "position"] as const;
type Factor = (typeof FACTORS)[number];
type FactorCopy = {
  label: string;
  a: string;
  b: string;
  description: string;
  record: string;
  detail: string;
};
type Copy = {
  kicker: string;
  title: string;
  lead: string;
  select: string;
  setup: string;
  record: string;
  details: string;
  sharedTitle: string;
  shared: string;
  boundary: string;
  sample: string;
  probe: string;
  field: string;
  light: string;
  clock: string;
  thermometer: string;
  preparation: string;
  source: string;
  diagram: string;
  factors: Record<Factor, FactorCopy>;
};

const COPY: Record<"fi" | "en", Copy> = {
  fi: {
    kicker: "Koeasetelman havainne",
    title: "Mikä kahdessa kokeessa todella muuttuu?",
    lead: "Vertaa kahta esimerkkiasetelmaa. Valitse yksi ero ja katso, mitä näytteen ympäriltä täytyy kirjata.",
    select: "Valitse vertailutekijä",
    setup: "Asetelma",
    record: "Kirjaa vertailua varten",
    details: "Kuvan tulkinta ja mittauksen yksityiskohdat",
    sharedTitle: "Molemmista asetelmista",
    shared: "Kirjaa näyte, elinvaihe ja käsittely, lähteen todellinen aaltomuoto ja kenttäkomponentit, paikallinen B₀-vektori, anturin kalibrointi, mittauksen aika sekä lämpötila. Sokkoutus, sham-ehto ja biologinen päätemuuttuja määritellään varsinaisen kokeen protokollassa.",
    boundary: "Piirros on esimerkki koeasetelmasta. Se ei toisinna nimettyä tutkimusta eikä näytä biologista tulosta. BERM:n ehdollisen vasteen vertaaminen vaatii lisäksi nimetyn vastaanottajan ja päätemuuttujan; puuttuva tieto ei osoita peittynyttä vaikutusta.",
    sample: "Näyte / vertailuakseli",
    probe: "Mittapää",
    field: "Tausta B₀",
    light: "Valojakso",
    clock: "Kello",
    thermometer: "Lämpötila",
    preparation: "Esivaihe → koe",
    source: "Käämipari ja koealusta",
    diagram: "Havainnollinen koealusta: käämipari ympäröi näytemaljaa; näytteellä on suunnan vertailuakseli. Mittapää, taustakentän suunta, valaisin, lämpömittari, kello ja esivaiheen aikajana näkyvät erikseen. Kenttäviivat eivät ole laskettu kenttäkartta.",
    factors: {
      orientation: {
        label: "Suunta", a: "Näytteen akseli taustan suuntainen", b: "Näytteen akseli käännetty",
        description: "Sama laiteasetus voi kohdata eri tavoin suunnatun näytteen. Kuvassa käännetään näytteen vertailuakselia; käämipari ja taustan suunta pysyvät paikoillaan.",
        record: "Näytteen vertailuakseli, lähteen kenttävektori ja paikallinen B₀-vektori samassa koordinaatistossa.",
        detail: "Kuva käyttää suunnallista näytettä esimerkkinä. Näytteen asento, anturin asento ja biologisesti merkityksellinen vastaanottosuunta ovat eri asioita. Näytteen kääntö ei yksin kerro vasteen suunnasta tai suuruudesta.",
      },
      light: {
        label: "Valo / kausi", a: "Lyhyempi edeltävä valoikkuna", b: "Pidempi edeltävä valoikkuna",
        description: "Koehetken valaistus pidetään kuvassa samana. Ero on edeltävässä valo–pimeärytmissä; kalenterivuodenaika ei yksin kerro näytteen valohistoriaa.",
        record: "Spektri ja valaistus näytteen kohdalla, valo–pimeäjakso, paikallinen aika, vuodenaika ja mahdollinen vuorokausivaihe.",
        detail: "Aikajanan vaalea osuus kuvaa valojaksoa ilman tuntiasteikkoa. Lyhyt ja pitkä jakso ovat esimerkkejä, eivät lajille määritettyjä vasteita. Luonnonvalo, keinovalo ja aiempi valokäsittely kirjataan erikseen.",
      },
      temperature: {
        label: "Lämpötila", a: "Näytelämpö pysyy vakaana", b: "Näytelämpö muuttuu ajon aikana",
        description: "Laitteen sama nimellisasetus ei korvaa lämpötilan seurantaa. Kuvan lämpömittari korostaa näytteen olosuhdetta, ei biologista vaikutusta.",
        record: "Näytteen ja ympäristön lämpötilan aikasarja sekä lämmön, ilmavirran ja käsittelyn vastaavuus vertailuehdossa.",
        detail: "Laitteen lämpeneminen, huoneilma ja näytteen lämpötila eivät ole sama mittaus. Tässä ei aseteta lämpötilalukua, kynnystä tai vasteen etumerkkiä; ne kuuluvat nimettyyn kokeeseen.",
      },
      history: {
        label: "Historia", a: "Vertailun esivaihe", b: "Erilainen aiempi käsittely",
        description: "Koehetken piirros ja nykyinen laiteasetus ovat samat. Näytteiden aiempi käsittely ja sen jälkeinen aika voivat silti erota.",
        record: "Esikäsittely, sen kenttä- ja valo-olosuhteet, kesto, palautumisaika ja näytteen tila ennen koetta.",
        detail: "Esivaiheen merkki kertoo eri käsittelystä; se ei ole mitattu pulssijono tai oletettu vaurio. Historialle annetaan varsinainen aikaleima ja protokolla. BERM:n mahdollinen muistiydin määritellään erikseen.",
      },
      position: {
        label: "Mittauspaikka", a: "Mittapää näytteen kohdalla", b: "Mittapää koealustan reunalla",
        description: "Näyte ja lähde pysyvät samoina. Mittapään siirto muuttaa paikkaa, jota lukema kuvaa; se ei itsessään muuta näytteen biologista vastetta.",
        record: "Anturin koordinaatit, etäisyys ja suunta suhteessa näytteeseen sekä mahdollinen siirtomalli mittauspaikasta näytteeseen.",
        detail: "Näytteen kohdan mittaus voidaan tehdä myös erillisessä kalibrointiajossa, jos anturi muuttaisi koeolosuhdetta. Huonemittaus tai laitteen asetusarvo ei automaattisesti kuvaa kenttää näytteessä tai kudoksessa.",
      },
    },
  },
  en: {
    kicker: "Experimental setup illustration",
    title: "What actually differs between two experiments?",
    lead: "Compare two example setups. Choose one difference and see what needs to be recorded around the sample.",
    select: "Choose a comparison factor",
    setup: "Setup",
    record: "Record for the comparison",
    details: "How to read the figure and document the measurement",
    sharedTitle: "In both setups",
    shared: "Record the sample, life stage and handling, the source's actual waveform and field components, the local B₀ vector, probe calibration, measurement time and temperature. Blinding, sham conditions and the biological endpoint belong in the actual experiment's protocol.",
    boundary: "This is an example setup illustration. It does not reproduce a named study or display a biological result. Comparing a conditional BERM response also requires a specified receiver and endpoint; missing information is not evidence of a hidden effect.",
    sample: "Sample / reference axis",
    probe: "Probe",
    field: "Background B₀",
    light: "Light cycle",
    clock: "Clock",
    thermometer: "Temperature",
    preparation: "Preparation → test",
    source: "Coil pair and sample stage",
    diagram: "Illustrative sample stage: a coil pair surrounds a sample dish with an orientation reference axis. The probe, background field direction, lamp, thermometer, clock and preparation timeline are shown separately. Field lines are not a computed field map.",
    factors: {
      orientation: {
        label: "Orientation", a: "Sample axis aligned with background", b: "Sample axis rotated",
        description: "The same device setting can meet differently oriented samples. Here the sample's reference axis rotates while the coils and background direction stay fixed.",
        record: "The sample reference axis, source field vector and local B₀ vector in the same coordinate system.",
        detail: "A directional sample is used as an example. Sample posture, probe orientation and the biologically relevant receiving direction are different quantities. Rotation alone does not specify the sign or size of a response.",
      },
      light: {
        label: "Light / season", a: "Shorter preceding light window", b: "Longer preceding light window",
        description: "Lighting during the test stays the same in the illustration. The preceding light–dark cycle differs; calendar season alone does not describe the sample's light history.",
        record: "Spectrum and illumination at the sample, the light–dark cycle, local time, season and circadian phase where available.",
        detail: "The pale timeline segment represents a light period without an hour scale. Short and long cycles are examples, not species-specific responses. Record natural light, artificial light and prior light treatment separately.",
      },
      temperature: {
        label: "Temperature", a: "Sample temperature stays stable", b: "Sample temperature changes during the run",
        description: "Matching nominal device settings does not replace temperature monitoring. The highlighted thermometer represents the sample's condition, not a biological effect.",
        record: "Sample and ambient temperature over time, and matching heat, airflow and handling in the comparison condition.",
        detail: "Device heating, room air and sample temperature are different measurements. No temperature, threshold or direction of biological response is assigned here; these belong to the specified experiment.",
      },
      history: {
        label: "History", a: "Reference preparation", b: "Different preceding treatment",
        description: "The present setup and device setting are the same. The samples can still differ in preceding treatment and elapsed time since that treatment.",
        record: "Pretreatment, its field and lighting conditions, duration, recovery interval and sample state before the experiment.",
        detail: "The preparation marker denotes a different treatment; it is not a measured pulse train or assumed damage. Attach actual timestamps and a protocol. Any BERM memory kernel is specified separately.",
      },
      position: {
        label: "Measurement position", a: "Probe at the sample position", b: "Probe at the edge of the stage",
        description: "The sample and source stay fixed. Moving the probe changes the location represented by its reading; it does not itself change the sample's biological response.",
        record: "Probe coordinates, distance and orientation relative to the sample, and any transfer model between measurement and sample positions.",
        detail: "The sample position may be measured in a separate calibration run if the probe would disturb the experiment. A room measurement or device setpoint does not automatically describe the field in the sample or tissue.",
      },
    },
  },
};

function SetupDrawing({ id, factor, alternative, d, title }: {
  id: string;
  factor: Factor;
  alternative: boolean;
  d: Copy;
  title: string;
}) {
  const rotated = factor === "orientation" && alternative;
  const movedProbe = factor === "position" && alternative;
  const warming = factor === "temperature" && alternative;
  const changedHistory = factor === "history" && alternative;
  const selected = (name: Factor) => factor === name ? styles.emphasis : undefined;
  const probeX = movedProbe ? 369 : 251;
  return <div className={styles.drawing}>
    <svg viewBox="0 0 440 302" width="100%" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`}>
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{`${d.diagram} ${d.factors[factor].description}`}</desc>
      <defs>
        <linearGradient id={`${id}-bench`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fcfaf3" /><stop offset="1" stopColor="#deddd5" />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfb551" stopOpacity=".22" /><stop offset="1" stopColor="#dfb551" stopOpacity="0" />
        </linearGradient>
        <marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 7 4 1 7" fill="none" stroke="currentColor" strokeWidth="1.4" /></marker>
      </defs>

      <ellipse cx="223" cy="264" rx="171" ry="12" className={styles.shadow} />
      <path d="M49 217 93 196H359L397 217 365 238H77Z" fill={`url(#${id}-bench)`} stroke="#a6aba9" />
      <path d="M77 238V258M365 238V258M96 238V254M345 238V254" className={styles.frame} />
      <path d="M49 217H397L365 238H77Z" fill="#e7e6de" stroke="#a6aba9" />
      <path d="M96 216V178M322 216V178" className={styles.frame} />

      {/* Coil geometry stays fixed when the sample or measurement position changes. */}
      <g className={styles.coils}>
        <ellipse cx="121" cy="160" rx="29" ry="62" /><ellipse cx="125" cy="160" rx="29" ry="62" />
        <ellipse cx="311" cy="160" rx="29" ry="62" /><ellipse cx="315" cy="160" rx="29" ry="62" />
        <path d="M123 221V232H153M313 221V229H342" />
      </g>
      <g className={styles.backgroundField}>
        <path d="M69 111H365M68 151H363M69 191H363" markerEnd={`url(#${id}-arrow)`} />
      </g>

      {/* A directional specimen sits in a shallow dish. No response is drawn. */}
      <ellipse cx="219" cy="215" rx="65" ry="17" fill="#c1cfca" opacity=".23" />
      <path d="M158 198V211C158 232 279 232 279 211V198" fill="#eaf1e9" fillOpacity=".72" stroke="#879d98" />
      <ellipse cx="218.5" cy="198" rx="60.5" ry="17" fill="#f0f6ee" stroke="#879d98" />
      <ellipse cx="218.5" cy="198" rx="52" ry="12" fill="none" stroke="#baccc1" />
      <g className={selected("orientation")} data-sample-rotation={rotated ? "rotated" : "reference"} transform={`rotate(${rotated ? -65 : 0} 219 197)`}>
        <path d="M186 196Q196 187 214 191Q233 185 250 196Q242 205 223 202Q203 209 186 196Z" fill="#96af8e" stroke="#607d63" strokeWidth="1.2" />
        <path d="M188 197H249" className={styles.sampleAxis} markerEnd={`url(#${id}-arrow)`} />
      </g>

      <g className={selected("position")} data-probe-position={movedProbe ? "stage-edge" : "sample"}>
        <path d={`M388 220V121H${probeX}V167`} className={styles.probeArm} />
        <path d={`M${probeX} 160V184`} className={styles.probeStem} />
        <circle cx={probeX} cy="186" r="5" fill="#426c80" stroke="#fcfaf3" strokeWidth="2" />
        <path d={`M${probeX} 191V207`} className={styles.probeGuide} />
        <ellipse cx={probeX} cy="211" rx="11" ry="3" fill="none" stroke="#426c80" strokeDasharray="3 3" />
        <path d="M382 220H397" className={styles.probeArm} />
      </g>

      <g className={selected("light")}>
        <path d="M212 30V44M189 61Q212 26 235 61Z" fill="#e2ddd0" stroke="#8d8c7e" />
        <ellipse cx="212" cy="62" rx="23" ry="6" fill="#f3d486" stroke="#a5925e" />
        <path d="M189 66 153 200H278L235 66Z" fill={`url(#${id}-light)`} />
        <path d="M177 82H248" stroke="#c6c9c3" strokeWidth="5" strokeLinecap="round" />
        <path d={`M177 82H${factor === "light" && alternative ? 237 : 199}`} stroke="#bd9650" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g className={styles.clock}>
        <circle cx="68" cy="51" r="17" /><path d="M68 39V51L76 55M67 30H71M67 72H71" />
      </g>
      <g className={selected("temperature")} data-temperature={warming ? "changing" : "stable"}>
        <path d="M365 43A5 5 0 0 1 375 43V67A10 10 0 1 1 365 67Z" fill="#faf9f2" stroke="#939689" strokeWidth="1.5" />
        <path d={`M370 ${warming ? 46 : 59}V75`} stroke="#bd784a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="370" cy="76" r="5" fill="#bd784a" />
        <path d="M379 47H384M379 56H382M379 65H384" stroke="#939689" />
      </g>

      <g className={selected("history")} data-preparation={changedHistory ? "different" : "reference"}>
        <path d="M145 283H300" stroke="#a4aaa3" markerEnd={`url(#${id}-arrow)`} />
        <path d="M257 273V289" stroke="#73837c" />
        <rect x="157" y="276" width="57" height="13" rx="3" fill={changedHistory ? "#d5ad77" : "#d6ddd0"} stroke={changedHistory ? "#a37c47" : "#99aa93"} />
        {changedHistory && <path d="M164 279 169 286M178 279 183 286M192 279 197 286M206 279 211 286" stroke="#9f753d" />}
        <circle cx="277" cy="283" r="5" fill="#456b77" />
      </g>
    </svg>
    <span className={`${styles.annotation} ${styles.fieldLabel}`}>{d.field}</span>
    <span className={`${styles.annotation} ${styles.clockLabel}`}>{d.clock}</span>
    <span className={`${styles.annotation} ${styles.lightLabel} ${factor === "light" ? styles.activeLabel : ""}`}>{d.light}</span>
    <span className={`${styles.annotation} ${styles.temperatureLabel} ${factor === "temperature" ? styles.activeLabel : ""}`}>{d.thermometer}</span>
    <span className={`${styles.annotation} ${styles.sampleLabel} ${factor === "orientation" ? styles.activeLabel : ""}`}>{d.sample}</span>
    <span className={`${styles.annotation} ${styles.probeLabel} ${factor === "position" ? styles.activeLabel : ""}`}>{d.probe}</span>
    <span className={`${styles.annotation} ${styles.historyLabel} ${factor === "history" ? styles.activeLabel : ""}`}>{d.preparation}</span>
  </div>;
}

export interface LaboratoryComparisonProps { locale: string; compact?: boolean }

export function LaboratoryComparison({ locale, compact = false }: LaboratoryComparisonProps) {
  const id = useId();
  const d = COPY[locale === "fi" ? "fi" : "en"];
  const [factor, setFactor] = useState<Factor>("orientation");
  const comparison = d.factors[factor];
  return <section className={`${styles.root} ${compact ? styles.compact : ""}`} aria-labelledby={`${id}-heading`} lang={locale === "fi" ? "fi" : "en"} data-laboratory-comparison={factor}>
    <header className={styles.header}>
      <p className={styles.kicker}>{d.kicker}</p>
      <h3 id={`${id}-heading`}>{d.title}</h3>
      <p className={styles.lead}>{d.lead}</p>
    </header>
    <fieldset className={styles.controls}>
      <legend>{d.select}</legend>
      <div className={styles.options}>
        {FACTORS.map(key => <label key={key} className={styles.option}>
          <input type="radio" name={`${id}-factor`} value={key} checked={factor === key} onChange={() => setFactor(key)} />
          <span>{d.factors[key].label}</span>
        </label>)}
      </div>
    </fieldset>
    <div className={styles.panels}>
      {([false, true] as const).map(alternative => {
        const name = `${d.setup} ${alternative ? "B" : "A"}`;
        const value = alternative ? comparison.b : comparison.a;
        return <figure className={styles.panel} key={name}>
          <figcaption className={styles.panelTitle}><span>{name}</span><strong>{value}</strong></figcaption>
          <SetupDrawing id={`${id}-${alternative ? "b" : "a"}`} factor={factor} alternative={alternative} d={d} title={`${name}: ${value}. ${d.kicker}.`} />
          <p className={styles.stageCaption}>{d.source}</p>
        </figure>;
      })}
    </div>
    <div className={styles.reading} aria-live="polite" aria-atomic="true">
      <p>{comparison.description}</p>
      <p className={styles.record}><strong>{d.record}</strong>{comparison.record}</p>
    </div>
    <details className={styles.details}>
      <summary>{d.details}</summary>
      <p>{comparison.detail}</p>
      <p><strong>{d.sharedTitle}. </strong>{d.shared}</p>
    </details>
    <p className={styles.boundary}>{d.boundary}</p>
  </section>;
}
