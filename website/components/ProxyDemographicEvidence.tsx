import { ClaimRef } from "@/components/ClaimRef";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { ProxyDemographicProcess, ProxyIntentionOutcomeChart } from "@/components/ProxyDemographicProcess";
import { ProxyDemographicTheories } from "@/components/ProxyDemographicTheories";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    lead: "Education, costs, contraception, values and low-fertility traps address different parts of reproduction. A person can wish for a child, postpone an attempt, face a practical barrier or need treatment. Recording one of these conditions as the explanation does not tell us what produced the other conditions or how they act together.",
    derivation: "Under BERM’s premises, receiving biology feeds both motivation and reproductive capacity. Institutions and resources influence the opportunities to act; age and earlier experience shape the subsequent response. Demographic explanations become positions in this continuous process. A mechanism explaining one position does not thereby explain the origin or full size of the change.",
    context: "This extends existing demographic frameworks at their interfaces. Bongaarts already distinguishes proximate biological and behavioural determinants from background conditions. BERM adds a state-dependent physical input and asks how its consequences are distributed across those determinants.",
    contextRef: "[[ref:bongaarts1978_proximate_determinants|Bongaarts 1978]]; [[ref:bongaarts2015_proximate_update|Bongaarts 2015]].",
    reading: "Read the figures together",
    readingText: "The process map shows the model’s proposed connections. The bars show published observations. Together they distinguish a wish, its conditions for realisation and its eventual outcome without assigning an unmeasured cause to each person.",
    sourceDetails: "How the demographic sources were integrated",
    sourceAitken: "Aitken’s 2024 review explicitly includes electromagnetic radiation among environmental factors. Its R² = 0.775 concerns contraceptive use and TFR across countries in 2000–2001. It is an aggregate association, not an EMF coefficient. [[ref:aitken2024_fertility_drivers|Aitken 2024, Figure 5]].",
    sourceItao: "Itao’s published two-pathway analysis uses crude birth rates as its main outcome. Its 237-country dataset does not establish an EMF dose threshold or turn life expectancy into a tissue-response parameter. [[ref:itao2026_two_pathways|Itao 2026]].",
    sourceLevels: "The page retains its four masking levels. Unequal measurement and attribution across research traditions belong to epistemic masking; sensory masking remains the receiver level. The groups below are reading categories, not a new hierarchy of evidence.",
    conclusionTitle: "Why several partial explanations can share one missing condition",
    conclusion: "If the same receiving state changes both what feels worth pursuing and the probability of achieving it, the resulting observations can be recorded as separate changes in values, timing, family size and treatment use. In BERM these are different outputs of a connected system. Removing one financial or legal constraint does not, by itself, reset that system’s remaining conditions.",
    link: "How this strengthens explanatory parsimony",
  },
  fi: {
    lead: "Koulutus, kustannukset, ehkäisy, arvot ja matalan syntyvyyden loukku käsittelevät lisääntymisen eri vaiheita. Ihminen voi toivoa lasta, siirtää yritystä, kohdata käytännön esteen tai tarvita hoitoa. Yhden näistä nimeäminen selitykseksi ei kerro, mikä tuotti muut ehdot tai miten ne vaikuttavat yhdessä.",
    derivation: "BERM:n premisseillä vastaanottobiologia vaikuttaa sekä motivaatioon että lisääntymiskapasiteettiin. Instituutiot ja resurssit vaikuttavat toiminnan mahdollisuuksiin; ikä ja aiempi historia muokkaavat myöhempää vastetta. Väestötieteen selitykset asettuvat tämän jatkuvan prosessin eri kohtiin. Yhden kohdan mekanismi ei siksi vielä selitä muutoksen alkuperää tai koko suuruutta.",
    context: "Tämä jatkaa olemassa olevia väestötieteellisiä kehyksiä niiden liitoskohdista. Bongaarts erottaa jo biologiset ja käyttäytymiseen liittyvät välittävät tekijät taustaehdoista. BERM lisää tilariippuvan fysikaalisen syötteen ja seuraa, miten sen seuraukset jakautuvat näihin tekijöihin.",
    contextRef: "[[ref:bongaarts1978_proximate_determinants|Bongaarts 1978]]; [[ref:bongaarts2015_proximate_update|Bongaarts 2015]].",
    reading: "Lue kuvat yhdessä",
    readingText: "Prosessikuva näyttää mallin kokoamat yhteydet. Palkit näyttävät julkaistut havainnot. Yhdessä ne erottavat toiveen, sen toteutumisen ehdot ja lopputuloksen nimeämättä jokaiselle ihmiselle mittaamatonta syytä.",
    sourceDetails: "Miten väestötieteelliset lähteet yhdistettiin?",
    sourceAitken: "Aitkenin vuoden 2024 katsaus käsittelee myös sähkömagneettista säteilyä ympäristötekijänä. Sen R² = 0,775 koskee ehkäisyn käytön ja TFR:n maakohtaista yhteyttä vuosina 2000–2001. Se on koontiaineiston yhteys, ei EMF-kerroin. [[ref:aitken2024_fertility_drivers|Aitken 2024, kuva 5]].",
    sourceItao: "Itaon julkaistun kahden polun analyysin päätemuuttuja on yleinen syntyneisyysluku. Sen 237 maan ja alueen aineisto ei määritä EMF-annoksen kynnystä tai muuta elinajanodotetta kudosvasteen parametriksi. [[ref:itao2026_two_pathways|Itao 2026]].",
    sourceLevels: "Sivun neljä peittymisen tasoa säilyvät. Tutkimusperinteiden mittaus- ja tulkintaepäsymmetria kuuluu episteemiseen peittymiseen; sensorinen peittyminen vastaanottajan tasolle. Alla olevat ryhmät ovat lukemisen aihejako, eivät uusi näytön hierarkia.",
    conclusionTitle: "Miksi useilta osaselityksiltä voi puuttua sama taustaehto?",
    conclusion: "Jos sama vastaanottotila muuttaa sekä tavoitteen palkitsevuutta että sen toteutumisen todennäköisyyttä, havainnot voivat kirjautua erillisiksi arvojen, ajoituksen, lapsiluvun ja hoitojen käytön muutoksiksi. BERM:ssa ne ovat toisiinsa kytkeytyvän järjestelmän eri tuloksia. Yhden taloudellisen tai oikeudellisen esteen poistaminen ei itsessään palauta järjestelmän muita ehtoja.",
    link: "Miten tämä vahvistaa selityksen parsimoniaa?",
  },
};

export function ProxyDemographicEvidence({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  const p = (text: string) => <p className="text-base leading-[1.85] text-foreground-muted"><InlineReferenceText text={text} locale={locale} /></p>;
  return <div className="min-w-0 space-y-7">
    {p(c.lead)}
    <p className="text-base font-medium leading-relaxed"><ClaimRef claimId="claim.proxy.demographic-route-composition">{c.derivation}</ClaimRef></p>
    {p(`${c.context} ${c.contextRef}`)}
    <ProxyDemographicProcess locale={locale} />
    <ProxyIntentionOutcomeChart locale={locale} />
    <aside className="space-y-2 border-l-2 border-accent/50 pl-5"><h3 className="text-sm font-semibold">{c.reading}</h3>{p(c.readingText)}</aside>
    <ProxyDemographicTheories locale={locale} />
    <details className="min-w-0 rounded-lg border border-card-border p-4 sm:p-5">
      <summary className="cursor-pointer text-sm font-semibold">{c.sourceDetails}</summary>
      <div className="mt-4 space-y-4">{p(c.sourceAitken)}{p(c.sourceItao)}{p(c.sourceLevels)}</div>
    </details>
    <div className="space-y-3 border-l-2 border-accent pl-5"><h3 className="font-serif text-xl">{c.conclusionTitle}</h3>{p(c.conclusion)}</div>
    <a href="#explanatory-parsimony" className="inline-block text-sm text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{c.link}</a>
  </div>;
}
