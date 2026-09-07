"""One structure for every mechanism card in the modulome.

Each card answers the same eight questions, so two mechanisms can be compared
without rereading their prose:

    exposure               local E/B, waveform, background field, temperature,
                           and light where it is part of the exposure
    receptor               protein, isoform, complex, compartment
    baseline_state         the biological state measured before exposure
    proximal_response      the first observable change and its latency
    propagation            intracellular route, medium-borne message, or
                           tissue interaction
    memory                 persistence and recovery of the response
    functional_consequence protection, disturbance or altered capability at a
                           named endpoint
    mechanism_bounding     what a deletion, restoration or other intervention
                           changed

The eighth field is what makes a card more than a summary: a card without a
stated intervention result cannot bound its own mechanism, and the registry
requires it.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Mapping

from berm.modulome._common import MODULOME_VERSION, nonempty, normalise_ids

__all__ = [
    "CARD_FIELDS",
    "LocalisedText",
    "MECHANISM_CARDS",
    "MechanismCard",
    "cards_for_layer",
    "cards_manifest",
    "get_mechanism_card",
    "validate_mechanism_cards",
]

CARD_FIELDS = (
    "exposure",
    "receptor",
    "baseline_state",
    "proximal_response",
    "propagation",
    "memory",
    "functional_consequence",
    "mechanism_bounding",
)

_EPISTEMIC_LEVELS = frozenset({"E", "M", "C", "M|C", "L", "L*"})


@dataclass(frozen=True)
class LocalisedText:
    """English and Finnish text for one card field."""

    en: str
    fi: str

    def __post_init__(self) -> None:
        object.__setattr__(self, "en", nonempty("en", self.en))
        object.__setattr__(self, "fi", nonempty("fi", self.fi))

    def as_dict(self) -> dict[str, str]:
        return {"en": self.en, "fi": self.fi}


@dataclass(frozen=True)
class MechanismCard:
    """One mechanism, recorded in the eight-field structure."""

    card_id: str
    title: LocalisedText
    exposure: LocalisedText
    receptor: LocalisedText
    baseline_state: LocalisedText
    proximal_response: LocalisedText
    propagation: LocalisedText
    memory: LocalisedText
    functional_consequence: LocalisedText
    mechanism_bounding: LocalisedText
    layers: tuple[int, ...]
    reference_ids: tuple[str, ...]
    epistemic_level: str
    implementing_modules: tuple[str, ...] = ()
    intervention_profile_ids: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        object.__setattr__(self, "card_id", nonempty("card_id", self.card_id))
        layers = tuple(int(layer) for layer in self.layers)
        if not layers:
            raise ValueError("layers must name at least one modulome layer")
        if any(layer < 1 or layer > 12 for layer in layers):
            raise ValueError("layers must be within the twelve modulome layers")
        object.__setattr__(self, "layers", layers)
        if not self.reference_ids:
            raise ValueError("reference_ids must name the sources of the card")
        object.__setattr__(
            self, "reference_ids", normalise_ids(self.reference_ids, "reference_id")
        )
        if self.epistemic_level not in _EPISTEMIC_LEVELS:
            raise ValueError(f"epistemic_level must be one of {sorted(_EPISTEMIC_LEVELS)}")
        object.__setattr__(
            self, "implementing_modules", normalise_ids(self.implementing_modules, "module")
        )
        object.__setattr__(self, "intervention_profile_ids", normalise_ids(
            self.intervention_profile_ids, "intervention_profile_id"
        ))

    def as_dict(self) -> dict[str, object]:
        payload: dict[str, object] = {
            "cardId": self.card_id,
            "title": self.title.as_dict(),
            "layers": list(self.layers),
            "referenceIds": list(self.reference_ids),
            "epistemicLevel": self.epistemic_level,
            "implementingModules": list(self.implementing_modules),
            "interventionProfileIds": list(self.intervention_profile_ids),
        }
        for name in CARD_FIELDS:
            value: LocalisedText = getattr(self, name)
            payload[name] = value.as_dict()
        return payload


def _t(en: str, fi: str) -> LocalisedText:
    return LocalisedText(en=en, fi=fi)


MECHANISM_CARDS: tuple[MechanismCard, ...] = (
    MechanismCard(
        card_id="card.membrane-machinery-transfer",
        title=_t(
            "Transferable membrane machinery",
            "Siirrettävä kalvokoneisto",
        ),
        exposure=_t(
            "Pulsed magnetic field, 1.5 mT, brief exposure of a cell-free vesicle preparation at controlled temperature.",
            "Pulssimagneettikenttä, 1,5 mT, lyhyt altistus soluvapaalle vesikkelivalmisteelle säädetyssä lämpötilassa.",
        ),
        receptor=_t(
            "TRPC1 in the vesicle membrane, together with the lipid environment and complex partners that travel with it.",
            "TRPC1 vesikkelin kalvossa yhdessä sen mukana kulkevan lipidiympäristön ja kompleksikumppanien kanssa.",
        ),
        baseline_state=_t(
            "Donor myoblasts with normal TRPC1 expression versus donors in which TRPC1 was silenced; recipient cells silenced for TRPC1.",
            "Luovuttajamyoblastit normaalilla TRPC1-ilmentymisellä vastaan luovuttajat, joilta TRPC1 oli vaimennettu; vastaanottajasolut TRPC1-vaimennettuja.",
        ),
        proximal_response=_t(
            "A calcium signal in vesicles from normal cells; no corresponding response in vesicles from TRPC1-silenced cells.",
            "Kalsiumsignaali normaalien solujen vesikkeleissä; vastaavaa vastetta ei TRPC1-vaimennettujen solujen vesikkeleissä.",
        ),
        propagation=_t(
            "Vesicles applied to recipient cells partly restored field-associated respiratory and growth responses.",
            "Vastaanottajasoluihin lisätyt vesikkelit palauttivat osittain kenttään liittyvät hengitys- ja kasvuvasteet.",
        ),
        memory=_t(
            "Restoration was measured over the recipient culture interval; persistence beyond it was not part of the design.",
            "Palautuminen mitattiin vastaanottajaviljelmän aikavälillä; sitä pidempää säilymistä ei tutkittu tässä asetelmassa.",
        ),
        functional_consequence=_t(
            "Recovery of respiratory and proliferative capacity in cells that had lost the channel.",
            "Hengitys- ja jakautumiskapasiteetin palautuminen soluissa, jotka olivat menettäneet kanavan.",
        ),
        mechanism_bounding=_t(
            "TRPC1 silencing in the donor removed the response; supplying donor vesicles restored it. The acute local response did not require an intact source cell. Natural transfer inside tissue is a separate hypothesis.",
            "TRPC1:n vaimennus luovuttajassa poisti vasteen; luovuttajavesikkelien anto palautti sen. Akuutti lähivaste ei vaatinut ehjää alkuperäistä solua. Luonnollinen siirtyminen kudoksessa on erillinen hypoteesi.",
        ),
        layers=(2, 4, 6),
        reference_ids=("kurth2020",),
        epistemic_level="E",
        implementing_modules=("berm.modulome.membrane",),
        intervention_profile_ids=("local_ltype_erk", "channel_selectivity", "lipid_ttype_inhibition"),
    ),
    MechanismCard(
        card_id="card.calcium-compartment-cycle",
        title=_t(
            "Calcium as a compartment cycle",
            "Kalsium osastojen välisenä kiertona",
        ),
        exposure=_t(
            "50 Hz magnetic field at 1 mT applied to hippocampal neurons.",
            "50 Hz:n magneettikenttä 1 mT:ssa hippokampuksen neuroneihin.",
        ),
        receptor=_t(
            "Plasma-membrane currents read together with the ER release and reuptake machinery: RyR and SERCA.",
            "Kalvovirrat luettuna yhdessä ER:n vapautus- ja takaisinottokoneiston kanssa: RyR ja SERCA.",
        ),
        baseline_state=_t(
            "Resting potential, ER calcium load and the release and recovery rates of the store before exposure.",
            "Lepojännite, ER:n kalsiumkuorma sekä varaston vapautumis- ja palautumisnopeus ennen altistusta.",
        ),
        proximal_response=_t(
            "Reduced inward and transient outward membrane currents.",
            "Sisään- ja ohimenevien ulospäin suuntautuvien kalvovirtojen pieneneminen.",
        ),
        propagation=_t(
            "Membrane channels to cytosolic calcium to the ER store to mitochondria; the current change follows completed release and reuptake cycles.",
            "Kalvokanavat, soluliman kalsium, ER-varasto ja mitokondriot; virran muutos seuraa toteutuneita vapautus- ja takaisinottokiertoja.",
        ),
        memory=_t(
            "The store load left after exposure sets the response to the next exposure, so the change carries into the following interval.",
            "Altistuksen jälkeen jäävä varastokuorma määrää seuraavan altistuksen vasteen, joten muutos siirtyy seuraavalle jaksolle.",
        ),
        functional_consequence=_t(
            "Altered excitability of the neuron at the measured current endpoint.",
            "Neuronin muuttunut ärtyvyys mitatussa virtapäätepisteessä.",
        ),
        mechanism_bounding=_t(
            "Interfering with RyR-mediated release or SERCA-mediated reuptake prevented the reported current changes. A current change is therefore also readable as a consequence of intracellular regulation, not only of direct channel action.",
            "RyR-välitteiseen vapautumiseen tai SERCA-välitteiseen takaisinottoon puuttuminen esti raportoidut virtamuutokset. Virran muutos on siten luettavissa myös solunsisäisen säätelyn seuraukseksi, ei vain suoraksi kanavavaikutukseksi.",
        ),
        layers=(2, 3),
        reference_ids=("bertagna2025",),
        epistemic_level="E",
        implementing_modules=("berm.modulome.calcium",),
        intervention_profile_ids=("mt2_brake", "local_ltype_erk", "channel_density_store_history"),
    ),
    MechanismCard(
        card_id="card.adaptation-memory",
        title=_t(
            "Adaptation and repair memory",
            "Sopeutumisen ja korjauksen muisti",
        ),
        exposure=_t(
            "Radiofrequency pre-exposure followed by a separate chemical challenge; exposure duration varied between arms.",
            "Radiotaajuinen esikäsittely ja sen jälkeen erillinen kemiallinen haaste; altistuksen kesto vaihteli koehaaroittain.",
        ),
        receptor=_t(
            "The autophagy machinery as the responding system: ATG5 and ATG7 dependent flux.",
            "Autofagiakoneisto vastaavana järjestelmänä: ATG5- ja ATG7-riippuvainen virtaus.",
        ),
        baseline_state=_t(
            "Repair capacity and damage load before the challenge, measured separately from the receptor state.",
            "Korjauskapasiteetti ja vauriokuorma ennen haastetta, mitattuna erillään vastaanottimen tilasta.",
        ),
        proximal_response=_t(
            "Increased tolerance of the later chemical challenge, read as reduced oxidative DNA damage.",
            "Kohonnut sietokyky myöhemmälle kemialliselle haasteelle, luettuna pienentyneenä oksidatiivisena DNA-vauriona.",
        ),
        propagation=_t(
            "Autophagic flux rather than a change in the receptor: the protection appears in the handling of the load.",
            "Autofagiavirtaus vastaanottimen muutoksen sijaan: suoja ilmenee kuorman käsittelyssä.",
        ),
        memory=_t(
            "Protection against the later challenge was still present about 20 hours after the pre-exposure ended.",
            "Suoja myöhempää haastetta vastaan oli jäljellä vielä noin 20 tuntia esikäsittelyn päättymisen jälkeen.",
        ),
        functional_consequence=_t(
            "Lower oxidative DNA damage at the named endpoint after the challenge.",
            "Pienempi oksidatiivinen DNA-vaurio nimetyssä päätepisteessä haasteen jälkeen.",
        ),
        mechanism_bounding=_t(
            "Pharmacological inhibition of autophagy and removal of ATG5 or ATG7 function abolished the protective response. A reduced increment can therefore be strengthened repair rather than a weakened receptor.",
            "Autofagian farmakologinen esto sekä ATG5- tai ATG7-toiminnan poistaminen kumosivat suojaavan vasteen. Vähäinen lisävaste voi siten olla vahvistunut korjaus eikä heikentynyt vastaanotin.",
        ),
        layers=(5, 11),
        reference_ids=("sannino2022", "sannino2024"),
        epistemic_level="E",
        implementing_modules=("berm.modulome.state",),
        intervention_profile_ids=("channel_density_store_history", "coq10_response"),
    ),
    MechanismCard(
        card_id="card.flavin-state-and-light-history",
        title=_t(
            "Flavin state and light history",
            "Flaviinin tila ja valohistoria",
        ),
        exposure=_t(
            "Pulsed magnetic field with field direction varied, on cells whose light history was controlled; separately, defined illumination of purified human CRY1.",
            "Pulssimagneettikenttä kentän suunta vaihdellen soluilla, joiden valohistoria oli hallittu; erikseen määritelty valaistus puhdistetulle ihmisen CRY1:lle.",
        ),
        receptor=_t(
            "CRY2 with the RFK/FAD system in muscle cells; human CRY1 protein with its bound flavin.",
            "CRY2 ja RFK/FAD-järjestelmä lihassoluissa; ihmisen CRY1-proteiini sitoutuneine flaviineineen.",
        ),
        baseline_state=_t(
            "CRY protein amount, flavin binding occupancy and redox state, and the preceding light history.",
            "CRY-proteiinin määrä, flaviinin sitoutumisaste ja hapetus-pelkistystila sekä edeltävä valohistoria.",
        ),
        proximal_response=_t(
            "Field response varied with CRY2 amount, FAD availability, field direction and light history; in the purified protein a conformational change accompanied the transition from the neutral radical to the fully reduced flavin.",
            "Kenttävaste vaihteli CRY2:n määrän, FAD:n saatavuuden, kentän suunnan ja valohistorian mukaan; puhdistetussa proteiinissa rakennemuutos liittyi siirtymään neutraalista radikaalitilasta täysin pelkistyneeseen.",
        ),
        propagation=_t(
            "The transition required the sequential absorption of two photons, so the order of wavelengths and the delay between them enter the input.",
            "Siirtymä vaati kahden fotonin peräkkäisen absorption, joten aallonpituuksien järjestys ja niiden välinen viive tulevat syötteeksi.",
        ),
        memory=_t(
            "The intermediate state decays during the delay, so the same total dose leaves a different molecular state when the order changes.",
            "Välitila purkautuu viiveen aikana, joten sama kokonaisannos jättää eri molekyylitilan järjestyksen muuttuessa.",
        ),
        functional_consequence=_t(
            "Altered myogenic response in the cell experiments; a defined protein conformation in the purified system.",
            "Muuttunut myogeeninen vaste solukokeissa; määritelty proteiinikonformaatio puhdistetussa järjestelmässä.",
        ),
        mechanism_bounding=_t(
            "Silencing RFK and removing FAD availability changed the field response; dark growth had the same effect. The photochemical conformational change is observed, and its magnetic modulation is the next separate test.",
            "RFK:n hiljentäminen ja FAD:n saatavuuden poisto muuttivat kenttävastetta; pimeässä kasvatus tuotti saman vaikutuksen. Fotokemiallinen rakennemuutos on havaittu, ja sen magneettinen modulaatio on seuraava erillinen testikohde.",
        ),
        layers=(1, 10),
        reference_ids=("iversen2025", "jeibmann2026"),
        epistemic_level="E",
        implementing_modules=("berm.modulome.photostate",),
        intervention_profile_ids=("cry_fad_competition", "drug_photochemistry"),
    ),
    MechanismCard(
        card_id="card.cry-subtype-specificity",
        title=_t(
            "One coefficient per cryptochrome, not one for all",
            "Yksi kerroin kutakin kryptokromia kohden, ei yhtä kaikille",
        ),
        exposure=_t(
            "Structural and spectroscopic characterisation rather than a field exposure.",
            "Rakenne- ja spektroskooppinen karakterisointi kenttäaltistuksen sijaan.",
        ),
        receptor=_t(
            "European robin CRY1 with its flavin binding site.",
            "Punarinnan CRY1 ja sen flaviininsitomiskohta.",
        ),
        baseline_state=_t(
            "Purified protein with defined flavin occupancy.",
            "Puhdistettu proteiini määritellyllä flaviinin sitoutumisasteella.",
        ),
        proximal_response=_t(
            "The structure constrained physiological flavin binding and supported a clock-protein function.",
            "Rakenne rajasi flaviinin fysiologista sitoutumista ja tuki kelloproteiinitoimintaa.",
        ),
        propagation=_t(
            "Applies to the interpretation of every CRY-based response: the binding site is a property of the individual protein.",
            "Koskee kaikkien CRY-pohjaisten vasteiden tulkintaa: sitomiskohta on yksittäisen proteiinin ominaisuus.",
        ),
        memory=_t(
            "Not a time-dependent record; it constrains the parameters other records may use.",
            "Ei aikariippuvainen tietue; se rajaa parametreja, joita muut tietueet voivat käyttää.",
        ),
        functional_consequence=_t(
            "A clock function rather than a shared magnetoreceptive coefficient.",
            "Kellotoiminto eikä jaettu magnetoreseptiivinen kerroin.",
        ),
        mechanism_bounding=_t(
            "The result bounds which subtype a parameter set may be applied to. The modulome refuses an unregistered subtype rather than substituting another protein's coefficient.",
            "Tulos rajaa, mihin alatyyppiin parametrisointia saa soveltaa. Moduloomi kieltäytyy rekisteröimättömästä alatyypistä sen sijaan, että käyttäisi toisen proteiinin kerrointa.",
        ),
        layers=(1, 10, 11),
        reference_ids=("wickramaratne2025",),
        epistemic_level="E",
        implementing_modules=("berm.modulome.photostate",),
        intervention_profile_ids=("cry_fad_competition",),
    ),
    MechanismCard(
        card_id="card.directional-information",
        title=_t(
            "Direction as a separate endpoint",
            "Suunta omana päätepisteenään",
        ),
        exposure=_t(
            "Direct-current electric field of 200 mV/mm in the gene screen; comparable local fields in the wound-healing experiments.",
            "Tasakenttä 200 mV/mm geeniseulonnassa; vastaavat paikalliset kentät haavan paranemisen kokeissa.",
        ),
        receptor=_t(
            "KCNJ15/Kir4.2 acting together with polyamines; PI3Kgamma and PTEN as the polarity arm.",
            "KCNJ15/Kir4.2 yhdessä polyamiinien kanssa; PI3Kγ ja PTEN polariteettihaarana.",
        ),
        baseline_state=_t(
            "Cell polarity, spatial PIP3 distribution and intrinsic motility before the field.",
            "Solun polariteetti, PIP₃:n alueellinen jakautuminen ja perusliikkuvuus ennen kenttää.",
        ),
        proximal_response=_t(
            "Orientation of migration along the field axis.",
            "Liikkeen suuntautuminen kentän akselille.",
        ),
        propagation=_t(
            "Ion transport to polarity signalling to directed movement of the whole cell.",
            "Ionikuljetus, polariteettisignalointi ja koko solun suunnattu liike.",
        ),
        memory=_t(
            "Directional accuracy follows the field while it is present; persistence after removal was not the endpoint.",
            "Suuntatarkkuus seuraa kenttää sen ollessa päällä; säilymistä poiston jälkeen ei mitattu päätepisteenä.",
        ),
        functional_consequence=_t(
            "A cell can stay alive and motile while processing directional information incorrectly. A damage measure does not reach this endpoint.",
            "Solu voi säilyä elävänä ja liikkuvana mutta käsitellä suunnan informaatiota väärin. Vauriomittari ei tavoita tätä päätepistettä.",
        ),
        mechanism_bounding=_t(
            "Silencing KCNJ15 removed field orientation while basic motility was retained; changing polyamine level or binding changed the response; PI3Kgamma and PTEN interventions changed electrically guided movement. Which BERM exposures reach a comparable local field magnitude is a separate calculation.",
            "KCNJ15:n vaimentaminen poisti kenttään suuntautumisen perusliikkuvuuden säilyessä; polyamiinien määrään tai sitoutumiseen puuttuminen muutti vastetta; PI3Kγ- ja PTEN-interventiot muuttivat sähköisesti ohjautuvaa liikettä. Se, missä BERM:n altistuksissa vastaava paikallinen kenttävoimakkuus saavutetaan, on erillinen laskenta.",
        ),
        layers=(2, 4, 6),
        reference_ids=("nakajima2015", "zhao2006_wound_ef"),
        epistemic_level="E",
        implementing_modules=("berm.modulome.polarity",),
    ),
    MechanismCard(
        card_id="card.medium-borne-message",
        title=_t(
            "A message carried by the medium",
            "Nesteen välittämä viesti",
        ),
        exposure=_t(
            "Radiofrequency exposure of donor cells; recipient cells were not exposed.",
            "Radiotaajuinen altistus luovuttajasoluille; vastaanottajasoluja ei altistettu.",
        ),
        receptor=_t(
            "The recipient cell population and its own state; the donor receptor is upstream of the transferred signal.",
            "Vastaanottajasolupopulaatio ja sen oma tila; luovuttajan vastaanotin on siirtyvän signaalin yläpuolella.",
        ),
        baseline_state=_t(
            "Cell density, medium composition and the readiness of the recipient population.",
            "Solutiheys, kasvatusnesteen koostumus ja vastaanottajapopulaation valmiustila.",
        ),
        proximal_response=_t(
            "Culture medium from exposed cells produced a protective effect in unexposed recipients.",
            "Altistettujen solujen kasvatusneste tuotti suojaavan vaikutuksen altistamattomissa vastaanottajissa.",
        ),
        propagation=_t(
            "Secreted mediators in the shared medium, so the local tissue environment is part of the route.",
            "Yhteisessä nesteessä olevat eritetyt välittäjät, joten paikallinen kudosympäristö on osa reittiä.",
        ),
        memory=_t(
            "The transferred effect was present at the measured recipient time point after the donor exposure had ended.",
            "Siirtynyt vaikutus oli havaittavissa mitatulla vastaanottajan aikapisteellä luovuttajan altistuksen jo päätyttyä.",
        ),
        functional_consequence=_t(
            "Protection of the recipient population at the named damage endpoint.",
            "Vastaanottajapopulaation suojautuminen nimetyssä vauriopäätepisteessä.",
        ),
        mechanism_bounding=_t(
            "The recipients were never exposed, so the effect is bounded to a transferred signal rather than to direct field action. Together with the vesicle result this makes both the machinery and the later message transferable.",
            "Vastaanottajia ei altistettu, joten vaikutus rajautuu siirtyneeseen viestiin eikä suoraan kenttävaikutukseen. Yhdessä vesikkelituloksen kanssa tämä tekee sekä koneistosta että myöhemmästä viestistä siirrettävän.",
        ),
        layers=(6, 7),
        reference_ids=("zeni2021",),
        epistemic_level="E",
        implementing_modules=("berm.modulome.tissue",),
    ),
    MechanismCard(
        card_id="card.immune-functional-endpoint",
        title=_t(
            "An immune signal reported with its function",
            "Immuunisignaali raportoituna toimintansa kanssa",
        ),
        exposure=_t(
            "Brief pulsed electromagnetic exposure of macrophages, with co-culture conditions defined.",
            "Lyhyt pulssisähkömagneettinen altistus makrofageille määritellyissä yhteisviljelyolosuhteissa.",
        ),
        receptor=_t(
            "TRPC1 upstream of the STING and NF-kB route.",
            "TRPC1 STING- ja NF-κB-reitin yläpuolella.",
        ),
        baseline_state=_t(
            "Macrophage activation state and the state of the co-cultured target cells.",
            "Makrofagien aktivaatiotila ja yhteisviljeltyjen kohdesolujen tila.",
        ),
        proximal_response=_t(
            "Changed macrophage signalling through the TRPC1-STING-NF-kB route.",
            "Muuttunut makrofagien signalointi TRPC1–STING–NF-κB-reitin kautta.",
        ),
        propagation=_t(
            "From the immune cell to the co-cultured target cell, so the response is a tissue interaction rather than a single-cell readout.",
            "Immuunisolusta yhteisviljeltyyn kohdesoluun, joten vaste on kudosvuorovaikutus eikä yhden solun lukema.",
        ),
        memory=_t(
            "The functional change was measured after a brief exposure, so the response outlasts the exposure itself.",
            "Toiminnallinen muutos mitattiin lyhyen altistuksen jälkeen, joten vaste kestää altistusta pidempään.",
        ),
        functional_consequence=_t(
            "Phagocytosis of the target cells: a named function, not a signal level.",
            "Kohdesolujen fagosytoosi: nimetty toiminto, ei signaalitaso.",
        ),
        mechanism_bounding=_t(
            "Silencing or blocking TRPC1 abolished the reported responses. In this line of work the responses were often functionally useful, which is why a rise in an inflammatory or calcium signal always needs an endpoint beside it.",
            "TRPC1:n vaimentaminen tai esto kumosi raportoidut vasteet. Tässä tutkimuslinjassa vasteet olivat usein toiminnallisesti hyödyllisiä, minkä vuoksi tulehdus- tai kalsiumsignaalin nousu tarvitsee aina rinnalleen päätepisteen.",
        ),
        layers=(6, 7),
        reference_ids=("sukumar2026",),
        epistemic_level="E",
        implementing_modules=("berm.modulome.tissue",),
    ),
    MechanismCard(
        card_id="card.genotype-exposure-interaction",
        title=_t(
            "Measured genotype-by-exposure interaction",
            "Mitattu genotyypin ja altistuksen yhteisvaikutus",
        ),
        exposure=_t(
            "Controlled radiofrequency exposure during sleep in a randomised human study.",
            "Hallittu radiotaajuinen altistus unen aikana satunnaistetussa ihmistutkimuksessa.",
        ),
        receptor=_t(
            "CACNA1C genotype as the declared receptor-side variable.",
            "CACNA1C-genotyyppi ilmoitettuna vastaanotinpuolen muuttujana.",
        ),
        baseline_state=_t(
            "Genotyped participants with their own baseline sleep electroencephalogram.",
            "Genotyypitetyt osallistujat omine uni-EEG-lähtötasoineen.",
        ),
        proximal_response=_t(
            "Change in the sleep electroencephalogram at the named spindle endpoint.",
            "Muutos uni-EEG:ssä nimetyssä unisukkulapäätepisteessä.",
        ),
        propagation=_t(
            "Channel-level variation to a measurable neurophysiological readout in the same individuals.",
            "Kanavatason vaihtelu mitattavaksi neurofysiologiseksi lukemaksi samoilla henkilöillä.",
        ),
        memory=_t(
            "Read within the exposure night; persistence across nights was not the endpoint.",
            "Luettu altistusyön sisällä; öiden yli säilymistä ei mitattu päätepisteenä.",
        ),
        functional_consequence=_t(
            "A named sleep-spindle endpoint in humans rather than an inferred susceptibility score.",
            "Nimetty unisukkulapäätepiste ihmisillä eikä päätelty herkkyyspisteytys.",
        ),
        mechanism_bounding=_t(
            "The genotype was measured in the same people as the exposure and the endpoint, so the interaction is observed rather than assembled from separate populations. This is the form of genetic evidence the modulome prioritises.",
            "Genotyyppi mitattiin samoilta henkilöiltä kuin altistus ja päätepiste, joten yhteisvaikutus on havaittu eikä koottu erillisistä populaatioista. Tämä on se geneettisen näytön muoto, jonka moduloomi asettaa etusijalle.",
        ),
        layers=(2, 11),
        reference_ids=("sousouri2025",),
        epistemic_level="E",
        implementing_modules=("berm.modulome.state",),
    ),
    MechanismCard(
        card_id="card.iris-optical-exposure",
        title=_t(
            "Iris pigmentation as measured optical exposure",
            "Iiriksen pigmentaatio mitattuna optisena altistuksena",
        ),
        exposure=_t(
            "Identical illumination of two small groups, with the retinal light dose itself not measured.",
            "Identtinen valaistus kahdelle pienelle ryhmälle, ilman että verkkokalvon valoannosta itseään mitattiin.",
        ),
        receptor=_t(
            "The non-visual light input pathway; iris pigmentation acts at the entry point of the chain.",
            "Ei-visuaalinen valosyötereitti; iiriksen pigmentaatio vaikuttaa ketjun sisääntulossa.",
        ),
        baseline_state=_t(
            "Pigmentation and ethnic background varied together between the two groups.",
            "Pigmentaatio ja etninen tausta vaihtelivat yhdessä ryhmien välillä.",
        ),
        proximal_response=_t(
            "Melatonin suppression of 88.9 per cent versus 73.4 per cent under the same exposure.",
            "Melatoniinivaimennus 88,9 prosenttia vastaan 73,4 prosenttia samassa altistuksessa.",
        ),
        propagation=_t(
            "Optical transmission to the retina, then the circadian route already carried by layer 10.",
            "Optinen läpäisy verkkokalvolle ja sen jälkeen kerroksen 10 kantama sirkadiaaninen reitti.",
        ),
        memory=_t(
            "Single-session measurement; no persistence claim follows from it.",
            "Yhden istunnon mittaus; siitä ei seuraa väitettä pysyvyydestä.",
        ),
        functional_consequence=_t(
            "A difference in melatonin suppression at the measured endpoint.",
            "Ero melatoniinivaimennuksessa mitatussa päätepisteessä.",
        ),
        mechanism_bounding=_t(
            "The measurement bounds the claim to melatonin suppression under the stated exposure. It does not measure a hundredfold retinal light dose, so the modulome replaces that coefficient with measured optical exposure.",
            "Mittaus rajaa väitteen melatoniinivaimennukseen ilmoitetussa altistuksessa. Se ei mittaa satakertaista verkkokalvon valoannosta, joten moduloomi korvaa kertoimen mitatulla optisella altistuksella.",
        ),
        layers=(1, 10, 11),
        reference_ids=("higuchi2007",),
        epistemic_level="M|C",
        implementing_modules=("berm.modulome.photostate",),
    ),
)


def validate_mechanism_cards(
    cards: tuple[MechanismCard, ...] = MECHANISM_CARDS,
) -> tuple[MechanismCard, ...]:
    """Check card identity and that every card bounds its own mechanism."""
    seen: set[str] = set()
    for card in cards:
        if card.card_id in seen:
            raise ValueError(f"duplicate mechanism card id: {card.card_id}")
        seen.add(card.card_id)
        for name in CARD_FIELDS:
            value = getattr(card, name)
            if not isinstance(value, LocalisedText):
                raise ValueError(f"{card.card_id}: {name} must be a LocalisedText")
    return cards


def get_mechanism_card(card_id: str) -> MechanismCard:
    """Return one card by id."""
    wanted = nonempty("card_id", card_id)
    for card in MECHANISM_CARDS:
        if card.card_id == wanted:
            return card
    raise KeyError(f"unknown mechanism card: {wanted}")


def cards_for_layer(layer: int) -> tuple[MechanismCard, ...]:
    """Return every card that touches one modulome layer."""
    if isinstance(layer, bool) or not isinstance(layer, int):
        raise ValueError("layer must be an integer")
    return tuple(card for card in MECHANISM_CARDS if layer in card.layers)


def cards_manifest() -> Mapping[str, object]:
    """Serialisable manifest of every card, for the website export."""
    return {
        "modulomeVersion": MODULOME_VERSION,
        "cardFields": list(CARD_FIELDS),
        "cards": [card.as_dict() for card in validate_mechanism_cards()],
    }
