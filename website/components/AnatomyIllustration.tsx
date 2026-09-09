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
  // Separate coiled tubules within a cut surface; counts and size are illustrative.
  const tubules = [
    "M158 83C131 70 105 91 125 102S162 90 171 108S126 117 130 134S182 136 199 150",
    "M104 112C74 123 76 141 97 145S119 128 128 145S90 163 98 178S150 167 174 173L226 177",
    "M87 170C62 183 72 198 95 196S116 180 127 193S91 214 105 226S143 206 163 213L228 189",
    "M91 222C72 236 79 253 98 248S128 228 133 246S111 273 131 280S167 249 179 241L229 199",
    "M145 278C121 291 135 314 151 300S167 275 183 282S169 318 186 312S204 282 204 265L235 212",
    "M194 122C177 106 186 83 202 103S206 128 220 139L233 161",
    "M198 232C182 250 194 264 212 249S227 231 228 240S208 274 220 279L243 213",
  ];
  return <svg className={styles.drawing} viewBox="0 0 340 410" role="img" aria-label={label}>
    <g className={styles.blue}>
      <path className={styles.tissueFill} d="M176 48C111 35 55 100 47 181C36 266 78 344 141 359C206 375 264 307 274 224C287 130 246 62 176 48Z" />
      <path className={styles.paleFill} d="M175 58C116 47 66 106 58 183C47 262 85 333 143 348C202 362 253 299 264 223C276 135 239 72 175 58Z" />
      <path className={styles.fine} opacity=".55" d="M163 53C92 58 55 148 55 210M62 264Q82 327 132 348M188 347Q238 315 255 259" />
      {["M245 170Q180 99 121 72", "M242 175Q159 126 73 135", "M240 183Q151 169 59 204", "M239 191Q161 227 78 285", "M239 204Q180 278 148 347", "M242 210Q223 269 221 310"].map(d => <path key={d} className={styles.fine} opacity=".34" d={d} />)}
      {tubules.map(d => <g key={d}><path d={d} fill="none" stroke="currentColor" strokeWidth="5.4" strokeOpacity=".19" strokeLinecap="round" /><path className={styles.fine} d={d} /></g>)}
      <path className={styles.tissueFill} d="M235 147Q256 159 252 190L246 226L233 228L229 199L231 169Z" />
      <path className={styles.fine} d="M239 157l8 13-12 12 11 11-11 14 7 9M234 172l13 9-14 10 11 13M248 165l17-31m-15 43 21-28m-23 37 25-29" />
    </g>
    <g className={styles.teal}>
      <path className={styles.tissueFill} d="M217 59C233 37 263 46 278 68C298 98 282 132 291 168C301 207 288 255 271 291C264 308 246 330 225 332L231 310C250 291 267 254 270 219C275 178 264 151 272 120C280 91 268 80 249 78L224 81Z" />
      <path className={styles.fine} d="M235 58C253 44 280 68 264 77S283 92 277 106S286 126 277 140S293 157 281 171S292 191 282 205S287 225 277 239S278 261 265 271S262 294 248 301S246 318 233 320" />
      <path d="M231 322C257 317 294 282 301 241C309 193 295 142 308 94L316 21" fill="none" stroke="currentColor" strokeWidth="6" strokeOpacity=".15" />
      <path className={styles.outline} d="M231 322C257 317 294 282 301 241C309 193 295 142 308 94L316 21" />
    </g>
    <circle cx="162" cy="224" r="31" fill="var(--anatomy-paper)" fillOpacity=".2" stroke="var(--anatomy-muted)" strokeWidth="1" strokeDasharray="3 4" />
    <path className={styles.leader} d="M193 224H307M83 314L56 339H35" />
    <circle className={styles.leaderDot} cx="83" cy="314" r="2.1" />
    <AnatomyPin x={21} y={339} n={1} /><AnatomyPin x={322} y={224} n={2} />
  </svg>;
}

function TubuleDrawing({ label }: { label: string }) {
  const polar = (angle: number, radius: number) => ({ x: 202 + Math.cos(angle) * radius, y: 209 + Math.sin(angle) * radius });
  return <svg className={styles.drawing} viewBox="0 0 510 420" role="img" aria-label={label}>
    <g className={styles.teal}>
      <circle className={styles.tissueFill} cx="202" cy="209" r="165" />
      <circle className={styles.paleFill} cx="202" cy="209" r="157" />
      {Array.from({ length: 22 }, (_, i) => <g key={i} transform={`rotate(${i * 360 / 22} 202 209)`}><path className={styles.fine} opacity=".6" d="M188 48Q202 44 215 48" /><ellipse className={styles.solid} cx="204" cy="48" rx="5" ry="1.6" /></g>)}
      {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45 + 4} 202 209)`}>
        <path className={styles.tissueFill} d="M181 55C172 68 173 87 180 96C181 108 166 116 168 128C170 138 184 135 184 145L190 163C195 172 198 169 201 162L205 147C216 140 233 144 235 132C235 119 218 118 219 106C220 88 229 77 223 56Z" />
        <path className={styles.fine} opacity=".55" d="M190 61Q181 80 192 94L188 123M208 69Q220 89 208 111L209 129M180 118L190 131L195 153" />
        <path className={styles.tissueFill} d="M192 79C181 70 181 93 188 101C197 114 211 98 211 89C210 79 202 85 192 79Z" />
        <circle className={styles.solid} cx="198" cy="94" r="3.5" />
        <path className={styles.outline} d="M168 87l9-5m-9 10 10-5" />
      </g>)}
    </g>
    <g className={styles.blue}>
      {Array.from({ length: 20 }, (_, i) => { const p = polar(i * Math.PI / 10 + .16, 137); return <g key={i}><ellipse className={styles.tissueFill} cx={p.x} cy={p.y} rx="10.5" ry="9" transform={`rotate(${i * 18} ${p.x} ${p.y})`} /><circle className={styles.solid} cx={p.x - 1} cy={p.y + 1} r="4.5" /><circle cx={p.x - 2.5} cy={p.y - 1} r="1" fill="var(--anatomy-paper)" /></g>; })}
      {Array.from({ length: 16 }, (_, i) => { const p = polar(i * Math.PI / 8 + .32, 105); return <g key={i}><circle className={styles.paleFill} cx={p.x} cy={p.y} r="14" /><circle className={styles.wash} cx={p.x} cy={p.y} r="9" /><path className={styles.fine} d={`M${p.x - 5} ${p.y - 3}q5 -6 8 1t-3 6q-8 3-5-4`} /></g>; })}
      {Array.from({ length: 16 }, (_, i) => { const p = polar(i * Math.PI / 8, 72); return <g key={i}><circle className={styles.paleFill} cx={p.x} cy={p.y} r="7" /><ellipse className={styles.solid} cx={p.x} cy={p.y} rx="3" ry="4" /></g>; })}
      {Array.from({ length: 11 }, (_, i) => <g key={i} transform={`rotate(${i * 360 / 11 + 10} 202 209)`}><ellipse className={styles.solid} cx="198" cy="151" rx="2.6" ry="6.5" /><path className={styles.fine} d="M198 157C196 166 206 174 201 181S194 195 199 203" /></g>)}
    </g>
    <g className={styles.amber}>
      {[[402, 141, -9], [441, 158, 15], [399, 184, 9], [443, 201, -12]].map(([x, y, r], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <path className={styles.tissueFill} d="M-20 -12Q-10 -29 10 -23L25 -8L22 12L6 25L-16 19L-26 4Z" /><path className={styles.fine} opacity=".45" d="M-18 -8Q-14 -21 2 -20M-16 13Q-7 20 4 18" /><ellipse className={styles.wash} cx="1" cy="0" rx="10" ry="11" /><circle className={styles.solid} cx="3" cy="1" r="3.3" />{[[-14,-5],[15,-8],[-11,13],[12,14]].map(([dx,dy])=><circle key={`${dx}-${dy}`} className={styles.texture} cx={dx} cy={dy} r="1.7" />)}
      </g>)}
    </g>
    <g className={styles.blue}>
      <path className={styles.tissueFill} d="M367 272Q398 245 455 266L489 280L479 307Q440 283 409 286L380 299Z" />
      <path className={styles.fine} d="M373 277Q404 254 453 273L485 286M378 292Q409 273 444 284L482 301" />
      {[[392,274,-15],[425,275,5],[455,285,22]].map(([x,y,r])=><g key={x} transform={`rotate(${r} ${x} ${y})`}><ellipse className={styles.wash} cx={x} cy={y} rx="10" ry="4.5"/><ellipse className={styles.fine} cx={x} cy={y} rx="5" ry="1.8"/></g>)}
      <ellipse className={styles.solid} cx="407" cy="257" rx="8" ry="2" transform="rotate(-5 407 257)" /><ellipse className={styles.solid} cx="451" cy="291" rx="8" ry="2" transform="rotate(20 451 291)" />
    </g>
    <path className={styles.leader} d="M206 94L176 28H151M271 130L315 105H341M449 157H478V126M430 279L453 342H478" />
    {[[206,94],[271,130],[449,157],[430,279]].map(([x,y])=><circle className={styles.leaderDot} key={`${x}-${y}`} cx={x} cy={y} r="2.2" />)}
    <AnatomyPin x={137} y={28} n={3} /><AnatomyPin x={355} y={105} n={4} /><AnatomyPin x={478} y={112} n={5} /><AnatomyPin x={492} y={342} n={6} />
  </svg>;
}

export function AnatomyIllustrationTestes({ locale }: { locale: string }) {
  const d = pickCopy(TESTES_COPY, locale);
  return <figure className={styles.figure} aria-label={d.title} data-anatomy="testis">
    <p className={styles.eyebrow}>{d.eyebrow}</p><h4 className={styles.title}>{d.title}</h4><p className={styles.lead}>{d.lead}</p>
    <div className={styles.panels}><div className={styles.panel}><p className={styles.panelTitle}><span className={styles.panelLetter} aria-hidden="true">a</span>{d.organ}</p><TestisDrawing label={d.organAlt} /></div><div className={styles.panel}><p className={styles.panelTitle}><span className={styles.panelLetter} aria-hidden="true">b</span>{d.tissue}</p><TubuleDrawing label={d.tissueAlt} /></div></div>
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
      <svg className={styles.drawing} viewBox="0 0 640 460" role="img" aria-label={d.alt}>
        <g className={styles.blue}>
          <path className={styles.tissueFill} d="M106 99C159 51 220 65 275 54C352 34 414 65 475 87C539 108 579 139 586 197C591 242 603 285 569 326C533 372 476 386 412 400C360 413 310 397 253 409C181 424 125 401 86 358C53 322 43 275 52 226C63 180 61 139 106 99Z" />
          <path className={styles.paleFill} d="M113 106C165 60 221 73 277 63C351 44 411 73 472 96C532 118 570 145 577 198C581 242 592 283 562 321C528 363 473 378 410 391C358 404 309 388 252 400C185 415 132 393 93 352C63 318 53 274 61 227C71 181 70 143 113 106Z" />
          <path className={styles.fine} opacity=".4" d="M85 326C73 304 71 288 73 268M508 365Q550 343 568 309M334 60Q397 63 438 81" />
        </g>
        <g {...regionProps("cytoplasm")}><g className={styles.teal}>
          {[[112,329],[94,278],[179,361],[246,370],[299,347],[326,300],[341,203],[357,235],[369,175],[399,198],[421,215],[451,265],[519,286],[538,312],[482,348],[520,143],[362,93],[310,94],[141,116],[91,227],[307,388],[202,328],[260,321],[548,235],[491,113]].map(([x,y],i)=><g key={`${x}-${y}`}><circle className={styles.texture} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.6}/><circle className={styles.texture} cx={x+8} cy={y+6} r="1.1"/></g>)}
        </g></g>
        <g {...regionProps("er")}><g className={styles.teal}>
          {[
            "M116 194C130 182 145 194 157 212C179 241 220 256 253 245C286 234 305 238 315 260L310 264C300 245 284 241 256 251C216 264 176 248 152 216C141 200 131 189 119 199Z",
            "M100 232C120 216 140 227 150 243C162 260 188 278 215 277C248 275 280 259 294 279C303 292 295 304 281 307L279 301C289 299 295 290 289 283C278 270 248 282 216 284C183 285 158 269 145 247C133 230 119 224 103 237Z",
            "M111 270C129 257 145 271 153 285C164 305 188 313 215 305C235 299 251 299 262 314L257 318C247 306 236 305 217 312C187 321 157 311 147 288C141 276 128 263 115 275Z",
            "M136 317C152 302 166 318 177 326C191 337 224 324 245 328C260 329 270 340 268 350L262 349C263 341 256 335 244 334C223 331 191 345 174 331C160 320 152 310 140 322Z",
            "M310 126C339 133 349 155 341 181C335 204 346 217 365 216L365 222C342 223 328 205 335 179C342 158 334 139 310 133Z",
          ].map(d=><path key={d} className={styles.tissueFill} d={d}/>)}
          <path className={styles.fine} opacity=".7" d="M157 217Q148 228 151 241M211 254L215 279M275 246Q265 260 270 277M187 285L192 310M154 292L147 311M289 303Q301 319 284 331" />
          <path className={styles.fine} d="M111 238Q122 227 134 238M168 263Q185 277 198 275M121 278Q131 271 140 283M177 319Q192 332 211 326" />
        </g></g>
        <g {...regionProps("nucleus")}><g className={styles.blue}>
          <path className={styles.tissueFill} d="M180 93C216 68 267 77 297 102C330 129 333 176 306 204C280 233 232 235 192 216C153 197 137 169 146 137C151 116 162 106 180 93Z" />
          <path className={styles.fine} d="M184 100C218 77 263 85 292 110C321 135 323 172 300 198C275 225 234 226 196 208C161 191 147 166 154 140C159 121 169 110 184 100Z" />
          <path className={styles.fine} opacity=".65" d="M169 139C183 109 199 131 211 112S240 98 248 114M167 171C184 155 198 168 197 185S220 211 230 198M271 106C290 118 277 135 295 145S310 170 292 176M243 210C256 190 275 206 287 193M189 153C204 142 210 157 217 147M249 124C232 129 235 146 229 153" />
          <path className={styles.fine} opacity=".45" d="M178 128q9-8 16-2M199 104l8-4M171 189q8 12 19 13M258 205l14-4M287 127q7 3 9 12M201 180q6-9 12-2M225 218l9 1" />
          <ellipse className={styles.wash} cx="256" cy="163" rx="24" ry="22" transform="rotate(-15 256 163)" />
          <path className={styles.fine} d="M243 163q5-17 16-11t5 19q-14 10-17-3M250 161l9 8" />
          {[[177,96,-28],[225,78,0],[292,106,38],[326,154,90],[303,205,-40],[247,230,0],[185,213,32],[145,156,90]].map(([x,y,r])=><path key={x} d={`M${x-3} ${y-4}v8m6-8v8`} transform={`rotate(${r} ${x} ${y})`} stroke="var(--anatomy-blue)" strokeWidth="1.5" />)}
        </g></g>
        <g {...regionProps("lipids")}><g className={styles.amber}>
          {[[408,119,32],[458,128,22],[429,164,19],[383,167,12]].map(([x,y,r])=><g key={x}>
            <circle className={styles.tissueFill} cx={x} cy={y} r={r}/>
            <path className={styles.fine} opacity=".6" d={`M${x-r*.65} ${y-r*.2}Q${x-r*.45} ${y-r*.83} ${x+r*.2} ${y-r*.72}`}/>
            <path className={styles.fine} opacity=".23" d={`M${x+r*.72} ${y-r*.1}Q${x+r*.68} ${y+r*.55} ${x+r*.1} ${y+r*.73}`}/>
          </g>)}
        </g></g>
        <g {...regionProps("lysosome")}><g className={styles.teal}>
          <path className={styles.tissueFill} d="M482 185C497 173 523 180 535 195C548 210 541 233 525 245C507 257 483 247 475 231C465 211 469 196 482 185Z"/>
          <path className={styles.fine} d="M483 192C498 180 520 187 529 198C539 211 534 231 522 240C507 250 488 241 481 228"/>
          {[[493,201],[515,200],[504,218],[522,226],[492,232]].map(([x,y],i)=><g key={x}><path className={styles.wash} d={`M${x-5} ${y-3}q6-6 10 1t-6 7Z`}/><circle className={styles.solid} cx={x} cy={y} r={i%2 ? 1.3:2}/></g>)}
        </g></g>
        <g {...regionProps("mitochondrion")}><g className={styles.amber}>
          <g transform="rotate(-15 401 318)">
            <path className={styles.tissueFill} d="M323 286C351 265 377 288 405 277C440 263 481 281 485 310C490 341 458 359 429 354C399 349 386 370 354 358C321 345 299 309 323 286Z"/>
            <path className={styles.fine} d="M327 292C352 274 376 297 406 285C437 273 474 287 478 312C482 337 457 352 430 346C399 341 385 361 357 351C329 340 307 312 327 292Z"/>
            <path className={styles.outline} d="M337 284C330 297 337 304 351 305S365 316 355 326L347 338M369 288C361 300 373 303 384 308S395 321 384 331L379 354M407 285C397 298 405 309 415 314S425 330 416 348M447 282C436 294 441 302 451 310S461 324 451 336L450 349"/>
            <path className={styles.fine} opacity=".5" d="M342 284C337 294 342 299 354 300S375 315 362 329M411 285C405 296 411 305 420 309S430 329 424 342M443 288q-5 10 8 15"/>
            {[[337,318],[374,321],[404,338],[435,309],[465,320]].map(([x,y])=><circle key={x} className={styles.texture} cx={x} cy={y} r="2"/>)}
          </g>
          <g transform="translate(103 132) rotate(-52) scale(.6)">
            <path className={styles.tissueFill} d="M-28 -16C-11 -35 17 -24 33 -18C57 -10 49 13 29 18C9 20 3 36-19 24C-34 16-42 0-28-16Z"/>
            <path className={styles.fine} d="M-24-13C-10-28 15-18 29-13C48-8 43 8 27 12C7 16 3 29-16 19C-30 10-34 0-24-13Z"/>
            <path className={styles.outline} d="M-17-23q-4 14 6 19t-2 26M5-23Q-3-9 11-4t1 25M27-15q-6 12 5 14t-4 13"/>
          </g>
        </g></g>
        <path className={styles.leader} d="M586 272H603V298M100 232H67L42 267M223 80V34M409 88L429 49H450M428 349L455 415H478M527 194L569 162H598"/>
        {[[586,272],[100,232],[223,80],[409,88],[428,349],[527,194]].map(([x,y])=><circle key={x} className={styles.leaderDot} cx={x} cy={y} r="2.5"/>)}
        <AnatomyPin x={603} y={319} n={1}/><AnatomyPin x={30} y={284} n={2}/><AnatomyPin x={223} y={23} n={3}/><AnatomyPin x={470} y={49} n={4}/><AnatomyPin x={498} y={415} n={5}/><AnatomyPin x={617} y={162} n={6}/>
      </svg>
      <Legend items={d.items}/>
    </div>
    {onSelectBranch && <p className={styles.selection} aria-live="polite">{d.selections[selectedBranch as keyof typeof d.selections] ?? d.other}</p>}
    <figcaption className={styles.caption}>{compact ? d.compactNote : d.note}{!compact && <span className={styles.citations}><StudyCitation referenceId="lin1995_star" locale={locale}/><StudyCitation referenceId="esmaeilian2023_autophagy" locale={locale}/><StudyCitation referenceId="martin2008_camki_nur77" locale={locale}/></span>}</figcaption>
  </figure>;
}
