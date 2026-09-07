import { StudyCitation } from "@/components/StudyCitation";
import { InlineReferenceText } from "@/components/InlineReferenceText";

const COPY = {
  en: {
    refsTitle: "References",
    sections: [
      [
        "[[ref:favre_johansson_2025|Favre and Johansson 2025]] reported changes in honeybee colonies in a shielded-hive experiment. Its interpretation requires the actual shielding transfer, field spectrum, ventilation and colony conditions: a Faraday enclosure does not by its name establish removal of every magnetic field.",
        "The reported comparison with an added 7.83 Hz signal motivates a replication with independently measured fields and matched hive conditions. It does not establish a universal Schumann-frequency survival requirement.",
        "The useful question is which local field and receiving state change colony function.",
      ],
      [
        "To understand why this matters, you need to know about a mite.",
        "Varroa destructor is a parasitic mite roughly the size of a pinhead that attaches to honeybees, punctures their exoskeleton, and feeds on their fat body and hemolymph. It also injects viruses — most devastatingly, Deformed Wing Virus — that cripple the colony’s next generation. Since jumping from Asian honeybees to European honeybees in the 1950s, Varroa has become the single greatest threat to managed bee populations worldwide.",
        "Asian honeybees (Apis cerana) coexist with Varroa because they evolved together. They have two critical defenses: hygienic behavior (detecting and removing parasitized brood) and grooming (physically biting and removing mites from nestmates). European honeybees (Apis mellifera) have these behaviors too, but they’re weaker — the bees often fail to detect the mite, or fail to remove it effectively.",
        "Here’s the question nobody has asked: what if the bees’ defense systems are being externally suppressed?",
      ],
      [
        "In 2023, [[ref:england_2023_ticks|a team of researchers published a striking finding in Current Biology]]. They demonstrated that ticks — close relatives of Varroa — are passively attracted to their hosts by static electricity. The electrostatic charge that builds up on a moving animal’s body literally pulls the parasite through the air gap onto the host, even across distances of several millimeters. The researchers explicitly noted that this mechanism likely applies to Varroa as well.",
        "[[ref:colin_1992_varroa_charge|A separate study]] had already shown that Varroa mites become more active — more agitated, more mobile — in the presence of electric fields, even fields too weak to physically lift them. The mites don’t need to be launched onto their host. They just need to be activated — primed to grab on when a charged bee brushes past.",
        "Now consider this: honeybees carry a positive electrostatic charge that they accumulate during flight. The charge is essential — it helps pollen grains jump from flowers onto the bee’s body. [[ref:clarke2013_bee_electroreception|Bees can even sense the electric fields of flowers and use them to determine whether a flower has recently been visited]]. Electricity is woven into the fabric of honeybee biology.",
        "But what happens when the electromagnetic environment changes?",
      ],
      [
        "Natural electromagnetic environments include static, atmospheric and optical inputs with different spectra and time courses. BERM asks which receiving systems evolved or developed under those inputs, and which measured modern changes perturb the same functions. A source’s natural or artificial origin does not by itself determine the response.",
        "Today, a typical beehive sits in an environment saturated with electromagnetic fields that did not exist a century ago: cellular base stations (700 MHz–6 GHz), Wi-Fi routers (2.4/5 GHz), power lines (50/60 Hz), LED street and agricultural lighting (20–200 kHz switch-mode harmonics), smart meters, and in some locations, weather radar.",
        "Research has documented what these fields do to bees. A [[ref:shepherd_2023_pollination|2023 study published in Science Advances]] showed that electromagnetic fields disrupt honeybees’ pollination behavior by altering the magnetic maps used during foraging flights and producing a magnetoreception disorder.",
        "A [[ref:plos_one_2023_bee_900mhz|2023 PLOS ONE study]] showed that 900 MHz exposure induced measurable changes in stress-related enzymes and gene expression in honeybees — the organism diverts resources from normal function to emergency stress response. A [[ref:wyszkowska_2025_bee_behavior|2025 study]] documented that 50 Hz electric fields reduce self-grooming behavior in bees. And multiple studies show that EMF exposure reduces queen laying rates and brood viability.",
        "Each of these effects, individually, weakens the colony. But the critical insight is what they do in combination with Varroa.",
      ],
      [
        "Honeybees fight Varroa through two main behaviors: hygienic behavior (detecting infected brood by smell and removing it) and grooming (physically removing mites from nestmates). Both depend on the bee’s sensory capabilities — particularly olfaction — and on coordinated social behavior within the colony.",
        "The component experiments motivate testing how sensory and motor function alter defense under a defined local field.",
        "A colony model follows landing and foraging → returned food → energy available for repair, immunity and queen production. Grooming and brood detection enter parasite removal separately. A change in one intermediate signal need not impair all these functions, so each flow is measured rather than assigned the same damage coefficient.",
        "Varroa needs its own receiving and fitness model.",
        "A rigid cuticle and small size do not establish electromagnetic immunity. Varroa’s chemical feeding mechanisms ([[ref:varroa_chitinase_2020|salivary chitinase study]]) and its reported electrical responses must be carried as separate processes. Measure host finding, attachment, feeding, survival and reproduction under the same local field used for the host.",
        "An ecological asymmetry is a difference between measured host and parasite functions.",
        "BERM combines encounters and population feedback explicitly: encounters_ij=Δt·k_ij·m_ij(state)·n_i·n_j. The modifier can depend on both organisms, field geometry, flowering and compensation by other species. Signed effects on each population then combine with births and deaths. Host decline can also reduce parasite recruitment; an unchecked one-way ratchet is not assumed.",
        "A colony can approach a threshold when food and worker renewal fall below losses from parasites, viruses and other stressors. The conditional field contribution is tested through those intermediate flows. That provides a mechanism for amplification without identifying every colony collapse as field-caused.",
        "In May 2025, researchers from the same Bristol group that [[ref:clarke2013_bee_electroreception|discovered bee electroreception]] published a field experiment showing that weak anthropogenic electric fields — comparable to those near power lines — reduce honeybee floral landings by 71% ([[ref:mallinson2025_electric_pollution|Mallinson et al., iScience / Cell Press]]). The electromagnetic environment doesn’t just weaken the bees’ defenses against Varroa. It also disrupts their ability to find food. The term the researchers used: ‘electric pollution.’",
      ],
      [
        "There is a US patent — [[ref:us_patent_12239107|number 12,239,107]] — for an EMF shield for beehives. The patent’s description states, with remarkable directness: \"With EMF transmissions blocked, bees rest better, become more healthy, productive and can better defend the colony against mites and hive beetles.\"",
        "The shielded-hive result and a shielding patent suggest controllable interventions, but efficacy and mechanism require independent field measurements and replicated colony endpoints. In the functional model, successful food encounters, defense and worker renewal can be tested separately.",
      ],
      [
        "This isn’t just about bees.",
        "The same principle — that organisms are calibrated by evolution to their natural electromagnetic environment and are disrupted by artificial fields to which they have no evolutionary adaptation — applies across the biological world. The [[ref:vaziri2016|human eye can detect a single photon]]. Sharks can sense electric fields of half a microvolt per meter. [[ref:engels2014|Migratory birds’ magnetic compass is disrupted by radiofrequency noise at levels found in normal urban environments]]. In 2026, [[ref:lindecke2026|a study published in Science]] showed that even mammals — bats — suffer hours-long disorientation from brief RF exposure at urban levels.",
        "Conserved ion channels, redox systems and repair machinery motivate cross-species comparison, while specialized sensory organs and tissue geometry change transfer. No shared age of a molecule or absence of a technological ancestor supplies a universal sensitivity coefficient.",
        "When we examine the broader biological landscape through this lens, a pattern emerges that no single-cause theory can explain. Laboratory control animals are getting fatter despite controlled diets. Autoimmune diseases are epidemic in exactly the countries with the highest electromagnetic exposure. Cancer in people under 50 — particularly in rapidly dividing tissues like the gut and testes — has risen 79% since 1990. Depression responds better to electromagnetic treatment (TMS) than to chemical treatment (SSRIs), suggesting it may be primarily an electrical disturbance, not a chemical one. And global fertility is declining in ways that cannot be fully explained by cultural choice.",
        "The bees are the canary in the coal mine. But we are in the same mine.",
      ],
    ],
    references: [
      { referenceId: "favre_johansson_2025", label: "Favre D, Johansson O (2025). Honeybees’ Behaviour in a Faraday-Shielded Hive: Mandatory Schumann Resonance for Colony Survival. Int J Research – GRANTHAALAYAH, 13(4), 25–38." },
      { referenceId: "england_2023_ticks", label: "England SJ et al. (2023). Static electricity passively attracts ticks onto hosts. Current Biology, 33(14), 3041–3047." },
      { referenceId: "colin_1992_varroa_charge", label: "Colin ME et al. (1992). Attraction of Varroa jacobsoni by electrical charges. J Apicultural Research." },
      { referenceId: "shepherd_2023_pollination", label: "Shepherd S et al. (2023). Electromagnetic fields disrupt the pollination service by honeybees. Science Advances, 9(20), eadh1455." },
      { referenceId: "wyszkowska_bee_collection_2023_2025", label: "Wyszkowska J et al. (2023/2025). 900 MHz EMF induces stress protein expression in honeybees. PLOS ONE; Behavioral changes under 50 Hz E-field. Agriculture." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ et al. (2025). A comprehensive mechanism of biological and health effects of anthropogenic ELF and WC EMFs. Frontiers in Public Health, 13:1585441." },
      { referenceId: "mallinson2025_electric_pollution", label: "Mallinson VJ et al. (2025). Weak anthropogenic electric fields affect honeybee foraging. iScience, 28(5), 112550." },
      { referenceId: "lindecke2026", label: "Lindecke O et al. (2026). RF noise disrupts bat magnetic compass. Science, 388: 977+." },
      { referenceId: "us_patent_12239107", label: "US Patent 12,239,107: EMF shield for beehives." },
      { referenceId: "vaziri2016", label: "Tinsley JN et al. (2016). Direct detection of a single photon by humans. Nature Communications, 7, 12172." },
    ],
  },
  fi: {
    refsTitle: "Lähdeluettelo",
    sections: [
      [
        "[[ref:favre_johansson_2025|Favre ja Johansson 2025]] raportoivat mehiläisyhdyskuntien muutoksia suojatussa pesäkokeessa. Tulkinta tarvitsee todellisen suojaussiirron, kenttäspektrin, ilmanvaihdon ja yhdyskunnan olot: Faradayn kotelointi ei nimensä perusteella osoita kaikkien magneettikenttien poistumista.",
        "Raportoitu vertailu lisättyyn 7,83 Hz:n signaaliin motivoi toistoa riippumattomasti mitatuilla kentillä ja yhtenäisillä pesäoloilla. Se ei osoita yleistä Schumann-taajuuden eloonjäämisvaatimusta.",
        "Hyödyllinen kysymys on, mikä paikallinen kenttä ja vastaanotintila muuttavat yhdyskunnan toimintaa.",
      ],
      [
        "Ymmärtääksesi miksi tällä on merkitystä, sinun on tiedettävä eräästä punkista.",
        "Varroa destructor on loispunkki, joka on suunnilleen nuppineulan pään kokoinen. Se kiinnittyy mehiläisiin, lävistää niiden ulkokuoren ja imee niiden rasvakudosta ja hemolymfaa. Se myös injektoi viruksia — tuhoisimpana epämuodostuneen siiven virusta (DWV) — jotka rampauuttavat yhdyskunnan seuraavan sukupolven. Hypättyään aasialaisista mehiläisistä eurooppalaisiin mehiläisiin 1950-luvulla Varroa on muodostunut suurimmaksi yksittäiseksi uhaksi hoidetuille mehiläispopulaatioille maailmanlaajuisesti.",
        "Aasialaiset mehiläiset (Apis cerana) elävät rinnakkain Varroan kanssa, koska ne kehittyivät yhdessä. Niillä on kaksi kriittistä puolustusmekanismia: hygieeninen käyttäytyminen (loisitun sikiön havaitseminen ja poistaminen) ja sukiminen (punkkien fyysinen pureminen ja poistaminen pesätovereilta). Eurooppalaisilla mehiläisillä (Apis mellifera) on nämä käyttäytymiset myös, mutta ne ovat heikompia — mehiläiset usein epäonnistuvat punkin havaitsemisessa tai sen tehokkaassa poistamisessa.",
        "Tässä on kysymys jota kukaan ei ole esittänyt: entä jos mehiläisten puolustusjärjestelmiä tukahdutetaan ulkoisesti?",
      ],
      [
        "Vuonna 2023 [[ref:england_2023_ticks|tutkijaryhmä julkaisi hätkähdyttävän löydöksen Current Biology -lehdessä]]. He osoittivat, että punkit — Varroan lähisukulaiset — houkuttuvat passiivisesti isäntiinsä staattisen sähkön voimalla. Liikkuvan eläimen keholle kertyvä sähköstaattinen varaus vetää loisen kirjaimellisesti ilmaraon läpi isännälle, jopa useiden millimetrien etäisyyksiltä. Tutkijat totesivat nimenomaisesti, että tämä mekanismi todennäköisesti pätee myös Varroaan.",
        "[[ref:colin_1992_varroa_charge|Erillinen tutkimus]] oli jo osoittanut, että Varroa-punkit muuttuvat aktiivisemmiksi — levottomammiksi, liikkuvammiksi — sähkökenttien läsnä ollessa, jopa kentissä jotka ovat liian heikkoja nostaakseen niitä fyysisesti. Punkkien ei tarvitse singoutua isännälleen. Niiden tarvitsee vain aktivoitua — valmistautua tarttumaan, kun varattu mehiläinen ohittaa.",
        "Pohdi nyt tätä: mehiläiset kantavat positiivista sähköstaattista varausta, jonka ne keräävät lennon aikana. Varaus on välttämätön — se auttaa siitepölyhiukkasia hyppäämään kukista mehiläisen keholle. [[ref:clarke2013_bee_electroreception|Mehiläiset voivat jopa aistia kukkien sähkökenttiä ja käyttää niitä määrittääkseen, onko kukassa vierailtu äskettäin]]. Sähkö on kudottu mehiläisbiologian peruskankaaseen.",
        "Mutta mitä tapahtuu kun sähkömagneettinen ympäristö muuttuu?",
      ],
      [
        "Luonnolliseen sähkömagneettiseen ympäristöön kuuluu staattisia, ilmakehän ja optisia syötteitä erilaisine spektreineen ja aikakulkuineen. BERM kysyy, mitkä vastaanottojärjestelmät ovat kehittyneet näissä syötteissä ja mitkä mitatut nykyiset muutokset häiritsevät samoja toimintoja. Lähteen luonnollinen tai keinotekoinen alkuperä ei yksin määrää vastetta.",
        "Nykyään tyypillinen mehiläispesä sijaitsee ympäristössä, joka on kyllästetty sähkömagneettisilla kentillä, joita ei ollut olemassa vuosisata sitten: matkapuhelintukiasemat (700 MHz–6 GHz), Wi-Fi-reitittmet (2,4/5 GHz), voimalinjat (50/60 Hz), LED-katu- ja maatalousvalaistus (20–200 kHz hakkuritehonmuokkaajaharmoniset), älykkäät mittarit ja joissain paikoissa säätutkia.",
        "Tutkimus on dokumentoinut mitä nämä kentät tekevät mehiläisille. [[ref:shepherd_2023_pollination|Vuoden 2023 Science Advances -tutkimus]] osoitti, että sähkömagneettiset kentät häiritsevät mehiläisten pölytystoimintaa muuttamalla lentojen ja navigoinnin magneettikarttoja ja tuottamalla magnetoreseptiohäiriön.",
        "[[ref:plos_one_2023_bee_900mhz|Vuoden 2023 PLOS ONE -tutkimus]] osoitti, että 900 MHz altistus aiheutti mitattavia muutoksia stressiin liittyvissä entsyymissä ja geeniekspressiossa mehiläisissä — organismi ohjaa resursseja normaalitoiminnasta hätästressivasteeseen. [[ref:wyszkowska_2025_bee_behavior|Vuoden 2025 tutkimus]] dokumentoi, että 50 Hz sähkökentät vähentävät itsesukimiskäyttäytymistä mehiläisillä. Ja useat tutkimukset osoittavat, että EMF-altistus vähentää kuningattaren munintaa ja sikiön elinkelpoisuutta.",
        "Jokainen näistä vaikutuksista, yksittäin, heikentää yhdyskuntaa. Mutta ratkaiseva oivallus on mitä ne tekevät yhdessä Varroan kanssa.",
      ],
      [
        "Mehiläiset taistelevat Varroaa vastaan kahdella pääkäyttäytymisellä: hygieenisellä käyttäytymisellä (tartunnan saaneen sikiön havaitseminen hajun perusteella ja sen poistaminen) ja sukimisella (punkkien fyysinen poistaminen pesätovereilta). Molemmat riippuvat mehiläisen aistikyvyistä — erityisesti hajuaistista — ja koordinoidusta sosiaalisesta käyttäytymisestä yhdyskunnan sisällä.",
        "Osakokeet motivoivat testaamaan, miten aisti- ja liiketoiminta muuttavat puolustusta määritellyssä paikallisessa kentässä.",
        "Yhdyskuntamalli seuraa laskeutumista ja ravinnonhakua → pesään tuotua ravintoa → korjaukseen, immuniteettiin ja kuningattaren tuotantoon käytettävissä olevaa energiaa. Sukiminen ja sikiön havaitseminen tulevat erikseen loisen poistumaan. Yhden välisignaalin muutos ei välttämättä heikennä kaikkia toimintoja, joten jokainen virta mitataan saman vauriokertoimen antamisen sijaan.",
        "Varroa tarvitsee oman vastaanotto- ja kelpoisuusmallinsa.",
        "Jäykkä kuori ja pieni koko eivät osoita sähkömagneettista immuuniutta. Varroan kemialliset ruokailumekanismit ([[ref:varroa_chitinase_2020|syljen kitinaasitutkimus]]) ja sen raportoidut sähkövasteet on kuljetettava erillisinä prosesseina. Mittaa isännän löytäminen, tarttuminen, ruokailu, selviytyminen ja lisääntyminen samassa paikallisessa kentässä kuin isäntä.",
        "Ekologinen epäsymmetria on mitattujen isäntä- ja loistoimintojen ero.",
        "BERM yhdistää kohtaamiset ja populaatiopalautteen eksplisiittisesti: kohtaamiset_ij=Δt·k_ij·m_ij(tila)·n_i·n_j. Muuntaja voi riippua molemmista eliöistä, kenttägeometriasta, kukinnasta ja muiden lajien kompensaatiosta. Etumerkilliset vaikutukset kumpaankin populaatioon yhdistetään syntymiin ja kuolemiin. Isännän väheneminen voi myös vähentää loisen uusiutumista; rajoittamatonta yksisuuntaista räikkää ei oleteta.",
        "Yhdyskunta voi lähestyä kynnystä, kun ravinto ja työläisten uusiutuminen alittavat loisten, virusten ja muiden kuormitusten menetykset. Kentän ehdollista osuutta testataan näiden välivirtojen kautta. Näin vahvistumiselle saadaan mekanismi nimeämättä jokaista yhdyskunnan romahdusta kentän aiheuttamaksi.",
        "Toukokuussa 2025 samasta Bristolin yliopiston ryhmästä, joka [[ref:clarke2013_bee_electroreception|löysi mehiläisten sähköreseption]], julkaistiin kenttäkoe joka osoitti, että heikot ihmisperäiset sähkökentät — verrattavia voimalinjojen läheisyyteen — vähentävät mehiläisten kukille laskeutumista 71 % ([[ref:mallinson2025_electric_pollution|Mallinson ym., iScience / Cell Press]]). Sähkömagneettinen ympäristö ei vain heikennä mehiläisten puolustusta Varroaa vastaan. Se myös häiritsee niiden kykyä löytää ruokaa. Tutkijoiden käyttämä termi: 'electric pollution' — sähkösaaste.",
      ],
      [
        "On olemassa yhdysvaltalainen patentti — [[ref:us_patent_12239107|numero 12 239 107]] — mehiläispesien EMF-suojalle. Patentin kuvaus toteaa merkittävällä suoruudella: \"Kun EMF-lähetykset estetään, mehiläiset lepäävät paremmin, tulevat terveemmiksi, tuottavammiksi ja pystyvät paremmin puolustamaan yhdyskuntaa punkkeja ja pesäkuoriaisia vastaan.\"",
        "Suojatun pesän tulos ja suojauspatentti ehdottavat kontrolloitavia interventioita, mutta teho ja mekanismi tarvitsevat riippumattomat kenttämittaukset ja toistetut yhdyskuntapäätepisteet. Toiminnallisessa mallissa onnistuneet ravintokohtaamiset, puolustus ja työläisten uusiutuminen voidaan testata erikseen.",
      ],
      [
        "Tässä ei ole kyse vain mehiläisistä.",
        "Sama periaate — että organismit on kalibroitu evoluution kautta luonnolliseen sähkömagneettiseen ympäristöönsä ja häiriintyvät keinotekoisista kentistä joihin niillä ei ole evolutiivista sopeutumista — pätee koko biologisessa maailmassa. [[ref:vaziri2016|Ihmissilmä voi havaita yksittäisen fotonin]]. Hait voivat aistia puolen mikrovoltin metriä kohden sähkökenttiä. [[ref:engels2014|Muuttolintujen magneettikompassi häiriintyy radiotaajuisesta kohinasta normaaleissa kaupunkiympäristöissä havaituilla tasoilla]]. Vuonna 2026 [[ref:lindecke2026|Sciencessä julkaistu tutkimus]] osoitti, että jopa nisäkkäät — lepakot — kärsivät tuntien desorientaatiosta lyhyestä RF-altistuksesta kaupunkitasoilla.",
        "Säilyneet ionikanavat, redox-järjestelmät ja korjauskoneisto motivoivat lajivertailua, kun taas erikoistuneet aistielimet ja kudosgeometria muuttavat siirtoa. Molekyylin yhteinen ikä tai teknologisen edeltäjän puuttuminen eivät anna yleistä herkkyyskerrointa.",
        "Kun tarkastelemme laajempaa biologista maisemaa tämän linssin läpi, esiin nousee kuvio jota yksikään yksisyyteoria ei voi selitää. Laboratorion kontrollieläimet lihovat kontrolloiduista ruokavalioista huolimatta. Autoimmuunisairaudet ovat epidemioita täsmälleen niissä maissa joissa sähkömagneettinen altistus on suurin. Syöpä alle 50-vuotiailla — erityisesti nopeasti jakautuvissa kudoksissa kuten suolistossa ja kiveksissä — on noussut 79 % vuodesta 1990. Masennus vastaa paremmin sähkömagneettiseen hoitoon (TMS) kuin kemialliseen hoitoon (SSRI), mikä viittaa siihen että se voi olla ensisijaisesti sähköinen häiriö, ei kemiallinen. Ja globaali hedelmällisyys laskee tavoilla joita ei voida täysin selitää kulttuurisella valinnalla.",
        "Mehiläiset ovat kaivoksen kanarialintuja. Mutta me olemme samassa kaivoksessa.",
      ],
    ],
    references: [
      { referenceId: "favre_johansson_2025", label: "Favre D, Johansson O (2025). Honeybees’ Behaviour in a Faraday-Shielded Hive: Mandatory Schumann Resonance for Colony Survival. Int J Research – GRANTHAALAYAH, 13(4), 25–38." },
      { referenceId: "england_2023_ticks", label: "England SJ ym. (2023). Static electricity passively attracts ticks onto hosts. Current Biology, 33(14), 3041–3047." },
      { referenceId: "colin_1992_varroa_charge", label: "Colin ME ym. (1992). Attraction of Varroa jacobsoni by electrical charges. J Apicultural Research." },
      { referenceId: "shepherd_2023_pollination", label: "Shepherd S ym. (2023). Electromagnetic fields disrupt the pollination service by honeybees. Science Advances, 9(20), eadh1455." },
      { referenceId: "wyszkowska_bee_collection_2023_2025", label: "Wyszkowska J ym. (2023/2025). 900 MHz EMF ja stressiproteiinien ilmentyminen mehiläisissä. PLOS ONE; Käyttäytymismuutokset 50 Hz E-kentässä. Agriculture." },
      { referenceId: "panagopoulos2025", label: "Panagopoulos DJ ym. (2025). Kattava mekanismi ihmisen tekemien ELF- ja WC-EMF-kenttien biologisista ja terveysvaikutuksista. Frontiers in Public Health, 13:1585441." },
      { referenceId: "mallinson2025_electric_pollution", label: "Mallinson VJ ym. (2025). Heikot ihmisperäiset sähkökentät vaikuttavat mehiläisten ravinnonhakuun. iScience, 28(5), 112550." },
      { referenceId: "lindecke2026", label: "Lindecke O ym. (2026). RF-kohina häiritsee lepakkojen magneettikompassia. Science, 388: 977+." },
      { referenceId: "us_patent_12239107", label: "US Patent 12 239 107: EMF-suoja mehiläispesille." },
      { referenceId: "vaziri2016", label: "Tinsley JN ym. (2016). Yksittäisen fotonin suora havaitseminen ihmisillä. Nature Communications, 7, 12172." },
    ],
  },
} as const;

export function BeeArticleContent({ locale }: { locale: string }) {
  const d = locale in COPY ? COPY[locale as keyof typeof COPY] : COPY.en;

  return (
    <div className="article-body">
      {d.sections.map((section, si) => (
        <section key={si} id={si === 1 ? "varroa" : undefined} className="mb-10">
          {si > 0 && (
            <div className="mb-10 flex justify-center">
              <span className="text-foreground-muted/30 text-lg tracking-[0.5em]">***</span>
            </div>
          )}
          {section.map((paragraph, pi) => (
            <p
              key={pi}
              className="text-[1.0625rem] sm:text-lg leading-[1.8] text-foreground/90 mb-6 last:mb-0"
            >
              <InlineReferenceText text={paragraph} locale={locale} />
            </p>
          ))}
        </section>
      ))}

      {/* References */}
      <section className="mt-16 pt-8 border-t border-card-border">
        <h2 className="font-serif text-xl font-semibold mb-6">{d.refsTitle}</h2>
        <ol className="space-y-3 text-sm text-foreground-muted leading-relaxed">
          {d.references.map((ref, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono-num text-foreground-muted/50 shrink-0">{i + 1}.</span>
              <span><StudyCitation referenceId={ref.referenceId} locale={locale} label={ref.label} /></span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
