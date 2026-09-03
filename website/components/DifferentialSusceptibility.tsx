import Link from "next/link";
import { InlineReferenceText } from "@/components/InlineReferenceText";
import { pickCopy } from "@/lib/i18n";


type ProfileRow = {
  organism: string;
  stars: number;
  mechanism: string;
  effect: string;
};

const COPY = {
  en: {
    title: "BERM-Eco: Differential Electromagnetic Susceptibility as a Novel Selection Pressure",
    p1: "The EMF modulome does not affect all species equally. Each species' \"modulome profile\" — which ion channels, which sensors, what body size, what cell division rate — determines how it responds to the changed electromagnetic environment. Species whose critical biological processes depend on electromagnetic sensing (navigation, circadian regulation, electrostatic communication) are more vulnerable than species whose survival strategies are chemical or mechanical.",
    p2: "Honeybees rely on magnetoreception for navigation, electrostatic sensing for pollen collection, olfaction for hygienic behavior, and circadian regulation for colony coordination — all electromagnetically mediated. Varroa destructor relies on chemical host-finding, salivary chitinase for feeding, and is protected by a rigid sclerotin exoskeleton. EMF weakens the host and does not affect the parasite. This differential creates a new selection pressure that favors EMF-robust parasites at the expense of EMF-sensitive hosts.",
    p3: "This principle extends beyond bees. Tick populations (Ixodes, Dermacentor) are expanding across Europe and North America. Ticks use electrostatic host-contact ([[ref:england_2023_ticks|England 2023, Current Biology]]), which motivates a BERM test of changed physical field conditions. FieldState would record those conditions; it does not supply the biological mechanism or ecological outcome. Predator, habitat, climate and host-density alternatives must be tested alongside the proposed pathway.",
    tableTitle: "Species modulome profiles",
    colOrganism: "Organism",
    colSensitivity: "EM sensitivity",
    colMechanism: "Primary mechanism",
    colEffect: "EMF effect",
    profiles: [
      { organism: "Honeybee", stars: 5, mechanism: "CRY/RPM, electrostatic sense", effect: "Weakens" },
      { organism: "Migratory bird", stars: 5, mechanism: "CRY/RPM compass", effect: "Disorients" },
      { organism: "Bat", stars: 4, mechanism: "Magnetic compass", effect: "Disorients" },
      { organism: "Moth", stars: 4, mechanism: "GHz resonance", effect: "Absorption ↑" },
      { organism: "Human", stars: 3, mechanism: "VGCC, CRY, VNS", effect: "Chronic disease" },
      { organism: "Varroa mite", stars: 1, mechanism: "Chemical", effect: "Shielded" },
      { organism: "Ixodes tick", stars: 1, mechanism: "Electrostatic", effect: "May benefit" },
    ] as ProfileRow[],
    sentinelLink: "See Varroa cascade analysis",
    ecologyLink: "Selection landscape",
    epistemicNote: "Sensitivity ratings are BERM-Eco estimates [H] based on known mechanisms and body-plan physics — not measured differential values. Individual mechanism citations carry their own evidence levels (see references).",
  },
  fi: {
    title: "BERM-Eco: Differentiaalinen sähkömagneettinen herkkyys uutena valintapaineena",
    p1: "EMF-modulomi ei vaikuta kaikkiin lajeihin yhtäläisesti. Jokaisen lajin \"modulomiprofiili\" — mitkä ionikanavat, mitkä sensorit, mikä kehon koko, mikä solunjakautumisnopeus — määrää miten se reagoi muuttuneeseen sähkömagneettiseen ympäristöön. Lajit joiden kriittiset biologiset prosessit riippuvat sähkömagneettisesta aistimisesta (navigointi, vuorokausirytmin säätelystä, sähköstaattinen viestintä) ovat haavoittuvampia kuin lajit joiden selviytymisstrategiat ovat kemiallisia tai mekaanisia.",
    p2: "Mehiläiset luottavat magnetoreseptioon navigoinnissa, sähköstaattiseen aistimiseen siitepölyn keräämisessä, hajuaistiin hygieenisessä käyttäytymisessä ja vuorokausirytmin säätelyyn yhdyskunnan koordinoinnissa — kaikki sähkömagneettisesti välitettyjä. Varroa destructor luottaa kemialliseen isännänlöytöön, sylkikitinaasiin syöttämisessä ja on suojattu jäykällä sklerotiini-ulkokuorella. EMF heikentää isäntää eikä vaikuta loiseen. Tämä ero luo uuden valintapaineen joka suosii EMF-kestäviä loisia EMF-herkkien isäntien kustannuksella.",
    p3: "Tämä periaate ulottuu mehiläisten ulkopuolelle. Punkit käyttävät sähköstaattista isäntäkontaktia ([[ref:england_2023_ticks|England 2023, Current Biology]]), mikä motivoi BERM-testiä muuttuneista fysikaalisista kenttäoloista. FieldState vain mittaisi olot; se ei tuota biologista mekanismia eikä ekologista tulosta. Saalistaja-, elinympäristö-, ilmasto- ja isäntätiheysvaihtoehdot on testattava ehdotetun reitin rinnalla.",
    tableTitle: "Lajikohtaiset moduloomiprofiilit",
    colOrganism: "Organismi",
    colSensitivity: "EM-herkkyys",
    colMechanism: "Päämekanismi",
    colEffect: "EMF-vaikutus",
    profiles: [
      { organism: "Mehiläinen", stars: 5, mechanism: "CRY/RPM, sähköaisti", effect: "Heikkenee" },
      { organism: "Muuttolintu", stars: 5, mechanism: "CRY/RPM-kompassi", effect: "Desorientoituu" },
      { organism: "Lepakko", stars: 4, mechanism: "Magneettikompassi", effect: "Desorientoituu" },
      { organism: "Yöperhonen", stars: 4, mechanism: "GHz-resonanssi", effect: "Absorptiokasvu" },
      { organism: "Ihminen", stars: 3, mechanism: "VGCC, CRY, VNS", effect: "Krooninen tauti" },
      { organism: "Varroa-punkki", stars: 1, mechanism: "Kemiallinen", effect: "Suojassa" },
      { organism: "Ixodes-punkki", stars: 1, mechanism: "Sähköstaattinen", effect: "Voi hyötyä" },
    ] as ProfileRow[],
    sentinelLink: "Katso Varroa-kaskadianalyysi",
    ecologyLink: "Valintamaisema",
    epistemicNote: "Herkkyysluokitukset ovat BERM-Eco-arvioita [H] perustuen tunnettuihin mekanismeihin ja ruumiinrakenteen fysiikkaan — eivät mitattuja differentiaaliarvoja. Yksittäisten mekanismien viittaukset kantavat omat näyttötasonsa (ks. lähdeluettelo).",
  },
  ja: {
    title: "BERM-Eco: 新たな淘汰圧としての差異的電磁感受性",
    p1: "EMFモジュロームはすべての種に均等に影響するわけではない。各種の「モジュロームプロファイル」— どのイオンチャネル、どのセンサー、どの体サイズ、どの細胞分裂速度 — が、変化した電磁環境にどう応答するかを決定する。重要な生物学的プロセスが電磁感知（ナビゲーション、概日調節、静電気コミュニケーション）に依存する種は、生存戦略が化学的または機械的な種よりも脆弱である。",
    p2: "ミツバチはナビゲーションに磁気受容、花粉収集に静電気感知、衛生行動に嗅覚、コロニー調整に概日調節を利用する — すべて電磁的に媒介される。Varroa destructorは化学的宿主発見、摂食のための唾液キチナーゼに依存し、硬いスクレロチン外骨格で保護されている。EMFは宿主を弱体化させるが寄生虫には影響しない。この差異がEMF耐性寄生虫をEMF感受性宿主の犠牲において有利にする新たな淘汰圧を生み出す。",
    p3: "ダニは静電的な宿主接触を利用する（[[ref:england_2023_ticks|England 2023, Current Biology]]）。これは物理的場環境の変化を検証するBERM試験を動機づける。FieldStateは条件を測定するだけで、生物学的機構や生態学的結果を導出しない。捕食者、生息地、気候、宿主密度の代替説明も同時に検証する。",
    tableTitle: "種別モジュロームプロファイル",
    colOrganism: "生物",
    colSensitivity: "EM感受性",
    colMechanism: "主要メカニズム",
    colEffect: "EMF効果",
    profiles: [
      { organism: "ミツバチ", stars: 5, mechanism: "CRY/RPM、静電気感知", effect: "弱体化" },
      { organism: "渡り鳥", stars: 5, mechanism: "CRY/RPMコンパス", effect: "方向喪失" },
      { organism: "コウモリ", stars: 4, mechanism: "磁気コンパス", effect: "方向喪失" },
      { organism: "蛾", stars: 4, mechanism: "GHz共鳴", effect: "吸収増加" },
      { organism: "ヒト", stars: 3, mechanism: "VGCC, CRY, VNS", effect: "慢性疾患" },
      { organism: "ヘギイタダニ", stars: 1, mechanism: "化学的", effect: "防護" },
      { organism: "マダニ", stars: 1, mechanism: "静電気", effect: "利益の可能性" },
    ] as ProfileRow[],
    sentinelLink: "Varroaカスケード分析を見る",
    ecologyLink: "淘汰環境",
    epistemicNote: "感受性評価は既知のメカニズムと体制物理学に基づくBERM-Eco推定 [H] であり、測定された差異値ではない。個々のメカニズムの引用は独自のエビデンスレベルを持つ（参考文献参照）。",
  },
  fr: {
    title: "BERM-Eco : La susceptibilité électromagnétique différentielle comme nouvelle pression de sélection",
    p1: "Le modulome EMF n'affecte pas toutes les espèces de manière égale. Le « profil de modulome » de chaque espèce — quels canaux ioniques, quels capteurs, quelle taille corporelle, quel taux de division cellulaire — détermine sa réponse à l'environnement électromagnétique modifié. Les espèces dont les processus biologiques critiques dépendent de la détection électromagnétique (navigation, régulation circadienne, communication électrostatique) sont plus vulnérables que celles dont les stratégies de survie sont chimiques ou mécaniques.",
    p2: "Les abeilles utilisent la magnétoréception pour la navigation, la détection électrostatique pour la collecte du pollen, l'olfaction pour le comportement hygiénique et la régulation circadienne pour la coordination de la colonie — toutes médiées électromagnétiquement. Varroa destructor utilise la recherche chimique de l'hôte, la chitinase salivaire pour l'alimentation et est protégé par un exosquelette rigide en sclérotine. L'EMF affaiblit l'hôte sans affecter le parasite. Cette différence crée une nouvelle pression de sélection favorisant les parasites résistants aux EMF au détriment des hôtes sensibles.",
    p3: "Les tiques utilisent le contact électrostatique avec l'hôte ([[ref:england_2023_ticks|England 2023, Current Biology]]), ce qui motive un test BERM des changements du milieu physique. FieldState ne ferait qu'enregistrer ces conditions ; il ne fournit ni mécanisme biologique ni résultat écologique. Les alternatives liées aux prédateurs, à l'habitat, au climat et à la densité d'hôtes doivent être testées en parallèle.",
    tableTitle: "Profils de modulome par espèce",
    colOrganism: "Organisme",
    colSensitivity: "Sensibilité EM",
    colMechanism: "Mécanisme principal",
    colEffect: "Effet EMF",
    profiles: [
      { organism: "Abeille", stars: 5, mechanism: "CRY/RPM, sens électrostatique", effect: "Affaiblie" },
      { organism: "Oiseau migrateur", stars: 5, mechanism: "Boussole CRY/RPM", effect: "Désorienté" },
      { organism: "Chauve-souris", stars: 4, mechanism: "Boussole magnétique", effect: "Désorientée" },
      { organism: "Papillon de nuit", stars: 4, mechanism: "Résonance GHz", effect: "Absorption ↑" },
      { organism: "Humain", stars: 3, mechanism: "VGCC, CRY, VNS", effect: "Maladie chronique" },
      { organism: "Acarien Varroa", stars: 1, mechanism: "Chimique", effect: "Protégé" },
      { organism: "Tique Ixodes", stars: 1, mechanism: "Électrostatique", effect: "Peut bénéficier" },
    ] as ProfileRow[],
    sentinelLink: "Voir l'analyse de la cascade Varroa",
    ecologyLink: "Paysage de sélection",
    epistemicNote: "Les évaluations de sensibilité sont des estimations BERM-Eco [H] basées sur les mécanismes connus et la physique du plan corporel — et non des valeurs différentielles mesurées. Les citations de mécanismes individuels portent leurs propres niveaux de preuve (voir références).",
  },
  ko: {
    title: "BERM-Eco: 새로운 선택압으로서의 차별적 전자기 감수성",
    p1: "EMF 모듈롬은 모든 종에 균등하게 영향을 미치지 않는다. 각 종의 '모듈롬 프로파일' — 어떤 이온 채널, 어떤 센서, 어떤 체구, 어떤 세포 분열 속도 — 이 변화된 전자기 환경에 어떻게 반응하는지를 결정한다. 핵심 생물학적 과정이 전자기 감지(항법, 일주기 조절, 정전기 통신)에 의존하는 종은 생존 전략이 화학적이거나 기계적인 종보다 더 취약하다.",
    p2: "꿀벌은 항법에 자기수용, 꽃가루 수집에 정전기 감지, 위생 행동에 후각, 군집 조정에 일주기 조절을 의존한다 — 모두 전자기적으로 매개된다. Varroa destructor는 화학적 숙주 발견, 식이를 위한 타액 키티나아제에 의존하며 단단한 경피질 외골격으로 보호된다. EMF는 숙주를 약화시키지만 기생충에는 영향을 주지 않는다. 이 차이가 EMF에 민감한 숙주를 희생시키며 EMF에 강한 기생충을 유리하게 하는 새로운 선택압을 만든다.",
    p3: "진드기는 정전기 숙주 접촉을 사용합니다([[ref:england_2023_ticks|England 2023, Current Biology]]). 이는 물리적 장 환경 변화에 대한 BERM 검사를 동기화합니다. FieldState는 조건을 기록할 뿐 생물학적 메커니즘이나 생태 결과를 도출하지 않습니다. 포식자·서식지·기후·숙주 밀도 대안도 함께 검사해야 합니다.",
    tableTitle: "종별 모듈롬 프로파일",
    colOrganism: "생물",
    colSensitivity: "EM 감수성",
    colMechanism: "주요 메커니즘",
    colEffect: "EMF 효과",
    profiles: [
      { organism: "꿀벌", stars: 5, mechanism: "CRY/RPM, 정전기 감지", effect: "약화" },
      { organism: "철새", stars: 5, mechanism: "CRY/RPM 나침반", effect: "방향 상실" },
      { organism: "박쥐", stars: 4, mechanism: "자기 나침반", effect: "방향 상실" },
      { organism: "나방", stars: 4, mechanism: "GHz 공명", effect: "흡수 증가" },
      { organism: "인간", stars: 3, mechanism: "VGCC, CRY, VNS", effect: "만성 질환" },
      { organism: "꿀벌응애", stars: 1, mechanism: "화학적", effect: "방호" },
      { organism: "참진드기", stars: 1, mechanism: "정전기", effect: "이익 가능" },
    ] as ProfileRow[],
    sentinelLink: "Varroa 연쇄 분석 보기",
    ecologyLink: "선택 환경",
    epistemicNote: "감수성 평가는 알려진 메커니즘과 체형 물리학에 기반한 BERM-Eco 추정 [H]이며, 측정된 차별적 값이 아니다. 개별 메커니즘 인용은 자체 증거 수준을 가진다(참고문헌 참조).",
  },
} as const;

function Stars({ count }: { count: number }) {
  return (
    <span className="font-mono-num text-accent tracking-wider">
      {"★".repeat(count)}
      <span className="text-foreground-muted/20">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export function DifferentialSusceptibility({ locale }: { locale: string }) {
  const d = pickCopy(COPY, locale);
  const prefix = `/${locale}`;

  return (
    <section className="mb-16 border-t editorial-rule pt-6 max-w-4xl">
      <h2 className="editorial-section-heading mb-4">{d.title}</h2>

      <div className="space-y-4 text-sm text-foreground-muted leading-relaxed mb-8">
        <p>{d.p1}</p>
        <p>{d.p2}</p>
        <p><InlineReferenceText text={d.p3} locale={locale} /></p>
      </div>

      {/* Modulome profiles table */}
      <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-card-border">
          <h3 className="text-sm font-semibold">{d.tableTitle}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-card-border text-left text-xs text-foreground-muted uppercase tracking-wider">
                <th className="py-2.5 px-5">{d.colOrganism}</th>
                <th className="py-2.5 px-3">{d.colSensitivity}</th>
                <th className="py-2.5 px-3">{d.colMechanism}</th>
                <th className="py-2.5 px-3">{d.colEffect}</th>
              </tr>
            </thead>
            <tbody>
              {d.profiles.map((row) => (
                <tr key={row.organism} className="border-b border-card-border/40">
                  <td className="py-2.5 px-5 font-medium text-foreground">{row.organism}</td>
                  <td className="py-2.5 px-3">
                    <Stars count={row.stars} />
                  </td>
                  <td className="py-2.5 px-3 text-foreground-muted">{row.mechanism}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={
                        row.stars >= 3
                          ? "text-status-refuted"
                          : "text-status-confirmed"
                      }
                    >
                      {row.effect}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-foreground-muted/60 leading-relaxed italic mb-6">
        {d.epistemicNote}
      </p>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href={`${prefix}/sentinel`} className="text-accent hover:underline">
          {d.sentinelLink} →
        </Link>
        <Link href={`${prefix}/ecology`} className="text-accent hover:underline">
          {d.ecologyLink} →
        </Link>
      </div>
    </section>
  );
}
