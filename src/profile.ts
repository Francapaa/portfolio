export interface Profile {
  name: string;
  email: string;
  github: string;
  linkedin: string;
}

// Completar estos campos antes de publicar una identidad personal.
// Se dejan vacíos porque el usuario no proporcionó estos datos.
export const defaultProfile: Profile = {
  name: "",
  email: "",
  github: "",
  linkedin: "",
};
