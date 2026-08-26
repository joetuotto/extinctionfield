import {
  House,
  Map,
  GitBranch,
  Layers,
  Leaf,
  Target,
  Info,
  ChartLine,
  Database,
  Globe2,
  ShieldQuestion,
  BookOpen,
  Radio,
  Sigma,
  Network,
  Activity,
  FileText,
  Microscope,
  Bug,
  FlaskConical,
  Pill,
  Dna,
  Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavRoute {
  href: string;
  labelEn: string;
  labelFi: string;
  icon: LucideIcon;
  descEn?: string;
  descFi?: string;
  badge?: string;
  children?: NavRoute[];
}

export const NAV_ROUTES: NavRoute[] = [
  { href: "", labelEn: "Home", labelFi: "Etusivu", icon: House },
  {
    href: "/model",
    labelEn: "Model",
    labelFi: "Malli",
    icon: GitBranch,
    children: [
      {
        href: "/model",
        labelEn: "Overview",
        labelFi: "Yleiskatsaus",
        icon: GitBranch,
        descEn: "Three-level architecture, five routes, disease cascades",
        descFi: "Kolmitasoarkkitehtuuri, viisi reittiä, sairauskaskadit",
      },
      {
        href: "/modulome",
        labelEn: "Modulome",
        labelFi: "Modulomi",
        icon: Activity,
        descEn: "12 layers, 12 target organs, 4 routes",
        descFi: "12 kerrosta, 12 kohde-elintä, 4 reittiä",
      },
      {
        href: "/map",
        labelEn: "Causal Map",
        labelFi: "Kausaalikartta",
        icon: Network,
        descEn: "Interactive causal chain from physics to TFR",
        descFi: "Interaktiivinen kausaaliketju fysiikasta TFR:ään",
      },
      {
        href: "/model#vgcc-gene-family",
        labelEn: "VGCC Gene Family",
        labelFi: "VGCC-geeniperhe",
        icon: Dna,
        descEn: "Six genes, six disease clusters",
        descFi: "Kuusi geeniä, kuusi sairausklusteria",
      },
      {
        href: "/model#testosterone-threshold",
        labelEn: "T→TFR Threshold",
        labelFi: "T→TFR-kynnys",
        icon: ChartLine,
        descEn: "Why testosterone predicts fertility collapse",
        descFi: "Miksi testosteroni ennustaa syntyvyysromahduksen",
      },
      {
        href: "/model#camkii-convergence",
        labelEn: "CaMKII Convergence",
        labelFi: "CaMKII-konvergenssi",
        icon: Activity,
        descEn: "One molecule, five disease cascades",
        descFi: "Yksi molekyyli, viisi sairauskaskadia",
        badge: "NEW",
      },
      {
        href: "/mathematics",
        labelEn: "Mathematics",
        labelFi: "Matematiikka",
        icon: Sigma,
        descEn: "Complete derivation from Lindgren geometry to TFR",
        descFi: "Täydellinen derivaatio Lindgren-geometriasta TFR:ään",
      },
    ],
  },
  {
    href: "/evidence",
    labelEn: "Evidence",
    labelFi: "Näyttö",
    icon: Layers,
    children: [
      {
        href: "/evidence",
        labelEn: "Overview",
        labelFi: "Yleiskatsaus",
        icon: Layers,
        descEn: "Study-by-study evidence register",
        descFi: "Tutkimuskohtainen evidenssirekisteri",
      },
      {
        href: "/explore",
        labelEn: "Data Explorer",
        labelFi: "Data-selain",
        icon: Database,
        descEn: "Interactive maps, charts, and country data",
        descFi: "Interaktiiviset kartat, kuvaajat ja maadata",
      },
      {
        href: "/evidence/pharmacology",
        labelEn: "Pharmacological Evidence",
        labelFi: "Farmakologinen evidenssi",
        icon: Pill,
        descEn: "8 drug classes converging on BERM pathways",
        descFi: "8 lääkeryhmää konvergoivat BERM-reiteillä",
      },
      {
        href: "/evidence/populations",
        labelEn: "Populations",
        labelFi: "Populaatiot",
        icon: Globe2,
        descEn: "Nine low-EMF communities vs modern",
        descFi: "Yhdeksän matala-EMF-yhteisöä vs moderni",
      },
      {
        href: "/evidence/evolution",
        labelEn: "Evolutionary Origins",
        labelFi: "Evolutiiviset juuret",
        icon: FlaskConical,
        descEn: "The Northern Package hypothesis",
        descFi: "Pohjoisen paketin hypoteesi",
      },
      {
        href: "/evidence/replication",
        labelEn: "Replication Crisis",
        labelFi: "Replikaatiokriisi",
        icon: FlaskConical,
        descEn: "Blackman's five confounds and the five-parameter standard",
        descFi: "Blackmanin viisi sekoittavaa tekijää ja viiden parametrin standardi",
      },
      {
        href: "/evidence/technology",
        labelEn: "Technology Profiles",
        labelFi: "Teknologiaprofiilit",
        icon: Radio,
        descEn: "14 technology profiles, ELF priming, superadditivity model",
        descFi: "14 teknologiaprofiilia, ELF-priming, superadditiivisuusmalli",
      },
      {
        href: "/sentinel",
        labelEn: "Sentinel Species",
        labelFi: "Sentinel-lajit",
        icon: Bug,
        descEn: "Bee, bird, and amphibian decline patterns",
        descFi: "Mehiläisten, lintujen ja sammakkoeläinten laskumallit",
      },
      {
        href: "/objections",
        labelEn: "Criticism & Responses",
        labelFi: "Kritiikki ja vastaukset",
        icon: ShieldQuestion,
        descEn: "Counterarguments and our responses",
        descFi: "Vastaväitteet ja vastauksemme",
      },
      {
        href: "/references",
        labelEn: "All References",
        labelFi: "Kaikki lähteet",
        icon: BookOpen,
        descEn: "531 peer-reviewed sources",
        descFi: "531 vertaisarvioitua lähdettä",
      },
    ],
  },
  { href: "/civilization", labelEn: "Civilization", labelFi: "Sivilisaatio", icon: Landmark },
  { href: "/predictions", labelEn: "Predictions", labelFi: "Ennusteet", icon: Target },
  { href: "/articles", labelEn: "Articles", labelFi: "Artikkelit", icon: FileText },
  { href: "/about", labelEn: "About", labelFi: "Tietoa", icon: Info },
];

export interface ResolvedNavRoute {
  href: string;
  label: string;
  icon: LucideIcon;
  desc?: string;
  badge?: string;
  children?: ResolvedNavRoute[];
}

export function getNavRoutes(locale: string): ResolvedNavRoute[] {
  const fi = locale === "fi";
  return NAV_ROUTES.map((route) => ({
    href: route.href,
    label: fi ? route.labelFi : route.labelEn,
    icon: route.icon,
    desc: fi ? route.descFi : route.descEn,
    badge: route.badge,
    children: route.children?.map((child) => ({
      href: child.href,
      label: fi ? child.labelFi : child.labelEn,
      icon: child.icon,
      desc: fi ? child.descFi : child.descEn,
      badge: child.badge,
    })),
  }));
}

export interface ExploreTab {
  key: "map" | "country" | "global" | "sentinel" | "data" | "layers" | "threshold";
  labelEn: string;
  labelFi: string;
  icon: LucideIcon;
}

export const EXPLORE_TABS: ExploreTab[] = [
  { key: "map", labelEn: "Map", labelFi: "Kartta", icon: Map },
  { key: "country", labelEn: "Country", labelFi: "Maa", icon: ChartLine },
  { key: "global", labelEn: "Global", labelFi: "Globaali", icon: Globe2 },
  { key: "threshold", labelEn: "T→TFR", labelFi: "T→TFR", icon: Activity },
  { key: "sentinel", labelEn: "Sentinel", labelFi: "Indikaattorit", icon: Leaf },
  { key: "data", labelEn: "Data", labelFi: "Data", icon: Database },
  { key: "layers", labelEn: "Layers", labelFi: "Kerrokset", icon: Layers },
];

export function getExploreTabs(locale: string) {
  return EXPLORE_TABS.map((tab) => ({
    key: tab.key,
    label: locale === "fi" ? tab.labelFi : tab.labelEn,
    icon: tab.icon,
  }));
}
