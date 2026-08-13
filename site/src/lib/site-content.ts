export type PageKind = "policy" | "general";

export type PageDefinition = {
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  kind: PageKind;
  highlights: string[];
  sections?: Array<{ title: string; body: string }>;
  notice?: string;
  keywords?: string[];
  faqs?: Array<{ question: string; answer: string }>;
};

export const brand = {
  displayName: "PREVENTA AI",
  sentenceName: "Preventa AI",
  // Vision statement, verbatim from the Preventa AI roadmap document.
  tagline: "Health for all through the responsible use of artificial intelligence (AI).",
  // Mission statement, verbatim from the Preventa AI roadmap document.
  mission: "Empowering governments, organizations, communities, and health scholars to use AI responsibly to transform health and healthcare.",
  supportLine:
    "Assess needs. Understand risks. Apply evidence. Build healthier communities.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://preventa.ai",
};

// Guiding principles, verbatim from the Preventa AI roadmap document.
export const principles = [
  { title: "Ethical and Responsible AI", description: "Ensure AI is transparent, accountable, privacy-conscious, culturally safe, and guided by human oversight." },
  { title: "Collaboration and Partnership", description: "Co-create solutions with government, organizations, communities, health professionals, researchers, and technology partners." },
  { title: "Transformation and Innovation", description: "Use AI to strengthen and transform healthcare and public health systems in practical, sustainable ways." },
  { title: "Equity and Inclusion", description: "Design and apply AI to reduce inequities and improve access to health opportunities and services." },
  { title: "Evidence and Data-Informed Action", description: "Use high-quality data, research, and evidence to guide AI development, implementation, and evaluation." },
  { title: "Community and Indigenous Leadership", description: "Respect Indigenous knowledge, cultural safety, community priorities, data sovereignty, and Indigenous-led approaches." },
  { title: "Better Health Outcomes", description: "Keep improved individual, community, and population health at the centre of every AI initiative." },
] as const;

// Strategic goals, verbatim from the Preventa AI roadmap document.
export const strategicGoals = [
  "Build and harness AI capacity to transform healthcare systems and improve health outcomes for all.",
  "Advance health promotion, disease prevention, policy, and research through the responsible use of AI.",
  "Promote health equity, cultural safety, and Indigenous-led approaches to AI-enabled health transformation.",
  "Strengthen ethical AI governance through privacy, transparency, accountability, and human oversight.",
] as const;

export const pillars = [
  {
    number: "01",
    title: "Situation Assessment",
    description: "Needs, risks, and readiness—assessed clearly.",
    signal: "Needs to priorities",
    href: "/situation-assessment",
  },
  {
    number: "02",
    title: "Health and Wellness",
    description: "Responsible AI, applied across public health.",
    signal: "Evidence to delivery",
    href: "/health-and-wellness",
  },
  {
    number: "03",
    title: "Indigenous Health and Wellbeing",
    description: "Community-governed, culturally safe, wholistic.",
    signal: "Authority stays local",
    href: "/indigenous-health",
  },
  {
    number: "04",
    title: "Research and Risk Prediction",
    description: "Faster synthesis, always human-verified.",
    signal: "Evidence to insight",
    href: "/research",
  },
  {
    number: "05",
    title: "Courses and Workforce Learning",
    description: "Practical AI capability, built through real courses.",
    signal: "Learning to capability",
    href: "/courses",
  },
] as const;

// Detail content for each of the five program pages, verbatim from the
// "Under what we do" / "Details of what we do under each section" parts
// of the Preventa AI roadmap document.
export const situationAssessment = {
  eyebrow: "01 · SITUATION ASSESSMENT",
  title: "See the whole context before choosing the next move.",
  description: "Three assessment modules — individual and family, community, and organization — each structured around the factors that matter, not a single opaque score.",
  modules: [
    {
      title: "Individual & Family Wellbeing Assessment",
      factors: [
        "Physical activity — ≥30 minutes moderate activity, 5 days/week",
        "Healthy eating — vegetables & fruit included in 24-hour dietary recall",
        "Smoking — non-smoking / cessation readiness",
        "Alcohol & substance use — adherence to low-risk drinking guidelines; avoidance of substance use",
        "Sleep — average ~7 hours/night; duration, quality, sleep hygiene",
        "Stress management — active coping strategies in place; perceived stress screen",
      ],
      outputs: null,
    },
    {
      title: "Community Assessment",
      factors: [
        "Listing risk & protective factors",
        "Listing community priorities, needs, assets & strengths",
        "Identify high-risk groups (e.g., youth, seniors, newcomers)",
        "Incidence & prevalence of diseases",
        "Mapping of partners and stakeholders",
        "Inventory of current programs & services",
        "Service gaps & overlaps analysis",
        "Program effectiveness assessment",
      ],
      outputs: "Auto-generated Community Health Assessment report (editable), priority-setting matrix, and a monitoring dashboard the team can revisit.",
    },
    {
      title: "Organization Assessment",
      factors: [
        "Employee satisfaction — workload, psychological safety, burnout indicators, relationships, opportunities for promotion",
        "Organizational culture — values alignment, conducive work environment, learning orientation, diversity, inclusion, trust",
      ],
      outputs: "Report with heatmaps, anonymized theme summaries, and a prioritized action plan; repeat-measure tracking.",
    },
  ],
} as const;

export const healthAndWellness = {
  eyebrow: "02 · HEALTH & WELLNESS",
  title: "Responsible AI, applied across the topics that shape everyday health.",
  description: "Six connected focus areas, each grounded in the same evidence and privacy standard.",
  topics: ["Mental Wellbeing", "Substance Use & Addiction", "Environmental Health", "Healthy Sexuality", "Immunization", "School Health"],
} as const;

export const indigenousHealth = {
  eyebrow: "03 · INDIGENOUS HEALTH & WELLBEING",
  title: "Community authority is the foundation—not a feature.",
  description: "Preventa AI is being designed to support relationship-based co-design, culturally safe workflows, wholistic wellbeing, and community control over data and decisions. It does not speak for any Nation or community.",
  areas: [
    { title: "Wholistic Health", text: "Balance of physical, mental, emotional, and spiritual dimensions." },
    { title: "Connection to Land and Culture", text: "Land-based healing and learning programs, and food sovereignty resources." },
    { title: "Culture", text: "Culture as prevention and healing." },
  ],
  tags: ["OCAP® principles", "Two-Eyed Seeing", "Social Determinants of Health"],
} as const;

export const research = {
  eyebrow: "04 · AI IN RESEARCH & RISK PREDICTION",
  title: "Accelerate evidence work. Keep verification visible.",
  description: "Two connected capabilities — evidence generation and risk prediction — with explicit validation and fairness gates.",
  areas: [
    { title: "AI & Evidence Generation", text: "Ethical use of AI in planning and conducting research." },
    { title: "AI & Risk Prediction", text: "Surveillance, risk prediction, and modeling." },
  ],
} as const;

export const courses = {
  eyebrow: "05 · COURSES & WORKFORCE LEARNING",
  title: "Build practical AI capability that stays with your team.",
  description: "Four course tracks covering research, promotion, epidemiology, and applied AI training.",
  tracks: [
    { title: "Research & Knowledge Exchange", text: null },
    { title: "Health Promotion", text: null },
    { title: "Epidemiology", text: null },
    { title: "AI Training", text: "Generative AI, PH Agent, Automation and Dashboards, Website." },
  ],
} as const;

const pages: PageDefinition[] = [
  {
    path: "/contact",
    title: "Start a thoughtful conversation.",
    eyebrow: "CONTACT & EARLY ACCESS",
    description: "Tell us what you are trying to improve, who needs to be involved, and what governance or implementation questions matter most.",
    kind: "general",
    highlights: ["Request early access", "Request a demonstration", "Discuss a partnership", "Ask a governance question"],
  },
  {
    path: "/privacy",
    title: "Privacy by design, explained plainly.",
    eyebrow: "PRIVACY",
    description: "Preventa AI is designed around data minimization, meaningful consent, transparent purpose, controlled access, and user rights.",
    kind: "policy",
    highlights: ["Anonymous assessment option", "Data minimization", "Clear consent", "Data export", "Account deletion", "Encryption in transit and at rest", "Role-based access", "Audit logs", "Canadian-region hosting architecture"],
    notice: "Designed to support PHIPA- and PIPEDA-aligned implementation. Formal compliance depends on deployment, configuration, contracts, and legal review.",
    keywords: ["PHIPA compliant health platform", "PIPEDA aligned health data", "privacy by design health AI"],
  },
  {
    path: "/terms",
    title: "Clear expectations for a responsible platform.",
    eyebrow: "TERMS OF USE",
    description: "These public-facing terms summarize intended use, user responsibilities, limitations, intellectual property, and acceptable conduct for the preview experience.",
    kind: "policy",
    highlights: ["Non-clinical purpose", "Acceptable use", "No emergency service", "Human verification", "Responsible content handling", "Service changes"],
    notice: "Production terms require formal legal review before public account activation.",
  },
  {
    path: "/accessibility",
    title: "Access is part of product quality.",
    eyebrow: "ACCESSIBILITY",
    description: "Preventa AI targets WCAG 2.1 AA and is being built for keyboard access, assistive technology, readable language, reduced motion, and low-bandwidth use.",
    kind: "policy",
    highlights: ["Keyboard navigation", "Visible focus", "Semantic structure", "Accessible forms", "High contrast", "Reduced motion", "Alternative text", "Chart table alternatives", "Mobile access", "Printable reports", "Plain language"],
  },
  {
    path: "/ai-transparency",
    title: "Know when AI is used—and where it can fail.",
    eyebrow: "AI TRANSPARENCY",
    description: "AI-supported outputs should identify sources, intended use, known limitations, review status, and the person accountable for the final decision.",
    kind: "policy",
    highlights: ["AI disclosure", "Source citations", "Model limitations", "Human review status", "Feedback and escalation", "Change logs", "Incident-response placeholders", "No autonomous diagnosis"],
  },
];

export const pageDefinitions = Object.fromEntries(pages.map((page) => [page.path, page])) as Record<string, PageDefinition>;

export const navigation = [
  { label: "Who We Are", href: "/#top" },
  { label: "Our Purpose", href: "/#about" },
  { label: "What We Do", href: "/#programs" },
] as const;

export const programPaths = pillars.map((pillar) => pillar.href);

export const allPublicPaths = ["/", ...programPaths, ...Object.keys(pageDefinitions)];
