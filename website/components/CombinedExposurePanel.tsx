import Link from "next/link";

export type CombinedExposureFocus = "model" | "pharmacology" | "materials" | "hormones" | "proxy" | "microbiome" | "measurement";

const COPY = {
  fi: {
    label: "Lääketila · materiaalit · kenttien yhteisvaikutus", link: "Avaa yhteisvaikutusten mekanismit ja tutkimukset",
    model: { title: "Yhteisvaikutus kuuluu samaan BERM-ketjuun", text: "Lääkeaine muuttaa vastaanottotilaa, materiaali voi muuttaa paikallista kenttää ja sen siirtymistä kudokseen. BERM yhdistää nämä vaikutuspaikat tilariippuvaan vasteeseen ja kuljettaa yhteisen biologisen seurauksen eteenpäin kerran.", anchor: "model-composition" },
    pharmacology: { title: "Yhdistelmäehkäisy myös vastaanottotilan muuttujana", text: "Hormonaalinen ehkäisy vaikuttaa suoraan HPG-säätelyyn ja hormonien sitoutumiseen. Estrogeenin kanavavaikutukset, redox-mittaukset ja mikrobiomihavainnot täsmentävät kudos- ja valmistekohtaista tilaa. BERM:ssa tämä tila määrittää myös kenttävasteen ehtoja.", anchor: "contraceptive-state" },
    materials: { title: "Vaate ja istuin ovat osa altistumispaikkaa", text: "Puhelimen paikallinen RF-kenttä, materiaalin varautuminen, lämpö ja kemiallinen kontakti kohtaavat samassa ympäristössä. Niiden reitit kuvataan erikseen: vaate voi olla sekä varautuva rajapinta että laitteen ja kudoksen välissä oleva kerros.", anchor: "material-device" },
    hormones: { title: "Tuotanto, sitoutuminen ja kudosvaste kohtaavat", text: "Hormonaalisen valmisteen vaikutus SHBG:hen ja androgeenituotantoon kulkee hormonin saatavuuden kautta. BERM:n yhteisvaikutusrakenne säilyttää tuotannon, veren pitoisuuden, sitoutumisen ja reseptorivasteen erillisinä vaiheina; sama tuotantomuutos vaikuttaa kokonaisuuteen kerran.", anchor: "hormone-availability" },
    proxy: { title: "Proksi voi sisältää sekä oman vaikutuksen että yhteisvaikutuksen", text: "Ehkäisyn käyttö, istumisaika ja vaatetyyppi kokoavat useita vaikutusreittejä. Niiden oma vaikutus ei tyhjennä selitystä: BERM avaa lisäksi vastaanottotilan, paikallisen kentän ja yhteisen biologisen varannon. Näin osaselityksen alle jäävä yhteys saa oman paikkansa mallissa.", anchor: "proxy-masking" },
    microbiome: { title: "Valmiste ja altistushistoria kuuluvat mikrobiomin yhteyteen", text: "Ehkäisyvalmisteisiin liittyvät mikrobiomihavainnot täsmentävät yhtä vastaanottotilan osaa. Suoliston segmentti, käyttöaika ja koejärjestelmä säilyvät mukana, kun BERM yhdistää ne vagus- ja hormonisignalointiin. Lajiston muutos yksin ei määritä oksitosiinivasteen suuntaa.", anchor: "microbiome-state" },
    measurement: { title: "Lähde ja kudokseen siirtyvä altistus tarvitsevat eri tiedot", text: "Kirjaa laitteen spektri ja teho, materiaalikerrokset ja kosteus sekä rajapinnan varaus ja aikavaihtelu. Jännite, sähkökenttä, SAR ja kemiallinen läpäisevyys kuvaavat eri suureita. Fysikaalinen tietue liittyy BERM:n vastaanotto-operaattoriin oman siirtoreittinsä kautta.", anchor: "material-device" },
  },
  en: {
    label: "Drug state · materials · combined fields", link: "Explore the interaction mechanisms and studies",
    model: { title: "Interactions belong to the same BERM chain", text: "A drug changes receiving state; material can alter a local field and its transfer to tissue. BERM joins these sites of action in a state-conditioned response and propagates each shared biological consequence once.", anchor: "model-composition" },
    pharmacology: { title: "Combined contraception also changes receiving state", text: "Hormonal contraception directly affects HPG regulation and hormone binding. Estrogen channel effects, redox measurements and microbiome observations specify tissue- and formulation-dependent states. In BERM, these states also enter field-response conditions.", anchor: "contraceptive-state" },
    materials: { title: "Clothing and seating form part of the exposure setting", text: "A phone’s local RF field, material charging, heat and chemical contact meet in one setting. Their pathways are recorded separately: fabric can be both a charging interface and a layer between the device and tissue.", anchor: "material-device" },
    hormones: { title: "Production, binding and tissue response meet", text: "Changes in SHBG and androgen production affect hormone availability. BERM’s interaction structure retains production, circulating concentration, binding and receptor response as separate stages; each production change enters the composition once.", anchor: "hormone-availability" },
    proxy: { title: "A proxy can include its own effect and an interaction", text: "Contraceptive use, sitting time and underwear type group several causal pathways. Their own effects leave further explanatory work: BERM also specifies receiving state, local fields and shared biological reserves, locating connections that can remain hidden within a partial explanation.", anchor: "proxy-masking" },
    microbiome: { title: "Formulation and exposure history enter the microbiome context", text: "Contraception-related microbiome findings specify one part of receiving state. Gut segment, duration and experimental system remain attached when BERM connects them to vagal and hormonal signalling. A composition change alone does not specify the direction of an oxytocin response.", anchor: "microbiome-state" },
    measurement: { title: "Source and tissue exposure require different records", text: "Record the device spectrum and power, material layers and moisture, and interface charge and time course. Voltage, electric field, SAR and chemical permeability describe different quantities. The physical record enters BERM’s response operator through a specified transfer pathway.", anchor: "material-device" },
  },
};

export function CombinedExposurePanel({ locale, focus = "model" }: { locale: string; focus?: CombinedExposureFocus }) {
  const d = locale === "fi" ? COPY.fi : COPY.en;
  const c = d[focus];
  return <aside id={`combined-exposures-${focus}`} className="my-8 min-w-0 scroll-mt-28 rounded-xl border border-accent/25 bg-accent/5 p-5 sm:p-7">
    <p className="text-xs font-semibold uppercase tracking-wide text-accent">{d.label}</p>
    <h3 className="mt-3 font-serif text-xl leading-snug sm:text-2xl">{c.title}</h3>
    <p className="mt-3 text-sm leading-7 text-foreground-muted">{c.text}</p>
    <Link href={`/${locale}/evidence/combined-exposures#${c.anchor}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">{d.link} →</Link>
  </aside>;
}
