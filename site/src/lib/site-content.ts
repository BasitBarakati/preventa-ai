export type PageKind =
  | "pillar"
  | "assessment"
  | "assistant"
  | "research"
  | "course"
  | "dashboard"
  | "auth"
  | "policy"
  | "general";

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
  tagline: "From Public Health Intelligence to Practical Action.",
  supportLine:
    "Assess needs. Understand risks. Apply evidence. Build healthier communities.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://preventa.ai",
};

export const pillars = [
  {
    number: "01",
    title: "Situation Assessment",
    href: "/platform/situation-assessment",
    description:
      "Assess personal wellbeing, community needs, organizational readiness, risks, strengths, services, and opportunities.",
    signal: "Needs to priorities",
  },
  {
    number: "02",
    title: "Health and AI Implementation",
    href: "/platform/health-and-ai-implementation",
    description:
      "Apply responsible AI across public-health transformation, mental wellbeing, healthy environments, immunization, and prevention.",
    signal: "Evidence to delivery",
  },
  {
    number: "03",
    title: "Indigenous Health and Wellbeing",
    href: "/indigenous-health",
    description:
      "Support community-governed, culturally safe approaches grounded in wholistic health, land, culture, and social determinants.",
    signal: "Authority stays local",
  },
  {
    number: "04",
    title: "AI in Research and Risk Prediction",
    href: "/research",
    description:
      "Accelerate evidence synthesis, knowledge generation, responsible modelling, validation, and forecasting with human verification.",
    signal: "Evidence to insight",
  },
  {
    number: "05",
    title: "Courses and Workforce Learning",
    href: "/courses",
    description:
      "Build practical AI capability through structured public-health courses, exercises, learning pathways, and certificates.",
    signal: "Learning to capability",
  },
] as const;

export const audiences = [
  ["Individuals and families", "Understand wellbeing patterns and leave with practical, non-diagnostic next steps."],
  ["Public-health professionals", "Move from assessment and evidence to explainable plans, reports, and program decisions."],
  ["Community leaders", "Map strengths, priorities, services, equity considerations, and opportunities for coordinated action."],
  ["Indigenous leadership", "Use community-governed tools designed around data authority, cultural safety, and co-design."],
  ["Health organizations and systems", "Assess readiness, support workforce change, and govern responsible AI implementation."],
  ["Researchers and students", "Structure evidence work, document decisions, check bias, and build applied AI fluency."],
] as const;

export const products = [
  ["Individual Wellbeing Dashboard", "/situation-assessment/individual-and-family", "Six wellbeing domains, action planning, reassessment, and printable summaries."],
  ["Community Assessment Workspace", "/situation-assessment/community", "Priorities, assets, equity, services, partners, gaps, and program review."],
  ["Organizational AI Readiness", "/situation-assessment/organization", "Culture, trust, safety, capability, change readiness, and implementation priorities."],
  ["Public Health AI Assistant", "/ai-assistant", "Retrieval-grounded support with visible citations, limitations, and escalation pathways."],
  ["Evidence Synthesis Workspace", "/research/evidence-generation", "Screening, synthesis, summaries, qualitative support, and auditable verification."],
  ["Research and Risk Sandbox", "/research/sandbox", "Controlled modelling workflows with validation, fairness checks, and no live health prediction."],
  ["Report Generator", "/dashboards-and-data", "Structured, printable reports that distinguish evidence, interpretation, and human decisions."],
  ["Learning Hub", "/courses", "Applied public-health AI learning paths, exercises, reflection, and certificates."],
] as const;

const pages: PageDefinition[] = [
  {
    path: "/platform",
    title: "One platform. Five connected public-health capabilities.",
    eyebrow: "PLATFORM OVERVIEW",
    description: "Preventa AI brings assessment, evidence, responsible AI implementation, research tools, and workforce learning into one governed environment.",
    kind: "pillar",
    highlights: pillars.map((pillar) => pillar.title),
    keywords: ["AI-enabled public health transformation platform", "responsible AI for public health", "public health AI platform", "situation assessment AI", "population health AI"],
    sections: [
      { title: "Knowledge", body: "Plain-language guidance helps people understand the evidence, assumptions, limitations, and governance behind each workflow." },
      { title: "Tools", body: "Assessments, workspaces, dashboards, reports, assistants, resources, and courses support real public-health tasks." },
      { title: "Action", body: "Every workflow ends in accountable next steps: plans, referrals, learning, program options, or decisions requiring human review." },
    ],
  },
  {
    path: "/platform/situation-assessment",
    title: "See needs, strengths, and readiness clearly.",
    eyebrow: "SITUATION ASSESSMENT",
    description: "Structured assessment experiences help people and organizations organize signals, understand context, and move toward practical action.",
    kind: "pillar",
    highlights: ["Individual and family wellbeing", "Community needs and assets", "Organizational culture and AI readiness", "Explainable reports", "Repeat-measure tracking"],
    keywords: ["public health situation assessment", "community health assessment tool", "organizational AI readiness assessment", "population health needs assessment"],
  },
  {
    path: "/situation-assessment/individual-and-family",
    title: "A private, practical view of everyday wellbeing.",
    eyebrow: "INDIVIDUAL & FAMILY WELLBEING",
    description: "A structured self-reflection experience across physical activity, healthy eating, smoking, alcohol and substance use, sleep, stress, and coping.",
    kind: "assessment",
    highlights: ["Anonymous assessment option", "Domain scores", "Personalized action-plan framework", "Risk indicators with plain-language context", "Printable report", "Reassessment reminders", "Community resource matching"],
    notice: "This assessment does not provide a medical diagnosis.",
    keywords: ["individual wellbeing assessment", "health belief model self-assessment", "personal wellbeing dashboard", "AI wellbeing coach"],
    faqs: [
      { question: "Does the Individual & Family Wellbeing Assessment provide a medical diagnosis?", answer: "No. This assessment does not provide a medical diagnosis. It supports private, structured self-reflection and practical next steps." },
      { question: "What wellbeing domains does the assessment cover?", answer: "Physical activity, healthy eating, smoking, alcohol and substance use, sleep, and stress and coping." },
      { question: "Can I complete the assessment anonymously?", answer: "Yes. An anonymous assessment option is available, alongside domain scores, a personalized action-plan framework, a printable report, reassessment reminders, and community resource matching." },
    ],
  },
  {
    path: "/situation-assessment/community",
    title: "Turn community context into shared priorities.",
    eyebrow: "COMMUNITY ASSESSMENT",
    description: "A collaborative workspace for understanding risks, protective factors, assets, needs, equity, partners, services, and program opportunities.",
    kind: "assessment",
    highlights: ["Risks and protective factors", "Priorities and needs", "Strengths and assets", "Equity considerations", "Incidence and prevalence context", "Partner identification", "Program and service inventory", "Gap and overlap analysis", "Program effectiveness review"],
    notice: "Community findings require local interpretation, lived experience, and appropriate data governance.",
    keywords: ["community health needs assessment", "public health equity assessment", "community asset mapping", "population health program evaluation"],
  },
  {
    path: "/situation-assessment/organization",
    title: "Build the conditions for responsible change.",
    eyebrow: "ORGANIZATION ASSESSMENT",
    description: "Assess workforce experience, culture, leadership trust, change readiness, and AI capability before implementation decisions are made.",
    kind: "assessment",
    highlights: ["Employee satisfaction", "Psychological safety", "Burnout indicators", "Organizational culture", "Leadership trust", "Change readiness", "AI readiness", "Workforce capability", "Prioritized action plan", "Repeat-measure tracking"],
    notice: "Results support organizational learning and planning; they are not employee performance ratings.",
    keywords: ["organizational AI readiness assessment", "health workforce burnout assessment", "AI governance in healthcare organizations", "change readiness assessment public health"],
  },
  {
    path: "/platform/health-and-ai-implementation",
    title: "Move responsible AI from principle to practice.",
    eyebrow: "HEALTH & AI IMPLEMENTATION",
    description: "Implementation pathways connect public-health priorities with governance, evidence, workforce readiness, human oversight, and measurable learning.",
    kind: "pillar",
    highlights: ["Transformation and automation", "Mental wellbeing", "Substance use and addiction", "Healthy environments", "Healthy sexuality", "Immunization"],
    keywords: ["AI governance in healthcare", "responsible AI implementation public health", "AI in health promotion", "AI in immunization programs"],
  },
  ...[
    ["health-transformation-and-automation", "AI in Health Transformation and Automation", "Design governed workflows that reduce administrative burden while preserving accountability, privacy, and human judgment."],
    ["mental-wellbeing", "Mental Wellbeing", "Support prevention, promotion, navigation, and trauma-informed program planning without diagnosis or individualized clinical advice."],
    ["substance-use-and-addiction", "Substance Use and Addiction", "Organize evidence, harm-reduction resources, program options, and local support pathways with non-stigmatizing language."],
    ["healthy-environment", "Healthy Environment", "Connect environmental exposures, community context, equity, protective factors, and practical public-health actions."],
    ["healthy-sexuality", "Healthy Sexuality", "Support inclusive, evidence-informed health promotion, education, service navigation, and community planning."],
    ["immunization", "Immunization", "Support education, program planning, access analysis, communication, and coverage monitoring with clear evidence and limitations."],
  ].map(([slug, title, description]) => ({
    path: `/health-and-ai-implementation/${slug}`,
    title,
    eyebrow: "IMPLEMENTATION PATHWAY",
    description,
    kind: "general" as const,
    highlights: ["Needs and context", "Evidence and guidance", "Governance checks", "Human review", "Implementation planning", "Evaluation measures"],
  })),
  {
    path: "/indigenous-health",
    title: "Community authority is foundational.",
    eyebrow: "INDIGENOUS HEALTH & WELLBEING",
    description: "Preventa AI is being designed to support Indigenous co-design, culturally safe tools, wholistic wellbeing, and community control over data and decisions.",
    kind: "pillar",
    highlights: ["Indigenous co-design", "Indigenous Advisory Circle", "OCAP principles", "Two-Eyed Seeing", "Community data authority", "Culturally safe tools", "Wholistic health", "Land", "Culture", "Social determinants"],
    notice: "Preventa AI does not speak on behalf of any Nation, community, or Indigenous people. Implementation must be locally governed and relationship-based.",
    keywords: ["Indigenous health data governance", "OCAP principles Indigenous data", "Two-Eyed Seeing health", "culturally safe AI health tools", "Indigenous wholistic health"],
  },
  ...[
    ["wholistic-health", "Wholistic Health", "Explore physical, mental, emotional, spiritual, relational, and community dimensions without reducing wellbeing to a single score."],
    ["land", "Land", "Support community-defined connections among land, identity, food, movement, stewardship, healing, and wellbeing."],
    ["culture", "Culture", "Make space for community-defined language, teaching, identity, ceremony, relationships, and strengths without decorative appropriation."],
    ["social-determinants", "Social Determinants of Health", "Understand structural conditions, access, housing, education, income, safety, discrimination, and community strengths in local context."],
  ].map(([slug, title, description]) => ({
    path: `/indigenous-health/${slug}`,
    title,
    eyebrow: "COMMUNITY-GOVERNED PATHWAY",
    description,
    kind: "general" as const,
    highlights: ["Community-defined priorities", "Local governance", "Cultural safety", "Data authority", "Strengths-based interpretation", "Human relationships"],
    notice: "Content and workflows must be co-designed with participating communities and their chosen governance structures.",
  })),
  {
    path: "/research",
    title: "Accelerate evidence work without surrendering judgment.",
    eyebrow: "AI IN RESEARCH & RISK PREDICTION",
    description: "Research workspaces support transparent screening, synthesis, analysis, modelling, validation, and documentation—with verification at every consequential step.",
    kind: "research",
    highlights: ["Evidence generation", "Responsible risk prediction", "Research sandbox", "Model validation", "Bias and fairness resources", "Auditable outputs", "Human verification"],
    notice: "No real personal-health prediction tools are activated in the initial public experience.",
    keywords: ["AI evidence synthesis public health", "AI risk prediction population health", "responsible AI research validation", "bias and fairness in health AI"],
  },
  ...[
    ["evidence-generation", "AI and Evidence Generation", "Structure literature screening, evidence synthesis, research summaries, qualitative support, grant assistance, and protocol development."],
    ["risk-prediction", "AI and Risk Prediction", "Explore population-level modelling concepts, intended use, uncertainty, validation, monitoring, and governance before deployment."],
    ["sandbox", "Research Sandbox", "A controlled interface for prototyping research workflows with synthetic or approved data and explicit review gates."],
    ["model-validation", "Model Validation", "Document performance, external validity, calibration, drift, intended population, limitations, and decision thresholds."],
    ["bias-and-fairness", "Bias and Fairness Resources", "Check representation, measurement, subgroup performance, allocation harms, accessibility, and mitigation plans."],
  ].map(([slug, title, description]) => ({
    path: `/research/${slug}`,
    title,
    eyebrow: "RESEARCH WORKSPACE",
    description,
    kind: "research" as const,
    highlights: ["Auditable workflow", "Source traceability", "Validation checklist", "Bias and fairness review", "Human verification", "Exportable methods record"],
    notice: "Research outputs require qualified review. Generated content must be verified against primary sources before use.",
  })),
  {
    path: "/courses",
    title: "Build practical AI capability for public health.",
    eyebrow: "COURSES & LEARNING HUB",
    description: "Role-aware learning paths combine concise concepts, applied exercises, reflection, assessment, and certificates grounded in responsible public-health practice.",
    kind: "course",
    highlights: ["Structured pathways", "Applied exercises", "Plain-language lessons", "Workplace scenarios", "Knowledge checks", "Completion certificates"],
    keywords: ["public health AI courses", "AI in epidemiology training", "AI in health promotion course", "public health workforce learning"],
  },
  ...[
    ["ai-in-research-and-evidence-synthesis", "AI in Research and Evidence Synthesis", "Learn how to frame questions, search, screen, synthesize, cite, and verify AI-assisted evidence work."],
    ["ai-in-health-promotion", "AI in Health Promotion", "Apply responsible AI to planning, education, program design, implementation, and evaluation."],
    ["ai-in-epidemiology", "AI in Epidemiology", "Understand appropriate uses, data quality, uncertainty, modelling, validation, bias, and communication."],
    ["ai-in-knowledge-translation", "AI in Knowledge Translation", "Turn complex evidence into accessible, audience-specific products without losing nuance or source traceability."],
  ].map(([slug, title, description]) => ({
    path: `/courses/${slug}`,
    title,
    eyebrow: "LEARNING PATH",
    description,
    kind: "course" as const,
    highlights: ["Four learning modules", "Applied public-health scenario", "Responsible-use checklist", "Knowledge check", "Reflection prompt", "Certificate criteria"],
    notice: "Course enrolment and certificate issuance will be enabled with the secure learning-management integration.",
  })),
  {
    path: "/dashboards-and-data",
    title: "Data that explains itself.",
    eyebrow: "DASHBOARDS & DATA",
    description: "Accessible dashboards separate source data, interpretation, uncertainty, and recommended next steps so teams can review before acting.",
    kind: "dashboard",
    highlights: ["Individual wellbeing dashboard", "Community priorities", "Organization readiness", "Accessible charts and table alternatives", "Printable reports", "Role-based views", "Audit-ready exports"],
    keywords: ["public health dashboard software", "accessible health data visualization", "explainable AI dashboard health"],
  },
  {
    path: "/ai-assistant",
    title: "Public-health support grounded in approved evidence.",
    eyebrow: "PUBLIC HEALTH AI ASSISTANT",
    description: "A retrieval-grounded assistant concept for finding approved platform guidance, organizing evidence, and identifying next steps with visible citations and limitations.",
    kind: "assistant",
    highlights: ["Approved content only", "Visible citations", "Multilingual-ready architecture", "Clear limitations", "No diagnosis", "Crisis and support pathways", "Human escalation", "Sensitive-data warnings"],
    notice: "Do not enter personal health information. This assistant does not diagnose, provide individualized clinical advice, or replace a healthcare professional.",
    keywords: ["public health AI assistant", "retrieval-grounded health chatbot", "AI assistant with citations health"],
    faqs: [
      { question: "Can the Public Health AI Assistant provide a medical diagnosis?", answer: "No. This assistant is designed for approved public-health information and workflow support. It does not diagnose, provide individualized clinical advice, or replace a healthcare professional." },
      { question: "Does the assistant cite its sources?", answer: "Yes. Responses are grounded in approved platform content and include visible citations, clearly stated limitations, and a human escalation pathway." },
      { question: "What should I avoid entering into the assistant?", answer: "Do not enter personal health information. The assistant does not diagnose, provide individualized clinical advice, or replace a healthcare professional." },
    ],
  },
  {
    path: "/resources",
    title: "Practical resources for responsible public-health work.",
    eyebrow: "RESOURCES & TOOLKITS",
    description: "A developing library of assessment guides, implementation checklists, governance templates, evidence resources, and learning tools.",
    kind: "general",
    highlights: ["Assessment guidance", "AI governance checklist", "Implementation templates", "Validation resources", "Bias and fairness tools", "Plain-language explainers", "Printable resources"],
    keywords: ["public health AI governance checklist", "AI implementation toolkit health"],
  },
  {
    path: "/governance-and-ethics",
    title: "Governance before scale.",
    eyebrow: "GOVERNANCE & ETHICS",
    description: "Responsible implementation begins with purpose, authority, evidence, consent, oversight, monitoring, and a clear way to stop or escalate.",
    kind: "policy",
    highlights: ["Human accountability", "Intended-use controls", "Evidence standards", "Risk classification", "Indigenous data governance", "Procurement review", "Incident-response planning", "Continuous monitoring"],
    keywords: ["AI governance framework healthcare", "responsible AI ethics public health", "WHO ethics and governance of AI for health"],
    faqs: [
      { question: "What governs responsible AI implementation on Preventa AI?", answer: "Human accountability, intended-use controls, evidence standards, risk classification, Indigenous data governance, procurement review, incident-response planning, and continuous monitoring." },
      { question: "Who remains accountable for AI-supported decisions?", answer: "A named, accountable person reviews sources, context, limitations, and intended use before any consequential decision or export — AI organizes work, it does not own the decision." },
    ],
  },
  {
    path: "/about",
    title: "Public-health technology built for practical action.",
    eyebrow: "ABOUT PREVENTA AI",
    description: "Preventa AI is an AI-enabled public-health transformation platform being developed for people, communities, researchers, educators, organizations, and health systems.",
    kind: "general",
    highlights: ["Human-centered", "Evidence-informed", "Privacy by design", "Accessible by default", "Community-aware", "Institution-ready"],
    keywords: ["AI-enabled public health transformation platform", "public health technology company"],
  },
  {
    path: "/partnerships",
    title: "Build responsible public-health capability together.",
    eyebrow: "PARTNERSHIPS",
    description: "We welcome conversations with public-health organizations, Indigenous partners, researchers, educators, health systems, and responsible technology teams.",
    kind: "general",
    highlights: ["Co-design", "Research collaboration", "Education and workforce learning", "Implementation pilots", "Governance development", "Community partnerships"],
  },
  {
    path: "/contact",
    title: "Start a thoughtful conversation.",
    eyebrow: "CONTACT & EARLY ACCESS",
    description: "Tell us what you are trying to improve, who needs to be involved, and what governance or implementation questions matter most.",
    kind: "general",
    highlights: ["Request early access", "Request a demonstration", "Discuss a partnership", "Ask a governance question"],
  },
  {
    path: "/sign-in",
    title: "Welcome back.",
    eyebrow: "SECURE ACCESS",
    description: "Sign in to your Preventa AI workspace when authentication is enabled for your organization.",
    kind: "auth",
    highlights: ["Organization-managed access", "Role-based permissions", "Secure session management", "Audit logging"],
    notice: "Public authentication is not yet active. Early-access organizations will receive secure onboarding instructions.",
  },
  {
    path: "/create-account",
    title: "Request a Preventa AI account.",
    eyebrow: "EARLY ACCESS",
    description: "Account creation is currently invitation-based so governance, privacy, and organizational access can be configured responsibly.",
    kind: "auth",
    highlights: ["Invitation-based onboarding", "Consent and privacy review", "Organization and role setup", "Accessible support"],
    notice: "Submitting an interest request does not create an account or store health information.",
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
  {
    label: "Platform",
    href: "/platform",
    children: pillars.map((pillar) => ({ label: pillar.title, href: pillar.href })),
  },
  {
    label: "Solutions",
    href: "/platform/situation-assessment",
    children: [
      { label: "Individual & Family", href: "/situation-assessment/individual-and-family" },
      { label: "Community Assessment", href: "/situation-assessment/community" },
      { label: "Organization Assessment", href: "/situation-assessment/organization" },
      { label: "Dashboards & Data", href: "/dashboards-and-data" },
      { label: "Public Health AI Assistant", href: "/ai-assistant" },
    ],
  },
  { label: "Indigenous Health", href: "/indigenous-health" },
  { label: "Research", href: "/research" },
  { label: "Courses", href: "/courses" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
] as const;

export const allPublicPaths = ["/", ...Object.keys(pageDefinitions)];
