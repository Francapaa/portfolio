export type StationId =
  | "home"
  | "projects"
  | "about"
  | "services"
  | "experience"
  | "education";

export type Lang = "es" | "en";

export interface StationDef {
  id: StationId;
  position: [number, number, number];
  dockRadius: number;
  /** Surface base color */
  color: string;
  /** Atmosphere / accent */
  atmosphere: string;
  /** Relative planet scale */
  scale: number;
  label: { es: string; en: string };
}

/** Constellation of portfolio planets around origin. */
export const STATIONS: StationDef[] = [
  {
    id: "home",
    position: [0, 0, 0],
    dockRadius: 5.5,
    color: "#ea580c",
    atmosphere: "#fdba74",
    scale: 1.45,
    label: { es: "Inicio", en: "Home" },
  },
  {
    id: "projects",
    position: [18, 2, -8],
    dockRadius: 5.2,
    color: "#c2410c",
    atmosphere: "#fb923c",
    scale: 1.15,
    label: { es: "Proyectos", en: "Projects" },
  },
  {
    id: "about",
    position: [-16, -1, -10],
    dockRadius: 5.2,
    color: "#9a3412",
    atmosphere: "#f97316",
    scale: 1.05,
    label: { es: "Sobre mí", en: "About" },
  },
  {
    id: "services",
    position: [12, -3, 16],
    dockRadius: 5.2,
    color: "#b45309",
    atmosphere: "#fbbf24",
    scale: 1.1,
    label: { es: "Servicios", en: "Services" },
  },
  {
    id: "experience",
    position: [-14, 3, 14],
    dockRadius: 5.2,
    color: "#d97706",
    atmosphere: "#fdba74",
    scale: 1.0,
    label: { es: "Experiencia", en: "Experience" },
  },
  {
    id: "education",
    position: [0, 6, -20],
    dockRadius: 5.2,
    color: "#7c2d12",
    atmosphere: "#fb7185",
    scale: 0.95,
    label: { es: "Educación", en: "Education" },
  },
];

export function getStation(id: StationId): StationDef {
  return STATIONS.find((s) => s.id === id) ?? STATIONS[0];
}
