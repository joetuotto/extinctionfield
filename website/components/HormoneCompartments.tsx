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
    sum: "Total T includes all three forms shown here. The symbols illustrate forms, not their proportions.",
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
    sum: "Kokonais-T sisältää kuvan kaikki kolme muotoa. Symbolit havainnollistavat muotoja, eivät niiden osuuksia.",
    tissueText: "Saatavuus, reseptoritoiminta ja signaalin käyttö ovat eri vaiheita. Myös kiveksen paikallinen ympäristö eroaa näytteenottopaikan verenkierrosta.",
    table: "Mitä kukin havainto kuvaa",
    rows: [{ label: "Kokonais-testosteroni", text: "Muotojen yhteispitoisuus verinäytteessä; ei suora reseptoritoiminnan mittaus." }, { label: "Vapaa testosteroni", text: "Sitoutumaton osuus, joka mitataan tai arvioidaan ilmoitetulla menetelmällä ja sitoutumisoletuksilla." }, { label: "Kudosvaste", text: "Erillinen toiminnallinen tulos. Sitä ei voi lukea suoraan kummastakaan veren pitoisuudesta yksin." }],
    note: "Havainnollistava kompartimenttikartta, ei diagnostinen vertailu. BERM:n saatavuus–vaste-sulku säilyy erillään mitatuista hormoniarvoista; muuttumaton kokonais-T ei yksin osoita muuttumatonta kudosvaikutusta eikä piilevää haittaa.",
  },
};

function Molecule({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g className={anatomy.amber} transform={`translate(${x} ${y}) scale(${scale})`}><path className={anatomy.outline} d="M-15 -5L-8 -9L-1 -5V3L-8 7L-15 3ZM-1 -5L6 -9L13 -5V3L6 7L-1 3M13 -5L20 -9L27 -5V3L20 7L13 3M27 -5L35 -8L40 -1L35 6L27 3" /></g>;
}

export function HormoneCompartments({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  return <figure className={anatomy.figure} aria-label={d.title} data-anatomy="hormone-compartments">
    <p className={anatomy.eyebrow}>{d.eyebrow}</p><h3 className={anatomy.title}>{d.title}</h3><p className={anatomy.lead}>{d.lead}</p>
    <div className={styles.grid}>
      <div><h4 className={styles.heading}>{d.blood}</h4>
        <svg className={anatomy.drawing} viewBox="0 0 480 255" role="img" aria-label={d.bloodAlt}>
          <g className={anatomy.blue}><path className={anatomy.wash} d="M20 50C148 29 310 71 460 44V207C315 231 151 189 20 211Z"/><path className={anatomy.outline} d="M20 50C148 29 310 71 460 44M20 211C151 189 315 231 460 207"/>{[0,1,2,3,4,5,6].map(i=><g key={i}><ellipse className={anatomy.solid} cx={44+i*64} cy={47+Math.sin(i-1)*6} rx="12" ry="3"/><ellipse className={anatomy.solid} cx={44+i*64} cy={211-Math.sin(i)*8} rx="12" ry="3"/></g>)}</g>
          <Molecule x={75} y={121} scale={1.05}/>
          <g className={anatomy.blue} transform="translate(234 126)"><path className={anatomy.wash} d="M-46 -18C-51 -44 -19 -57 1 -36C22 -62 49 -38 47 -16C68 0 44 28 19 16C2 42 -29 37 -35 19C-59 23 -64 -5 -46 -18Z"/><path className={anatomy.fine} d="M-32 -22Q-18 -38 -6 -17T20 -21T35 -6M-36 5Q-14 -9 -11 15M11 4Q27 -7 40 5"/></g>
          <Molecule x={228} y={128} scale={.8}/>
          <g className={anatomy.teal} transform="translate(380 130)"><path className={anatomy.wash} d="M-38 -35C-14 -55 5 -31 25 -35C54 -39 66 -13 42 6C49 28 17 44 -3 30C-26 41 -54 23 -42 6C-61 -10 -52 -26 -38 -35Z"/><path className={anatomy.fine} d="M-32 -26Q-8 -39 1 -15T32 -18M-38 -1Q-12 -10 -15 9T13 21M15 -7Q35 -11 39 4"/></g>
          <Molecule x={367} y={140} scale={.75}/>
          <path className={anatomy.leader} d="M88 143V174M237 163V188M383 98V76"/><AnatomyPin x={88} y={184} n={1}/><AnatomyPin x={237} y={196} n={2}/><AnatomyPin x={383} y={65} n={3}/>
        </svg>
        <dl className={styles.forms}>{d.forms.map(form=><div key={form.title}><dt>{form.title}</dt><dd>{form.text}</dd></div>)}</dl><p className={styles.sum}>{d.sum}</p>
      </div>
      <div><h4 className={styles.heading}>{d.tissue}</h4>
        <svg className={anatomy.drawing} viewBox="0 0 320 255" role="img" aria-label={d.tissueAlt}>
          <g className={anatomy.teal}><path className={anatomy.wash} d="M96 35C145 13 209 27 253 55C292 79 303 141 273 187C247 229 182 240 123 222C73 208 48 173 51 128C51 95 64 51 96 35Z"/><path className={anatomy.fine} d="M101 42C147 21 208 36 248 62C283 87 293 140 266 183C241 221 181 230 126 215C82 202 57 171 59 129C59 98 71 57 101 42Z"/></g>
          <g className={anatomy.blue}><ellipse className={anatomy.wash} cx="201" cy="152" rx="55" ry="45" transform="rotate(-15 201 152)"/><ellipse className={anatomy.fine} cx="201" cy="152" rx="49" ry="39" transform="rotate(-15 201 152)"/><circle className={anatomy.solid} cx="214" cy="151" r="12" opacity=".5"/><path className={anatomy.fine} d="M172 148Q184 130 200 140M173 161Q191 179 216 164"/><path className={anatomy.wash} d="M97 118Q81 110 89 94Q95 83 108 94L111 107L124 103Q133 114 123 123Q106 139 97 118Z"/><path className={anatomy.wash} d="M104 166Q93 153 105 144L116 143L124 155L136 151Q150 165 136 177Q121 186 104 166Z"/></g>
          <Molecule x={22} y={90} scale={.65}/><Molecule x={108} y={106} scale={.55}/><Molecule x={121} y={158} scale={.55}/>
        </svg>
        <p className={styles.text}>{d.tissueText}</p>
      </div>
    </div>
    <table className={styles.table}><caption>{d.table}</caption><tbody>{d.rows.map(row=><tr key={row.label}><th scope="row">{row.label}</th><td>{row.text}</td></tr>)}</tbody></table>
    <figcaption className={anatomy.caption}>{d.note}<span className={anatomy.citations}><StudyCitation referenceId="narinx2022_free_testosterone" locale={locale}/><StudyCitation referenceId="degendt2004_sertoli_ar" locale={locale}/></span></figcaption>
  </figure>;
}
