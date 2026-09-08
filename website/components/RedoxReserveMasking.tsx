import Link from "next/link";
import { ClaimRef } from "@/components/ClaimRef";
import { StudyCitation } from "@/components/StudyCitation";
import { pickCopy } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Level 1: the unmeasured reserve and the missing interaction",
    lead: "BERM connects reserve loss to statistical masking through the choice of outcome, timing and conditioning variables. If reserve is unmeasured and only the final challenge is recorded, the observed loss of function may be attributed entirely to that challenge. The biological reserve and its statistical visibility are separate stages of this explanation.",
    before: "Same hormone stimulus, no additional oxidant", after: "Same hormone stimulus, with an oxidant challenge",
    preserved: "In Chen’s MA-10 cells, depletion of reduced glutathione (GSH) by more than 80% could leave LH-stimulated progesterone production preserved without the added oxidant.",
    exposed: "Adding the oxidant exposed greater steroidogenic vulnerability in the depleted cells. The comparison concerns a measured reserve and a specified challenge, not an inferred hidden injury in every unchanged result.",
    distinction: "Preserved production can be real: a reserve may be consumed before output fails. An insensitive assay is another possible observation problem, requiring its own detection limits. These two explanations must not be counted as the same finding.",
    join: "The field-to-reserve link and reserve-to-function link come from different experiments. Miao measured GSH/GSSG changes and GSH in RF-exposed TM3 cells; Chen manipulated glutathione in MA-10 cells and measured progesterone under LH stimulation. Their connection is BERM synthesis through a shared biological state, not an end-to-end EMF–hormone experiment.",
    memory: "Timing adds a second observability problem. In Houston’s mice, ROS approached control levels during continued exposure while DNA damage persisted. Thus current ROS, accumulated damage and functional output should remain separate observations.",
    read: "Read the protocols, research families and reserve model", component: "Component experiment", field: "Field experiment", synthesis: "BERM synthesis",
  },
  fi: {
    title: "Taso 1: mittaamaton varanto ja puuttuva yhteisvaikutus",
    lead: "BERM yhdistää varantovajeen tilastolliseen peittymiseen päätepisteen, mittaushetken ja selittävien muuttujien valinnan kautta. Jos varantoa ei mitata ja vain viimeinen haaste kirjataan, toimintavaje voidaan selittää kokonaan tällä haasteella. Biologinen varanto ja sen tilastollinen näkyvyys ovat tämän selityksen eri vaiheita.",
    before: "Sama hormonistimulaatio, ilman lisäoksidanttia", after: "Sama hormonistimulaatio ja oksidanttihaaste",
    preserved: "Chenin MA-10-soluissa LH-stimuloitu progesteronituotanto säilyi yli 80 prosentin GSH-vähennyksestä huolimatta ilman lisäoksidanttia.",
    exposed: "Oksidantin lisääminen paljasti glutationivajeisten solujen suuremman steroidogeenisen haavoittuvuuden. Vertailu koskee mitattua varantoa ja nimettyä haastetta; jokaisesta muuttumattomasta tuloksesta ei päätellä piilovauriota.",
    distinction: "Tuotannon säilyminen voi olla todellista: varanto voi kulua ennen tuotannon heikkenemistä. Mittarin epäherkkyys on erillinen havainto-ongelma, jonka arviointi tarvitsee mittauksen havaitsemisrajat. Näitä kahta selitystä ei lasketa samaksi löydökseksi.",
    join: "Kenttä–varanto-yhteys ja varanto–toiminta-yhteys tulevat eri kokeista. Miao mittasi GSH/GSSG-muutoksia ja GSH:ta RF-altistetuissa TM3-soluissa; Chen muokkasi glutationia MA-10-soluissa ja mittasi progesteronia LH-stimulaatiossa. Niiden yhdistäminen yhteisen biologisen tilan kautta on BERM-synteesiä, ei yksi läpi ketjun tehty EMF–hormonikoe.",
    memory: "Ajoitus tuo toisen havaittavuusongelman. Houstonin hiirillä ROS lähestyi kontrollitasoa altistuksen jatkuessa, mutta DNA-vaurio säilyi. Hetkellinen ROS, kertynyt vaurio ja toimintatulos pidetään siksi erillisinä havaintoina.",
    read: "Tutki protokollat, tutkimusperheet ja varantomalli", component: "Komponenttikoe", field: "Kenttäkoe", synthesis: "BERM-synteesi",
  },
  ja: {
    title: "第1段階：未測定の予備能と欠落した相互作用", lead: "BERMは評価項目、測定時点、説明変数の選択を通じて予備能低下と統計的マスキングを結びます。予備能を測らず最後の負荷だけ記録すると、機能低下をその負荷だけに帰属させる可能性があります。生物学的予備能と統計的な可視性は別の段階です。",
    before: "同じホルモン刺激、追加酸化負荷なし", after: "同じホルモン刺激と追加酸化負荷", preserved: "ChenのMA-10細胞ではGSHを80%以上減らしても、追加酸化剤なしではLH刺激によるプロゲステロン産生が維持され得ました。", exposed: "酸化剤を加えると枯渇細胞の脆弱性が現れました。これは測定された予備能と指定負荷の比較であり、全ての不変結果に隠れた損傷を推定するものではありません。",
    distinction: "産生の維持は実際に起こり得ます。出力が低下する前に予備能が消費される場合があります。測定感度の不足は別の問題で、検出限界の確認が必要です。両者を同じ所見として数えません。", join: "MiaoはRF曝露TM3細胞のGSH/GSSG変化とGSHを測定し、ChenはMA-10細胞のグルタチオンを操作してLH刺激下のプロゲステロンを測定しました。共通状態を介する接続はBERMの統合であり、単一の電磁場からホルモンまでの実験ではありません。", memory: "Houstonのマウスでは曝露継続中にROSが対照値へ近づいてもDNA損傷が残りました。現在のROS、蓄積損傷、機能は別々に記録します。", read: "実験条件、研究群、予備能モデルを読む", component: "構成要素実験", field: "電磁場実験", synthesis: "BERM統合",
  },
  fr: {
    title: "Niveau 1 : réserve non mesurée et interaction manquante", lead: "BERM relie perte de réserve et masquage statistique par le choix du résultat, du moment et des variables. Si seule la dernière charge est enregistrée, une perte fonctionnelle peut lui être entièrement attribuée. Réserve biologique et visibilité statistique constituent deux étapes distinctes.",
    before: "Même stimulation hormonale, sans oxydant ajouté", after: "Même stimulation hormonale, avec charge oxydante", preserved: "Dans les cellules MA-10 de Chen, une déplétion du GSH supérieure à 80 % pouvait préserver la production de progestérone stimulée par LH sans oxydant supplémentaire.", exposed: "L’ajout d’oxydant révélait une plus grande vulnérabilité stéroïdogène. La comparaison porte sur une réserve mesurée et une charge définie, sans supposer une lésion cachée dans tout résultat inchangé.",
    distinction: "La production préservée peut être réelle : la réserve peut diminuer avant que la fonction baisse. Une mesure peu sensible est un problème distinct qui nécessite ses propres limites de détection. Ces deux explications ne constituent pas un même résultat.", join: "Miao a mesuré les changements de GSH/GSSG et le GSH de cellules TM3 exposées aux RF ; Chen a manipulé le glutathion de cellules MA-10 et mesuré la progestérone sous LH. Leur connexion par un état commun est une synthèse BERM, pas une expérience unique couvrant toute la chaîne champ–hormone.", memory: "Chez les souris de Houston, les ROS se rapprochaient du témoin pendant que l’exposition continuait, alors que les lésions de l’ADN persistaient. ROS actuels, dommages accumulés et fonction restent distincts.", read: "Lire les protocoles, familles de recherche et modèle de réserve", component: "Expérience sur un composant", field: "Expérience de champ", synthesis: "Synthèse BERM",
  },
  ko: {
    title: "1단계: 측정하지 않은 예비능과 누락된 상호작용", lead: "BERM은 결과 지표, 측정 시점, 설명 변수의 선택을 통해 예비능 손실과 통계적 가림을 연결합니다. 예비능 없이 마지막 부하만 기록하면 기능 손실을 그 부하에만 귀속할 수 있습니다. 생물학적 예비능과 통계적 가시성은 별도 단계입니다.",
    before: "같은 호르몬 자극, 추가 산화제 없음", after: "같은 호르몬 자극과 추가 산화 부하", preserved: "Chen의 MA-10 세포에서는 GSH가 80% 넘게 고갈되어도 추가 산화제 없이는 LH 자극 프로게스테론 생산이 유지될 수 있었습니다.", exposed: "산화제를 추가하면 고갈된 세포의 스테로이드 생성 취약성이 드러났습니다. 이는 측정된 예비능과 명시된 부하의 비교이며 모든 불변 결과에서 숨은 손상을 추론하지 않습니다.",
    distinction: "생산 유지는 실제일 수 있습니다. 출력이 저하되기 전에 예비능이 소모될 수 있습니다. 낮은 측정 감도는 별도 문제이며 검출 한계가 필요합니다. 둘을 같은 발견으로 세지 않습니다.", join: "Miao는 RF 노출 TM3 세포의 GSH/GSSG 변화와 GSH를 측정했고, Chen은 MA-10 세포에서 글루타티온을 조작하고 LH 자극 프로게스테론을 측정했습니다. 공통 상태를 통한 연결은 BERM 종합이며 단일 전자기장–호르몬 실험이 아닙니다.", memory: "Houston의 생쥐에서는 노출이 계속되는 동안 ROS가 대조군 수준에 접근했지만 DNA 손상은 남았습니다. 현재 ROS, 축적 손상, 기능 결과는 별도로 기록합니다.", read: "프로토콜, 연구 계열 및 예비능 모델 읽기", component: "구성 요소 실험", field: "전자기장 실험", synthesis: "BERM 종합",
  },
};

export function RedoxReserveMasking({ locale }: { locale: string }) {
  const c = pickCopy(COPY, locale);
  return <section id="redox-reserve-masking" aria-labelledby="redox-reserve-heading" className="my-8 scroll-mt-28 space-y-5 rounded-xl border border-accent/30 p-5 sm:p-7">
    <p className="text-xs font-semibold uppercase tracking-wide text-accent">{c.synthesis}</p>
    <h3 id="redox-reserve-heading" className="font-serif text-2xl">{c.title}</h3>
    <p className="leading-7"><ClaimRef claimId="claim.steroidogenesis.reserve-masking">{c.lead}</ClaimRef></p>
    <div className="grid gap-4 sm:grid-cols-2">{[[c.before, c.preserved], [c.after, c.exposed]].map(([title, text]) => <div key={title} className="rounded-lg border border-card-border p-4"><p className="text-xs text-accent">{c.component}</p><h4 className="my-3 font-semibold">{title}</h4><p className="text-sm leading-6">{text}</p></div>)}</div>
    <StudyCitation referenceId="chen2010_glutathione" locale={locale} />
    <p className="text-sm leading-7 text-foreground-muted">{c.distinction}</p>
    <p className="leading-7">{c.join}</p>
    <StudyCitation referenceId="miao2025_rf_metabolomics" locale={locale} />
    <p className="text-xs font-semibold text-accent">{c.field}</p>
    <p className="text-sm leading-7">{c.memory}</p>
    <StudyCitation referenceId="sci-rep-2019-sperm-ros" locale={locale} />
    <Link className="inline-block text-sm font-semibold text-accent hover:underline" href={`/${locale}/biology/calcium-redox-steroidogenesis#redox-reserve`}>{c.read} →</Link>
  </section>;
}
