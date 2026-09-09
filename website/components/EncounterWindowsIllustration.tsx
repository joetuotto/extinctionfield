"use client";

import { useId, useState } from "react";
import styles from "./EncounterWindowsIllustration.module.css";

type Variant = "pollination" | "joint-action";
export interface EncounterWindowsIllustrationProps { locale: string; variant: Variant; compact?: boolean }

const COPY = {
  fi: {
    kind: "Synteettinen ajoitusesimerkki",
    pollination: {
      title: "Kukka ja pölyttäjä tarvitsevat yhteisen ajan",
      lead: "Esimerkin kukinta ja mehiläisen aktiivisuus kestävät yhtä kauan. Siirrä aktiivisuuden ajoitusta ja katso, kuinka pitkä yhteinen ikkuna jää.",
      actorA: "Kukinta", actorB: "Mehiläisen aktiivisuus", shift: "Siirrä mehiläisen aktiivisuusikkunaa",
      scene: "Kukkiva kasvi ja mehiläinen samassa elinympäristössä. Katkoviiva esittää mahdollista vierailureittiä, ei havaittua lentorataa.",
      axis: "Esimerkkikausi · suhteellinen aika",
      stages: [
        { title: "Kohtaamisen mahdollisuus", text: "Kukka ja pölyttäjä ovat aktiivisia samaan aikaan ja samassa paikassa." },
        { title: "Mitattava tapahtuma", text: "Kirjaa kukkavierailu ja siitepölyn siirtyminen. Pelkkä vierailu ei vielä mittaa siementuotantoa." },
        { title: "Seurattava tulos", text: "Seuraa siemeniä ja taimien selviytymistä. Populaatiotulkinta vaatii useita paikkoja, vuosia ja muita elinvaiheita." },
      ],
      conditions: "Ajoituksen lisäksi kirjataan laji, paikka, sää, kukkien määrä, vierailujen havaintoponnistus ja paikallinen kenttä. Tässä kuvassa kaikkien muiden ehtojen oletetaan pysyvän samoina; todellisessa aineistossa ne mitataan erikseen.",
      chain: "Sähköekologian mitattu osaketju ja BERM-tulkinta",
    },
    "joint-action": {
      title: "Yhteinen toiminta tarvitsee kaksi sopivaa hetkeä",
      lead: "Kahden kuvitteellisen henkilön käytettävissä oleva aika on yhtä pitkä. Siirrä henkilön B ikkunaa ja tutki yhteisen tehtävän ajallista mahdollisuutta.",
      actorA: "Henkilö A · käytettävissä", actorB: "Henkilö B · käytettävissä", shift: "Siirrä henkilön B aikaikkunaa",
      scene: "Kaksi neutraalisti kuvattua henkilöä ja yhteisen tehtävän työpöytä. Kuvassa ei määritetä heidän sukupuoltaan, hormonitilaansa tai valintojaan.",
      axis: "Yhteisen tehtävän esimerkkijakso · suhteellinen aika",
      stages: [
        { title: "Kohtaamisen mahdollisuus", text: "Molemmilla on yhteistä aikaa. Tavoite, halu ja suostumus ovat erillisiä ehtoja." },
        { title: "Mitattava tapahtuma", text: "Kirjaa aloite, vastaus ja toteutunut yhteinen tehtävä. Aikaikkuna ei vielä kerro, mitä ihmiset tekevät." },
        { title: "Seurattava tulos", text: "Seuraa toistumista ja vuorovaikutusverkostoa. Pari ei yksin edusta väestön tai instituutioiden muutosta." },
      ],
      conditions: "Yksilöstä pariin ja laajempaan ryhmään siirtyminen edellyttää tietoa kohtaamisista, valinnoista, toistumisesta ja verkostosta. Hormonitasoja, motivaatiota tai väestötuloksia ei lasketa tästä aikaikkunasta.",
      chain: "Yksilöstä yhteiseen toimintaan: tutkimukset ja BERM-tulkinta",
    },
    overlap: "Yhteinen aika", units: "aikayksikköä", shiftValue: "Siirto", reference: "Alkuperäinen ajoitus",
    limit: "Päällekkäisyys on tässä ajallinen mahdollisuus. Se ei ole lisääntymisprosentti, toteutuneen toiminnan todennäköisyys tai EMF-vaikutuksen ennuste.",
    details: "Mitä esimerkki laskee — ja mitä seuraavaksi mitataan?",
    calculation: "Laskenta: max(0, min(loppu A, loppu B) − max(alku A, alku B)). A on välillä 5–13 ja B aluksi välillä 9–17. Siirto muuttaa vain B:n ajoitusta; molempien ikkunoiden pituus säilyy kahdeksana. Asteikko ei vastaa tietyn lajin päiviä tai ihmisen vuorokausirytmiä.",
    berm: "BERM:n ehdollisessa ketjussa ajoituksen muutos voisi tulla nimetystä vastaanottajavasteesta. Tämä havainne alkaa vasta kahdesta oletetusta aikaikkunasta: siirtoa ei ole johdettu kentästä eikä kalibroitu biologisella aineistolla.",
    none: "Yhteistä aikaa ei ole tässä esimerkissä.", shared: "Yhteinen väli", interval: "Väli", progression: "Kohtaamisesta seurattavaan tulokseen",
  },
  en: {
    kind: "Synthetic timing example",
    pollination: {
      title: "Flower and pollinator need a shared window",
      lead: "Flowering and bee activity have equal durations in this example. Shift the timing of activity to see how much shared time remains.",
      actorA: "Flowering", actorB: "Bee activity", shift: "Shift the bee activity window",
      scene: "A flowering plant and a bee in the same habitat. The dashed route represents a possible visit, not an observed flight path.",
      axis: "Example season · relative time",
      stages: [
        { title: "Opportunity to encounter", text: "Flower and pollinator are active at the same time and in the same place." },
        { title: "Measurable event", text: "Record a flower visit and pollen transfer. A visit alone does not measure seed production." },
        { title: "Outcome to follow", text: "Follow seeds and seedling survival. A population interpretation needs multiple sites, years and other life stages." },
      ],
      conditions: "Alongside timing, record species, location, weather, flower abundance, observation effort for visits and the local field. Other conditions are held fixed in this illustration; real data require separate measurements.",
      chain: "Measured electroecology links and the BERM interpretation",
    },
    "joint-action": {
      title: "Joint action needs two compatible windows",
      lead: "Two fictional people have equally long periods of availability. Shift person B’s window to explore the timing opportunity for a shared task.",
      actorA: "Person A · available", actorB: "Person B · available", shift: "Shift person B’s time window",
      scene: "Two neutrally drawn people and a worktable for a shared task. Their sex, hormone state and choices are not specified in the picture.",
      axis: "Example shared-task period · relative time",
      stages: [
        { title: "Opportunity to encounter", text: "Both have time together. Goals, willingness and consent are separate conditions." },
        { title: "Measurable event", text: "Record an initiative, a response and an actual shared task. A time window does not yet tell us what people do." },
        { title: "Outcome to follow", text: "Follow repetition and the interaction network. One pair does not represent population or institutional change." },
      ],
      conditions: "Moving from an individual to a pair and a wider group requires records of encounters, choices, repetition and networks. Hormones, motivation and population outcomes are not calculated from this time window.",
      chain: "From individuals to joint action: studies and the BERM interpretation",
    },
    overlap: "Shared time", units: "time units", shiftValue: "Shift", reference: "Original timing",
    limit: "The overlap is a timing opportunity in this example. It is not a reproduction percentage, a probability of actual action or a prediction of an EMF effect.",
    details: "What does this example calculate, and what is measured next?",
    calculation: "Calculation: max(0, min(end A, end B) − max(start A, start B)). A spans 5–13 and B initially spans 9–17. The control shifts only B; both durations stay at eight. The scale does not represent a particular species’ days or a human circadian rhythm.",
    berm: "In BERM’s conditional chain, a timing change could enter through a specified receiver response. This illustration begins with two assumed time windows: the shift is neither derived from a field nor calibrated with biological data.",
    none: "There is no shared time in this example.", shared: "Shared interval", interval: "Interval", progression: "From an encounter to an outcome to follow",
  },
} as const;

function Flower({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round">
    <path d="M1 8 C-7 32 6 53 0 90" fill="none" stroke="#377e78" strokeWidth="3" />
    <path d="M1 62 C-14 57 -33 55 -36 32 C-16 31 -6 44 1 62Z M2 76 C16 56 26 43 43 44 C40 61 24 74 2 76Z" fill="#b3c9b9" stroke="#377e78" strokeWidth="1.5" />
    <path d="M-30 37 -1 60 M7 72 36 49 M-16 47 -17 38 M-16 47 -27 48 M23 59 22 50 M23 59 33 59" fill="none" stroke="#60948b" strokeWidth="1" />
    {[0, 43, 86, 132, 180, 226, 272, 318].map((angle, index) => <g key={angle} transform={`rotate(${angle})`}>
      <path d={`M-6 -5 C-18 -15 -17 ${-31 - index % 3 * 2} -9 -38 C-4 -43 2 -40 5 -36 C12 -34 14 -26 10 -18 L5 -5Z`} fill={index % 2 ? "#e5d9d0" : "#f0e7de"} stroke="#9d8377" strokeWidth="1.2" />
      <path d="M0 -10 Q-3 -24 -3 -34 M-2 -20 -9 -29" fill="none" stroke="#bca79a" strokeWidth=".8" />
    </g>)}
    <path d="M-13 -2 Q-12 -14 0 -13 Q14 -12 14 0 Q12 14 -1 13 Q-14 12 -13 -2" fill="#c29a59" stroke="#9b6a32" strokeWidth="1.5" />
    {[[-6,-4],[1,-7],[7,-2],[-2,1],[-6,6],[4,6]].map(([cx,cy], index) => <path key={index} d={`M${cx-1} ${cy+1} q-1 -3 2 -3`} fill="none" stroke="#9b6a32" strokeWidth="1.2" />)}
  </g>;
}

function Bee({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinecap="round" strokeLinejoin="round">
    <path d="M-8 9 -19 22 -32 26 M-1 12 -2 29 10 37 M9 12 23 25 39 26" fill="none" stroke="#546970" strokeWidth="1.6" />
    <path d="M-8 -7 C-10 -32 -34 -57 -48 -50 C-59 -41 -29 -16 -8 -7Z" fill="#e2ecea" stroke="#6c9097" strokeWidth="1.3" />
    <path d="M-4 -8 C4 -35 23 -52 38 -46 C50 -38 19 -13 -4 -8Z" fill="#edf2ee" stroke="#6c9097" strokeWidth="1.3" />
    <path d="M-11 -12 -45 -45 M-28 -28 -31 -42 M-28 -28 -42 -30 M-2 -12 34 -41 M11 -24 15 -36 M11 -24 29 -26" fill="none" stroke="#88a5a7" strokeWidth=".8" />
    <path d="M8 -9 C26 -16 46 -7 53 6 C42 22 21 26 7 14Z" fill="#bf9654" stroke="#7e633c" strokeWidth="1.6" />
    <path d="M20 -11 Q17 2 23 20 M31 -8 Q29 6 34 17 M41 -3 Q40 6 43 13" fill="none" stroke="#4b483b" strokeWidth="4.5" />
    <path d="M-21 -5 C-18 -18 -3 -21 8 -12 C17 -4 14 13 4 18 C-9 23 -23 12 -21 -5Z" fill="#b69b67" stroke="#675d43" strokeWidth="1.6" />
    <path d="M-15 -10 -18 -14 M-9 -14 -11 -19 M-2 -15 -1 -19 M6 -12 9 -16 M9 11 13 13 M-9 16 -11 20" stroke="#675d43" strokeWidth="1.2" />
    <path d="M-21 -9 Q-36 -16 -42 -3 Q-43 8 -30 12 Q-20 11 -18 2Z" fill="#4f5144" stroke="#263f45" strokeWidth="1.2" />
    <ellipse cx="-35" cy="-2" rx="3.5" ry="5.2" fill="#263f45" transform="rotate(-15 -35 -2)" />
    <path d="M-37 -10 -44 -22 -51 -23 M-29 -11 -31 -25 -38 -30 M-38 9 -49 15" fill="none" stroke="#263f45" strokeWidth="1.6" />
    <path d="M-15 8 -24 26 -37 33 M-4 14 -9 32 1 42 M7 11 18 30 37 34" fill="none" stroke="#675d43" strokeWidth="2" />
    <path d="M-37 33 -42 31 M1 42 6 40 M37 34 42 32" fill="none" stroke="#675d43" strokeWidth="1.2" />
  </g>;
}

function Person({ x = 0, y = 0, color = "#377e78", flip = false, scale = 1 }: { x?: number; y?: number; color?: string; flip?: boolean; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} strokeLinecap="round" strokeLinejoin="round">
    <path d="M-6 -28 -7 -18 5 -14 8 -29Z" fill="#ceb8a1" stroke="#85766a" strokeWidth="1.2" />
    <path d="M-9 -40 Q-8 -50 3 -48 Q12 -47 12 -39 L16 -34 12 -32 Q14 -24 6 -24 L-2 -27 Q-10 -29 -9 -40Z" fill="#d8c6b3" stroke="#85766a" strokeWidth="1.2" />
    <path d="M-9 -32 Q-15 -43 -7 -49 Q7 -56 13 -44 L6 -41 -2 -44 -5 -31Z" fill="#596467" />
    <path d="M8 -38 h2 M7 -28 h4" stroke="#85766a" strokeWidth=".9" />
    <path d="M-17 28 L15 28 16 49 23 75 12 78 3 48 -2 40 -5 57 -9 78 -20 78 -17 51Z" fill="#647880" stroke="#3f5963" strokeWidth="1.4" />
    <path d="M-15 35 -12 52 -15 70 M5 37 8 49 17 70" fill="none" stroke="#809097" strokeWidth="1" />
    <path d="M-20 75 -9 76 -8 81 -26 81 Q-28 78 -20 75 M12 75 22 74 32 79 Q35 83 25 83 L13 81Z" fill="#344d57" />
    <path d="M-9 -18 Q-19 -17 -22 -7 L-24 22 -30 34 -24 38 -15 23 -11 7 14 7 16 31 Q-1 36 -18 29 L-16 3" fill={color} stroke="#315b61" strokeWidth="1.4" />
    <path d="M-29 32 -24 35 -25 42 -29 44 -32 39Z" fill="#d8c6b3" stroke="#85766a" strokeWidth="1" />
    <path d="M-8 -18 0 -11 7 -17 Q17 -14 20 -3 L29 12 43 11 44 18 24 21 10 3" fill={color} stroke="#315b61" strokeWidth="1.4" />
    <path d="M42 11 48 11 54 14 52 17 44 18Z" fill="#d8c6b3" stroke="#85766a" strokeWidth="1" />
    <path d="M-8 -18 -6 -7 0 -11 4 -6 7 -17 M-3 -6 -3 26 M13 24 l-7 2" fill="none" stroke="#b3cfca" strokeWidth=".9" />
  </g>;
}

function Scene({ variant, title, id }: { variant: Variant; title: string; id: string }) {
  return <svg viewBox="0 0 640 185" width="100%" role="img" aria-labelledby={`${id}-scene-title`}>
    <title id={`${id}-scene-title`}>{title}</title>
    {variant === "pollination" ? <>
      <path d="M72 160 Q191 154 300 160 T568 158" fill="none" stroke="#a6b8af" strokeWidth="1.2" />
      <path d="M103 159 Q104 147 97 140 M105 160 Q110 143 122 142 M514 160 Q509 143 502 145 M518 160 Q522 142 528 138" fill="none" stroke="#74998a" strokeWidth="1.2" />
      <Flower x={193} y={65} /><Bee x={451} y={87} />
      <path d="M391 88 C339 49 285 110 228 83" fill="none" stroke="#83979a" strokeWidth="1.4" strokeDasharray="4 6" />
    </> : <>
      <path d="M153 168H485" stroke="#b5c3c1" strokeWidth="1.2" />
      <path d="M262 108 l12 -7 h91 l14 7 v7 H262Z" fill="#e8ded0" stroke="#9c8b73" strokeWidth="1.2" />
      <path d="M277 115 v45 h6 v-45 M357 115 v45 h6 v-45" fill="#b3c0bf" stroke="#546970" strokeWidth="1" />
      <Person x={223} y={85} /><Person x={418} y={85} color="#396783" flip />
      <path d="M299 105 l9 -20 h38 l-5 20 Z" fill="#faf9f4" stroke="#7b9195" strokeWidth="1.2" />
      <path d="M314 92 h22 M312 98 h15" stroke="#7b9195" strokeWidth="1" />
      <path d="M348 104 357 91" stroke="#9b6a32" strokeWidth="1.8" strokeLinecap="round" />
    </>}
  </svg>;
}

function StageDrawing({ variant, stage }: { variant: Variant; stage: number }) {
  return <svg viewBox="0 0 150 96" width="100%" aria-hidden="true" focusable="false">
    <path d="M19 85H132" stroke="#bdccc5" strokeWidth=".9" />
    {variant === "pollination" ? stage === 0 ? <><Flower x={48} y={32} scale={.55} /><Bee x={112} y={29} scale={.54} /></> : stage === 1 ? <>
      <path d="M65 83 65 55 Q51 53 53 45 Q65 41 82 45 Q86 52 72 55 L72 83" fill="#c0d4c4" stroke="#377e78" strokeWidth="1.4" />
      <circle cx="68" cy="38" r="28" fill="none" stroke="#546970" strokeWidth="1.8" /><path d="M89 59 l17 20" stroke="#546970" strokeWidth="5" strokeLinecap="round" />
      {[[-9, 0], [0, -5], [10, 2], [-3, 7]].map(([x, y], i) => <circle key={i} cx={68 + x} cy={32 + y} r="3" fill="#c9a56c" stroke="#9b6a32" strokeWidth=".8" />)}
    </> : <>
      <path d="M43 22 C26 40 27 65 43 80 C61 65 60 42 43 22Z" fill="#e0d4b5" stroke="#9b6a32" strokeWidth="1.3" />
      <path d="M43 30v42 M43 43l-8 -5 M43 55l9 -6 M43 67l-7 -5" stroke="#9b6a32" strokeWidth=".9" />
      <path d="M99 83 Q97 63 99 43 M98 56 C83 56 78 43 80 33 C94 36 97 43 98 56 M99 64 C113 65 123 52 124 42 C110 43 103 53 99 64" fill="#b3c9b9" stroke="#377e78" strokeWidth="1.5" />
      <path d="M84 39 97 55 M119 48 101 61" stroke="#60948b" strokeWidth=".8" />
    </> : stage === 0 ? <><Person x={43} y={42} scale={.52} /><Person x={109} y={42} color="#396783" flip scale={.52} /></> : stage === 1 ? <>
      <rect x="44" y="16" width="63" height="64" rx="2" fill="#faf9f4" stroke="#546970" strokeWidth="1.5" /><rect x="62" y="11" width="27" height="10" rx="2" fill="#d7e2dc" stroke="#7b9195" strokeWidth="1" />
      <path d="M55 42 l5 5 l10 -12 M55 64 l5 5 l10 -12 M78 42 h18 M78 64 h18" fill="none" stroke="#377e78" strokeWidth="1.8" />
    </> : <>
      <path d="M36 36 L77 21 L116 51 L82 77 L36 36 L116 51 M77 21 L82 77" fill="none" stroke="#93aaac" strokeWidth="1.3" />
      {[[36,36],[77,21],[116,51],[82,77]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="7" fill={i % 2 ? "#396783" : "#377e78"} stroke="#faf9f4" strokeWidth="2" />)}
    </>}
  </svg>;
}

const x = (value: number) => 16 + value / 24 * 608;

function TimeTrack({ id, label, start, end, color, hatched = false }: { id: string; label: string; start: number; end: number; color: string; hatched?: boolean }) {
  return <svg viewBox="0 0 640 42" width="100%" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    {hatched && <defs><pattern id={`${id}-hatch`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(35)"><rect width="8" height="8" fill="#e2ece6" /><path d="M0 0 v8" stroke="#377e78" strokeWidth="2" /></pattern></defs>}
    <rect x="16" y="10" width="608" height="22" rx="1" fill="#e9ede7" />
    {[0,6,12,18,24].map(tick => <path key={tick} d={`M${x(tick)} 3 v36`} stroke="#b9c9c4" strokeWidth="1" />)}
    {end > start && <rect data-window-start={start} data-window-end={end} x={x(start)} y="10" width={x(end) - x(start)} height="22" rx="1" fill={hatched ? `url(#${id}-hatch)` : color} stroke={hatched ? "#377e78" : color} strokeWidth="1" />}
  </svg>;
}

export function EncounterWindowsIllustration({ locale, variant, compact = false }: EncounterWindowsIllustrationProps) {
  const lang = locale === "fi" ? "fi" : "en";
  const d = COPY[lang];
  const v = d[variant];
  const id = useId();
  const [shift, setShift] = useState(0);
  const startB = 9 + shift, endB = 17 + shift;
  const sharedStart = Math.max(5, startB), sharedEnd = Math.min(13, endB);
  const overlap = Math.max(0, sharedEnd - sharedStart);
  const shiftLabel = `${shift > 0 ? "+" : ""}${shift} ${d.units}`;
  const result = `${d.overlap}: ${overlap} ${d.units}. ${overlap ? `${d.shared}: ${sharedStart}–${sharedEnd}.` : d.none}`;
  const tracks = [
    { label: v.actorA, start: 5, end: 13, color: "#377e78", hatched: false },
    { label: v.actorB, start: startB, end: endB, color: variant === "pollination" ? "#9b6a32" : "#396783", hatched: false },
    { label: d.overlap, start: sharedStart, end: Math.max(sharedStart, sharedEnd), color: "#377e78", hatched: true },
  ];
  return <section className={`${styles.root} ${compact ? styles.compact : ""}`} lang={lang} aria-labelledby={`${id}-heading`} data-encounter-variant={variant}>
    <header className={styles.header}><p className={styles.kicker}>{d.kind}</p><h3 id={`${id}-heading`}>{v.title}</h3><p className={styles.lead}>{v.lead}</p></header>
    <figure className={styles.figure}>
      <div className={styles.scene}><Scene variant={variant} title={v.scene} id={id} /></div>
      <div className={styles.tracks}>
        {tracks.map((track, index) => <div className={styles.track} key={index} data-encounter-track={index}>
          <div className={styles.trackLabel}><span>{track.label}</span><span>{index === 2 && !overlap ? "—" : `${track.start}–${track.end}`}</span></div>
          <TimeTrack {...track} id={`${id}-track-${index}`} label={index === 2 ? result : `${track.label}. ${d.interval}: ${track.start}–${track.end}.`} />
        </div>)}
        <div className={styles.axis} aria-hidden="true"><svg viewBox="0 0 640 34" width="100%">{[0,6,12,18,24].map(tick => <text key={tick} x={x(tick)} y="24" textAnchor="middle" fontSize="23" fill="#546970">{String(tick)}</text>)}</svg></div>
      </div>
      <figcaption>{v.axis}</figcaption>
    </figure>
    <div className={styles.control}>
      <label htmlFor={`${id}-shift`}>{v.shift}<span>{shiftLabel}</span></label>
      <input id={`${id}-shift`} type="range" min="-9" max="7" step="1" value={shift} aria-label={v.shift} aria-valuetext={shiftLabel} aria-describedby={`${id}-result ${id}-limit`} onChange={event => setShift(Number(event.target.value))} />
      <p className={styles.reference}>{d.reference}: 0</p>
    </div>
    <p className={styles.result} id={`${id}-result`} role="status" aria-live="polite" aria-atomic="true" data-encounter-overlap={overlap}>{result}</p>
    <p className={styles.limit} id={`${id}-limit`}>{d.limit}</p>
    <ol className={styles.stages} aria-label={d.progression}>{v.stages.map((stage, index) => <li key={index}><StageDrawing variant={variant} stage={index} /><h4>{stage.title}</h4><p>{stage.text}</p></li>)}</ol>
    <details className={styles.details}><summary>{d.details}</summary><p>{d.calculation}</p><p>{v.conditions}</p><p>{d.berm}</p><a href={`/${locale}/${variant === "pollination" ? "evidence/ecology#narrative-electroecology" : "behavior#joint-action"}`}>{v.chain} →</a></details>
  </section>;
}
