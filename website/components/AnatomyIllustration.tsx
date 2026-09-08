import { pickCopy } from "@/lib/i18n";
import { StudyCitation } from "@/components/StudyCitation";
import styles from "./AnatomyIllustration.module.css";

/** Numbered spatial anchors; all anatomical names remain selectable HTML text. */
export function AnatomyPin({ x, y, n }: { x: number; y: number; n: number }) {
  return <g className={styles.pin} transform={`translate(${x} ${y})`} aria-hidden="true"><circle r="11" /><text y=".5">{n}</text></g>;
}

function Legend({ items }: { items: readonly { title: string; text: string }[] }) {
  return <ol className={styles.legend}>{items.map((item, i) => <li key={item.title}><span className={styles.legendNumber} aria-hidden="true">{i + 1}</span><span><strong>{item.title}</strong><span className={styles.legendDescription}>{item.text}</span></span></li>)}</ol>;
}

const TESTES_COPY = {
  en: {
    eyebrow: "Anatomy · from organ to tissue", title: "Different cells, one reproductive organ",
    lead: "The seminiferous tubules and the tissue between them have different jobs. Follow the magnification to locate hormone production, supporting cells and developing germ cells.",
    organ: "The testis and its coiled tubules", tissue: "A section through one tubule",
    organAlt: "Cutaway of a testis with coiled seminiferous tubules, an epididymis along its edge and a magnified tissue region.",
    tissueAlt: "Tubule cross-section. Sertoli cells extend through its lining, germ cells lie within it, and Leydig cells and a blood vessel lie outside it.",
    items: [
      { title: "Testis", text: "An organ containing many coiled seminiferous tubules." },
      { title: "Seminiferous tubule", text: "The tubular tissue in which sperm develop." },
      { title: "Sertoli cells", text: "Supporting cells. Their junctions form the blood–testis barrier within the tubule lining." },
      { title: "Developing germ cells", text: "Distinct stages occupy different positions within the tubule." },
      { title: "Leydig cells", text: "Cells between the tubules that produce testosterone." },
      { title: "Blood vessel", text: "Circulating testosterone and the local testicular environment are different compartments." },
    ],
    note: "Anatomical schematic; sizes and cell counts are illustrative. The numbered structures locate biological components. Their presence does not specify an electromagnetic dose or establish a field-induced change.",
  },
  fi: {
    eyebrow: "Anatomia · elimestä kudokseen", title: "Eri solut, sama lisääntymiselin",
    lead: "Siementiehyillä ja niiden välisellä kudoksella on eri tehtävät. Suurennos paikantaa hormonituotannon, tukisolut ja kehittyvät sukusolut.",
    organ: "Kives ja sen kiertyvät siementiehyet", tissue: "Yhden siementiehyen poikkileikkaus",
    organAlt: "Kiveksen leikkauskuva: kiertyvät siementiehyet, reunalla lisäkives ja suurennettava kudosalue.",
    tissueAlt: "Siementiehyen poikkileikkaus. Sertoli-solut ulottuvat tiehyen seinämän läpi, sukusolut ovat sen sisällä ja Leydig-solut sekä verisuoni sen ulkopuolella.",
    items: [
      { title: "Kives", text: "Elin, jossa on runsaasti kiertyviä siementiehyitä." },
      { title: "Siementiehyt", text: "Putkimainen kudos, jossa siittiöt kehittyvät." },
      { title: "Sertoli-solut", text: "Tukisoluja, joiden väliset liitokset muodostavat veri–kivesesteen tiehyen seinämässä." },
      { title: "Kehittyvät sukusolut", text: "Eri kehitysvaiheet sijoittuvat tiehyessä eri kohtiin." },
      { title: "Leydig-solut", text: "Tiehyiden välissä sijaitsevia testosteronia tuottavia soluja." },
      { title: "Verisuoni", text: "Verenkierron testosteroni ja kiveksen paikallinen ympäristö ovat eri kompartimentteja." },
    ],
    note: "Anatominen kaaviokuva: koot ja solumäärät ovat havainnollistavia. Numeroidut rakenteet paikantavat biologisia osia. Niiden olemassaolo ei määritä sähkömagneettista annosta tai osoita kentän aiheuttamaa muutosta.",
  },
};

function TestisDrawing({ label }: { label: string }) {
  return <svg className={styles.drawing} viewBox="0 0 340 340" role="img" aria-label={label}>
    <g className={styles.blue}>
      <path className={styles.wash} d="M176 33C98 20 43 99 44 181C43 260 95 317 160 312C224 309 268 248 269 167C270 101 236 44 176 33Z" />
      <path className={styles.fine} d="M174 42C106 30 53 103 53 181C51 253 99 305 161 303C219 300 258 242 260 167C261 108 232 52 174 42Z" />
      {[0, 1, 2, 3, 4].map(i => <path key={i} className={styles.fine} opacity=".45" d={`M242 88 Q${77 + i * 17} ${88 + i * 27} ${70 + i * 27} ${241 + Math.sin(i) * 42}`} />)}
      <path className={styles.outline} opacity=".75" d="M134 70C93 68 83 93 112 99S159 90 155 112S91 114 89 132S145 146 140 164S70 153 72 177S137 190 127 208S74 212 94 234S157 223 160 247S110 274 147 281S210 269 208 247S173 228 187 207S233 218 236 189S185 189 187 165S239 158 228 137S175 146 175 124S214 111 211 92S171 99 165 78" />
      <path className={styles.fine} opacity=".5" d="M142 62C100 62 77 95 106 106S166 92 163 119S94 120 98 137S156 147 149 170S81 163 80 180S148 188 138 215S88 218 103 234" />
    </g>
    <g className={styles.teal}>
      <path className={styles.wash} d="M222 54C242 37 265 48 274 67C286 97 279 122 283 150S288 208 270 244C263 260 241 280 225 277L231 262C251 239 266 212 264 180C261 143 270 115 260 88C254 74 238 76 222 72Z" />
      <path className={styles.fine} d="M239 58C256 46 274 71 263 80S278 98 268 108S282 125 270 137S284 156 273 171S282 192 271 207S267 229 254 239S249 263 232 269" />
      <path className={styles.outline} d="M226 269C255 258 291 233 295 191L298 21" />
    </g>
    <circle cx="172" cy="169" r="33" fill="var(--figure-bg)" fillOpacity=".4" stroke="var(--foreground-muted)" strokeDasharray="4 4" />
    <path className={styles.leader} d="M205 168H305M300 162L306 168L300 174M70 277L38 289" />
    <AnatomyPin x={31} y={294} n={1} /><AnatomyPin x={172} y={169} n={2} />
  </svg>;
}

function TubuleDrawing({ label }: { label: string }) {
  const angle = (i: number, radius: number) => ({ x: 190 + Math.cos(i) * radius, y: 177 + Math.sin(i) * radius });
  return <svg className={styles.drawing} viewBox="0 0 445 355" role="img" aria-label={label}>
    <g className={styles.blue}><circle className={styles.wash} cx="190" cy="177" r="143" /><circle className={styles.fine} cx="190" cy="177" r="137" /></g>
    <g className={styles.teal}>
      {Array.from({ length: 7 }, (_, i) => <g key={i} transform={`rotate(${i * 360 / 7} 190 177)`}>
        <path className={styles.wash} d="M170 42C162 67 171 81 161 106C156 117 166 126 175 128C181 139 182 143 189 146C197 138 191 123 202 115C217 104 202 87 212 66L210 42Z" />
        <ellipse cx="188" cy="73" rx="10" ry="14" className={styles.solid} />
        <path className={styles.outline} d="M151 75L162 68" strokeWidth="3" />
      </g>)}
    </g>
    <g className={styles.blue}>
      {Array.from({ length: 17 }, (_, i) => { const p = angle(i * Math.PI * 2 / 17, 120); return <g key={i}><circle className={styles.wash} cx={p.x} cy={p.y} r="9" /><circle className={styles.solid} cx={p.x - 1} cy={p.y + 1} r="4" /></g>; })}
      {Array.from({ length: 13 }, (_, i) => { const p = angle(i * Math.PI * 2 / 13 + .12, 88); return <g key={i}><circle className={styles.wash} cx={p.x} cy={p.y} r="12" /><path className={styles.fine} d={`M${p.x - 5} ${p.y}q4 -6 7 1t-5 4`} /></g>; })}
      {Array.from({ length: 11 }, (_, i) => <g key={i} transform={`rotate(${i * 360 / 11} 190 177)`}><ellipse className={styles.solid} cx="186" cy="125" rx="3" ry="6" /><path className={styles.fine} d="M186 131Q182 147 189 153T189 173" /></g>)}
    </g>
    <g className={styles.amber}>{[[362, 134], [391, 153], [360, 172], [386, 195]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><path className={styles.wash} d="M-17 -9Q-7 -24 11 -16L21 -2L12 18L-7 21L-21 7Z" /><circle r="6" className={styles.solid} /></g>)}</g>
    <g className={styles.blue}><path className={styles.wash} d="M349 244Q380 227 412 256L410 281Q382 255 351 269Z" /><path className={styles.fine} d="M350 251Q380 236 411 264" />{[360, 377, 395].map((x, i) => <ellipse key={x} cx={x} cy={252 + i * 3} rx="6" ry="3" transform={`rotate(${i * 12} ${x} ${252 + i * 3})`} className={styles.solid} />)}</g>
    <path className={styles.leader} d="M189 72L159 20M257 134L288 99M390 166H423M377 262L390 307" />
    <AnatomyPin x={154} y={15} n={3} /><AnatomyPin x={295} y={91} n={4} /><AnatomyPin x={430} y={166} n={5} /><AnatomyPin x={394} y={316} n={6} />
  </svg>;
}

export function AnatomyIllustrationTestes({ locale }: { locale: string }) {
  const d = pickCopy(TESTES_COPY, locale);
  return <figure className={styles.figure} aria-label={d.title} data-anatomy="testis">
    <p className={styles.eyebrow}>{d.eyebrow}</p><h4 className={styles.title}>{d.title}</h4><p className={styles.lead}>{d.lead}</p>
    <div className={styles.panels}><div className={styles.panel}><p className={styles.panelTitle}>{d.organ}</p><TestisDrawing label={d.organAlt} /></div><div className={styles.panel}><p className={styles.panelTitle}>{d.tissue}</p><TubuleDrawing label={d.tissueAlt} /></div></div>
    <Legend items={d.items} /><figcaption className={styles.caption}>{d.note}<span className={styles.citations}><StudyCitation referenceId="degendt2004_sertoli_ar" locale={locale} /><StudyCitation referenceId="esmaeilian2023_autophagy" locale={locale} /></span></figcaption>
  </figure>;
}

const CELL_COPY = {
  en: {
    eyebrow: "Cell anatomy", title: "Where the production pathways meet", compactTitle: "A receiving system inside the cell",
    lead: "Locate the structures behind the study branches. The cell is a spatial guide to the shared machinery; each experiment keeps its own tissue and protocol.",
    alt: "Steroidogenic cell cutaway: outer membrane, endoplasmic reticulum, nucleus, lipid droplets, mitochondrion with folded inner membrane and lysosome.",
    items: [
      { title: "Cell membrane", text: "Separates the cell from its surroundings." },
      { title: "Endoplasmic reticulum", text: "An intracellular membrane system that includes calcium stores." },
      { title: "Nucleus", text: "Gene regulation: the direct and clock-related branches retain their distinct regulators." },
      { title: "Lipid droplets", text: "Stored lipids participate in the supply of cholesterol." },
      { title: "Mitochondrion", text: "StAR supports cholesterol transport into steroid production; later steps also involve the ER." },
      { title: "Lysosome", text: "Lipid processing connects autophagy to substrate supply." },
    ],
    controls: "Locate a study branch", all: "Whole cell", calcium: "Calcium signalling", clock: "Local clock", supply: "Cholesterol supply", reserve: "Redox and stores", mitochondria: "Mitochondria",
    selections: { all: "The structures are shown together. Numbered labels describe their location and role.", "calcium-signalling": "Highlighted: calcium stores, gene regulation and the mitochondrial production stage.", "clock-steroidogenesis": "Highlighted: the nucleus and mitochondrial stage connected by the clock-related branch.", "cholesterol-supply": "Highlighted: lipid droplets, lysosomal processing and mitochondrial cholesterol transport.", "redox-reserve": "Highlighted: cytoplasm, calcium stores and mitochondria. Reserve is a measured state, not a separate organelle.", "mitochondrial-capacity": "Highlighted: the mitochondrial compartment; function and reserve retain their study-specific measurements." },
    other: "The selected studies follow outcomes beyond this cell-level view; the anatomical map remains a reference.",
    note: "Spatial schematic, not to scale. BERM connects the measured component routes conditionally; the drawing does not specify a geometry-to-tissue coefficient or a quantitative hormone response.",
    compactNote: "Cell structure locates the biology. BERM’s physical-to-tissue response bridge requires separate calibration.",
  },
  fi: {
    eyebrow: "Solun anatomia", title: "Missä tuotannon reitit kohtaavat", compactTitle: "Vastaanottava järjestelmä solun sisällä",
    lead: "Paikanna tutkimushaarojen taustalla olevat rakenteet. Solu on yhteisen koneiston sijaintikartta; jokainen koe säilyttää oman kudoksensa ja protokollansa.",
    alt: "Steroidogeenisen solun leikkaus: solukalvo, solulimakalvosto, tuma, lipidipisarat, poimuttuneen sisäkalvon sisältävä mitokondrio ja lysosomi.",
    items: [
      { title: "Solukalvo", text: "Erottaa solun sen ympäristöstä." },
      { title: "Solulimakalvosto", text: "Solunsisäinen kalvojärjestelmä, johon kuuluu kalsiumvarastoja." },
      { title: "Tuma", text: "Geenisäätely: suora ja kelloon liittyvä haara säilyttävät omat säätelijänsä." },
      { title: "Lipidipisarat", text: "Varastoituneet lipidit osallistuvat kolesterolin saatavuuteen." },
      { title: "Mitokondrio", text: "StAR tukee kolesterolin kuljetusta steroidituotantoon; myöhemmät vaiheet liittyvät myös solulimakalvostoon." },
      { title: "Lysosomi", text: "Lipidien käsittely yhdistää autofagian lähtöaineen saatavuuteen." },
    ],
    controls: "Paikanna tutkimushaara", all: "Koko solu", calcium: "Kalsiumsignalointi", clock: "Paikallinen kello", supply: "Kolesterolihuolto", reserve: "Redox ja varastot", mitochondria: "Mitokondriot",
    selections: { all: "Rakenteet näkyvät yhdessä. Numeroidut selitteet kertovat niiden sijainnin ja tehtävän.", "calcium-signalling": "Korostettu: kalsiumvarastot, geenisäätely ja mitokondrion tuotantovaihe.", "clock-steroidogenesis": "Korostettu: tuma ja mitokondriovaihe, joita kelloon liittyvä haara yhdistää.", "cholesterol-supply": "Korostettu: lipidipisarat, lysosomien käsittely ja kolesterolin mitokondriokuljetus.", "redox-reserve": "Korostettu: solulima, kalsiumvarastot ja mitokondriot. Varanto on mitattava tila, ei erillinen soluelin.", "mitochondrial-capacity": "Korostettu: mitokondrio; toiminta ja varanto säilyttävät tutkimuskohtaiset mittauksensa." },
    other: "Valitut tutkimukset seuraavat tämän solunäkymän ulkopuolisia tuloksia; anatomia säilyy sijaintikarttana.",
    note: "Sijaintia havainnollistava kaaviokuva, ei mittakaavassa. BERM yhdistää mitattuja komponenttireittejä ehdollisesti; kuva ei määritä geometria–kudoskerrointa tai määrällistä hormonivastetta.",
    compactNote: "Solurakenne paikantaa biologian. BERM:n fysikaalinen kudosvastesilta tarvitsee erillisen kalibroinnin.",
  },
};

const REGIONS: Record<string, readonly string[]> = {
  "calcium-signalling": ["er", "nucleus", "mitochondrion"], "clock-steroidogenesis": ["nucleus", "mitochondrion"],
  "cholesterol-supply": ["lipids", "lysosome", "mitochondrion"], "redox-reserve": ["cytoplasm", "er", "mitochondrion"], "mitochondrial-capacity": ["mitochondrion"],
};

export function AnatomyIllustrationCell({ locale, selectedBranch = "all", onSelectBranch, compact = false }: { locale: string; selectedBranch?: string; onSelectBranch?: (branch: string) => void; compact?: boolean }) {
  const d = pickCopy(CELL_COPY, locale);
  const active = (region: string) => selectedBranch === "all" || (REGIONS[selectedBranch] ?? []).includes(region);
  const regionProps = (region: string) => ({ className: styles.region, "data-cell-region": region, "data-active": active(region) });
  const choices = [["all", d.all], ["calcium-signalling", d.calcium], ["clock-steroidogenesis", d.clock], ["cholesterol-supply", d.supply], ["redox-reserve", d.reserve], ["mitochondrial-capacity", d.mitochondria]];
  return <figure className={`${styles.figure} ${compact ? styles.compact : ""}`} aria-label={compact ? d.compactTitle : d.title} data-anatomy="steroidogenic-cell" data-anatomy-branch={selectedBranch}>
    {!compact && <p className={styles.eyebrow}>{d.eyebrow}</p>}<h4 className={styles.title}>{compact ? d.compactTitle : d.title}</h4>
    {!compact && <p className={styles.lead}>{d.lead}</p>}
    {onSelectBranch && <div className={styles.controls} role="group" aria-label={d.controls}>{choices.map(([id, label]) => <button type="button" key={id} aria-pressed={selectedBranch === id} onClick={() => onSelectBranch(id)}>{label}</button>)}</div>}
    <div className={styles.cellLayout}>
      <svg className={styles.drawing} viewBox="0 0 580 390" role="img" aria-label={d.alt}>
        <g className={styles.blue}><path className={styles.wash} d="M75 90C132 31 214 46 275 38C350 24 400 60 459 83C523 109 540 156 525 216C519 250 537 287 495 321C447 359 368 339 317 351C260 364 218 348 161 347C95 346 47 308 38 257C25 201 36 132 75 90Z" /><path className={styles.fine} opacity=".5" d="M83 96C136 40 216 54 276 46C349 33 397 68 457 92C515 116 529 160 517 215C510 254 527 283 490 314C444 349 367 331 315 343C256 355 217 340 161 339C102 339 55 302 47 255C35 201 43 137 83 96Z" /></g>
        <g {...regionProps("cytoplasm")}><g className={styles.teal}>{[[72,164],[86,284],[258,284],[329,97],[472,268],[199,300],[300,210],[117,100],[457,311]].map(([x,y])=><g key={`${x}-${y}`}><circle cx={x} cy={y} r="2.5" className={styles.solid}/><circle cx={x+10} cy={y-6} r="1.8" className={styles.solid}/></g>)}</g></g>
        <g {...regionProps("er")}><g className={styles.teal}>{[0,1,2,3,4].map(i=><path key={i} className={styles.outline} d={`M${93+i*3} ${177+i*21}C${140+i*2} ${140+i*24} ${161+i*3} ${204+i*20} ${212+i*5} ${190+i*20}S${274+i*2} ${194+i*19} ${275-i*4} ${222+i*19}`}/>)}{[0,1,2,3,4,5].map(i=><circle key={i} className={styles.solid} cx={125+i*18} cy={248+Math.sin(i)*9} r="3"/>)}</g></g>
        <g {...regionProps("nucleus")}><g className={styles.blue}><ellipse className={styles.wash} cx="216" cy="135" rx="77" ry="65" transform="rotate(-13 216 135)"/><ellipse className={styles.fine} cx="216" cy="135" rx="69" ry="57" transform="rotate(-13 216 135)"/><ellipse className={styles.solid} cx="235" cy="130" rx="17" ry="15" opacity=".5"/><path className={styles.fine} d="M168 127Q181 108 202 121T228 103M174 149Q191 170 216 153T257 160M200 91Q214 109 211 125T222 174"/>{[0,1,2,3,4,5,6,7].map(i=><circle key={i} cx={216+Math.cos(i*Math.PI/4)*74} cy={135+Math.sin(i*Math.PI/4)*62} r="2.5" fill="var(--figure-bg)" stroke="currentColor" strokeWidth="1" />)}</g></g>
        <g {...regionProps("lipids")}><g className={styles.amber}>{[[387,101,28],[430,115,18],[401,146,15]].map(([x,y,r])=><g key={x}><circle className={styles.wash} cx={x} cy={y} r={r}/><circle className={styles.fine} cx={x} cy={y} r={r-5} opacity=".5"/><path className={styles.fine} d={`M${x-r/2} ${y-r/3}q${r/2} ${-r/2} ${r} 0`}/></g>)}</g></g>
        <g {...regionProps("lysosome")}><g className={styles.teal}><circle className={styles.wash} cx="468" cy="176" r="28"/><circle className={styles.fine} cx="468" cy="176" r="23"/>{[[460,166],[478,175],[459,185],[470,190],[470,164]].map(([x,y])=><path key={`${x}-${y}`} className={styles.fine} d={`M${x-3} ${y-2}l5 3 -4 4`}/>)}</g></g>
        <g {...regionProps("mitochondrion")}><g className={styles.amber} transform="rotate(-18 389 257)"><path className={styles.wash} d="M314 223C342 204 374 227 402 218C440 205 476 229 469 256C460 288 418 278 393 290C358 307 305 284 303 258C301 242 303 232 314 223Z"/><path className={styles.outline} d="M318 232C335 218 347 250 355 244S360 226 370 233S374 268 384 260S393 229 404 230S408 258 419 256S431 229 443 235S445 260 454 253C461 267 434 275 413 270S395 282 377 281S348 284 329 272S309 246 318 232Z"/><path className={styles.fine} d="M314 224C342 207 374 229 402 221C440 209 471 232 466 256"/></g></g>
        <g className={styles.amber} opacity=".7"><circle cx="438" cy="207" r="3"/><circle cx="429" cy="215" r="2.5"/><circle cx="418" cy="221" r="2"/></g>
        <path className={styles.leader} d="M521 252L555 266M108 216L61 223M212 71L212 52M390 72L396 52M377 295L365 325M486 168L524 145"/>
        <AnatomyPin x={558} y={277} n={1}/><AnatomyPin x={54} y={223} n={2}/><AnatomyPin x={212} y={43} n={3}/><AnatomyPin x={398} y={43} n={4}/><AnatomyPin x={361} y={333} n={5}/><AnatomyPin x={534} y={141} n={6}/>
      </svg>
      <Legend items={d.items}/>
    </div>
    {onSelectBranch && <p className={styles.selection} aria-live="polite">{d.selections[selectedBranch as keyof typeof d.selections] ?? d.other}</p>}
    <figcaption className={styles.caption}>{compact ? d.compactNote : d.note}{!compact && <span className={styles.citations}><StudyCitation referenceId="lin1995_star" locale={locale}/><StudyCitation referenceId="esmaeilian2023_autophagy" locale={locale}/><StudyCitation referenceId="martin2008_camki_nur77" locale={locale}/></span>}</figcaption>
  </figure>;
}
