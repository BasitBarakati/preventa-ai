/* Shared bus for opening the assessment dialog from anywhere
   (nav, hero, assessment section) without prop drilling. */
export function openAssessment(detail?: Record<string, string>) {
  window.dispatchEvent(new CustomEvent("phronesis:assessment", { detail }));
}
