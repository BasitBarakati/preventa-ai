export type PhronesisLetter = {
  letter: string;
  word: string;
  copy: string;
  tags: string[];
  accent: string; // hex — shared by the hero orbit nodes, the acronym rail's ghost stroke, and its detail chip
};

/** The nine pillars behind P·H·R·O·N·E·S·I·S — single source of truth so the
 *  hero's orbiting nodes and the Acronym rail always agree on color/copy. */
export const PHRONESIS_LETTERS: PhronesisLetter[] = [
  {
    letter: "P",
    word: "Population Assessment & Surveillance",
    copy: "Continuous, ward-level signals from the places health actually happens — syndromic trends, SDOH layers and community-reported data fused into one live picture.",
    tags: ["syndromic signals", "SDOH mapping", "live dashboards"],
    accent: "#1F8A8A",
  },
  {
    letter: "H",
    word: "Health Promotion & Disease Prevention",
    copy: "Upstream by default. Co-designed campaigns, screening pathways and prevention playbooks that meet people where they are — culturally safe and strengths-based.",
    tags: ["co-design", "screening pathways", "campaign studios"],
    accent: "#7FB069",
  },
  {
    letter: "R",
    word: "Resilience & Emergency Preparedness",
    copy: "Stress-test your system before the crisis does. Scenario modelling, surge playbooks and continuity plans that hold when the pressure arrives.",
    tags: ["scenario modelling", "surge plans", "risk registers"],
    accent: "#E8A87C",
  },
  {
    letter: "O",
    word: "Operations & Policy Review",
    copy: "Turn policy scans and operational audits into decisions — SOP gaps surfaced, jurisdictional comparisons in plain language, momentum tracked to closure.",
    tags: ["policy scans", "SOP audits", "decision memos"],
    accent: "#0B3D5F",
  },
  {
    letter: "N",
    word: "Networked Collaboration",
    copy: "A shared table for health units, NGOs, municipalities and communities. Shared agendas, shared data agreements, shared credit.",
    tags: ["coalition hubs", "data sharing pacts", "communities of practice"],
    accent: "#C38D6B",
  },
  {
    letter: "E",
    word: "Evidence & AI",
    copy: "Living evidence syntheses with retrieval you can audit. Every suggestion cites its source; every model output waits for a human verdict.",
    tags: ["living reviews", "auditable retrieval", "citation trails"],
    accent: "#1F8A8A",
  },
  {
    letter: "S",
    word: "Systems for Health Protection",
    copy: "Outbreak workflows, inspection intelligence and environmental health monitoring — the protective scaffolding that keeps communities safe between emergencies.",
    tags: ["outbreak workflows", "inspection analytics", "environmental monitoring"],
    accent: "#7FB069",
  },
  {
    letter: "I",
    word: "Intelligence & Analytics",
    copy: "Predictive need models, equity-stratified indicators and board-ready analytics — always disaggregated, so no community is averaged out of view.",
    tags: ["predictive need", "equity stratification", "board analytics"],
    accent: "#E8A87C",
  },
  {
    letter: "S",
    word: "Strengthening the 6 Functions",
    copy: "Every module maps back to the six core public health functions — so capability compounds across your whole system, not just one dashboard.",
    tags: ["core functions", "capability map", "system-wide lift"],
    accent: "#0B3D5F",
  },
];
