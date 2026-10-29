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
  color: string;
  label: { es: string; en: string };
}

/** Constellation of portfolio stations around origin. */
export const STATIONS: StationDef[] = [
  {
    id: "home",
    position: [0, 0, 0],
    dockRadius: 4.5,
    color: "#5eead4",
    label: { es: "Inicio", en: "Home" },
  },
  {
    id: "projects",
    position: [18, 2, -8],
    dockRadius: 5,
    color: "#38bdf8",
    label: { es: "Proyectos", en: "Projects" },
  },
  {
    id: "about",
    position: [-16, -1, -10],
    dockRadius: 5,
    color: "#2dd4bf",
    label: { es: "Sobre mí", en: "About" },
  },
  {
    id: "services",
    position: [12, -3, 16],
    dockRadius: 5,
    color: "#67e8f9",
    label: { es: "Servicios", en: "Services" },
  },
  {
    id: "experience",
    position: [-14, 3, 14],
    dockRadius: 5,
    color: "#22d3ee",
    label: { es: "Experiencia", en: "Experience" },
  },
  {
    id: "education",
    position: [0, 6, -20],
    dockRadius: 5,
    color: "#a5f3fc",
    label: { es: "Educación", en: "Education" },
  },
];

export function getStation(id: StationId): StationDef {
  return STATIONS.find((s) => s.id === id) ?? STATIONS[0];
}
