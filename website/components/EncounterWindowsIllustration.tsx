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
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 5 C-3 30 5 57 0 88 M1 50 Q-31 27 -29 50 Q-12 66 1 61 M2 66 Q32 37 34 56 Q22 77 2 77" fill="#789572" stroke="#4e715b" strokeWidth="2" />
    {[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="0" cy="-19" rx="12" ry="23" fill="#d2b4b2" stroke="#af8a89" strokeWidth="1.2" transform={`rotate(${angle})`} />)}
    <circle r="12" fill="#d4ac59" stroke="#aa8541" strokeWidth="1.3" /><circle cx="-3" cy="-3" r="4" fill="#f1d995" />
  </g>;
}

function Bee({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinecap="round">
    <ellipse cx="-4" cy="-17" rx="11" ry="24" transform="rotate(-28)" fill="#eef1e8" stroke="#97aaa7" strokeWidth="1.7" />
    <ellipse cx="13" cy="-14" rx="11" ry="23" transform="rotate(27)" fill="#f5f4e9" stroke="#97aaa7" strokeWidth="1.7" />
    <path d="M-7 11 l-10 15 M6 14 l2 15 M18 9 l11 14" stroke="#685a45" strokeWidth="2" />
    <ellipse cx="6" cy="3" rx="29" ry="18" fill="#c7a15b" stroke="#806640" strokeWidth="1.4" />
    <path d="M-3 -14 Q-8 3 -3 20 M10 -14 Q6 4 12 20 M23 -9 Q19 5 24 16" fill="none" stroke="#65533a" strokeWidth="6" />
    <circle cx="-25" cy="0" r="12" fill="#736149" /><circle cx="-29" cy="-3" r="2.2" fill="#f7f3e8" />
    <path d="M-29 -10 q-10 -15 -16 -11 M-23 -11 q-2 -15 -10 -17" fill="none" stroke="#736149" strokeWidth="2" />
  </g>;
}

function Person({ x = 0, y = 0, color = "#668777", flip = false, scale = 1 }: { x?: number; y?: number; color?: string; flip?: boolean; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} strokeLinecap="round" strokeLinejoin="round">
    <circle cy="-32" r="13" fill="#c5ab90" stroke="#8d8270" strokeWidth="1.5" />
    <path d="M-15 -10 Q-6 -20 9 -12 L17 31 L-18 31 Z" fill={color} stroke="#566c65" strokeWidth="1.5" />
    <path d="M-9 30 L-10 70 M10 30 L17 70" fill="none" stroke="#66716e" strokeWidth="11" />
    <path d="M-13 -3 L-26 29 M10 -4 L28 16 L45 13" fill="none" stroke={color} strokeWidth="10" />
    <path d="M42 13 L48 13" stroke="#c5ab90" strokeWidth="7" /><path d="M-12 72 h-10 M17 72 h10" stroke="#586561" strokeWidth="6" />
  </g>;
}

function Scene({ variant, title, id }: { variant: Variant; title: string; id: string }) {
  return <svg viewBox="0 0 640 185" width="100%" role="img" aria-labelledby={`${id}-scene-title`}>
    <title id={`${id}-scene-title`}>{title}</title>
    <ellipse cx="320" cy="159" rx="255" ry="15" fill="#dce2d2" />
    {variant === "pollination" ? <>
      <path d="M59 165 Q210 145 327 164 T593 158" fill="none" stroke="#a8b59b" strokeWidth="2" />
      <path d="M101 165 l-7 -18 M109 165 l9 -22 M520 160 l-8 -17 M525 162 l9 -25" stroke="#8da581" strokeWidth="2" />
      <Flower x={193} y={65} /><Bee x={451} y={87} />
      <path d="M404 90 C340 48 281 112 226 84" fill="none" stroke="#afab90" strokeWidth="2" strokeDasharray="4 7" />
      <circle cx="325" cy="31" r="15" fill="#eee4c8" />
    </> : <>
      <path d="M268 109 h105 l-7 9 h-95 Z" fill="#cfb68d" stroke="#a18d6e" strokeWidth="1.5" />
      <path d="M280 118 l-4 43 M360 118 l5 43" stroke="#8c968c" strokeWidth="4" />
      <Person x={223} y={85} /><Person x={418} y={85} color="#8a9eac" flip />
      <path d="M299 105 l9 -20 h38 l-5 20 Z" fill="#fbf8ef" stroke="#b2b5a6" strokeWidth="1.5" />
      <path d="M314 92 h22 M312 98 h15" stroke="#9da895" strokeWidth="1.5" />
    </>}
  </svg>;
}

function StageDrawing({ variant, stage }: { variant: Variant; stage: number }) {
  return <svg viewBox="0 0 150 96" width="100%" aria-hidden="true" focusable="false">
    <ellipse cx="75" cy="83" rx="59" ry="7" fill="#e2e6db" />
    {variant === "pollination" ? stage === 0 ? <><Flower x={48} y={32} scale={.55} /><Bee x={112} y={29} scale={.54} /></> : stage === 1 ? <>
      <path d="M69 82 V47 M57 47 h26" stroke="#739271" strokeWidth="5" strokeLinecap="round" />
      <circle cx="68" cy="38" r="28" fill="#f7f5e9" fillOpacity=".55" stroke="#8d9e91" strokeWidth="3" /><path d="M89 59 l17 20" stroke="#8d9e91" strokeWidth="7" strokeLinecap="round" />
      {[[-9, 0], [0, -5], [10, 2], [-3, 7]].map(([x, y], i) => <circle key={i} cx={68 + x} cy={35 + y} r="3" fill="#c5a058" />)}
    </> : <>
      <path d="M43 25 Q26 53 43 77 Q63 58 43 25" fill="#b8a877" stroke="#938659" strokeWidth="1.8" />
      <path d="M43 36 v32" stroke="#827954" strokeWidth="1.2" /><path d="M99 81 V43 Q78 22 78 45 Q82 58 99 54 M100 55 Q122 26 123 46 Q121 60 100 66" fill="#8da87e" stroke="#668567" strokeWidth="2" />
    </> : stage === 0 ? <><Person x={43} y={45} scale={.5} /><Person x={109} y={45} color="#8a9eac" flip scale={.5} /></> : stage === 1 ? <>
      <rect x="44" y="16" width="63" height="64" rx="4" fill="#faf7ec" stroke="#a1ab9b" strokeWidth="2" /><rect x="62" y="11" width="27" height="10" rx="3" fill="#c3cbbd" />
      <path d="M55 42 l5 5 l10 -12 M55 64 l5 5 l10 -12 M78 42 h18 M78 64 h18" fill="none" stroke="#789481" strokeWidth="2.5" />
    </> : <>
      <path d="M36 36 L77 21 L116 51 L82 77 L36 36 L116 51 M77 21 L82 77" fill="none" stroke="#a6b4a5" strokeWidth="2" />
      {[[36,36],[77,21],[116,51],[82,77]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="8" fill={i % 2 ? "#8a9eac" : "#789681"} stroke="#faf7ed" strokeWidth="2" />)}
    </>}
  </svg>;
}

const x = (value: number) => 16 + value / 24 * 608;

function TimeTrack({ id, label, start, end, color, hatched = false }: { id: string; label: string; start: number; end: number; color: string; hatched?: boolean }) {
  return <svg viewBox="0 0 640 42" width="100%" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    {hatched && <defs><pattern id={`${id}-hatch`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(35)"><rect width="8" height="8" fill="#e0e5d1" /><path d="M0 0 v8" stroke="#7f9071" strokeWidth="3" /></pattern></defs>}
    <rect x="16" y="10" width="608" height="22" rx="4" fill="#edf0e7" />
    {[0,6,12,18,24].map(tick => <path key={tick} d={`M${x(tick)} 3 v36`} stroke="#cbd3c3" strokeWidth="1" />)}
    {end > start && <rect data-window-start={start} data-window-end={end} x={x(start)} y="10" width={x(end) - x(start)} height="22" rx="4" fill={hatched ? `url(#${id}-hatch)` : color} stroke={hatched ? "#78896c" : color} strokeWidth="1" />}
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
    { label: v.actorA, start: 5, end: 13, color: "#668777", hatched: false },
    { label: v.actorB, start: startB, end: endB, color: variant === "pollination" ? "#be9852" : "#839baa", hatched: false },
    { label: d.overlap, start: sharedStart, end: Math.max(sharedStart, sharedEnd), color: "#81946f", hatched: true },
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
        <div className={styles.axis} aria-hidden="true"><svg viewBox="0 0 640 34" width="100%">{[0,6,12,18,24].map(tick => <text key={tick} x={x(tick)} y="23" textAnchor="middle" fontSize="20" fill="#6d786b">{String(tick)}</text>)}</svg></div>
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
