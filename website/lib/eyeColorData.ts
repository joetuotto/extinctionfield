export interface EvidenceCard {
  id: string;
  referenceId?: string;
  title_en: string;
  title_fi: string;
  title_ja: string;
  title_fr: string;
  title_ko: string;
  authors: string;
  year: number;
  journal: string;
  doi?: string;
  pmid?: string;
  level: string;
  finding_en: string;
  finding_fi: string;
  finding_ja: string;
  finding_fr: string;
  finding_ko: string;
  berm_relevance_en?: string;
  berm_relevance_fi?: string;
  berm_relevance_ja?: string;
  berm_relevance_fr?: string;
  berm_relevance_ko?: string;
}

export interface EyeProfile {
  color: string;
  label_en: string;
  label_fi: string;
  label_ja: string;
  label_fr: string;
  label_ko: string;
  transmission: string;
  cry_activation: string;
  cry_stability: string;
  snr: string;
  circadian: string;
  magnetoreception: string;
  sex_prevalence: string;
  adaptive_context_en: string;
  adaptive_context_fi: string;
  adaptive_context_ja: string;
  adaptive_context_fr: string;
  adaptive_context_ko: string;
  geographic: string;
}

export interface NutritionalModulator {
  nutrient: string;
  target: string;
  deficiency_effect_en: string;
  deficiency_effect_fi: string;
  deficiency_effect_ja: string;
  deficiency_effect_fr: string;
  deficiency_effect_ko: string;
  key_source: string;
  referenceIds?: string[];
  level: string;
}

export interface Prediction {
  id: string;
  title_en: string;
  title_fi: string;
  title_ja: string;
  title_fr: string;
  title_ko: string;
  test_en: string;
  test_fi: string;
  test_ja: string;
  test_fr: string;
  test_ko: string;
  discriminating: boolean;
}

export const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    id: "hirano2017-fad-cry",
    referenceId: "hirano2017",
    title_en: "FAD stabilizes cryptochrome proteins",
    title_fi: "FAD stabiloi kryptokromiproteiineja",
    title_ja: "FADがクリプトクロムタンパク質を安定化する",
    title_fr: "Le FAD stabilise les protéines cryptochrome",
    title_ko: "FAD가 크립토크롬 단백질을 안정화한다",
    authors: "Hirano A, Braas D, Fu Y-H, Ptáček LJ",
    year: 2017,
    journal: "Cell Reports",
    doi: "10.1016/j.celrep.2017.03.041",
    pmid: "28402850",
    level: "E",
    finding_en: "FAD stabilizes CRY1 and CRY2 proteins. Riboflavin kinase (Rfk) knockdown combined with B2-deficient diet decreased CRY levels in mouse liver and altered circadian gene expression, particularly genes related to glucose homeostasis.",
    finding_fi: "FAD stabiloi CRY1- ja CRY2-proteiineja. Riboflaviinikinaasin (Rfk) hiljennetty ekspressio yhdistettynä B2-puutteiseen ruokavalioon laski CRY-tasoja hiiren maksassa ja muutti kellogeenien ekspressioprofiileja, erityisesti glukoosihomeostaasiin liittyvien.",
    finding_ja: "FADはCRY1およびCRY2タンパク質を安定化する。リボフラビンキナーゼ（Rfk）のノックダウンとB2欠乏食の併用により、マウス肝臓のCRYレベルが低下し、概日時計遺伝子の発現が変化した。特にグルコース恒常性関連遺伝子への影響が顕著であった。",
    finding_fr: "Le FAD stabilise les protéines CRY1 et CRY2. L'inactivation de la riboflavine kinase (Rfk) combinée à un régime déficient en B2 a diminué les niveaux de CRY dans le foie de souris et altéré l'expression des gènes circadiens, en particulier ceux liés à l'homéostasie du glucose.",
    finding_ko: "FAD는 CRY1 및 CRY2 단백질을 안정화한다. 리보플라빈 키나아제(Rfk) 녹다운과 B2 결핍 식이를 병용하면 마우스 간에서 CRY 수치가 감소하고 개일시계 유전자 발현이 변화하였으며, 특히 포도당 항상성 관련 유전자에 영향을 미쳤다.",
    berm_relevance_en: "Direct evidence that vitamin B2 availability controls CRY protein levels and circadian clock function. Establishes the nutritional prerequisite for BERM pathway C.",
    berm_relevance_fi: "Suora näyttö siitä, että B2-vitamiinin saatavuus kontrolloi CRY-proteiinien tasoja ja sirkadiaanisen kellon toimintaa. Vahvistaa BERM:n polku C:n ravitsemuksellisen edellytyksen.",
    berm_relevance_ja: "ビタミンB2の利用可能性がCRYタンパク質レベルと概日時計機能を制御するという直接的証拠。BERMパスウェイCの栄養的前提条件を確立する。",
    berm_relevance_fr: "Preuve directe que la disponibilité en vitamine B2 contrôle les niveaux de protéine CRY et la fonction de l'horloge circadienne. Établit le prérequis nutritionnel pour la voie C du BERM.",
    berm_relevance_ko: "비타민 B2 이용 가능성이 CRY 단백질 수준과 개일시계 기능을 제어한다는 직접적 증거. BERM 경로 C의 영양적 전제조건을 확립한다.",
  },
  {
    id: "sherrard2025-cry2-trpc1",
    referenceId: "yap2025",
    title_en: "CRY2-TRPC1 magnetotransduction requires FAD and light",
    title_fi: "CRY2-TRPC1-magnetotransduktio vaatii FAD:tä ja valoa",
    title_ja: "CRY2-TRPC1磁気伝達にはFADと光が必要である",
    title_fr: "La magnétotransduction CRY2-TRPC1 nécessite le FAD et la lumière",
    title_ko: "CRY2-TRPC1 자기전달에는 FAD와 빛이 필요하다",
    authors: "Yap JLY, Tai YK, Franco-Obregón A et al.",
    year: 2025,
    journal: "Cells",
    doi: "10.3390/cells14030231",
    level: "E",
    finding_en: "Silencing riboflavin kinase (RFK) — which depletes cellular FAD — attenuated responsiveness to pulsed electromagnetic fields AND inhibited selectivity for magnetic field direction. Growth in the dark produced the same loss of magnetic sensitivity. CRY2 overexpression enhanced PEMF responses. CRY2 and TRPC1 physically interact and co-translocate to the nucleus after PEMF exposure.",
    finding_fi: "Riboflaviinikinaasin (RFK) hiljentäminen — joka vähentää solunsisäistä FAD:tä — heikensi vastetta pulssisähkömagneettisille kentille JA esti magneettikentän suunnan erottelukyvyn. Kasvu pimeässä tuotti saman magneettisen herkkyyden menetyksen. CRY2:n yliekspressio vahvisti PEMF-vasteita. CRY2 ja TRPC1 muodostavat fyysisen interaktion ja siirtyvät yhdessä tumaan PEMF-altistuksen jälkeen.",
    finding_ja: "リボフラビンキナーゼ（RFK）のサイレンシング（細胞内FADを枯渇させる）はパルス電磁場への応答性を減弱させ、かつ磁場方向の選択性を阻害した。暗所での培養も同様の磁気感受性の喪失を生じた。CRY2の過剰発現はPEMF応答を増強した。CRY2とTRPC1は物理的に相互作用し、PEMF曝露後に共に核内に移行する。",
    finding_fr: "L'inactivation de la riboflavine kinase (RFK) — qui épuise le FAD cellulaire — a atténué la réactivité aux champs électromagnétiques pulsés ET inhibé la sélectivité directionnelle du champ magnétique. La croissance dans l'obscurité a produit la même perte de sensibilité magnétique. La surexpression de CRY2 a amplifié les réponses PEMF. CRY2 et TRPC1 interagissent physiquement et se co-transloquent vers le noyau après exposition PEMF.",
    finding_ko: "리보플라빈 키나아제(RFK) 사일런싱(세포 내 FAD를 고갈시킴)은 펄스 전자기장에 대한 반응성을 감소시키고 자기장 방향 선택성을 억제하였다. 암소 배양도 동일한 자기 감수성 상실을 초래하였다. CRY2 과발현은 PEMF 반응을 증강시켰다. CRY2와 TRPC1은 물리적으로 상호작용하며 PEMF 노출 후 함께 핵으로 이동한다.",
    berm_relevance_en: "Smoking gun for the nutrition-magnetoreception link. Also reveals that BERM pathways A (VGIC/TRPC1) and C (CRY/RPM) are physically coupled through a CRY2-TRPC1 complex — they are not independent.",
    berm_relevance_fi: "Suora todiste ravitsemuksen ja magnetoreseption yhteydestä. Paljastaa myös, että BERM:n polut A (VGIC/TRPC1) ja C (CRY/RPM) ovat fyysisesti kytketyt CRY2-TRPC1-kompleksin kautta — ne eivät ole riippumattomia.",
    berm_relevance_ja: "栄養と磁気受容の関連を示す決定的証拠。また、BERMパスウェイA（VGIC/TRPC1）とC（CRY/RPM）がCRY2-TRPC1複合体を通じて物理的に結合していることを明らかにした――両者は独立ではない。",
    berm_relevance_fr: "Preuve décisive du lien nutrition-magnétoréception. Révèle également que les voies BERM A (VGIC/TRPC1) et C (CRY/RPM) sont physiquement couplées via un complexe CRY2-TRPC1 — elles ne sont pas indépendantes.",
    berm_relevance_ko: "영양-자기수용 연결의 결정적 증거. 또한 BERM 경로 A(VGIC/TRPC1)와 C(CRY/RPM)가 CRY2-TRPC1 복합체를 통해 물리적으로 결합되어 있음을 밝혔다 — 이들은 독립적이지 않다.",
  },
  {
    id: "higuchi2007-eye-melatonin",
    referenceId: "higuchi2007",
    title_en: "Eye color influences melatonin suppression by light",
    title_fi: "Silmien väri vaikuttaa valon aiheuttamaan melatoniinisuppressioon",
    title_ja: "眼の色が光によるメラトニン抑制に影響する",
    title_fr: "La couleur des yeux influence la suppression de la mélatonine par la lumière",
    title_ko: "눈 색깔이 빛에 의한 멜라토닌 억제에 영향을 미친다",
    authors: "Higuchi S, Motohashi Y, Ishibashi K, Maeda T",
    year: 2007,
    journal: "Am J Physiol Regul Integr Comp Physiol",
    doi: "10.1152/ajpregu.00355.2006",
    pmid: "17332164",
    level: "M|C",
    finding_en: "Light-eyed Caucasians showed 89% melatonin suppression vs 73% for dark-eyed Asians under identical 1000 lux exposure for 2 hours. The difference suggests that iris pigmentation directly modulates the non-visual light pathway to the circadian clock.",
    finding_fi: "Sinisilmäisten kaukaasialaisten melatoniinin suppressio oli 89 % verrattuna tummasilmäisten aasialaisten 73 %:iin identtisessä 1000 luksin altistuksessa 2 tunnin ajan. Ero viittaa siihen, että iiriksen pigmentaatio moduloi suoraan ei-visuaalista valoreittiä sirkadiaaniseen kelloon.",
    finding_ja: "明るい色の目のコーカサス人は同一の1000ルクス2時間曝露条件下で89%のメラトニン抑制を示し、暗い色の目のアジア人の73%と比較された。この差は虹彩色素沈着が概日時計への非視覚的光経路を直接調節することを示唆する。",
    finding_fr: "Les Caucasiens aux yeux clairs ont montré une suppression de la mélatonine de 89 % contre 73 % pour les Asiatiques aux yeux foncés sous une exposition identique de 1000 lux pendant 2 heures. La différence suggère que la pigmentation de l'iris module directement la voie lumineuse non visuelle vers l'horloge circadienne.",
    finding_ko: "밝은 눈의 코카서스인은 동일한 1000럭스 2시간 노출 조건에서 89%의 멜라토닌 억제를 보인 반면, 어두운 눈의 아시아인은 73%를 보였다. 이 차이는 홍채 색소침착이 개일시계로의 비시각적 광경로를 직접 조절함을 시사한다.",
    berm_relevance_en: "Quantifies the iris-CRY-melatonin pathway. Blue eyes produce 22% stronger melatonin suppression — a direct measure of enhanced CRY pathway activation.",
    berm_relevance_fi: "Kvantifioi iiris-CRY-melatoniini-polun. Siniset silmät tuottavat 22 % voimakkaamman melatoniinin suppression — suora mittaus polku C:n vahvistuneesta aktivaatiosta.",
    berm_relevance_ja: "虹彩-CRY-メラトニン経路を定量化する。青い目は22%強いメラトニン抑制を生じる――パスウェイC活性化増強の直接的測定値。",
    berm_relevance_fr: "Quantifie la voie iris-CRY-mélatonine. Les yeux bleus produisent une suppression de la mélatonine 22 % plus forte — une mesure directe de l'activation renforcée de la voie C.",
    berm_relevance_ko: "홍채-CRY-멜라토닌 경로를 정량화한다. 파란 눈은 22% 더 강한 멜라토닌 억제를 생성한다 — 경로 C 활성화 증강의 직접적 측정치.",
  },
  {
    id: "martinez-cadenas2013-gender-eye",
    referenceId: "martinez-cadenas2013",
    title_en: "Gender is a major factor in eye colour distribution",
    title_fi: "Sukupuoli on merkittävä tekijä silmien värin jakaumassa",
    title_ja: "性別は眼の色の分布における主要な要因である",
    title_fr: "Le sexe est un facteur majeur dans la distribution de la couleur des yeux",
    title_ko: "성별은 눈 색깔 분포의 주요 요인이다",
    authors: "Martinez-Cadenas C et al.",
    year: 2013,
    journal: "Forensic Sci Int Genet",
    doi: "10.1016/j.fsigen.2013.03.007",
    pmid: "23601698",
    level: "M|C",
    finding_en: "Meta-analysis across Caucasian populations: males are significantly more likely to have blue eyes; females show higher frequencies of green and brown eyes. Women with the same genotype as men tend to have darker eyes due to X-chromosome mosaicism affecting melanin expression.",
    finding_fi: "Meta-analyysi kaukaasialaisissa populaatioissa: miehillä on merkitsevästi todennäköisemmin siniset silmät; naisilla on korkeampi vihreiden ja ruskeiden silmien esiintyvyys. Samoilla genotyypeillä naisilla on taipumus tummempiin silmiin kuin miehillä X-kromosomimosaiikin vuoksi.",
    finding_ja: "コーカサス人集団のメタ分析：男性は青い目を持つ可能性が有意に高い。女性は緑色および茶色の目の頻度が高い。同じ遺伝子型の女性は、メラニン発現に影響するX染色体モザイク現象により、男性よりも暗い目になる傾向がある。",
    finding_fr: "Méta-analyse dans les populations caucasiennes : les hommes sont significativement plus susceptibles d'avoir les yeux bleus ; les femmes présentent des fréquences plus élevées d'yeux verts et bruns. Les femmes ayant le même génotype que les hommes tendent à avoir des yeux plus foncés en raison du mosaïcisme du chromosome X affectant l'expression de la mélanine.",
    finding_ko: "코카서스인 집단의 메타 분석: 남성은 파란 눈을 가질 가능성이 유의하게 높으며, 여성은 녹색 및 갈색 눈의 빈도가 높다. 동일한 유전형을 가진 여성은 멜라닌 발현에 영향을 미치는 X 염색체 모자이크 현상으로 인해 남성보다 어두운 눈을 갖는 경향이 있다.",
  },
  {
    id: "niessner2014-cry-photocycle",
    referenceId: "niessner2014",
    title_en: "Cryptochrome activation spectrum spans UV to green",
    title_fi: "Kryptokromin aktivaatiospektri kattaa UV:sta vihreään",
    title_ja: "クリプトクロムの活性化スペクトルはUVから緑色光に及ぶ",
    title_fr: "Le spectre d'activation du cryptochrome s'étend de l'UV au vert",
    title_ko: "크립토크롬 활성화 스펙트럼은 UV에서 녹색광까지 걸친다",
    authors: "Nießner C, Denzau S, Peichl L, Wiltschko W, Wiltschko R",
    year: 2014,
    journal: "J Exp Biol",
    doi: "10.1242/jeb.110965",
    pmid: "25472972",
    level: "E",
    finding_en: "Oxidized CRY absorbs UV/blue light (to ~500 nm); the photoreduced semiquinone additionally absorbs green light (to ~570 nm). Green light alone cannot activate CRY from the oxidized state but maintains the magnetically sensitive semiquinone form. After dark pre-exposure, green light produces no activated CRY — the semiquinone reservoir must be primed by blue light first.",
    finding_fi: "Hapettunut CRY absorboi UV/sinistä valoa (~500 nm asti); fotoredusoidutu semikinoni absorboi lisäksi vihreää valoa (~570 nm asti). Vihreä valo yksin ei voi aktivoida CRY:tä hapettuneesta tilasta, mutta ylläpitää magneettisesti herkkää semikinonimuotoa. Pimeälle esialtistuksen jälkeen vihreä valo ei tuota aktivoitua CRY:tä — semikinonivarasto pitää pohjustaa sinisellä valolla ensin.",
    finding_ja: "酸化型CRYはUV/青色光（~500 nmまで）を吸収する。光還元されたセミキノンはさらに緑色光（~570 nmまで）を吸収する。緑色光単独では酸化状態からCRYを活性化できないが、磁気感受性セミキノン型を維持する。暗所前処理後、緑色光は活性化CRYを生じない――セミキノン貯蔵は先に青色光でプライミングされなければならない。",
    finding_fr: "Le CRY oxydé absorbe la lumière UV/bleue (jusqu'à ~500 nm) ; la semiquinone photoréduite absorbe en outre la lumière verte (jusqu'à ~570 nm). La lumière verte seule ne peut pas activer le CRY à partir de l'état oxydé mais maintient la forme semiquinone magnétiquement sensible. Après une pré-exposition à l'obscurité, la lumière verte ne produit pas de CRY activé — le réservoir de semiquinone doit être amorcé par la lumière bleue d'abord.",
    finding_ko: "산화된 CRY는 UV/청색광(~500 nm까지)을 흡수한다. 광환원된 세미퀴논은 추가로 녹색광(~570 nm까지)을 흡수한다. 녹색광 단독으로는 산화 상태의 CRY를 활성화할 수 없지만 자기 감수성 세미퀴논 형태를 유지한다. 암소 전처리 후 녹색광은 활성화된 CRY를 생성하지 않는다 — 세미퀴논 저장소는 먼저 청색광으로 프라이밍되어야 한다.",
    berm_relevance_en: "Establishes the biophysical basis for why green eyes may optimize magnetoreceptive stability: their lipochrome filter passes the full 450-570 nm CRY operational band while reducing UV/extreme blue that causes over-reduction.",
    berm_relevance_fi: "Perustaa biofysikaalisen pohjan sille, miksi vihreät silmät voivat optimoida magnetoreseptiivistä stabiilisuutta: niiden lipokromi-suodatin päästää läpi koko 450-570 nm CRY:n operointikaistan samalla vähentäen UV:tä ja äärimmäistä sinistä joka aiheuttaa yliredusointia.",
    berm_relevance_ja: "緑色の目が磁気受容の安定性を最適化しうる生物物理学的根拠を確立する：リポクロムフィルターがCRY動作帯域の450-570 nm全域を透過しつつ、過剰還元を引き起こすUV/極端な青色光を減少させる。",
    berm_relevance_fr: "Établit la base biophysique expliquant pourquoi les yeux verts pourraient optimiser la stabilité magnétoréceptive : leur filtre lipochrome laisse passer toute la bande opérationnelle CRY de 450-570 nm tout en réduisant les UV/bleu extrême qui causent la sur-réduction.",
    berm_relevance_ko: "녹색 눈이 자기수용 안정성을 최적화할 수 있는 생물물리학적 근거를 확립한다: 리포크롬 필터가 450-570 nm CRY 작동 대역 전체를 투과시키면서 과환원을 유발하는 UV/극단적 청색광을 감소시킨다.",
  },
  {
    id: "white2003-iris-chronotype",
    referenceId: "white2003",
    title_en: "Iris pigmentation affects chronotype and sleep timing",
    title_fi: "Iiriksen pigmentaatio vaikuttaa kronotyyppiin ja unen ajoitukseen",
    title_ja: "虹彩色素沈着がクロノタイプと睡眠タイミングに影響する",
    title_fr: "La pigmentation de l'iris affecte le chronotype et le moment du sommeil",
    title_ko: "홍채 색소침착이 일주기 유형과 수면 시간에 영향을 미친다",
    authors: "White TM, Terman M",
    year: 2003,
    journal: "Chronobiol Int",
    level: "C",
    finding_en: "Light-eyed subjects had earlier sleep times and more 'morningness' on chronotype questionnaires, suggesting greater sensitivity to the phase-advancing effects of morning light exposure.",
    finding_fi: "Vaaleasilmäisillä koehenkilöillä oli aikaisemmat nukkumaanmenoajat ja enemmän 'aamuihmisyyttä' kronotyyppikyselyissä, mikä viittaa suurempaan herkkyyteen aamunvalon vaihetta edistävälle vaikutukselle.",
    finding_ja: "明るい色の目の被験者はクロノタイプ質問票で睡眠時刻が早く、「朝型」傾向が強かった。朝の光曝露の位相前進効果に対する感受性がより高いことを示唆する。",
    finding_fr: "Les sujets aux yeux clairs avaient des heures de coucher plus précoces et davantage de « matinalité » dans les questionnaires de chronotype, suggérant une plus grande sensibilité aux effets d'avance de phase de l'exposition à la lumière matinale.",
    finding_ko: "밝은 눈의 피험자들은 일주기 유형 설문에서 취침 시간이 더 이르고 '아침형' 경향이 더 강했으며, 이는 아침 광 노출의 위상 전진 효과에 대한 감수성이 더 높음을 시사한다.",
  },
  {
    id: "chae2019-sex-magnetoreception",
    referenceId: "chae2019",
    title_en: "Human magnetoreception functional in men only",
    title_fi: "Ihmisen magnetoreseptio toiminnallinen vain miehillä",
    title_ja: "ヒトの磁気受容は男性でのみ機能する",
    title_fr: "La magnétoréception humaine est fonctionnelle uniquement chez les hommes",
    title_ko: "인간의 자기수용은 남성에서만 기능한다",
    authors: "Chae K-S, Oh I-T, Lee S-H, Kim S-C",
    year: 2019,
    journal: "PLOS ONE",
    doi: "10.1371/journal.pone.0211826",
    level: "M|C",
    finding_en: "Starved men (n=20) oriented toward geomagnetic food direction (P<0.001). Effect required blue light (<500 nm). Women (n=21) showed no significant orientation in any condition. Sex difference in magnetoreception is consistent with sex difference in eye color (men: more blue = more CRY sensitivity).",
    finding_fi: "Nälkiintyneet miehet (n=20) orientoituivat kohti geomagneettista ruokasuuntaa (P<0,001). Vaikutus vaati sinistä valoa (<500 nm). Naiset (n=21) eivät osoittaneet merkitsevää orientaatiota missään olosuhteissa. Sukupuoliero magnetoreseptiossa on yhdenmukainen silmien värin sukupuolieron kanssa (miehet: enemmän sinisiä = enemmän CRY-herkkyyttä).",
    finding_ja: "絶食した男性（n=20）は地磁気の食物方向に定位した（P<0.001）。効果には青色光（<500 nm）が必要であった。女性（n=21）はいかなる条件でも有意な定位を示さなかった。磁気受容の性差は眼の色の性差と一致する（男性：青い目が多い＝CRY感受性が高い）。",
    finding_fr: "Les hommes affamés (n=20) se sont orientés vers la direction géomagnétique de la nourriture (P<0,001). L'effet nécessitait la lumière bleue (<500 nm). Les femmes (n=21) n'ont montré aucune orientation significative dans aucune condition. La différence sexuelle dans la magnétoréception est cohérente avec la différence sexuelle dans la couleur des yeux (hommes : plus de bleu = plus de sensibilité CRY).",
    finding_ko: "굶긴 남성(n=20)은 지자기 음식 방향으로 정위하였다(P<0.001). 효과에는 청색광(<500 nm)이 필요하였다. 여성(n=21)은 어떤 조건에서도 유의한 정위를 보이지 않았다. 자기수용의 성차는 눈 색깔의 성차와 일치한다(남성: 파란 눈이 더 많음 = CRY 감수성이 더 높음).",
  },
  {
    id: "bartoelke2025",
    referenceId: "bartolke2025",
    title_en: "Full-length CRY1 in human blue cone outer segments",
    title_fi: "Täyspitkä CRY1 ihmisen sinisten tappisolujen ulkosegmenteissä",
    title_ja: "ヒト青色錐体外節における全長CRY1",
    title_fr: "CRY1 pleine longueur dans les segments externes des cônes bleus humains",
    title_ko: "인간 청색 원추세포 외절에서의 전장 CRY1",
    authors: "Bartölke R, Nießner C, Reinhard K, Wolfrum U, Meimann S, Bolte P, Feederle R, Mouritsen H, Dedek K, Peichl L, Winklhofer M",
    year: 2025,
    journal: "FASEB Journal",
    doi: "10.1096/fj.202402614R",
    pmid: "40277221",
    level: "E",
    finding_en: "Using C-terminal specific antibodies, full-length CRY1 protein was detected exclusively in the outer segments of short-wavelength-sensitive 'blue' cone photoreceptors in human, bonobo, and gorilla retinas. No other retinal cell types were stained. This localization far from nuclei suggests CRY1 has additional, non-circadian, probably phototransductive functions. The stacked membrane lamellae of cone outer segments provide the structural order required for oriented magnetoreception.",
    finding_fi: "C-terminaalispesifisillä vasta-aineilla havaittiin täyspitkä CRY1-proteiini yksinomaan lyhytaaltoherkissä sinisten tappisolujen ulkosegmenteissä ihmisen, bonobon ja gorillan verkkokalvoilla. Mitään muita verkkokalvon solutyyppejä ei värjätty. Tämä sijainti kaukana tumista viittaa siihen, että CRY1:llä on lisätoimintoja sirkadiaanisen kellon ulkopuolella, todennäköisesti fototransduktiivisia. Tappisolujen ulkosegmenttien pinotut kalvolamellit tarjoavat orientoituneelle magnetoreseptiolle tarvittavan rakenteellisen järjestyksen.",
    finding_ja: "C末端特異的抗体を用いて、全長CRY1タンパク質がヒト、ボノボ、ゴリラの網膜の短波長感受性「青色」錐体光受容体の外節にのみ検出された。他の網膜細胞型は染色されなかった。核から離れたこの局在は、CRY1が概日リズム以外の、おそらく光伝達機能を持つことを示唆する。錐体外節の積層膜ラメラは、方向性磁気受容に必要な構造秩序を提供する。",
    finding_fr: "En utilisant des anticorps spécifiques du C-terminal, la protéine CRY1 pleine longueur a été détectée exclusivement dans les segments externes des photorécepteurs à cônes « bleus » sensibles aux courtes longueurs d'onde dans les rétines humaines, de bonobo et de gorille. Aucun autre type cellulaire rétinien n'a été coloré. Cette localisation éloignée des noyaux suggère que CRY1 possède des fonctions supplémentaires, non circadiennes, probablement phototransductives. Les lamelles membranaires empilées des segments externes des cônes fournissent l'ordre structural requis pour une magnétoréception orientée.",
    finding_ko: "C-말단 특이적 항체를 사용하여, 전장 CRY1 단백질이 인간, 보노보, 고릴라 망막의 단파장 감수성 '청색' 원추세포 광수용체 외절에서만 검출되었다. 다른 망막 세포 유형은 염색되지 않았다. 핵에서 멀리 떨어진 이 위치는 CRY1이 개일리듬 이외의, 아마도 광전달 기능을 가짐을 시사한다. 원추세포 외절의 적층 막 라멜라는 방향성 자기수용에 필요한 구조적 질서를 제공한다.",
    berm_relevance_en: "CRITICAL for BERM pathway C: Identifies a SECOND CRY system in the human retina. CRY1 in blue cones (sensory/phototransductive) is distinct from CRY2 in ganglion cells (circadian). This is the system most directly affected by iris pigmentation — blue eyes transmit ~100x more light specifically to blue cones where CRY1 resides. The QuantumBirds consortium (Mouritsen, Hore, Winklhofer) produced this finding. Epistemic note: E-level for protein localization, L*-level for magnetoreception interpretation.",
    berm_relevance_fi: "KRIITTINEN BERM:n polku C:lle: Tunnistaa TOISEN CRY-järjestelmän ihmisen verkkokalvolla. CRY1 sinisissä tapeissa (sensorinen/fototransduktiivinen) on erillinen CRY2:sta gangliosoluissa (sirkadiaaninen). Tämä on järjestelmä johon iiriksen pigmentaatio vaikuttaa suorimmin — siniset silmät päästävät ~100x enemmän valoa nimenomaan sinisille tapeille joissa CRY1 sijaitsee. QuantumBirds-konsortio (Mouritsen, Hore, Winklhofer) tuotti tämän löydöksen. Episteeminen huomio: E-taso proteiinilokalisaatiolle, L*-taso magnetoreseptiotulkinnalle.",
    berm_relevance_ja: "BERMパスウェイCに極めて重要：ヒト網膜における第二のCRYシステムを同定。青色錐体のCRY1（感覚/光伝達）は神経節細胞のCRY2（概日リズム）とは異なる。これは虹彩色素沈着に最も直接的に影響されるシステムである――青い目はCRY1が存在する青色錐体に特異的に約100倍の光を透過する。QuantumBirdsコンソーシアム（Mouritsen, Hore, Winklhofer）がこの知見を生み出した。認識論的注記：タンパク質局在にはEレベル、磁気受容解釈にはL*レベル。",
    berm_relevance_fr: "CRITIQUE pour la voie BERM C : Identifie un SECOND système CRY dans la rétine humaine. CRY1 dans les cônes bleus (sensoriel/phototransductif) est distinct de CRY2 dans les cellules ganglionnaires (circadien). C'est le système le plus directement affecté par la pigmentation de l'iris — les yeux bleus transmettent ~100x plus de lumière spécifiquement aux cônes bleus où réside CRY1. Le consortium QuantumBirds (Mouritsen, Hore, Winklhofer) a produit cette découverte. Note épistémique : niveau E pour la localisation protéique, niveau L* pour l'interprétation magnétoréceptive.",
    berm_relevance_ko: "BERM 경로 C에 결정적: 인간 망막에서 두 번째 CRY 시스템을 확인한다. 청색 원추세포의 CRY1(감각/광전달)은 신경절세포의 CRY2(개일리듬)와 구별된다. 이것은 홍채 색소침착에 가장 직접적으로 영향받는 시스템이다 — 파란 눈은 CRY1이 존재하는 청색 원추세포에 특이적으로 약 100배 더 많은 빛을 투과시킨다. QuantumBirds 컨소시엄(Mouritsen, Hore, Winklhofer)이 이 발견을 산출하였다. 인식론적 주석: 단백질 국소화에는 E 수준, 자기수용 해석에는 L* 수준.",
  },
  {
    id: "majewska2025",
    referenceId: "majewska2025",
    title_en: "CRY associates with lipid bilayers in ordered manner",
    title_fi: "CRY assosioituu lipidikaksoiskerrosten kanssa järjestäytyneesti",
    title_ja: "CRYは脂質二重層と秩序的に会合する",
    title_fr: "CRY s'associe aux bicouches lipidiques de manière ordonnée",
    title_ko: "CRY는 지질 이중층과 질서 있게 결합한다",
    authors: "Majewska M, Hanić M, Bartölke R, Schmidt J, Bożek J, Gerhards L, Mouritsen H, Koch K-W, Solov'yov IA, Brand I",
    year: 2025,
    journal: "ACS Chemical Biology",
    doi: "10.1021/acschembio.4c00576",
    level: "E",
    finding_en: "European robin cryptochrome-4a (ErCry4a) associates with model lipid membranes reaching a uniform, partially restricted orientation. The protein binds to the membrane with either C- or N-terminus facing the surface. Membrane lamellae separated by ~15-20 nm could anchor and align CRY4a molecules, providing the orientational order and regularity required for efficient directional magnetoreception.",
    finding_fi: "Eurooppalaisen punarinnan kryptokromi-4a (ErCry4a) assosioituu mallipiidikalvoihin saavuttaen tasaisen, osittain rajoitetun orientaation. Proteiini sitoutuu kalvoon joko C- tai N-terminuksella pintaa kohti. ~15-20 nm:n etäisyydellä toisistaan olevat kalvolamellit voivat ankkuroida ja linjata CRY4a-molekyylejä, tarjoten tehokkaan suuntakohtaisen magnetoreseption vaatiman suuntajärjestyksen ja säännöllisyyden.",
    finding_ja: "ヨーロッパコマドリのクリプトクロム4a（ErCry4a）はモデル脂質膜と会合し、均一で部分的に制限された配向を達成する。タンパク質はC末端またはN末端を表面に向けて膜に結合する。~15-20 nm間隔の膜ラメラはCRY4a分子を固定・整列させ、効率的な方向性磁気受容に必要な配向秩序と規則性を提供しうる。",
    finding_fr: "Le cryptochrome-4a du rouge-gorge européen (ErCry4a) s'associe aux membranes lipidiques modèles en atteignant une orientation uniforme et partiellement restreinte. La protéine se lie à la membrane avec le C-terminal ou le N-terminal face à la surface. Les lamelles membranaires séparées de ~15-20 nm pourraient ancrer et aligner les molécules de CRY4a, fournissant l'ordre orientationnel et la régularité requis pour une magnétoréception directionnelle efficace.",
    finding_ko: "유럽울새의 크립토크롬-4a(ErCry4a)는 모델 지질막과 결합하여 균일하고 부분적으로 제한된 배향을 달성한다. 단백질은 C-말단 또는 N-말단을 표면으로 향하게 하여 막에 결합한다. ~15-20 nm 간격의 막 라멜라는 CRY4a 분자를 고정하고 정렬시켜 효율적인 방향성 자기수용에 필요한 배향 질서와 규칙성을 제공할 수 있다.",
    berm_relevance_en: "Establishes E-level evidence for the omega fatty acid hypothesis: membrane lipid composition directly determines CRY protein orientation, which is a prerequisite for directional magnetic sensing. If membrane composition is altered by dietary fatty acid imbalance (high omega-6, low omega-3/7), CRY orientation may become randomized, reducing magnetoreceptive resolution. This connects nutritional status to pathway C1 function through a physical-structural mechanism.",
    berm_relevance_fi: "Vahvistaa E-tason evidenssin omega-rasvahappohypoteesille: kalvon lipidikoostumus määrittää suoraan CRY-proteiinin orientaation, joka on edellytys suuntakohtaiselle magneettiaistimukselle. Jos kalvon koostumus muuttuu ruokavalion rasvahappo-epätasapainosta (korkea omega-6, matala omega-3/7), CRY:n orientaatio voi muuttua satunnaiseksi, heikentäen magnetoreseptiivistä erottelukykyä.",
    berm_relevance_ja: "オメガ脂肪酸仮説のEレベル証拠を確立する：膜脂質組成がCRYタンパク質の配向を直接決定し、これは方向性磁気感知の前提条件である。食事性脂肪酸の不均衡（高オメガ6、低オメガ3/7）により膜組成が変化すると、CRYの配向がランダム化し、磁気受容の分解能が低下する可能性がある。物理構造的メカニズムを通じて栄養状態をパスウェイC1機能に結びつける。",
    berm_relevance_fr: "Établit des preuves de niveau E pour l'hypothèse des acides gras oméga : la composition lipidique membranaire détermine directement l'orientation de la protéine CRY, qui est un prérequis pour la détection magnétique directionnelle. Si la composition membranaire est altérée par un déséquilibre alimentaire en acides gras (oméga-6 élevé, oméga-3/7 faible), l'orientation de CRY pourrait devenir aléatoire, réduisant la résolution magnétoréceptive. Cela connecte le statut nutritionnel à la fonction de la voie C1 par un mécanisme physico-structural.",
    berm_relevance_ko: "오메가 지방산 가설에 대한 E 수준 증거를 확립한다: 막 지질 조성이 CRY 단백질 배향을 직접 결정하며, 이는 방향성 자기 감지의 전제조건이다. 식이 지방산 불균형(높은 오메가-6, 낮은 오메가-3/7)으로 막 조성이 변경되면 CRY 배향이 무작위화되어 자기수용 해상도가 감소할 수 있다. 물리-구조적 메커니즘을 통해 영양 상태를 경로 C1 기능에 연결한다.",
  },
  {
    id: "lamia2009",
    referenceId: "lamia2009",
    title_en: "AMPK destabilizes CRY1 via phosphorylation",
    title_fi: "AMPK destabiloi CRY1:n fosforylaatiolla",
    title_ja: "AMPKはリン酸化によりCRY1を不安定化する",
    title_fr: "L'AMPK déstabilise CRY1 par phosphorylation",
    title_ko: "AMPK는 인산화를 통해 CRY1을 불안정화한다",
    authors: "Lamia KA, Sachdeva UM, DiTacchio L, Williams EC, Alvarez JG, Egan DF, Vasquez DS, Juguilon H, Panda S, Shaw RJ, Thompson CB, Evans RM",
    year: 2009,
    journal: "Science",
    doi: "10.1126/science.1172156",
    pmid: "19833968",
    level: "E",
    finding_en: "The nutrient-responsive AMPK phosphorylates CRY1 at Ser71, triggering FBXL3-mediated ubiquitin degradation. In mouse liver, AMPK activity was rhythmic and inversely correlated with CRY1 nuclear protein abundance. AMPK stimulation destabilized cryptochromes and altered circadian rhythms.",
    finding_fi: "Ravintoon reagoiva AMPK fosforyloi CRY1:n Ser71:ssä, käynnistäen FBXL3-välitteisen ubikitiinihajotuksen. Hiiren maksassa AMPK-aktiivisuus oli rytmistä ja kääntäen korreloitunutta CRY1:n tuma-proteiinin määrän kanssa. AMPK:n stimulaatio destabiloi kryptokromeja ja muutti sirkadiaanisia rytmejä.",
    finding_ja: "栄養応答性AMPKはCRY1のSer71をリン酸化し、FBXL3媒介ユビキチン分解を誘発する。マウス肝臓ではAMPK活性はリズミックであり、CRY1核タンパク質量と逆相関していた。AMPKの刺激はクリプトクロムを不安定化し、概日リズムを変化させた。",
    finding_fr: "L'AMPK sensible aux nutriments phosphoryle CRY1 à Ser71, déclenchant la dégradation par ubiquitine médiée par FBXL3. Dans le foie de souris, l'activité d'AMPK était rythmique et inversement corrélée avec l'abondance de la protéine nucléaire CRY1. La stimulation d'AMPK a déstabilisé les cryptochromes et altéré les rythmes circadiens.",
    finding_ko: "영양 반응성 AMPK는 CRY1의 Ser71을 인산화하여 FBXL3 매개 유비퀴틴 분해를 유발한다. 마우스 간에서 AMPK 활성은 리듬을 보였으며 CRY1 핵 단백질 양과 역상관하였다. AMPK 자극은 크립토크롬을 불안정화하고 개일리듬을 변화시켰다.",
    berm_relevance_en: "Creates and resolves the 'fasting paradox': AMPK (activated during fasting) degrades CRY1, yet starved subjects show enhanced magnetoreception (Chae 2019). Resolution: fasting simultaneously increases FAD availability (via beta-oxidation), so newly synthesized CRY molecules are better FAD-loaded and more magnetically sensitive. The net effect is higher CRY QUALITY despite lower QUANTITY. This also explains why CHRONIC B2 deficiency (unlike acute fasting) is catastrophic: the FAD pool is depleted, so replacement CRY cannot be properly loaded. Resolution is L*-level hypothesis.",
    berm_relevance_fi: "Luo ja ratkaisee 'paastoparadoksin': AMPK (aktivoituu paastossa) hajottaa CRY1:n, mutta nälkiintyneet koehenkilöt osoittavat tehostunutta magnetoreseptiota (Chae 2019). Ratkaisu: paasto lisää samanaikaisesti FAD:n saatavuutta (beta-oksidaation kautta), joten uudet CRY-molekyylit ovat paremmin FAD-ladattuja ja magneettisesti herkempiä. Nettovaikutus on korkeampi CRY:n LAATU matalammasta MÄÄRÄSTÄ huolimatta. Tämä selittää myös miksi KROONINEN B2-puutos (toisin kuin akuutti paasto) on katastrofaalinen: FAD-pooli on ehtynyt, joten uusi CRY ei voi latautua kunnolla. Ratkaisu on L*-tason hypoteesi.",
    berm_relevance_ja: "「絶食パラドックス」を提起し解決する：AMPK（絶食中に活性化）はCRY1を分解するが、絶食被験者は磁気受容の増強を示す（Chae 2019）。解決：絶食はβ酸化を通じてFAD利用可能性を同時に増加させるため、新たに合成されたCRY分子はFADがより充填され、磁気感受性がより高くなる。正味の効果はより低い量にもかかわらずより高いCRYの質である。これはまた慢性的B2欠乏（急性の絶食とは異なり）がなぜ壊滅的であるかを説明する：FADプールが枯渇し、代替CRYが適切に充填できない。解決はL*レベルの仮説。",
    berm_relevance_fr: "Crée et résout le « paradoxe du jeûne » : l'AMPK (activée pendant le jeûne) dégrade CRY1, mais les sujets affamés montrent une magnétoréception renforcée (Chae 2019). Résolution : le jeûne augmente simultanément la disponibilité du FAD (via la bêta-oxydation), donc les molécules CRY nouvellement synthétisées sont mieux chargées en FAD et plus magnétiquement sensibles. L'effet net est une QUALITÉ CRY supérieure malgré une QUANTITÉ inférieure. Cela explique aussi pourquoi la déficience CHRONIQUE en B2 (contrairement au jeûne aigu) est catastrophique : le pool de FAD est épuisé, donc le CRY de remplacement ne peut pas être correctement chargé. La résolution est une hypothèse de niveau L*.",
    berm_relevance_ko: "'절식 패러독스'를 제기하고 해결한다: AMPK(절식 중 활성화)는 CRY1을 분해하지만, 굶긴 피험자는 자기수용 증강을 보인다(Chae 2019). 해결: 절식은 베타 산화를 통해 FAD 이용 가능성을 동시에 증가시키므로 새로 합성된 CRY 분자는 FAD가 더 잘 충전되고 자기 감수성이 더 높다. 순 효과는 더 낮은 양에도 불구하고 더 높은 CRY 품질이다. 이는 만성적 B2 결핍이(급성 절식과 달리) 왜 치명적인지도 설명한다: FAD 풀이 고갈되어 대체 CRY가 적절히 충전될 수 없다. 해결은 L* 수준 가설이다.",
  },
  {
    id: "b2_fertility_consolidated",
    title_en: "Riboflavin deficiency impairs fertility and pregnancy",
    title_fi: "Riboflaviinipuutos heikentää hedelmällisyyttä ja raskautta",
    title_ja: "リボフラビン欠乏は生殖能力と妊娠を障害する",
    title_fr: "La carence en riboflavine altère la fertilité et la grossesse",
    title_ko: "리보플라빈 결핍은 생식력과 임신을 손상시킨다",
    authors: "Consolidated: Wacker 2000, IVF data 2022, Sci Rep 2025",
    year: 2000,
    journal: "Multiple sources",
    level: "M|C",
    finding_en: "Three independent lines of evidence: (1) Wacker et al. 2000: B2-deficient mothers had 4.7x higher preeclampsia risk (OR 4.7, CI 1.8-12.2). (2) IVF clinics: B2 supplementation improves embryo quality metrics. (3) China has >90% B2 inadequacy (CNHS 2015-2017) coinciding with world's lowest TFR. The B2-fertility link operates through FAD-dependent CRY stability, FAD-dependent mitochondrial function, and FAD-dependent folate metabolism.",
    finding_fi: "Kolme itsenäistä evidenssilinjaa: (1) Wacker ym. 2000: B2-puutteisilla äideillä oli 4,7-kertainen pre-eklampsian riski (OR 4,7, CI 1,8-12,2). (2) IVF-klinikat: B2-lisä parantaa alkionlaatumittareita. (3) Kiinassa on >90 % B2-puutos (CNHS 2015-2017) samanaikaisesti maailman alhaisimman TFR:n kanssa. B2-hedelmällisyysyhteys toimii FAD-riippuvaisen CRY-stabiilisuuden, FAD-riippuvaisen mitokondriaalisen toiminnan ja FAD-riippuvaisen folaattimetabolian kautta.",
    finding_ja: "3つの独立したエビデンスライン：(1) Wacker ら 2000年：B2欠乏の母親は妊娠高血圧腎症リスクが4.7倍高かった（OR 4.7, CI 1.8-12.2）。(2) IVFクリニック：B2補充が胚品質指標を改善する。(3) 中国はB2摂取不足が>90%（CNHS 2015-2017）であり、世界最低のTFRと一致する。B2-生殖能力の関連はFAD依存性CRY安定性、FAD依存性ミトコンドリア機能、FAD依存性葉酸代謝を通じて作用する。",
    finding_fr: "Trois lignes de preuves indépendantes : (1) Wacker et al. 2000 : les mères carencées en B2 avaient un risque de prééclampsie 4,7 fois plus élevé (OR 4,7, IC 1,8-12,2). (2) Cliniques de FIV : la supplémentation en B2 améliore les métriques de qualité embryonnaire. (3) La Chine présente >90 % d'insuffisance en B2 (CNHS 2015-2017) coïncidant avec le TFR le plus bas du monde. Le lien B2-fertilité opère via la stabilité CRY dépendante du FAD, la fonction mitochondriale dépendante du FAD et le métabolisme des folates dépendant du FAD.",
    finding_ko: "3가지 독립적 증거 계열: (1) Wacker 등 2000년: B2 결핍 산모의 자간전증 위험이 4.7배 높았다(OR 4.7, CI 1.8-12.2). (2) IVF 클리닉: B2 보충이 배아 품질 지표를 개선한다. (3) 중국은 B2 부족이 >90%(CNHS 2015-2017)이며 세계 최저 TFR과 일치한다. B2-생식력 연결은 FAD 의존성 CRY 안정성, FAD 의존성 미토콘드리아 기능, FAD 의존성 엽산 대사를 통해 작용한다.",
    berm_relevance_en: "The China B2 case: China has >90% B2 inadequacy AND the world's lowest TFR. This is ecological correlation (not causal proof), but the mechanism is clear: B2 → FAD → CRY stability → pathway C function. If B2 supplementation in China improved CRY-dependent circadian markers, it would be strong evidence for the nutritional modulation hypothesis. This is prediction NUT-2.",
    berm_relevance_fi: "Kiinan B2-tapaus: Kiinassa on >90 % B2-puutos JA maailman alhaisin TFR. Tämä on ekologinen korrelaatio (ei kausaalinen todiste), mutta mekanismi on selvä: B2 → FAD → CRY-stabiilisuus → polku C:n toiminta. Jos B2-lisä Kiinassa parantaisi CRY-riippuvaisia sirkadiaanisia markkereita, se olisi vahvaa evidenssiä ravitsemuksellisen modulaation hypoteesille. Tämä on ennuste NUT-2.",
    berm_relevance_ja: "中国B2事例：中国はB2摂取不足が>90%であり、かつ世界最低のTFRを持つ。これは生態学的相関（因果証明ではない）だが、メカニズムは明確：B2 → FAD → CRY安定性 → パスウェイC機能。中国でのB2補充がCRY依存性概日マーカーを改善すれば、栄養調節仮説の強力な証拠となる。これは予測NUT-2である。",
    berm_relevance_fr: "Le cas B2 de la Chine : la Chine a >90 % d'insuffisance en B2 ET le TFR le plus bas du monde. C'est une corrélation écologique (pas une preuve causale), mais le mécanisme est clair : B2 → FAD → stabilité CRY → fonction de la voie C. Si la supplémentation en B2 en Chine améliorait les marqueurs circadiens dépendants de CRY, ce serait une preuve forte pour l'hypothèse de modulation nutritionnelle. C'est la prédiction NUT-2.",
    berm_relevance_ko: "중국 B2 사례: 중국은 B2 부족이 >90%이고 세계 최저 TFR을 가진다. 이는 생태학적 상관관계(인과적 증거가 아님)이지만 메커니즘은 명확하다: B2 → FAD → CRY 안정성 → 경로 C 기능. 중국에서 B2 보충이 CRY 의존성 개일리듬 마커를 개선한다면 영양 조절 가설의 강력한 증거가 될 것이다. 이것은 예측 NUT-2이다.",
  },
];

export const EYE_PROFILES: EyeProfile[] = [
  {
    color: "blue",
    label_en: "Blue — Maximum Sensitivity",
    label_fi: "Sininen — Maksimaalinen herkkyys",
    label_ja: "青 — 最大感受性",
    label_fr: "Bleu — Sensibilité maximale",
    label_ko: "파랑 — 최대 감수성",
    transmission: "100× (reference)",
    cry_activation: "Strongest",
    cry_stability: "Lowest (over-reduction risk)",
    snr: "Moderate (high signal, high noise)",
    circadian: "Most responsive, least stable",
    magnetoreception: "Peak directional sensitivity",
    sex_prevalence: "More common in males",
    adaptive_context_en: "Optimized for navigation/hunting: instant magnetic bearing",
    adaptive_context_fi: "Optimoitu navigointiin/metsästykseen: hetkellinen magneettinen suunta",
    adaptive_context_ja: "ナビゲーション/狩猟に最適化：即時磁気方位",
    adaptive_context_fr: "Optimisé pour la navigation/chasse : relèvement magnétique instantané",
    adaptive_context_ko: "항법/수렵에 최적화: 즉각적 자기 방위",
    geographic: "Northern Europe (>55°N)",
  },
  {
    color: "green",
    label_en: "Green — Optimal Stability",
    label_fi: "Vihreä — Optimaalinen stabiilisuus",
    label_ja: "緑 — 最適な安定性",
    label_fr: "Vert — Stabilité optimale",
    label_ko: "녹색 — 최적 안정성",
    transmission: "~30× (lipochrome-filtered)",
    cry_activation: "Moderate (450-570 nm bandpass)",
    cry_stability: "Highest (semiquinone maintained)",
    snr: "Best (filtered noise, sustained signal)",
    circadian: "Most stable oscillation",
    magnetoreception: "Sustained directional discrimination",
    sex_prevalence: "More common in females (1.2:1)",
    adaptive_context_en: "Optimized for circadian stability: hormonal rhythms, ovulation timing",
    adaptive_context_fi: "Optimoitu sirkadiaaniseen stabiilisuuteen: hormonaaliset rytmit, ovulaation ajoitus",
    adaptive_context_ja: "概日安定性に最適化：ホルモンリズム、排卵タイミング",
    adaptive_context_fr: "Optimisé pour la stabilité circadienne : rythmes hormonaux, timing de l'ovulation",
    adaptive_context_ko: "개일 안정성에 최적화: 호르몬 리듬, 배란 시기",
    geographic: "Atlantic fringe (Ireland, Scotland, Basque, Caucasus)",
  },
  {
    color: "brown",
    label_en: "Brown — UV Protection Priority",
    label_fi: "Ruskea — UV-suojan priorisointi",
    label_ja: "茶 — UV防護優先",
    label_fr: "Brun — Priorité à la protection UV",
    label_ko: "갈색 — UV 보호 우선",
    transmission: "1× (baseline, strong melanin)",
    cry_activation: "Minimal",
    cry_stability: "N/A (insufficient activation)",
    snr: "Low signal, low noise",
    circadian: "Least light-responsive",
    magnetoreception: "Minimal",
    sex_prevalence: "More common in males globally",
    adaptive_context_en: "Optimized for UV protection: equatorial/high-sun environments",
    adaptive_context_fi: "Optimoitu UV-suojaksi: päiväntasaajan/korkean auringon ympäristöt",
    adaptive_context_ja: "UV防護に最適化：赤道付近/強日照環境",
    adaptive_context_fr: "Optimisé pour la protection UV : environnements équatoriaux/fort ensoleillement",
    adaptive_context_ko: "UV 보호에 최적화: 적도/강한 일조 환경",
    geographic: "Equatorial, subtropical, most of global population",
  },
];

export const NUTRITIONAL_MODULATORS: NutritionalModulator[] = [
  {
    nutrient: "Riboflavin (B2)",
    target: "FAD → CRY stability + magnetic sensitivity",
    deficiency_effect_en: "CRY protein degrades (ubiquitin-mediated). Magnetic field directional selectivity lost. Circadian gene expression altered.",
    deficiency_effect_fi: "CRY-proteiini hajoaa (ubikitiinivälitteisesti). Magneettikentän suuntaerottelu menetetään. Kellogeenien ekspressio muuttuu.",
    deficiency_effect_ja: "CRYタンパク質が分解される（ユビキチン媒介）。磁場方向選択性が失われる。概日時計遺伝子の発現が変化する。",
    deficiency_effect_fr: "La protéine CRY se dégrade (médiée par l'ubiquitine). La sélectivité directionnelle du champ magnétique est perdue. L'expression des gènes circadiens est altérée.",
    deficiency_effect_ko: "CRY 단백질이 분해된다(유비퀴틴 매개). 자기장 방향 선택성이 상실된다. 개일시계 유전자 발현이 변화한다.",
    key_source: "Hirano 2017 + Sherrard lab 2025",
    referenceIds: ["hirano2017", "yap2025"],
    level: "E",
  },
  {
    nutrient: "Lutein / Zeaxanthin",
    target: "Retinal ROS protection → CRY-hosting ganglion cell integrity",
    deficiency_effect_en: "Retinal ganglion cells (where CRY resides) become vulnerable to oxidative damage from pathway A (VGCC → Ca²⁺ → ROS). Pathway A degrades pathway C's substrate.",
    deficiency_effect_fi: "Verkkokalvon gangliosolut (joissa CRY sijaitsee) tulevat haavoittuvaisiksi polku A:n oksidatiiviselle vauriolle (VGCC → Ca²⁺ → ROS). Polku A tuhoaa polku C:n substraattia.",
    deficiency_effect_ja: "網膜神経節細胞（CRYが存在する場所）がパスウェイA（VGCC → Ca²⁺ → ROS）による酸化損傷に対して脆弱になる。パスウェイAがパスウェイCの基質を分解する。",
    deficiency_effect_fr: "Les cellules ganglionnaires rétiniennes (où réside CRY) deviennent vulnérables aux dommages oxydatifs de la voie A (VGCC → Ca²⁺ → ROS). La voie A dégrade le substrat de la voie C.",
    deficiency_effect_ko: "망막 신경절세포(CRY가 존재하는 곳)가 경로 A(VGCC → Ca²⁺ → ROS)에 의한 산화적 손상에 취약해진다. 경로 A가 경로 C의 기질을 분해한다.",
    key_source: "Lutein/zeaxanthin retinal protection literature + BERM pathway cross-talk logic",
    level: "M",
  },
  {
    nutrient: "Omega-3/7 fatty acids",
    target: "Membrane composition → CRY orientation on lipid bilayer",
    deficiency_effect_en: "Altered membrane fluidity disrupts CRY4a supramolecular assembly with G-protein on lipid bilayer (Güzelsoy-Flügge 2026). Randomized CRY orientation reduces directional magnetic resolution.",
    deficiency_effect_fi: "Muuttunut kalvon fluiditeetti häiritsee Cry4a:n supramolekulaarista assemblaasiota G-proteiinin kanssa lipidikaksoiskerroksella (Güzelsoy-Flügge 2026). Satunnaistunut CRY-orientaatio heikentää magneettista suuntaresoluutiota.",
    deficiency_effect_ja: "膜流動性の変化がCRY4aとGタンパク質の脂質二重層上での超分子集合を阻害する（Güzelsoy-Flügge 2026）。CRY配向のランダム化が方向性磁気分解能を低下させる。",
    deficiency_effect_fr: "L'altération de la fluidité membranaire perturbe l'assemblage supramoléculaire de CRY4a avec la protéine G sur la bicouche lipidique (Güzelsoy-Flügge 2026). L'orientation aléatoire de CRY réduit la résolution magnétique directionnelle.",
    deficiency_effect_ko: "막 유동성 변화가 지질 이중층에서 CRY4a와 G-단백질의 초분자 조립을 교란한다(Güzelsoy-Flügge 2026). CRY 배향의 무작위화가 방향성 자기 해상도를 감소시킨다.",
    key_source: "Güzelsoy-Flügge 2026 (Cry4a membrane context) + membrane biology",
    level: "L*",
  },
  {
    nutrient: "Blue light (environmental, not dietary)",
    target: "CRY photoreduction → radical pair formation",
    deficiency_effect_en: "No CRY activation, no radical pairs, no magnetic sensitivity. Dark = magnetically blind.",
    deficiency_effect_fi: "Ei CRY-aktivaatiota, ei radikaalipareja, ei magneettista herkkyyttä. Pimeä = magneettisesti sokea.",
    deficiency_effect_ja: "CRY活性化なし、ラジカルペアなし、磁気感受性なし。暗所＝磁気的に盲目。",
    deficiency_effect_fr: "Pas d'activation de CRY, pas de paires de radicaux, pas de sensibilité magnétique. Obscurité = aveugle magnétiquement.",
    deficiency_effect_ko: "CRY 활성화 없음, 라디칼 쌍 없음, 자기 감수성 없음. 암소 = 자기적으로 맹목.",
    key_source: "Sherrard lab 2025 (dark = loss of sensitivity) + all RPM literature",
    referenceIds: ["yap2025"],
    level: "E",
  },
];

export const PREDICTIONS: Prediction[] = [
  {
    id: "EYE-1",
    title_en: "Blue-eyed men outperform green-eyed men in geomagnetic orientation",
    title_fi: "Sinisilmäiset miehet suoriutuvat vihreäsilmäisiä paremmin geomagneettisessa orientaatiossa",
    title_ja: "青い目の男性は緑の目の男性よりも地磁気定位で優れる",
    title_fr: "Les hommes aux yeux bleus surpassent les hommes aux yeux verts en orientation géomagnétique",
    title_ko: "파란 눈의 남성이 녹색 눈의 남성보다 지자기 정위에서 우수하다",
    test_en: "Replicate Chae 2019 food-orientation paradigm with eye color as grouping variable. Blue-eyed males should show stronger orientation than green-eyed males under identical blue light conditions.",
    test_fi: "Toista Chae 2019 ruokaorientaatioasetelma silmien värillä ryhmittelevänä muuttujana. Sinisilmäisten miesten orientaation tulisi olla voimakkaampaa kuin vihreäsilmäisten samoissa sinisen valon olosuhteissa.",
    test_ja: "Chae 2019の食物定位パラダイムを眼の色をグループ分け変数として再現する。同一の青色光条件下で、青い目の男性は緑の目の男性よりも強い定位を示すはずである。",
    test_fr: "Reproduire le paradigme d'orientation alimentaire de Chae 2019 avec la couleur des yeux comme variable de regroupement. Les hommes aux yeux bleus devraient montrer une orientation plus forte que les hommes aux yeux verts dans des conditions de lumière bleue identiques.",
    test_ko: "Chae 2019 음식 정위 패러다임을 눈 색깔을 그룹 변수로 하여 재현한다. 동일한 청색광 조건에서 파란 눈의 남성이 녹색 눈의 남성보다 더 강한 정위를 보여야 한다.",
    discriminating: true,
  },
  {
    id: "EYE-2",
    title_en: "Green-eyed women show more stable melatonin profiles than blue-eyed women",
    title_fi: "Vihreäsilmäisillä naisilla on vakaampi melatoniiniprofiili kuin sinisilmäisillä",
    title_ja: "緑の目の女性は青い目の女性よりも安定したメラトニンプロファイルを示す",
    title_fr: "Les femmes aux yeux verts montrent des profils de mélatonine plus stables que les femmes aux yeux bleus",
    title_ko: "녹색 눈의 여성은 파란 눈의 여성보다 더 안정적인 멜라토닌 프로파일을 보인다",
    test_en: "Measure 24-hour salivary melatonin profiles in green-eyed vs blue-eyed women under identical light conditions. Green-eyed women should show lower coefficient of variation in melatonin rhythm amplitude.",
    test_fi: "Mittaa 24 tunnin sylkimelatoniiniprofiilit vihreäsilmäisillä vs. sinisilmäisillä naisilla identtisissä valo-olosuhteissa. Vihreäsilmäisillä tulisi olla pienempi variaatiokerroin melatoniinirytmin amplitudissa.",
    test_ja: "同一光条件下で緑の目と青い目の女性の24時間唾液メラトニンプロファイルを測定する。緑の目の女性はメラトニンリズム振幅の変動係数がより低いはずである。",
    test_fr: "Mesurer les profils de mélatonine salivaire sur 24 heures chez les femmes aux yeux verts vs aux yeux bleus dans des conditions lumineuses identiques. Les femmes aux yeux verts devraient montrer un coefficient de variation plus faible dans l'amplitude du rythme de mélatonine.",
    test_ko: "동일한 광 조건에서 녹색 눈과 파란 눈 여성의 24시간 타액 멜라토닌 프로파일을 측정한다. 녹색 눈의 여성은 멜라토닌 리듬 진폭의 변동계수가 더 낮아야 한다.",
    discriminating: true,
  },
  {
    id: "EYE-3",
    title_en: "B2 supplementation improves circadian resilience to nighttime EMF",
    title_fi: "B2-lisä parantaa sirkadiaanista resilienssiä yölliselle EMF-altistukselle",
    title_ja: "B2補充は夜間EMFに対する概日レジリエンスを改善する",
    title_fr: "La supplémentation en B2 améliore la résilience circadienne aux EMF nocturnes",
    title_ko: "B2 보충은 야간 EMF에 대한 개일 회복력을 개선한다",
    test_en: "RCT: B2 supplementation (25mg/day) vs placebo in subjects with poor sleep quality and high nighttime phone use. Measure melatonin onset latency and sleep efficiency. B2 group should show less circadian disruption because FAD-replete CRY is more stable.",
    test_fi: "RCT: B2-lisä (25mg/pv) vs. lumevalmiste henkilöillä joilla on huono unenlaatu ja runsas yöllinen puhelinkäyttö. Mittaa melatoniinin alkamisviive ja unen tehokkuus. B2-ryhmän sirkadiaaninen häiriö tulisi olla pienempi koska FAD-rikas CRY on stabiilimpi.",
    test_ja: "RCT：睡眠の質が低く夜間の携帯電話使用が多い被験者にB2補充（25mg/日）対プラセボ。メラトニン開始潜時と睡眠効率を測定する。FAD充足CRYはより安定なため、B2群の概日リズム障害はより少ないはずである。",
    test_fr: "ECR : supplémentation en B2 (25 mg/jour) vs placebo chez des sujets ayant une mauvaise qualité de sommeil et une utilisation élevée du téléphone la nuit. Mesurer la latence d'apparition de la mélatonine et l'efficacité du sommeil. Le groupe B2 devrait montrer moins de perturbation circadienne car le CRY saturé en FAD est plus stable.",
    test_ko: "RCT: 수면의 질이 낮고 야간 휴대전화 사용이 많은 피험자에게 B2 보충(25mg/일) 대 위약. 멜라토닌 개시 잠복기와 수면 효율을 측정한다. FAD 충만 CRY가 더 안정적이므로 B2 그룹은 개일리듬 교란이 더 적어야 한다.",
    discriminating: true,
  },
  {
    id: "EYE-4",
    title_en: "Blue-eyed individuals show greater melatonin disruption from nighttime phone use",
    title_fi: "Sinisilmäiset osoittavat suuremman melatoniinihäiriön yöllisestä puhelinkäytöstä",
    title_ja: "青い目の個体は夜間の携帯電話使用によるメラトニン障害がより大きい",
    title_fr: "Les individus aux yeux bleus montrent une perturbation de la mélatonine plus importante due à l'utilisation nocturne du téléphone",
    title_ko: "파란 눈의 개인은 야간 휴대전화 사용으로 인한 멜라토닌 교란이 더 크다",
    test_en: "Cross-sectional: correlate eye color with self-reported sleep quality and measured melatonin profiles among matched subjects with similar nighttime screen exposure. Blue-eyed subjects should show larger disruption because more blue light reaches CRY from the phone screen.",
    test_fi: "Poikkileikkaustutkimus: korreloi silmien väri itseraportoituun unenlaatuun ja mitattuihin melatoniiniprofiileihin vertailukelpoisilla koehenkilöillä joilla on samankaltainen yöllinen ruutualtistus. Sinisilmäisillä tulisi olla suurempi häiriö koska enemmän sinistä valoa pääsee puhelimen näytöstä CRY:lle.",
    test_ja: "横断研究：同様の夜間スクリーン曝露を持つ対応被験者間で、眼の色と自己報告睡眠品質および測定メラトニンプロファイルを相関させる。携帯電話スクリーンからCRYに到達する青色光が多いため、青い目の被験者はより大きな障害を示すはずである。",
    test_fr: "Étude transversale : corréler la couleur des yeux avec la qualité du sommeil auto-déclarée et les profils de mélatonine mesurés parmi des sujets appariés avec une exposition nocturne aux écrans similaire. Les sujets aux yeux bleus devraient montrer une perturbation plus importante car plus de lumière bleue atteint CRY depuis l'écran du téléphone.",
    test_ko: "횡단 연구: 유사한 야간 화면 노출을 가진 대응 피험자 간에 눈 색깔과 자가보고 수면 품질 및 측정된 멜라토닌 프로파일을 상관시킨다. 휴대전화 화면에서 CRY에 도달하는 청색광이 더 많으므로 파란 눈의 피험자는 더 큰 교란을 보여야 한다.",
    discriminating: false,
  },
  {
    id: "EYE-5",
    title_en: "Eye color modulates BERM pathway C effectiveness across populations",
    title_fi: "Silmien väri moduloi BERM:n polku C:n tehokkuutta populaatioiden välillä",
    title_ja: "眼の色は集団間でBERMパスウェイCの有効性を調節する",
    title_fr: "La couleur des yeux module l'efficacité de la voie BERM C entre les populations",
    title_ko: "눈 색깔은 집단 간 BERM 경로 C의 효과를 조절한다",
    test_en: "Ecological: in the 54-country BERM dataset, test whether populations with higher prevalence of blue/green eyes show stronger EMF-TFR association after controlling for GDP and education. If pathway C is modulated by eye color, northern European populations (high blue-eye prevalence) should show larger biological EMF sensitivity.",
    test_fi: "Ekologinen: BERM:n 54 maan datasetissä testaa osoittavatko populaatiot joissa on korkeampi sinisten/vihreiden silmien esiintyvyys voimakkaampaa EMF-TFR-assosiaatiota BKT:n ja koulutuksen kontrolloinnin jälkeen. Jos polku C:tä moduloi silmien väri, Pohjois-Euroopan populaatioiden (korkea sinisilmäisyyden esiintyvyys) tulisi osoittaa suurempaa biologista EMF-herkkyyttä.",
    test_ja: "生態学的：BERM 54カ国データセットにおいて、GDPと教育を統制した後、青色/緑色の目の有病率が高い集団がより強いEMF-TFR関連を示すかを検定する。パスウェイCが眼の色により調節されるならば、北欧集団（青い目の有病率が高い）はより大きな生物学的EMF感受性を示すはずである。",
    test_fr: "Écologique : dans le jeu de données BERM de 54 pays, tester si les populations avec une prévalence plus élevée d'yeux bleus/verts montrent une association EMF-TFR plus forte après contrôle du PIB et de l'éducation. Si la voie C est modulée par la couleur des yeux, les populations d'Europe du Nord (forte prévalence d'yeux bleus) devraient montrer une plus grande sensibilité biologique aux EMF.",
    test_ko: "생태학적: BERM 54개국 데이터셋에서 GDP와 교육을 통제한 후 파란/녹색 눈의 유병률이 높은 집단이 더 강한 EMF-TFR 연관을 보이는지 검정한다. 경로 C가 눈 색깔에 의해 조절된다면, 북유럽 집단(파란 눈 유병률이 높음)은 더 큰 생물학적 EMF 감수성을 보여야 한다.",
    discriminating: true,
  },
];

export const EPISTEMIC_LEVELS: Record<string, { color: string; label_en: string; label_fi: string; label_ja: string; label_fr: string; label_ko: string }> = {
  E: { color: "#22c55e", label_en: "Experimental", label_fi: "Kokeellinen", label_ja: "実験的", label_fr: "Expérimental", label_ko: "실험적" },
  "M|C": { color: "#f59e0b", label_en: "Mechanistic | Correlational", label_fi: "Mekanistinen | Korrelaatio", label_ja: "機構的 | 相関的", label_fr: "Mécanistique | Corrélationnel", label_ko: "기구적 | 상관적" },
  C: { color: "#f97316", label_en: "Correlational", label_fi: "Korrelaatio", label_ja: "相関的", label_fr: "Corrélationnel", label_ko: "상관적" },
  M: { color: "#eab308", label_en: "Mechanistic", label_fi: "Mekanistinen", label_ja: "機構的", label_fr: "Mécanistique", label_ko: "기구적" },
  "L*": { color: "#a855f7", label_en: "Testable hypothesis", label_fi: "Testattava hypoteesi", label_ja: "検証可能な仮説", label_fr: "Hypothèse testable", label_ko: "검증 가능한 가설" },
};
