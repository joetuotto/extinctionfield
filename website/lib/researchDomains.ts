export interface ResearchDomain {
  n: string;
  t: string;
  d: string;
}

export const RESEARCH_DOMAINS: Record<"en" | "fi" | "ja" | "fr" | "ko", readonly ResearchDomain[]> = {
  en: [
    { n: "01", t: "Oncology", d: "TTFields (FDA-approved): 100–300 kHz fields disrupt cell division. Novocure, clinical trials." },
    { n: "02", t: "Orthopedics", d: "PEMF bone stimulators (FDA 1986): pulsed EMF accelerates bone healing. 30+ years of clinical use." },
    { n: "03", t: "Neurology", d: "TMS, tDCS, VNS, DBS: non-thermal EMF devices treat depression, epilepsy, Parkinson's. 160,000+ implanted DBS devices." },
    { n: "04", t: "Quantum biology", d: "Radical-pair/CRY mechanism (RPM): bird magnetoreception via cryptochrome. Sherrard 2018: pulsed EMF produces ROS CRY-dependently." },
    { n: "05", t: "Cell biology", d: "IFO-VGIC (Panagopoulos 2025): ion forced oscillation via voltage-gated calcium channels. Threshold 10⁻⁵ V/m." },
    { n: "06", t: "Non-ionotropic VGCC", d: "Trus et al. 2024 (Hebrew U.): VGCC activates intracellular signaling via conformational change WITHOUT ion flux." },
    { n: "07", t: "Entomology", d: "Bee-EMF data: Favre & Johansson 2025, Hallmann 2017, Thielens 2018. Bee piping, insect decline, RF absorption." },
    { n: "08", t: "Parasitology", d: "England 2023: ticks attracted to hosts electrostatically. Biological activity of static fields." },
    { n: "09", t: "Geometric physics", d: "Lindgren 2025 metric premise. The reported 87.5% algebraic correspondence with RPM is a structural comparison, not a derived coupling; BERM's background- and angle-dependent bridge remains a testable L2 proposal." },
    { n: "10", t: "Electroecology", d: "Bristol (Clarke, Robert, England, Mallinson): aerial electroreception, bee electric communication, anthropogenic fields −71% bee landings. Plant CRY: Ahmad 2020 — 7 MHz RF reduces Arabidopsis CRY1 response (RPM fingerprint in plants); Xu 2015 — geomagnetic field regulates flowering via CRY2; Bogdziewicz 2024 — masting synchrony across 2,000 km via summer solstice (CRY2 candidate synchronizer)." },
  ],
  fi: [
    { n: "01", t: "Onkologia", d: "TTFields (FDA-hyväksytty): 100–300 kHz kentät häiritsevät solunjakautumista. Novocure, kliiniset kokeet." },
    { n: "02", t: "Ortopedia", d: "PEMF-luunstimulaattorit (FDA 1986): pulssimuotoinen EMF kiihdyttää luun paranemista. 30+ vuoden kliininen käyttö." },
    { n: "03", t: "Neurologia", d: "TMS, tDCS, VNS, DBS: ei-termiset EMF-laitteet hoitavat masennusta, epilepsiaa, Parkinsonia. 160 000+ implantoitua DBS-laitetta." },
    { n: "04", t: "Kvanttbiologia", d: "Radikaalipari/CRY-mekanismi (RPM): lintujen magneettiaisti perustuu kryptokromiin. Sherrard 2018: pulssi-EMF tuottaa ROS:ia CRY-riippuvaisesti." },
    { n: "05", t: "Solubiologia", d: "IFO-VGIC (Panagopoulos 2025): ionien pakotettu oskillaatio jänniteohjattujen kalsiumkanavien kautta. Kynnys 10⁻⁵ V/m." },
    { n: "06", t: "Ei-ionotrooppinen VGCC", d: "Trus ym. 2024 (Hebr. yliopisto): VGCC aktivoi solunsisäisiä signaalireittejä konformaatiomuutoksella ILMAN ionifluksia." },
    { n: "07", t: "Entomologia", d: "Mehiläis-EMF-data: Favre & Johansson 2025, Hallmann 2017, Thielens 2018. Mehiläisten piping, hyönteiskato, RF-absorptio." },
    { n: "08", t: "Parasitologia", d: "England 2023: punkit vedetään isäntiin sähköstaattisesti. Staattisten kenttien biologinen aktiivisuus." },
    { n: "09", t: "Geometrinen fysiikka", d: "Lindgrenin vuoden 2025 metriikkapremissi. Raportoitu 87,5 %:n algebrallinen vastaavuus RPM:ään on rakennevertailu, ei johdettu kytkentä; BERM:n tausta- ja kulmariippuvainen silta on testattava L2-ehdotus." },
    { n: "10", t: "Sähköekologia", d: "Bristol (Clarke, Robert, England, Mallinson): ilman sähköreseptio, mehiläisten sähköinen viestintä, antropogeeniset kentät −71 % mehiläislaskeutumisia. Kasvi-CRY: Ahmad 2020 — 7 MHz RF vähentää Arabidopsiksen CRY1-responssia (RPM-sormenjälki kasveissa); Xu 2015 — geomagneettinen kenttä säätelee kukintaa CRY2:n kautta; Bogdziewicz 2024 — masting-synkronia 2 000 km kesäpäivänseisauksella (CRY2 ehdokassynkronoija)." },
  ],
  ja: [
    { n: "01", t: "腫瘍学", d: "TTFields（FDA承認済み）：100–300 kHz電場が細胞分裂を妨害。Novocure、臨床試験。" },
    { n: "02", t: "整形外科", d: "PEMF骨刺激装置（FDA 1986）：パルスEMFが骨治癒を促進。30年以上の臨床使用。" },
    { n: "03", t: "神経学", d: "TMS、tDCS、VNS、DBS：非熱EMF機器がうつ病、てんかん、パーキンソン病を治療。160,000以上の埋込DBS装置。" },
    { n: "04", t: "量子生物学", d: "ラジカルペア/CRYメカニズム（RPM）：クリプトクロムによる鳥類の磁気受容。Sherrard 2018：パルスEMFがCRY依存的にROSを産生。" },
    { n: "05", t: "細胞生物学", d: "IFO-VGIC（Panagopoulos 2025）：電位依存性カルシウムチャネルによるイオン強制振動。閾値10⁻⁵ V/m。" },
    { n: "06", t: "非イオノトロピックVGCC", d: "Trus et al. 2024（ヘブライ大学）：VGCCがイオンフラックスなしで構造変化を通じて細胞内シグナリングを活性化。" },
    { n: "07", t: "昆虫学", d: "ミツバチ-EMFデータ：Favre & Johansson 2025、Hallmann 2017、Thielens 2018。ミツバチのパイピング、昆虫減少、RF吸収。" },
    { n: "08", t: "寄生虫学", d: "England 2023：ダニが宿主に静電的に引き寄せられる。静電場の生物学的活性。" },
    { n: "09", t: "幾何物理学", d: "Lindgren 2025計量の前提。RPMとの87.5%代数対応は構造比較であり導出結合ではない。BERMの背景・角度依存ブリッジは検証すべきL2命題。" },
    { n: "10", t: "電気生態学", d: "Bristol（Clarke、Robert、England、Mallinson）：空中電気受容、ミツバチの電気コミュニケーション、人為的電場で着地−71%。植物CRY：Ahmad 2020 — 7 MHz RFがシロイヌナズナCRY1応答を減少（植物でのRPMフィンガープリント）；Xu 2015 — 地磁気場がCRY2を通じて開花を制御；Bogdziewicz 2024 — マスティング同期が夏至を介して2,000 km（CRY2が候補同期装置）。" },
  ],
  fr: [
    { n: "01", t: "Oncologie", d: "TTFields (approuvé FDA) : champs 100–300 kHz perturbant la division cellulaire. Novocure, essais cliniques." },
    { n: "02", t: "Orthopédie", d: "Stimulateurs osseux PEMF (FDA 1986) : EMF pulsé accélère la guérison osseuse. 30+ ans d'utilisation clinique." },
    { n: "03", t: "Neurologie", d: "TMS, tDCS, VNS, DBS : dispositifs EMF non thermiques traitent dépression, épilepsie, Parkinson. 160 000+ dispositifs DBS implantés." },
    { n: "04", t: "Biologie quantique", d: "Mécanisme radical-pair/CRY (RPM) : magnétoréception aviaire via cryptochrome. Sherrard 2018 : EMF pulsé produit des ROS de manière CRY-dépendante." },
    { n: "05", t: "Biologie cellulaire", d: "IFO-VGIC (Panagopoulos 2025) : oscillation forcée d'ions via canaux calciques voltage-dépendants. Seuil 10⁻⁵ V/m." },
    { n: "06", t: "VGCC non ionotropique", d: "Trus et al. 2024 (Univ. hébraïque) : VGCC active la signalisation intracellulaire par changement conformationnel SANS flux ionique." },
    { n: "07", t: "Entomologie", d: "Données abeilles-EMF : Favre & Johansson 2025, Hallmann 2017, Thielens 2018. Piping des abeilles, déclin des insectes, absorption RF." },
    { n: "08", t: "Parasitologie", d: "England 2023 : tiques attirées vers les hôtes électrostatiquement. Activité biologique des champs statiques." },
    { n: "09", t: "Physique géométrique", d: "Prémisse métrique de Lindgren (2025). La correspondance algébrique de 87,5 % avec RPM est structurelle, non un couplage dérivé ; le pont BERM dépendant du fond et de l'angle reste une proposition L2 testable." },
    { n: "10", t: "Électroécologie", d: "Bristol (Clarke, Robert, England, Mallinson) : électroréception aérienne, communication électrique des abeilles, champs anthropiques −71 % atterrissages. CRY végétal : Ahmad 2020 — RF 7 MHz réduit la réponse CRY1 d'Arabidopsis (empreinte RPM végétale) ; Xu 2015 — champ géomagnétique régule la floraison via CRY2 ; Bogdziewicz 2024 — synchronie du masting sur 2 000 km via solstice (CRY2 candidat synchroniseur)." },
  ],
  ko: [
    { n: "01", t: "종양학", d: "TTFields(FDA 승인): 100–300 kHz 전장이 세포 분열 교란. Novocure, 임상 시험." },
    { n: "02", t: "정형외과", d: "PEMF 골자극기(FDA 1986): 펄스 EMF가 골 치유 촉진. 30년 이상의 임상 사용." },
    { n: "03", t: "신경학", d: "TMS, tDCS, VNS, DBS: 비열 EMF 장치가 우울증, 간질, 파킨슨병 치료. 160,000+ 이식 DBS 장치." },
    { n: "04", t: "양자생물학", d: "래디컬쌍/CRY 메커니즘(RPM): 크립토크롬을 통한 조류 자기수용. Sherrard 2018: 펄스 EMF가 CRY 의존적으로 ROS 생성." },
    { n: "05", t: "세포생물학", d: "IFO-VGIC(Panagopoulos 2025): 전압의존성 칼슘채널을 통한 이온 강제 진동. 역치 10⁻⁵ V/m." },
    { n: "06", t: "비이오노트로픽 VGCC", d: "Trus et al. 2024(히브리대): VGCC가 이온 플럭스 없이 구조 변화를 통해 세포내 신호전달 활성화." },
    { n: "07", t: "곤충학", d: "꿀벌-EMF 데이터: Favre & Johansson 2025, Hallmann 2017, Thielens 2018. 꿀벌 파이핑, 곤충 감소, RF 흡수." },
    { n: "08", t: "기생충학", d: "England 2023: 진드기가 정전기적으로 숙주에 끌림. 정전장의 생물학적 활성." },
    { n: "09", t: "기하물리학", d: "Lindgren 2025 계량 전제. RPM과의 87.5% 대수적 대응은 구조 비교이지 도출된 결합이 아니다. BERM의 배경·각도 의존 연결은 검증할 L2 제안이다." },
    { n: "10", t: "전기생태학", d: "Bristol(Clarke, Robert, England, Mallinson): 공중 전기수용, 꿀벌 전기 커뮤니케이션, 인위적 전장으로 착지 −71%. 식물 CRY: Ahmad 2020 — 7 MHz RF가 애기장대 CRY1 반응 감소(식물에서의 RPM 지문); Xu 2015 — 지자기장이 CRY2를 통해 개화 조절; Bogdziewicz 2024 — 마스팅 동기화가 하지를 통해 2,000 km(CRY2가 후보 동기화 장치)." },
  ],
} as const;
