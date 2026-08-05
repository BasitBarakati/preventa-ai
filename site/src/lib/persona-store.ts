export const personas = ["Individual", "Community", "Public Health Professional", "Researcher", "Organization"] as const;
export const defaultPersona = "Public Health Professional";

export function getPersonaSnapshot() {
  const stored = window.localStorage.getItem("preventa-persona");
  return stored && (personas as readonly string[]).includes(stored) ? stored : defaultPersona;
}

export function getPersonaServerSnapshot() {
  return defaultPersona;
}

export function subscribeToPersona(callback: () => void) {
  const update = () => callback();
  window.addEventListener("preventa:persona-change", update);
  window.addEventListener("storage", update);
  return () => { window.removeEventListener("preventa:persona-change", update); window.removeEventListener("storage", update); };
}

export function setActivePersona(value: string) {
  window.localStorage.setItem("preventa-persona", value);
  window.dispatchEvent(new CustomEvent("preventa:persona-change", { detail: value }));
}
