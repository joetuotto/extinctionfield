/** Spatial editorial illustration. Paths locate objects, never encode a field magnitude. */
export function SourceEnvironmentScene({ id, focus, unresolved, retired }: {
  id: string;
  focus: "grid" | "antenna" | "lighting" | "conversion" | "meter" | "wifi";
  unresolved: boolean;
  retired: boolean;
}) {
  return <>
    <defs>
      <pattern id={`${id}-soil`} width="27" height="21" patternUnits="userSpaceOnUse">
        <path d="M3 13h3m11-8h2m4 12h2" stroke="var(--se-line)" strokeWidth=".7" opacity=".22" />
      </pattern>
      <pattern id={`${id}-section`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <path d="M0 0V7" stroke="var(--se-line)" strokeWidth="1" opacity=".2" />
      </pattern>
    </defs>
    <path d="M0 0H960V420H0Z" fill="var(--se-paper)" />
    <path d="M0 244Q93 198 182 227T363 233Q441 189 521 221T728 209Q835 178 960 219V337H0Z" fill="var(--se-sky)" />
    <path d="M0 280Q140 229 258 273T479 273Q602 211 735 263T960 236V344H0Z" fill="var(--se-hill)" />
    <path d="M0 323Q144 305 310 328T639 330Q817 299 960 317V420H0Z" fill="var(--se-earth)" />
    <path d="M0 348Q244 334 425 348T698 346V420H0Z" fill={`url(#${id}-soil)`} />
    <path d="M643 342Q743 307 960 318V420H698Q664 387 643 342Z" fill="var(--se-water)" />
    <path d="M642 342Q743 307 960 318" fill="none" stroke="var(--se-leaf-line)" strokeWidth="1.2" />
    <g fill="none" stroke="var(--se-water-line)" strokeWidth="1" opacity=".65">
      <path d="M681 353q44-11 91-8m48-11 86-1M713 380q41-9 80-6m65-17h70M758 408q80-11 145-7M875 388l70-3" />
      <path d="M721 360h20m53 29h25m69-47h28M846 407h49" opacity=".45" />
    </g>
    {/* Utility structures use engineering contours; the scene is not a system specification. */}
    <g fill="none" stroke="var(--se-line)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M91 147l-2 175h7l1-175M217 170l-1 152h6l1-152" fill="var(--se-wood)" strokeWidth="1.4" />
      <path d="M68 166h54m-23-16v17m-16-17v17m30-17v17M195 189h51m-35-18v19m19-18v18" strokeWidth="2" />
      <path d="M79 155h8m-8 4h8m-8 4h8m8-8h8m-8 4h8m8-4h8m-8 4h8M207 177h8m-8 4h8m11-4h8m-8 4h8" strokeWidth="1" />
      <path d="M0 149Q43 176 84 162M0 157Q44 185 98 165M98 162Q157 218 212 181M112 162Q163 218 229 182M231 190Q259 222 281 218" strokeWidth="1.25" />
      <path d="M779 324l27-219 30 219m-54-23h51m-47-34h42m-38-38h32m-28-37h23m-18-39h14m-33 148 45-34m-41 0 32-38m-28 0 21-37m-17 0 11-39M783 301l49 23m-46-57 45 34m-41-72 38 38m-34-75 28 37m-24-76 19 39" strokeWidth="1.55" />
      <path d="M805 105V75m-12 29v40m26-40v40" strokeWidth="2" />
      <rect x="789" y="103" width="6" height="40" rx="2" fill="var(--se-hardware)" strokeWidth="1.2" />
      <rect x="816" y="103" width="6" height="40" rx="2" fill="var(--se-hardware)" strokeWidth="1.2" />
      <path d="M777 325h8m44 0h10M805 153v171" strokeWidth="1" />
    </g>
    {/* Sectioned house: outer shell, cut edge, interior and equipment occupy distinct layers. */}
    <g stroke="var(--se-line)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M294 177L423 91 571 177V331H294Z" fill="var(--se-house)" strokeWidth="1.7" />
      <path d="M513 137V103h23v48" fill="var(--se-house)" strokeWidth="1.5" />
      <path d="M510 103h29v5h-29" fill="var(--se-hardware)" strokeWidth="1" />
      <path d="M294 177L423 98 564 180V324H302V181L423 105" fill="var(--se-section)" strokeWidth="1" />
      <path d="M302 181H562V324H302Z" fill="var(--se-interior)" strokeWidth="1.1" />
      <path d="M294 182h8v142h262v7H294Z" fill={`url(#${id}-section)`} strokeWidth=".75" />
      <path d="M286 177L423 85 581 177l-6 6L423 94 291 183Z" fill="var(--se-roof)" strokeWidth="1.2" />
      <path d="M305 177L423 106 554 177ZM423 107v70M367 141v35m112-36v36" fill="none" strokeWidth="1" opacity=".65" />
      <path d="M310 316h243M551 187v135" fill="none" strokeWidth=".8" opacity=".38" />
      <rect x="326" y="193" width="54" height="49" rx="1" fill="var(--se-window)" strokeWidth="1.4" />
      <path d="M330 197h46v40h-46ZM353 197v40m-23-21h46" fill="none" strokeWidth="1" />
      <path d="M321 242h64v4h-64" fill="var(--se-house)" strokeWidth="1" />
      <path d="M332 201l-1 9m32-11-17 36" stroke="var(--se-paper)" strokeWidth="2" opacity=".75" />
      <path d="M467 295h74v5h-74Zm6 5v24h4v-24m57 0v24h4v-24" fill="var(--se-wood)" strokeWidth="1" />
      <path d="M340 324h42l-5 6h-42Z" fill="var(--se-house)" strokeWidth=".8" />
      <rect x="270" y="244" width="24" height="36" rx="2" fill="var(--se-hardware)" strokeWidth="1.25" />
      <rect x="275" y="250" width="14" height="8" rx=".5" fill="var(--se-window)" strokeWidth=".8" />
      <path d="M277 262h2m3 0h2m3 0h1m-11 9h10" fill="none" strokeWidth=".8" />
      <rect x="307" y="265" width="27" height="39" rx="2" fill="var(--se-hardware)" strokeWidth="1.25" />
      <path d="M312 277h17m-17 4h17m-17 4h17m-17 4h17M320 305v9h25" fill="none" strokeWidth=".85" />
      <circle cx="327" cy="270" r="1" fill="var(--se-line)" stroke="none" />
      <path d="M358 181v23m-13 14 13-14 14 14Z" fill="var(--se-lamp)" strokeWidth="1.3" />
      <ellipse cx="358" cy="219" rx="13" ry="2.5" fill="var(--se-paper)" strokeWidth="1" />
      <path d="M355 223q3 4 6 0" fill="none" strokeWidth="1" />
      <path d="M488 278h33v9h-33Z" fill="var(--se-hardware)" strokeWidth="1.2" />
      <path d="M493 278v-15m23 15v-15" fill="none" strokeWidth="1.5" />
      <path d="M493 282h1m4 0h1m4 0h1m4 0h1m4 0h1" fill="none" strokeWidth="1" />
    </g>
    {/* Silhouettes retain anatomy without suggesting a tissue-level measurement. */}
    <g stroke="var(--se-line)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M432 252l-1 9 12 2 1-13" fill="var(--se-skin)" strokeWidth="1" />
      <path d="M426 235c0-9 17-13 22-3l1 7 3 4-4 2c0 7-5 11-11 9l-8-5Z" fill="var(--se-skin)" strokeWidth="1.15" />
      <path d="M427 242c-5-6-4-15 3-18 7-5 16-1 18 5l-9 1-7 6v7" fill="var(--se-roof)" strokeWidth=".9" />
      <path d="M429 259l-11 7-10 22 5 3 13-18-2 21h26l-4-21 13 14 5-4-12-19-10-5Z" fill="var(--se-person)" strokeWidth="1.3" />
      <path d="M425 294l-2 27h7l9-23 7 23h8l-5-27Z" fill="var(--se-trousers)" strokeWidth="1.1" />
      <path d="M422 321l-4 4h12v-4m16 0v4h13l-5-4" fill="var(--se-roof)" strokeWidth=".9" />
      <path d="M408 288l-3 7q2 3 5-1l3-3m47-5 3 6q4 3 5-1l-4-8" fill="var(--se-skin)" strokeWidth=".8" />
      <path d="M428 267l3 19m14-20-2 16" fill="none" strokeWidth=".7" opacity=".55" />
    </g>
    <g stroke="var(--se-leaf-line)" strokeLinecap="round" strokeLinejoin="round">
      <path d="M617 327l1-103h5l5 103Z" fill="var(--se-wood)" strokeWidth="1.2" />
      <path d="M621 263l-20-23m22 10 20-25m-22 1-7-18" fill="none" strokeWidth="2" />
      <path d="M589 257c-15 1-20-15-14-24-13-14-2-34 12-34-1-17 17-29 30-22 11-10 31-4 33 11 22 0 30 19 20 32 14 14 7 32-12 32-9 17-27 15-34 8-14 10-25 7-35-3Z" fill="var(--se-leaf)" strokeWidth="1.15" />
      <path d="M585 216q6-11 15-7m0-22q15-4 19 7m10-1q14-2 15 10m7 24q11 6 6 16m-51-11q-9 11-17 8m27 8q12 8 19-1m-18-26q9-8 17-1" fill="none" strokeWidth=".75" opacity=".65" />
      <path d="M679 336l-3-27m6 27 5-36m0 30 9-18m28 13 1-26m7 25 8-33m-6 33 13-17" fill="none" strokeWidth="1.4" />
      <path d="M687 300v-7m38 6v-8m15 1 2-8" strokeWidth="3.5" />
      <path d="M70 329l4-9 3 7m88-4 3-7 3 5m393 13 4-9 4 7m182-5 4-9 3 8" fill="none" strokeWidth=".8" />
    </g>
    <g stroke="var(--se-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".85">
      <path d="M640 198q4-10 13-7c4-10 15-5 15 2l8 3-10 3q-7 13-23 7l-13 2 9-8Z" fill="var(--se-bird)" />
      <path d="M642 198q11-4 20 2l-12 4Zm5 9-2 7m9-6v6m-13 0h7m3 0h7" fill="none" />
      <circle cx="663" cy="191" r="1.2" fill="var(--se-line)" stroke="none" />
      <path d="M802 373l-13-12v24l13-9c18 15 42 10 57-4-21-17-41-15-57 1Z" fill="var(--se-fish)" />
      <path d="M818 362l8-10 11 11m-14 21 8 9 6-12m-5-13-9 8m24-11q-6 9 0 14M806 374q19-4 35-1" fill="none" />
      <circle cx="850" cy="369" r="1.3" fill="var(--se-line)" stroke="none" />
      <path d="M900 337v42m-8-42h16M653 407q70-2 109 4t198-4" fill="none" strokeDasharray="5 5" strokeWidth="1.2" opacity=".6" />
    </g>
    <g fill="none" stroke="var(--se-accent)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={unresolved ? "5 6" : undefined} opacity={retired ? .45 : 1} data-source-route={focus}>
      {focus === "grid" && <><path d="M98 162Q157 218 212 181l69 37v26m8 36v28h37v-17m-6 0v11h-36v-22" /><path d="M337 288h59" strokeDasharray="3 6" /></>}
      {focus === "antenna" && <><rect x="789" y="103" width="6" height="40" rx="2"/><rect x="816" y="103" width="6" height="40" rx="2"/><path d="M779 153l-295 83m15-13-15 13 20 1" strokeDasharray="4 7"/></>}
      {focus === "lighting" && <><path d="M358 181v23m-13 14 13-14 14 14Z"/><path d="M358 229l62 42" strokeDasharray="4 7"/><path d="M363 229l14 39m-24-39-16 39" stroke="var(--se-amber)" strokeWidth="1.25"/></>}
      {focus === "conversion" && <><rect x="307" y="265" width="27" height="39" rx="2"/><path d="M336 280h34l43 14" strokeDasharray="4 7"/></>}
      {focus === "meter" && <><rect x="270" y="244" width="24" height="36" rx="2"/><path d="M281 244v-26l-61-32m74 75h53l60 23" strokeDasharray="4 7"/></>}
      {focus === "wifi" && <><path d="M488 278h33v9h-33Zm5 0v-15m23 15v-15"/><path d="M482 277l-24-16" strokeDasharray="4 5"/></>}
    </g>
    <path d="M30 334H596" stroke="var(--se-line)" strokeWidth=".85" opacity=".45" />
  </>;
}
