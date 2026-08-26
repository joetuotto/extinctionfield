import type { Metadata } from "next";
import Link from "next/link";
import { TreePine } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BermIcon } from "@/components/BermIcon";
import { CitationLink } from "@/components/CitationLink";

const COPY = {
  en: {
    title: "Ecological & Sentinel Evidence",
    subtitle: "Electroecology and weather radar effects on sentinel species",
    backLink: "← Back to Evidence",
    narratives: [
      {
        id: "electroecology",
        title: "Electroecology: the emerging science of electric pollution",
        paragraphs: [
          "Aerial electroreception — the ability to detect airborne electric fields — has emerged as a recognized sensory modality in arthropods (Robert 2024, Current Biology). Bees detect floral electric fields to optimize foraging (Clarke 2013, Science). Their mechanosensory hairs physically bend in electric fields, transmitting neural signals (Sutton 2016, PNAS). Bees communicate within the hive using electrostatic signals during the waggle dance, with individual bee charge reaching 450 V (Greggers 2013, Proc R Soc B). Spiders detect atmospheric electric fields for ballooning (Morley & Robert 2018, Current Biology). Caterpillars detect approaching wasps electrically before contact (England & Robert 2024, PNAS). Ticks are passively attracted to hosts across air gaps by electrostatic forces (England 2023, Current Biology).",
          "Electrostatic charging is not a passive byproduct of flight. A 2024 study of 269 butterflies and moths across 11 species showed that the amount of static charge varies systematically with ecology — whether the species visits flowers, is tropical, or flies at night (England & Robert 2024, J R Soc Interface). This is the first evidence that electrostatic properties are adaptive traits shaped by natural selection. If evolution has optimized organisms’ electrostatic properties, a changed electrostatic environment (synthetic materials, plastic surfaces, electrical devices) disrupts that optimization — the same logic as BERM’s evolutionary calibration principle applied to the STATIC channel.",
          "In field experiments in urban meadows, Mallinson et al. (2025, iScience) demonstrated that weak anthropogenic electric fields reduce honeybee floral landings by 71% (AC fields) and 53% (positive DC fields). Electric field measurements near high-voltage transmission lines revealed persistent field strengths comparable to those used experimentally, spanning tens of meters at heights relevant for bee foraging. The authors use the term ‘electric pollution’ — the first use of this term in a Cell Press journal.",
          "These findings provide the empirical foundation for BERM’s STATIC and ELF channels. If anthropogenic electric fields reduce pollinator efficiency by 71%, every new power line, transformer, and electric device reduces pollination. Combined with LED lighting’s IF emissions (which affect insect populations through a separate mechanism), the electromagnetic environment exerts a double pressure on pollinator-dependent ecosystems. This is consistent with the global pollinator decline documented by IPBES and the FAO.",
        ],
        studies: [
          { citation: "Clarke et al. (Science)", year: 2013, note: "Bees detect floral electric fields — first terrestrial electroreception" },
          { citation: "Greggers et al. (Proc R Soc B)", year: 2013, note: "Bee electric communication in hive, charge up to 450 V" },
          { citation: "Sutton et al. (PNAS)", year: 2016, note: "Mechanosensory hairs = electroreceptors in bumblebees" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, note: "Spiders detect E-fields for ballooning dispersal" },
          { citation: "England et al. (Current Biology)", year: 2023, note: "Ticks attracted electrostatically across air gaps" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, note: "Butterfly electrostatic charge is adaptive (natural selection)" },
          { citation: "England & Robert (PNAS)", year: 2024, note: "Caterpillars detect predators electrically before contact" },
          { citation: "Robert (Current Biology)", year: 2024, note: "Aerial electroreception formalized as sensory modality" },
          { citation: "Mallinson et al. (iScience / Cell Press)", year: 2025, note: "Field experiment: AC fields −71% bee landings, term ‘electric pollution’" },
        ],
      },
      {
        id: "weather-radar",
        title: "Weather radar networks and sentinel species",
        paragraphs: [
          "Weather surveillance radars are among the most powerful EMF sources in the environment. NEXRAD (USA, 159 stations) and equivalent European networks operate at S-band (2.7–3.0 GHz — nearly identical to Wi-Fi) or C-band (5.6 GHz), transmitting 250 kW to 1 MW peak power in rotating beams that sweep the entire landscape 24/7. Protected nature reserves are not shielded from radar signals.",
          "The temporal coincidence with insect decline is notable: NEXRAD deployment began in 1988 and was complete by 1997. Hallmann’s insect biomass data begins in 1989 — one year after the first NEXRAD installations. European Doppler radar networks were built on a similar timeline. The S-band frequency (2.8 GHz, λ/2 ≈ 5.4 cm) matches the body size of large flying insects, producing resonant absorption (Thielens 2018).",
          "Nicholls & Racey (2007, PLOS ONE) demonstrated that bat activity was significantly reduced near radar installations at field strengths above 2 V/m. In a follow-up study (2009), a portable radar reduced foraging bat activity, suggesting EMF rather than noise or visual cues was responsible.",
          "Weather radar data is now widely used to monitor insect populations. These studies use the radar to measure insect density but do not consider whether the radar itself affects the insects being measured — a methodological blind spot that BERM identifies as a critical research gap. The 2024 German analysis (Archiv für Naturschutz und Landschaftsforschung) reanalyzed Hallmann-type data with proximity to mobile base stations and weather radar as covariates — both predicted insect decline independently of pesticide load and land use. This is proxy masking in action: conventional analyses attribute declines to pesticides and climate because they never include EMF as a covariate. BERM predicts that when EMF proximity is added, the variance explained by conventional variables will decrease.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, note: "Bat activity reduced near radar (>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, note: "Portable radar reduced foraging bat activity" },
          { citation: "Hallmann et al.", year: 2017, note: "76% insect biomass decline, protected areas, 1989–2016" },
          { citation: "Thielens et al.", year: 2018, note: "Insect RF absorption at 2–120 GHz, resonance effects" },
          { citation: "UK weather radar insect study", year: 2025, note: "Radar used to TRACK insects, not test radar effects" },
          { citation: "NEXRAD insect density study", year: 2025, note: "140 radars track US insects — radar impact not considered" },
        ],
      },
    ],
    seeAlso: "See also",
    evidencePortal: "Evidence register →",
  },
  fi: {
    title: "Ekologinen ja sentinellievidenssi",
    subtitle: "Sähköekologia ja säätutkavaikutukset indikaattorilajeihin",
    backLink: "← Takaisin evidenssiin",
    narratives: [
      {
        id: "electroecology",
        title: "Sähköekologia: sähkösaasteen tutkimus",
        paragraphs: [
          "Ilman sähkökentän havaitseminen (aerial electroreception) on tunnistettu omana aistimodaalisuutenaan niveljalkaisilla (Robert 2024, Current Biology). Mehiläiset havaitsevat kukkien sähkökentät ravinnonhaun optimoimiseksi (Clarke 2013, Science). Niiden mekanosensoriset karvat taipuvat fyysisesti sähkökentässä ja välittävät hermosignaaleja (Sutton 2016, PNAS). Mehiläiset viestivät pesässä sähköstaattisilla signaaleilla heiluritanssin aikana, yksittäisen mehiläisen varauksen ollessa jopa 450 V (Greggers 2013, Proc R Soc B). Hämähäkit havaitsevat ilmakehän sähkökenttiä lentämistä (ballooning) varten (Morley & Robert 2018, Current Biology). Toukat havaitsevat lähestyvän ampiaisen sähköisesti ennen kontaktia (England & Robert 2024, PNAS). Punkkeja vedetään isäntiin ilmarakojen yli sähköstaattisilla voimilla (England 2023, Current Biology).",
          "Sähköstaattinen varautuminen ei ole lennon passiivinen sivutuote. Vuoden 2024 tutkimus 269 perhosesta ja yöperhosesta 11 lajin poikki osoitti, että staattisen varauksen määrä vaihtelee systemaattisesti ekologian mukaan — vieraileeko laji kukilla, onko se trooppinen vai lentääkö se yöllä (England & Robert 2024, J R Soc Interface). Tämä on ensimmäinen todiste siitä, että sähköstaattiset ominaisuudet ovat adaptiivisia piirteitä, joita luonnonvalinta on muokannut. Jos evoluutio on optimoinut eliöiden sähköstaattisia ominaisuuksia, muuttunut sähköstaattinen ympäristö (synteettiset materiaalit, muovipinnat, sähkölaitteet) häiritsee tätä optimointia — sama logiikka kuin BERM:n evolutionäärinen kalibraatioperiaate STATIC-kanavassa.",
          "Kenttäkokeissa kaupunkiniityillä Mallinson ym. (2025, iScience) osoittivat, että heikot ihmisperäiset sähkökentät vähensivät mehiläisten kukille laskeutumista 71 % (AC-kentät) ja 53 % (positiiviset DC-kentät). Suurjännitevoimalinjojen lähellä mitatut kenttävoimakkuudet olivat verrattavissa kokeellisiin, ulottuen kymmenien metrien etäisyydelle mehiläisten ravinnonhakukorkeudella. Tekijät käyttävät termiä ‘electric pollution’ (sähkösaaste) — ensimmäinen kerta kun tätä termiä käytetään Cell Press -lehdessä.",
          "Nämä löydökset tarjoavat empiirisen perustan BERM:n STATIC- ja ELF-kanaville. Jos ihmisperäiset sähkökentät vähentävät pölyttäjien tehokkuutta 71 %, jokainen uusi voimalinja, muuntaja ja sähkölaite vähentää pölytystä. Yhdistettynä LED-valaistuksen IF-emissioihin (jotka vaikuttavat hyönteispopulaatioihin eri mekanismilla), sähkömagneettinen ympäristö kohdistaa kaksinkertaisen paineen pölyttäjäriippuvaisiin ekosysteemeihin. Tämä on yhdenmukaista IPBES:n ja FAO:n dokumentoiman globaalin pölyttäjäkadon kanssa.",
        ],
        studies: [
          { citation: "Clarke ym. (Science)", year: 2013, note: "Mehiläiset havaitsevat kukkien sähkökentät — ensimmäinen maaeläimen sähköreseptio" },
          { citation: "Greggers ym. (Proc R Soc B)", year: 2013, note: "Mehiläisten sähköinen viestintä pesässä, varaus 450 V" },
          { citation: "Sutton ym. (PNAS)", year: 2016, note: "Mekanosensoriset karvat = sähköreseptorit kimalaisilla" },
          { citation: "Morley & Robert (Current Biology)", year: 2018, note: "Hämähäkit havaitsevat sähkökenttiä lentämistä varten" },
          { citation: "England ym. (Current Biology)", year: 2023, note: "Punkit kulkeutuvat sähköstaattisesti ilmarakojen yli" },
          { citation: "England & Robert (J R Soc Interface)", year: 2024, note: "Perhosten sähkövaraus adaptiivinen (luonnonvalinta)" },
          { citation: "England & Robert (PNAS)", year: 2024, note: "Toukat havaitsevat saalistajan sähköisesti ennen kontaktia" },
          { citation: "Robert (Current Biology)", year: 2024, note: "Ilman sähköreseptio virallistettu aistimodaalisuutena" },
          { citation: "Mallinson ym. (iScience / Cell Press)", year: 2025, note: "Kenttäkoe: AC-kentät −71 % mehiläislaskeutumisia, termi ‘electric pollution’" },
        ],
      },
      {
        id: "weather-radar",
        title: "Säätutkäverkostot ja indikaattorilajit",
        paragraphs: [
          "Säävalvontatutkat ovat ympäristön voimakkaimpia EMF-lähteitä. NEXRAD (USA, 159 asemaa) ja vastaavat eurooppalaiset verkostot toimivat S-kaistalla (2,7–3,0 GHz — lähes identtinen Wi-Fi:n kanssa) tai C-kaistalla (5,6 GHz), lähettäen 250 kW – 1 MW huipputehoa pyörivissä keiloissa jotka pyyhkäisevät koko maiseman 24/7. Luonnonsuojelualueet eivät ole suojattuja tutkasignaaleilta.",
          "Ajallinen yhteensattuma hyönteiskadon kanssa on huomattava: NEXRAD-asennus alkoi 1988 ja valmistui 1997. Hallmannin hyönteisbiomassadata alkaa 1989 — vuosi ensimmäisten NEXRAD-asennusten jälkeen. Eurooppalaiset Doppler-tutkaverkostot rakennettiin vastaavalla aikataululla. S-kaistan taajuus (2,8 GHz, λ/2 ≈ 5,4 cm) vastaa suurten lentävien hyönteisten kehon kokoa, tuottaen resonanssityyppistä absorptiota (Thielens 2018).",
          "Nicholls & Racey (2007, PLOS ONE) osoittivat, että lepakkoaktiivisuus laski merkittävästi tutka-asemien lähellä kenttävoimakkuuksilla yli 2 V/m. Jatkotutkimuksessa (2009) kannettava tutka vähensi saalistavien lepakoiden aktiivisuutta, viitaten siihen, että EMF eikä melu tai visuaaliset vihjeet oli vastuussa.",
          "Säätutkadataa käytetään nykyisin laajasti hyönteispopulaatioiden seuraamiseen. Nämä tutkimukset käyttävät tutkaa hyönteistiheyden mittaamiseen mutta eivät harkitse, vaikuttaako tutka itse mitattaviin hyönteisiin — metodologinen sokea piste, jonka BERM tunnistaa kriittiseksi tutkimusaukoksi. Vuoden 2024 saksalaisanalyysi (Archiv für Naturschutz und Landschaftsforschung) analysoi uudelleen Hallmann-tyyppistä dataa matkapuhelintukiasemien ja säätutkien läheisyydellä kovariaatteina — molemmat ennustivat hyönteiskatoa riippumatta torjunta-ainekuormasta ja maankäytöstä. Tämä on proksimaskausta käytännössä: tavanomaiset analyysit yhdistävät laskut torjunta-aineisiin ja ilmastolle, koska ne eivät koskaan sisällytä EMF:ää kovariaatiksi. BERM ennustaa, että kun EMF-läheisyys lisätään, tavanomaisten muuttujien selittämä varianssi laskee.",
        ],
        studies: [
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2007, note: "Lepakkoaktiivisuus laski tutkan lähellä (>2 V/m)" },
          { citation: "Nicholls & Racey (PLOS ONE)", year: 2009, note: "Kannettava tutka vähensi saalistavien lepakoiden aktiivisuutta" },
          { citation: "Hallmann ym.", year: 2017, note: "76 %:n hyönteisbiomassalasku, suojelualueet, 1989–2016" },
          { citation: "Thielens ym.", year: 2018, note: "Hyönteisten RF-absorptio 2–120 GHz, resonanssivaikutuksia" },
          { citation: "UK:n säätutkahyönteistutkimus", year: 2025, note: "Tutkaa käytetty hyönteisten SEURAAMISEEN, ei vaikutusten testaamiseen" },
          { citation: "NEXRAD-hyönteistiheystutkimus", year: 2025, note: "140 tutkaa seuraa USA:n hyönteisiä — tutkan vaikutusta ei huomioitu" },
        ],
      },
    ],
    seeAlso: "Katso myös",
    evidencePortal: "Evidenssirekisteri →",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = locale === "fi" ? COPY.fi : COPY.en;
  return {
    title: `${d.title} – Extinction Field`,
    description: d.subtitle,
  };
}

export default async function EcologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFi = locale === "fi";
  const d = isFi ? COPY.fi : COPY.en;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/evidence`}
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        {d.backLink}
      </Link>

      <PageHeader icon={TreePine} title={d.title} subtitle={d.subtitle} lensIcon={<BermIcon name="ecology" size={28} className="text-accent" />} />

      {/* Narratives */}
      <section className="mb-16 border-t editorial-rule pt-6">
        <div className="space-y-12 max-w-4xl">
          {d.narratives.map((narrative, ni) => (
            <article key={narrative.id} id={`narrative-${narrative.id}`} className="scroll-mt-24">
              {narrative.id === "electroecology" && <><span id="static-interface" /><span id="ticks" /></>}
              <h3 className="text-lg font-semibold mb-4">
                <span className="font-mono-num text-xs text-accent mr-2">0{ni + 1}</span>
                {narrative.title}
              </h3>
              {narrative.paragraphs.length > 0 && (
                <p className="editorial-rail mb-4 text-[0.95rem] leading-relaxed text-foreground">
                  {narrative.paragraphs[0]}
                </p>
              )}
              <div className="space-y-3 text-sm text-foreground-muted leading-relaxed mb-5">
                {narrative.paragraphs.slice(1).map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                      <th className="py-2 pr-3">{isFi ? "Viite" : "Citation"}</th>
                      <th className="py-2 pr-3 w-16">{isFi ? "Vuosi" : "Year"}</th>
                      <th className="py-2">{isFi ? "Huomio" : "Note"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {narrative.studies.map((s) => (
                      <tr key={`${s.citation}-${s.year}`} className="border-b border-card-border/40">
                        <td className="py-2 pr-3 font-medium text-foreground"><CitationLink citation={s.citation} year={s.year} /></td>
                        <td className="py-2 pr-3 font-mono-num text-foreground-muted">{s.year}</td>
                        <td className="py-2 text-foreground-muted">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* See also */}
      <section className="border-t editorial-rule pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-3">
          {d.seeAlso}
        </h3>
        <Link
          href={`/${locale}/evidence`}
          className="text-sm text-accent hover:underline"
        >
          {d.evidencePortal}
        </Link>
      </section>
    </div>
  );
}
