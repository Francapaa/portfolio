export function normalizeCommand(input: string): string {
  return input.trim().toLowerCase().replace(/\\/g, "/").replace(/\s+/g, " ");
}

export interface ParsedCommand {
  nextDirectory: string;
  response: string;
  clear: boolean;
}

export const INITIAL_TERMINAL_HISTORY: string[] = [
  "Available commands:",
  "sobre mi / about me",
  "cd servicios / cd services",
  "cd proyectos / cd projects",
  "cd experiencia / cd experience",
  "cd educacion / cd education",
  "help",
  "clear",
];

/**
 * Pure command parser extracted from the portfolio terminal.
 * Returns `null` when there is nothing to do (empty input).
 */
export function parseTerminalCommand(
  value: string,
  directory: string
): ParsedCommand | null {
  const command = normalizeCommand(value);
  if (!command) return null;

  const next = command.replace(/^cd\s+/, "");
  let nextDirectory = directory;
  let response = "Command not found. Try 'help' or cd proyectos.";

  if (command === "help") {
    response =
      "sobre mi · about me · cd servicios/services · cd proyectos/projects · cd experiencia/experience · cd educacion/education · clear";
  } else if (command === "clear") {
    return { nextDirectory: directory, response: "", clear: true };
  } else if (
    ["sobre mi", "/sobre mi", "sobre-mi", "/sobre-mi"].includes(next)
  ) {
    nextDirectory = "/sobre-mi";
    response = "Opening /sobre-mi …";
  } else if (
    ["about", "/about", "about me", "/about me", "about-me", "/about-me"].includes(
      next
    )
  ) {
    nextDirectory = "/about";
    response = "Opening /about …";
  } else if (
    ["servicios", "/servicios", "servicio", "/servicio"].includes(next)
  ) {
    nextDirectory = "/servicios";
    response = "Opening /servicios …";
  } else if (["services", "/services", "service", "/service"].includes(next)) {
    nextDirectory = "/services";
    response = "Opening /services …";
  } else if (["proyectos", "/proyectos"].includes(next)) {
    nextDirectory = "/proyectos";
    response = "Opening /proyectos …";
  } else if (["projects", "/projects"].includes(next)) {
    nextDirectory = "/projects";
    response = "Opening /projects …";
  } else if (
    ["experiencia", "/experiencia", "experiencie", "/experiencie"].includes(next)
  ) {
    nextDirectory = "/experiencia";
    response = "Opening /experiencia …";
  } else if (["experience", "/experience"].includes(next)) {
    nextDirectory = "/experience";
    response = "Opening /experience …";
  } else if (["educacion", "/educacion"].includes(next)) {
    nextDirectory = "/educacion";
    response = "Opening /educacion …";
  } else if (["education", "/education"].includes(next)) {
    nextDirectory = "/education";
    response = "Opening /education …";
  } else if (command === "pwd") {
    response = directory;
  }

  return { nextDirectory, response, clear: false };
}
