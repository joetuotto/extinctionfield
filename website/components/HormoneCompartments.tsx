import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";
import { AnatomyPin } from "./AnatomyIllustration";
import anatomy from "./AnatomyIllustration.module.css";
import styles from "./HormoneCompartments.module.css";

const COPY = {
  en: {
    eyebrow: "Reading a hormone measurement", title: "The blood sample and the receiving tissue",
    lead: "Total testosterone counts free and protein-bound hormone together. Tissue action also depends on the receiving system.",
    blood: "In the bloodstream", tissue: "At the tissue",
    bloodAlt: "Cross-section of a blood vessel with three illustrated forms: free testosterone, SHBG-bound testosterone and albumin-bound testosterone.",
    tissueAlt: "A receiving cell with a membrane, intracellular receptors and a nucleus. A circulating measurement and cellular response occupy different compartments.",
    forms: [{ title: "1. Free T", text: "Not bound to a carrier protein." }, { title: "2. SHBG-bound T", text: "Testosterone bound to sex hormone-binding globulin." }, { title: "3. Albumin-bound T", text: "Testosterone bound to albumin." }],
    sum: "Total T includes all three forms shown here. The symbols illustrate forms, not their proportions. T marks the hormone; protein outlines are schematic.",
    tissueText: "Availability, receptor function and downstream signal use are separate steps. The testicular local environment is also distinct from the sampled circulation.",
    table: "What each observation describes",
    rows: [{ label: "Total testosterone", text: "The combined concentration in the sampled blood; it does not directly measure receptor function." }, { label: "Free testosterone", text: "The unbound fraction, measured or estimated with a stated method and binding assumptions." }, { label: "Tissue response", text: "A separate functional outcome. It cannot be read directly from either blood concentration alone." }],
    note: "An illustrative compartment map, not a diagnostic comparison. BERM’s availability-to-response closure remains distinct from the measured hormone values; unchanged total T alone establishes neither unchanged tissue action nor hidden harm.",
  },
  fi: {
    eyebrow: "Hormonimittauksen tulkinta", title: "Verinäyte ja vastaanottava kudos",
    lead: "Kokonais-testosteroni laskee vapaan ja proteiineihin sitoutuneen hormonin yhteen. Kudosvaikutus riippuu myös vastaanottavasta järjestelmästä.",
    blood: "Verenkierrossa", tissue: "Kudoksessa",
    bloodAlt: "Verisuonen leikkauskuvassa kolme havainnollistettua muotoa: vapaa testosteroni, SHBG:hen sitoutunut testosteroni ja albumiiniin sitoutunut testosteroni.",
    tissueAlt: "Vastaanottava solu: solukalvo, solunsisäisiä reseptoreita ja tuma. Verenkierron mittaus ja soluvaste sijaitsevat eri kompartimenteissa.",
    forms: [{ title: "1. Vapaa T", text: "Kuljettajaproteiiniin sitoutumaton hormoni." }, { title: "2. SHBG:hen sitoutunut T", text: "Sukupuolihormoneja sitovaan globuliiniin kiinnittynyt testosteroni." }, { title: "3. Albumiiniin sitoutunut T", text: "Albumiiniin kiinnittynyt testosteroni." }],
    sum: "Kokonais-T sisältää kuvan kaikki kolme muotoa. Symbolit havainnollistavat muotoja, eivät niiden osuuksia. T merkitsee hormonia; proteiinien muodot ovat kaavamaisia.",
    tissueText: "Saatavuus, reseptoritoiminta ja signaalin käyttö ovat eri vaiheita. Myös kiveksen paikallinen ympäristö eroaa näytteenottopaikan verenkierrosta.",
    table: "Mitä kukin havainto kuvaa",
    rows: [{ label: "Kokonais-testosteroni", text: "Muotojen yhteispitoisuus verinäytteessä; ei suora reseptoritoiminnan mittaus." }, { label: "Vapaa testosteroni", text: "Sitoutumaton osuus, joka mitataan tai arvioidaan ilmoitetulla menetelmällä ja sitoutumisoletuksilla." }, { label: "Kudosvaste", text: "Erillinen toiminnallinen tulos. Sitä ei voi lukea suoraan kummastakaan veren pitoisuudesta yksin." }],
    note: "Havainnollistava kompartimenttikartta, ei diagnostinen vertailu. BERM:n saatavuus–vaste-sulku säilyy erillään mitatuista hormoniarvoista; muuttumaton kokonais-T ei yksin osoita muuttumatonta kudosvaikutusta eikä piilevää haittaa.",
  },
};

/** The T token identifies hormone availability; it is not a chemical structure. */
function HormoneToken({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g className={styles.hormoneToken} transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden="true"><circle r="14"/><text y="1">T</text></g>;
}

function BloodDrawing({ label }: { label: string }) {
  const wallPoint = (t: number, lower = false) => {
    const xs = lower ? [22, 185, 347, 531] : [22, 169, 337, 531];
    const ys = lower ? [274, 247, 299, 266] : [73, 46, 98, 64];
    const at = (v: number[]) => (1-t)**3*v[0] + 3*t*(1-t)**2*v[1] + 3*t*t*(1-t)*v[2] + t**3*v[3];
    const derivative = (v: number[]) => 3*(1-t)**2*(v[1]-v[0]) + 6*t*(1-t)*(v[2]-v[1]) + 3*t*t*(v[3]-v[2]);
    return { x: at(xs), y: at(ys), angle: Math.atan2(derivative(ys), derivative(xs))*180/Math.PI };
  };
  return <svg className={anatomy.drawing} viewBox="0 0 550 330" role="img" aria-label={label}>
    <g className={anatomy.blue}>
      <path className={anatomy.tissueFill} d="M22 73C169 46 337 98 531 64V266C347 299 185 247 22 274Z" />
      <path className={anatomy.paleFill} d="M22 88C169 61 337 113 531 79V251C347 284 185 232 22 259Z" />
      <path className={anatomy.fine} opacity=".45" d="M23 78C172 51 339 103 531 69M23 269C186 242 349 294 531 261" />
      {[0,1,2,3,4,5,6].map(i => {
        const upper = wallPoint(.06 + i*.145), lower = wallPoint(.09 + i*.14, true);
        const upperSeam = wallPoint(.12 + i*.135), lowerSeam = wallPoint(.16 + i*.13, true);
        return <g key={i}>
          <ellipse className={anatomy.solid} cx={upper.x} cy={upper.y+7.5} rx="12" ry="2.3" transform={`rotate(${upper.angle} ${upper.x} ${upper.y+7.5})`} />
          <ellipse className={anatomy.solid} cx={lower.x} cy={lower.y-7.5} rx="12" ry="2.3" transform={`rotate(${lower.angle} ${lower.x} ${lower.y-7.5})`} />
          <path className={anatomy.fine} opacity=".4" d={`M${upperSeam.x} ${upperSeam.y}l-2 15M${lowerSeam.x} ${lowerSeam.y}l2-15`} />
        </g>;
      })}
      {[[59,219,-12],[154,121,18],[347,232,-9],[495,121,-15]].map(([x,y,r])=><g key={x} transform={`rotate(${r} ${x} ${y})`} opacity=".45"><ellipse className={anatomy.wash} cx={x} cy={y} rx="19" ry="7"/><ellipse className={anatomy.fine} cx={x} cy={y} rx="10" ry="3"/></g>)}
    </g>
    <HormoneToken x={94} y={167} scale={1.25}/>
    <g className={anatomy.blue} transform="translate(265 168)">
      <path className={anatomy.tissueFill} d="M-47-22C-61-43-36-66-17-50C-4-68 25-59 29-40C52-43 66-21 49-6C66 13 49 37 28 28C21 50-7 54-18 32C-45 39-66 14-47-3C-58-9-56-18-47-22Z"/>
      <path className={anatomy.fine} d="M-38-24C-47-39-28-49-20-37S-10-16-23-10S-46 3-31 14S-11 9-6 24M-13-47C1-59 21-44 11-34S-7-21 4-11M28-33C50-31 49-13 31-13S12-5 26 8S42 5 43 19M24 27C10 42-9 31-7 17"/>
      <path className={anatomy.fine} opacity=".5" d="M-35-28q-8-11 2-14M-29 18q10 7 17-1M5-46q10 1 7 9M32-26q10 5 1 9M11 31l8-3"/>
    </g>
    <HormoneToken x={266} y={167} scale={1.1}/>
    <g className={anatomy.teal} transform="translate(434 171)">
      <path className={anatomy.tissueFill} d="M-45-26C-38-55-4-57 12-37C35-48 61-29 53-5C70 14 54 43 32 39C22 62-7 51-14 37C-45 48-63 24-48 4C-62-8-58-21-45-26Z"/>
      <path className={anatomy.fine} d="M-36-27C-31-44-8-42-9-28S-26-10-15-1M8-29C26-43 50-22 34-14S6-14 12 1M-37 7C-54 23-30 37-22 24S-15 7-3 19M16 30C27 48 50 28 39 15S20 11 16 17"/>
      <path className={anatomy.fine} opacity=".5" d="M-31-32q11-9 16 0M20-29q13 1 15 10M-36 20q8 9 12-1M25 32q11 2 10-10"/>
    </g>
    <HormoneToken x={434} y={176} scale={1.1}/>
    <path className={anatomy.leader} d="M95 149V117L75 41M266 114V41M434 221V302"/>
    {[[95,149],[266,114],[434,221]].map(([x,y])=><circle key={x} className={anatomy.leaderDot} cx={x} cy={y} r="2.3"/>)}
    <AnatomyPin x={72} y={26} n={1}/><AnatomyPin x={266} y={26} n={2}/><AnatomyPin x={434} y={315} n={3}/>
  </svg>;
}

function ReceivingCellDrawing({ label }: { label: string }) {
  return <svg className={anatomy.drawing} viewBox="0 0 390 330" role="img" aria-label={label}>
    <g className={anatomy.teal}>
      <path className={anatomy.tissueFill} d="M114 48C156 23 214 31 259 48C312 69 348 91 352 145C358 204 325 251 278 282C235 310 172 306 128 281C84 257 65 212 64 164C63 113 76 73 114 48Z"/>
      <path className={anatomy.paleFill} d="M119 56C160 32 214 39 256 57C307 76 340 98 343 145C348 199 317 244 274 274C234 300 177 297 132 273C93 251 74 209 73 163C73 115 84 80 119 56Z"/>
      <path className={anatomy.fine} opacity=".5" d="M89 202Q90 242 125 260M277 268Q304 248 317 224M269 62Q305 78 321 104"/>
      {[[111,207],[141,91],[199,75],[303,156],[299,233],[165,273],[115,171],[326,178],[248,273]].map(([x,y])=><g key={x}><circle className={anatomy.texture} cx={x} cy={y} r="2"/><circle className={anatomy.texture} cx={x+7} cy={y+6} r="1.2"/></g>)}
      <path className={anatomy.fine} opacity=".5" d="M180 97Q154 101 165 114M178 85Q147 87 149 106M187 79Q147 69 133 93M296 248Q282 265 266 257"/>
    </g>
    <g className={anatomy.blue}>
      <path className={anatomy.tissueFill} d="M209 133C243 110 284 123 302 154C324 192 304 230 270 244C237 258 204 246 190 218C174 184 179 154 209 133Z"/>
      <path className={anatomy.fine} d="M214 140C244 119 277 132 295 159C313 190 297 223 266 237C237 248 211 237 198 214C184 186 187 158 214 140Z"/>
      <path className={anatomy.fine} opacity=".6" d="M208 161q16-20 25-7t12-11M199 195q15-13 21 4t21 21M264 144q-9 14 10 23t12 24M237 239q8-21 21-14M206 176l8-4"/>
      <ellipse className={anatomy.wash} cx="265" cy="194" rx="17" ry="19" transform="rotate(-17 265 194)"/><path className={anatomy.fine} d="M258 184q13-6 14 9t-13 7q-5-8 4-9"/>
      <g transform="translate(129 133)"><path className={anatomy.tissueFill} d="M-18-17C-31-24-35-6-24 4C-34 23-9 33 1 22C19 27 32 7 17-4C23-23 6-30-4-16L-3-2L-16-4Z"/><path className={anatomy.fine} d="M-25-7q-9 12 5 16t10 12M5 16q17 2 14-10M7-19q10 3 8 9"/></g>
      <g transform="translate(141 231) rotate(-15)"><path className={anatomy.tissueFill} d="M-19-15C-37-16-31 9-19 11C-24 30 1 36 10 18C31 15 29-5 15-9C13-27-9-29-10-12L-4-1L-18 1Z"/><path className={anatomy.fine} d="M-26-8q-1 15 13 14M-12 24q15 3 18-8M5-20q14 2 11 14"/></g>
    </g>
    <HormoneToken x={32} y={126} scale={.9}/><HormoneToken x={128} y={129} scale={.8}/><HormoneToken x={142} y={226} scale={.8}/>
  </svg>;
}

export function HormoneCompartments({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  return <figure className={anatomy.figure} aria-label={d.title} data-anatomy="hormone-compartments">
    <p className={anatomy.eyebrow}>{d.eyebrow}</p><h3 className={anatomy.title}>{d.title}</h3><p className={anatomy.lead}>{d.lead}</p>
    <div className={styles.grid}>
      <div><h4 className={styles.heading}><span className={anatomy.panelLetter} aria-hidden="true">a</span>{d.blood}</h4>
        <BloodDrawing label={d.bloodAlt}/>
        <dl className={styles.forms}>{d.forms.map(form=><div key={form.title}><dt>{form.title}</dt><dd>{form.text}</dd></div>)}</dl><p className={styles.sum}>{d.sum}</p>
      </div>
      <div><h4 className={styles.heading}><span className={anatomy.panelLetter} aria-hidden="true">b</span>{d.tissue}</h4>
        <ReceivingCellDrawing label={d.tissueAlt}/>
        <p className={styles.text}>{d.tissueText}</p>
      </div>
    </div>
    <table className={styles.table}><caption>{d.table}</caption><tbody>{d.rows.map(row=><tr key={row.label}><th scope="row">{row.label}</th><td>{row.text}</td></tr>)}</tbody></table>
    <figcaption className={anatomy.caption}>{d.note}<span className={anatomy.citations}><StudyCitation referenceId="narinx2022_free_testosterone" locale={locale}/><StudyCitation referenceId="degendt2004_sertoli_ar" locale={locale}/></span></figcaption>
  </figure>;
}
