export type PageKind = "policy" | "general";

export type PageDefinition = {
  path: string;
  label: string;
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
  tagline: "Health for all through the responsible use of artificial intelligence (AI).",
  headline: "Empowering Health. Strengthening Communities.",
  subheadline: "Empowering governments, organizations, communities, and health scholars to use AI responsibly to transform health and healthcare.",
  mission: "Empowering governments, organizations, communities, and health scholars to use AI responsibly to transform health and healthcare.",
  vision: "Health for all through the responsible use of artificial intelligence (AI).",
  supportLine: "Assess needs. Understand risks. Apply evidence. Build healthier communities.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://preventa.ai",
};

// Guiding principles verbatim from File 2
export const principles = [
  { 
    title: "Ethical and Responsible AI", 
    description: "Ensure AI is transparent, accountable, privacy-conscious, culturally safe, and guided by human oversight." 
  },
  { 
    title: "Collaboration and Partnership", 
    description: "Co-create solutions with government, organizations, communities, health professionals, researchers, and technology partners." 
  },
  { 
    title: "Transformation and Innovation", 
    description: "Use AI to strengthen and transform healthcare and public health systems in practical, sustainable ways." 
  },
  { 
    title: "Equity and Inclusion", 
    description: "Design and apply AI to reduce inequities and improve access to health opportunities and services." 
  },
  { 
    title: "Evidence and Data-Informed Action", 
    description: "Use high-quality data, research, and evidence to guide AI development, implementation, and evaluation." 
  },
  { 
    title: "Community and Indigenous Leadership", 
    description: "Respect Indigenous knowledge, cultural safety, community priorities, data sovereignty, and Indigenous-led approaches." 
  },
  { 
    title: "Better Health Outcomes", 
    description: "Keep improved individual, community, and population health at the centre of every AI initiative." 
  },
] as const;

// Strategic goals verbatim from File 2
export const strategicGoals = [
  "Build and harness AI capacity to transform healthcare systems and improve health outcomes for all.",
  "Advance health promotion, disease prevention, policy, and research through the responsible use of AI.",
  "Promote health equity, cultural safety, and Indigenous-led approaches to AI-enabled health transformation.",
  "Strengthen ethical AI governance through privacy, transparency, accountability, and human oversight.",
] as const;

// The 5 Core Platform Pillars
export const pillars = [
  {
    number: "01",
    title: "Situation Assessment",
    description: "Individual & Family, Community, and Organization assessments structured around validated indicators.",
    signal: "Needs to Priorities",
    href: "/situation-assessment",
  },
  {
    number: "02",
    title: "Health & Wellbeing",
    description: "Mental Wellbeing, Substance Use, Environmental Health, Sexuality, Immunization, and School Health.",
    signal: "Evidence to Delivery",
    href: "/health-and-wellness",
  },
  {
    number: "03",
    title: "Indigenous Health & Wellbeing",
    description: "Wholistic Health, Land-based Healing, Food Sovereignty, and Culture as Prevention grounded in OCAP®.",
    signal: "Authority Stays Local",
    href: "/indigenous-health",
  },
  {
    number: "04",
    title: "AI in Research & Risk Prediction",
    description: "AI & Evidence Generation paired with disease surveillance, risk prediction, and population modeling.",
    signal: "Evidence to Insight",
    href: "/research",
  },
  {
    number: "05",
    title: "University In The Box",
    description: "Applied public health training across Epidemiology, Health Promotion, Emergency Response, and AI Systems.",
    signal: "Learning to Capability",
    href: "/courses",
  },
] as const;

// Three Assessment Streams verbatim from File 2
export const assessmentStreams = [
  {
    id: "individual-family",
    title: "Individual & Family Wellbeing Assessment",
    badge: "Personal & Intergenerational",
    description: "Comprehensive review of daily lifestyle, biometrics, protective factors, and family coping mechanisms.",
    factors: [
      "Physical activity | ≥30 minutes moderate activity, 5 days/week",
      "Healthy eating | Vegetables & fruit included in 24-hour dietary recall",
      "Smoking | Non-smoking / cessation readiness",
      "Alcohol & substance use | Adherence to low-risk drinking guidelines; avoidance of substance use",
      "Sleep | Average ~7 hours/night | Duration, quality, sleep hygiene",
      "Stress management | Active coping strategies in place | Perceived stress screen",
    ],
    aiFeature: "Adaptive smart questionnaire · Risk stratification · Personalized preventive action plan",
    outputs: "Personal Health Index, radar wellness score, and customized family action roadmap.",
  },
  {
    id: "community",
    title: "Community Assessment",
    badge: "Population Health",
    description: "Population-level scan of demographics, health status, social determinants, community assets, and equity gaps.",
    factors: [
      "1. Listing risk & protective factors",
      "2. Listing community priorities, needs, assets & strengths",
      "3. Identify high-risk groups (e.g., youth, seniors, newcomers)",
      "4. Incidence & prevalence of diseases",
      "5. Mapping of partners and stakeholders",
      "6. Inventory of current programs & services",
      "7. Service gaps & overlaps analysis",
      "8. Program effectiveness assessment",
    ],
    aiFeature: "Public-data import · Equity-gap heatmaps · Priority-issue ranking engine",
    outputs: "Auto-generated Community Health Assessment report (editable), priority-setting matrix, and a monitoring dashboard the team can revisit.",
  },
  {
    id: "organization",
    title: "Organization Assessment",
    badge: "Institutional Readiness",
    description: "Readiness, capacity, workplace culture, and policy review for clinics, schools, public health units, and NGOs.",
    factors: [
      "Employee satisfaction: workload, psychological safety, burnout indicators, relationships, opportunities for promotion",
      "Organizational culture: values alignment, conducive work environment, learning orientation, diversity, inclusion, trust",
      "Digital health & AI adoption readiness and policy governance",
      "Continuous quality improvement cycles and data stewardship",
    ],
    aiFeature: "Maturity model scoring · Anonymous theme synthesis · QI cycle generator",
    outputs: "Report with heatmaps, anonymized theme summaries, and a prioritized action plan; repeat-measure tracking.",
  },
] as const;

export type WellnessDomain = {
  id: string;
  title: string;
  icon: string;
  description: string;
  aiCapability: string;
  framework: string;
  tag: string;
  highlight?: boolean;
};

// Health & Wellbeing Domains from File 2
export const wellnessDomains: readonly WellnessDomain[] = [
  {
    id: "mental-wellbeing",
    title: "Mental Wellbeing",
    icon: "HeartHandshake",
    description: "Promoting psychological safety, emotional resilience, early distress detection, and positive coping across life stages.",
    aiCapability: "Adaptive stress screening, trauma-informed coping recommendations, and crisis helpline routing.",
    framework: "Canadian Mental Health Framework",
    tag: "Priority Focus",
  },
  {
    id: "substance-use",
    title: "Substance Use & Addiction",
    icon: "HeartPulse",
    description: "Evidence-informed harm reduction, low-risk drinking guidelines, overdose prevention, and non-stigmatizing community support.",
    aiCapability: "Harm reduction pathway generator and localized support service mapping.",
    framework: "Canadian Harm Reduction Policy",
    tag: "Harm Reduction",
  },
  {
    id: "environmental-health",
    title: "Environmental Health",
    icon: "ShieldAlert",
    description: "Air and water quality surveillance, climate change health adaptation, built environment analysis, and environmental justice.",
    aiCapability: "Environmental hazard heatmaps and vulnerable population exposure modeling.",
    framework: "Health Canada Environmental Health",
    tag: "Environment",
  },
  {
    id: "healthy-sexuality",
    title: "Healthy Sexuality",
    icon: "Activity",
    description: "Culturally safe, inclusive sexual health literacy, STI prevention, reproductive autonomy, and destigmatized clinic pathways.",
    aiCapability: "Private multilingual education agent and preventative care access navigator.",
    framework: "PHAC Sexual Health Promotion Guidelines",
    tag: "Lifespan Care",
  },
  {
    id: "immunization",
    title: "Immunization",
    icon: "Stethoscope",
    description: "Vaccine confidence intelligence, coverage tracking, outbreak readiness, and combating misinformation.",
    aiCapability: "Vaccine sentiment analytics and targeted evidence-based communication toolkits.",
    framework: "National Immunization Strategy (Canada)",
    tag: "Disease Control",
  },
  {
    id: "school-health",
    title: "School Health",
    icon: "GraduationCap",
    description: "Comprehensive school health: social and physical environment, teaching and learning, healthy school policy, and community partnerships.",
    aiCapability: "School wellness action plan builder and student health indicator tracking.",
    framework: "Pan-Canadian Joint Consortium for School Health",
    tag: "Youth & Schools",
  },
  {
    id: "wholistic-health",
    title: "Wholistic Health & Medicine Wheel",
    icon: "Sprout",
    description: "Balance of physical, mental, emotional, and spiritual dimensions rooted in Indigenous knowledge and wholistic wellbeing.",
    aiCapability: "4-Quadrant wellness wheel balancing and community-approved traditional health guidance.",
    framework: "First Nations Wholistic Approach",
    tag: "Indigenous Led",
    highlight: true,
  },
  {
    id: "land-based-healing",
    title: "Land-Based Healing & Food Sovereignty",
    icon: "Utensils",
    description: "Land-based healing and learning programs, traditional food sovereignty resources, and culture as prevention.",
    aiCapability: "Co-designed with Indigenous Knowledge Keepers · OCAP® aligned · Zero extractive data flows.",
    framework: "Two-Eyed Seeing & OCAP® Principles",
    tag: "Indigenous Led",
    highlight: true,
  },
];

// Indigenous Health & Wellbeing verbatim from File 2
export const indigenousHealth = {
  eyebrow: "03 · INDIGENOUS HEALTH & WELLBEING",
  title: "Community authority is the foundation — not a feature.",
  description: "Preventa AI is designed around relationship-based co-design, culturally safe workflows, wholistic wellbeing, and absolute community control over data and decisions. It does not speak on behalf of any Nation or community.",
  areas: [
    { 
      title: "Wholistic Health", 
      text: "Balance of physical, mental, emotional, and spiritual dimensions." 
    },
    { 
      title: "Healing Practice", 
      text: "Land-based healing and learning programs, and food sovereignty resources." 
    },
    { 
      title: "Culture as Prevention", 
      text: "Culture as prevention and healing, centering community kinship as the primary protective factor." 
    },
    { 
      title: "Social Determinants of Health", 
      text: "Addressing root socioeconomic, housing, environmental, and historical determinants." 
    },
  ],
  tags: ["OCAP® Principles", "Two-Eyed Seeing", "Data Sovereignty", "Cultural Safety", "Community Governed"],
} as const;

// AI in Research & Risk Prediction verbatim from File 2
export const research = {
  eyebrow: "04 · AI IN RESEARCH & RISK PREDICTION",
  title: "Accelerate evidence work. Keep verification visible.",
  description: "Two connected capabilities — evidence generation and risk prediction — with explicit validation, bias auditing, and fairness gates.",
  areas: [
    { 
      title: "AI & Evidence Generation", 
      text: "Ethical use of AI in planning and conducting research." 
    },
    { 
      title: "AI & Risk Prediction", 
      text: "Surveillance, risk prediction, and modeling." 
    },
  ],
} as const;

// University In The Box verbatim from File 2
export const courses = {
  eyebrow: "05 · UNIVERSITY IN THE BOX",
  title: "Build practical AI capability that stays with your team.",
  description: "Six accredited learning tracks designed for public health leaders, practitioners, and scholars.",
  tracks: [
    { title: "Public Health Foundations", text: "Core population health, social determinants, and the Ottawa Charter." },
    { title: "Research & Knowledge Exchange", text: "Ethical evidence generation, synthesis, and knowledge translation." },
    { title: "Epidemiology", text: "Disease incidence, prevalence, surveillance, and population modeling." },
    { title: "Health Promotion", text: "Intervention design, COM-B behaviour change, and school health." },
    { title: "Emergency Preparedness, Response & Recovery", text: "Outbreak intelligence, pandemic readiness, and crisis leadership." },
    { title: "AI Training", text: "Generative AI, Public Health Agent, Automation and Dashboards, Website." },
  ],
} as const;

// Evaluation Lifecycle (Formative, Process, Outcome, Summative)
export const evaluationStages = [
  {
    stage: "01",
    name: "Formative Evaluation",
    focus: "Design & Feasibility",
    description: "Assess community readiness, stakeholder assumptions, and intervention logic before launch.",
    aiTool: "Automated Logic-Model Generator and assumption stress-testing.",
  },
  {
    stage: "02",
    name: "Process Evaluation",
    focus: "Fidelity & Implementation",
    description: "Track participant reach, intervention dose, protocol fidelity, and participant acceptability in real time.",
    aiTool: "Real-time fidelity tracking and automated operational indicators.",
  },
  {
    stage: "03",
    name: "Outcome Evaluation",
    focus: "Short & Intermediate Changes",
    description: "Measure measurable shifts in health literacy, attitudes, protective behaviours, and local conditions.",
    aiTool: "Indicator bank auto-mapping and equity-stratified statistical synthesis.",
  },
  {
    stage: "04",
    name: "Summative Evaluation",
    focus: "Impact, ROI & Policy",
    description: "Evaluate long-term population impact, cost-effectiveness, scalability, and policy implications.",
    aiTool: "Mixed-methods synthesis and publication-ready evaluation report drafting.",
  },
] as const;

export type CoPilotResponse = {
  headline: string;
  inputs?: readonly string[];
  activities?: readonly string[];
  outputs?: readonly string[];
  outcomes?: readonly string[];
  findings?: readonly string[];
  recommendations?: readonly string[];
  score?: string;
  readinessPillars?: readonly string[];
  nextSteps?: readonly string[];
  citation: string;
  verificationNote: string;
};

export type CoPilotScenario = {
  id: string;
  title: string;
  prompt: string;
  category: string;
  response: CoPilotResponse;
};

// Interactive AI Co-Pilot Scenarios
export const coPilotScenarios: readonly CoPilotScenario[] = [
  {
    id: "logic-model",
    title: "Logic Model Generation",
    prompt: "Generate a logic model for a youth mental health intervention in a northern Canadian community.",
    category: "Program Planning",
    response: {
      headline: "Youth Mental Health Promotion Framework (Northern Context)",
      inputs: ["Community Elders & youth council", "Local school district staff", "Mobile health clinics", "NCCDH evidence base"],
      activities: ["Land-based cultural mentorship camps", "Digital peer-support circle", "Mental health first aid for educators"],
      outputs: ["120 youth engaged across 4 communities", "16 Elders compensated as mentors", "45 teachers certified in MHFA"],
      outcomes: ["Short-term: 38% increase in self-efficacy & cultural pride", "Intermediate: 45% reduction in crisis referrals"],
      citation: "Grounded in: First Nations Mental Wellness Continuum & PHAC Population Health Model (2025).",
      verificationNote: "AI-suggested draft · Subject to community review and OCAP® data consent.",
    },
  },
  {
    id: "equity-scan",
    title: "Community Equity Scan",
    prompt: "Identify health equity gaps and risk factors for diabetes prevention in immigrant senior populations.",
    category: "Epidemiology & Equity",
    response: {
      headline: "Targeted Equity & Barrier Stratification Analysis",
      findings: [
        "Language barriers in clinical nutrition counseling (72% gap in non-English dietary materials)",
        "Food security disparities: high cost of culturally appropriate traditional staple grains",
        "Transportation deficits limiting access to community walking groups during winter months",
      ],
      recommendations: [
        "Deploy multilingual community health navigators with bilingual digital diet recalls",
        "Partner with cultural community kitchens for culturally safe culinary medicine sessions",
      ],
      citation: "Sources: Canadian Community Health Survey (CCHS) & CIHI Health Inequity Benchmarks.",
      verificationNote: "AI-suggested synthesis · Requires validation by local public health unit.",
    },
  },
  {
    id: "workplace-readiness",
    title: "Organizational AI Readiness",
    prompt: "Assess health authority readiness to adopt predictive analytics under PHIPA and PIPEDA.",
    category: "Governance & Ethics",
    response: {
      headline: "Public Health AI Governance Readiness Scorecard",
      score: "78/100 (Substantial Readiness with Governance Action Needed)",
      readinessPillars: [
        "Privacy Architecture: Strong (Data minimization & de-identification protocols in place)",
        "Workforce Capability: Moderate (Requires public health epidemiology AI upskilling)",
        "Algorithm Auditability: In Progress (Need formalized algorithmic impact assessment)",
      ],
      nextSteps: ["Institute Algorithmic Review Board", "Enroll cross-functional team in Preventa AI Ethics track"],
      citation: "Standards: Directive on Automated Decision-Making & IPC Ontario Health Privacy Guidelines.",
      verificationNote: "AI advisory scorecard · Legal counsel review recommended prior to procurement.",
    },
  },
];

// Subscription Tiers
export const subscriptionTiers = [
  {
    name: "Basic",
    priceMonthly: "$0",
    priceAnnual: "$0",
    period: "forever free",
    badge: null,
    target: "Individuals, health students, and community advocates",
    features: [
      "Personal Individual & Family Wellbeing Assessment",
      "Access to foundational wellness modules",
      "Limited AI Co-Pilot queries (5 / day)",
      "Read-only access to Public Evidence Library",
      "Standard PDF self-assessment summary",
    ],
    cta: "Get Started Free",
    href: "/#assessment-wizard",
    popular: false,
  },
  {
    name: "Professional",
    priceMonthly: "$29",
    priceAnnual: "$24",
    period: "per month, billed annually",
    badge: "Practitioner",
    target: "Public-health practitioners, nurses, educators, and clinicians",
    features: [
      "Everything in Basic + Unlimited Assessments",
      "Full access to all Health & Wellness domains",
      "AI Program Designer & Logic Model Generator",
      "Indicator Bank with 300+ validated public health metrics",
      "University In The Box micro-credentials & courses",
      "Direct citation explorer with full bibliography export",
    ],
    cta: "Start 14-Day Free Trial",
    href: "/contact?tier=professional",
    popular: false,
  },
  {
    name: "Organization",
    priceMonthly: "$299",
    priceAnnual: "$249",
    period: "per month, billed annually",
    badge: "Most Popular",
    target: "Clinics, public health units, schools, NGOs, and municipal teams",
    features: [
      "Everything in Professional for up to 10 team members",
      "Full Organization Assessment & Cultural Readiness Suite",
      "Automated Community Health Assessment (CHA) builder",
      "Complete 4-Stage Evaluation & Indicator Suite",
      "Custom population health dashboard & heatmap export",
      "Priority customer success manager and team training",
    ],
    cta: "Start Organization Pilot",
    href: "/contact?tier=organization",
    popular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    period: "tailored institutional contract",
    badge: "Health Systems",
    target: "Provincial ministries, regional health authorities, and hospitals",
    features: [
      "Unlimited seats across multi-department health networks",
      "Dedicated sovereign Canadian-region or on-premise cloud hosting",
      "Custom AI fine-tuning on regional epidemiological data",
      "Full EHR/HIS API integration & single sign-on (SSO/SAML)",
      "Continuous algorithmic bias auditing & governance logging",
      "Custom SLA (99.99%) & 24/7 dedicated clinical engineering support",
    ],
    cta: "Contact Enterprise Sales",
    href: "/contact?tier=enterprise",
    popular: false,
  },
  {
    name: "Community Tier",
    priceMonthly: "$0",
    priceAnnual: "$0",
    period: "partner sponsored",
    badge: "100% Subsidized",
    target: "Grassroots charities, Indigenous communities, and underserved groups",
    features: [
      "Full Organization-level functionality at no cost",
      "Funded through Preventa AI's equity contribution pool",
      "Strict OCAP® data sovereignty: community owns 100% of data",
      "Land-based wellness program planning templates",
      "Dedicated community navigator onboarding assistance",
    ],
    cta: "Apply for Community Access",
    href: "/contact?tier=community",
    popular: false,
  },
] as const;

// Interactive Self-Assessment Questions
export const interactiveQuestions = [
  {
    id: "activity",
    category: "Physical Activity (≥30 min)",
    question: "How frequently do you engage in at least 30 minutes of moderate activity (5 days/week target)?",
    options: [
      { label: "5 or more days per week", score: 100 },
      { label: "3 to 4 days per week", score: 75 },
      { label: "1 to 2 days per week", score: 45 },
      { label: "Rarely or not at all", score: 20 },
    ],
  },
  {
    id: "nutrition",
    category: "Healthy Eating (24h Recall)",
    question: "Did your meals over the past 24 hours include generous vegetables and fruits?",
    options: [
      { label: "Consistently at every meal", score: 100 },
      { label: "Included in 2 meals", score: 75 },
      { label: "Included in 1 meal only", score: 50 },
      { label: "No vegetables or fruit", score: 25 },
    ],
  },
  {
    id: "stress",
    category: "Stress Management (Active Coping)",
    question: "Do you have active coping strategies in place for perceived stress and daily pressure?",
    options: [
      { label: "Very confident with active coping routines", score: 100 },
      { label: "Moderately confident, manage reasonably well", score: 75 },
      { label: "Frequently overwhelmed by stress", score: 45 },
      { label: "Extremely overwhelmed, lacking support", score: 20 },
    ],
  },
  {
    id: "sleep",
    category: "Sleep Hygiene (~7h Average)",
    question: "Do you average approximately 7 hours of restorative sleep per night with healthy sleep hygiene?",
    options: [
      { label: "Consistently ~7–8 hours restorative sleep", score: 100 },
      { label: "Average 6–7 hours, occasional fatigue", score: 75 },
      { label: "Irregular sleep schedule (<6 hours)", score: 45 },
      { label: "Severe sleep disruption / chronic fatigue", score: 20 },
    ],
  },
  {
    id: "community",
    category: "Social Determinants & Support",
    question: "Do you have a dependable circle of family, friends, or community for mutual care and support?",
    options: [
      { label: "Strong, deeply connected support network", score: 100 },
      { label: "Adequate support when urgently needed", score: 75 },
      { label: "Limited social connections", score: 45 },
      { label: "Feel isolated with no reliable support", score: 20 },
    ],
  },
] as const;

// Program detail configurations
export const situationAssessment = {
  eyebrow: "01 · SITUATION ASSESSMENT",
  title: "See the whole context before choosing the next move.",
  description: "Three assessment modules — individual & family, community, and organization — each structured around the factors that matter, not a single opaque score.",
  modules: [
    {
      title: "Individual & Family Wellbeing Assessment",
      factors: [
        "Physical activity — ≥30 minutes moderate activity, 5 days/week",
        "Healthy eating — vegetables & fruit included in 24-hour dietary recall",
        "Smoking — non-smoking / cessation readiness",
        "Alcohol & substance use — adherence to low-risk drinking guidelines; avoidance of substance use",
        "Sleep — average ~7 hours/night | duration, quality, sleep hygiene",
        "Stress management — active coping strategies in place | perceived stress screen",
      ],
      outputs: "Individual & family health indexes, resilience buffers, and personalized action roadmaps.",
    },
    {
      title: "Community Assessment",
      factors: [
        "1. Listing risk & protective factors",
        "2. Listing community priorities, needs, assets & strengths",
        "3. Identify high-risk groups (e.g., youth, seniors, newcomers)",
        "4. Incidence & prevalence of diseases",
        "5. Mapping of partners and stakeholders",
        "6. Inventory of current programs & services",
        "7. Service gaps & overlaps analysis",
        "8. Program effectiveness assessment",
      ],
      outputs: "Auto-generated Community Health Assessment report (editable), priority-setting matrix, and a monitoring dashboard the team can revisit.",
    },
    {
      title: "Organization Assessment",
      factors: [
        "Employee satisfaction: workload, psychological safety, burnout indicators, relationships, opportunities for promotion",
        "Organizational culture: values alignment, conducive work environment, learning orientation, diversity, inclusion, trust",
        "Digital health & AI adoption readiness and policy governance",
        "Continuous quality improvement cycles and data stewardship",
      ],
      outputs: "Report with heatmaps, anonymized theme summaries, and a prioritized action plan; repeat-measure tracking.",
    },
  ],
} as const;

export const healthAndWellness = {
  eyebrow: "02 · HEALTH & WELLBEING",
  title: "Responsible AI, applied across the topics that shape everyday health.",
  description: "Six connected focus areas, each grounded in peer-reviewed evidence and strict privacy boundaries.",
  topics: [
    "Mental Wellbeing",
    "Substance Use & Addiction",
    "Environmental Health",
    "Healthy Sexuality",
    "Immunization",
    "School Health",
  ],
} as const;

const pages: PageDefinition[] = [
  {
    path: "/contact",
    label: "Contact",
    title: "Start a thoughtful conversation.",
    eyebrow: "CONTACT & CONSULTATION",
    description: "Connect with our public health and AI technology team to explore implementation, pilot opportunities, or partnership inquiries.",
    kind: "general",
    highlights: ["Request early access", "Request a live platform demonstration", "Discuss research or academic partnership", "Explore Sponsored Community Tier"],
  },
  {
    path: "/privacy",
    label: "Privacy",
    title: "Privacy by design, explained plainly.",
    eyebrow: "DATA PRIVACY & SOVEREIGNTY",
    description: "Preventa AI is architected around data minimization, meaningful consent, zero-third-party sale, and sovereign Canadian hosting.",
    kind: "policy",
    highlights: ["Anonymous assessment execution", "Zero health data storage in public previews", "Encrypted in transit & at rest (AES-256)", "PHIPA and PIPEDA aligned", "Full data export and deletion guarantees"],
    notice: "Designed to support PHIPA- and PIPEDA-aligned implementation. Formal compliance depends on deployment, configuration, contracts, and legal review.",
    keywords: ["PHIPA compliant health platform", "PIPEDA aligned health data", "privacy by design health AI"],
  },
  {
    path: "/terms",
    label: "Terms of Use",
    title: "Clear expectations for a responsible platform.",
    eyebrow: "TERMS OF SERVICE",
    description: "Intended use, practitioner responsibilities, non-diagnostic boundaries, and acceptable conduct for the Preventa AI platform.",
    kind: "policy",
    highlights: ["Educational & public-health decision support only", "No clinical emergency replacement", "Practitioner verification required", "Intellectual property & open standards"],
    notice: "Production terms require formal institutional agreements prior to full deployment.",
  },
  {
    path: "/accessibility",
    label: "Accessibility",
    title: "Accessibility is an equity imperative.",
    eyebrow: "WCAG 2.2 AA COMMITMENT",
    description: "Preventa AI is engineered to be fully usable by people of all abilities, on any device, and under varying connectivity constraints.",
    kind: "policy",
    highlights: ["Full keyboard navigation", "Screen-reader optimized semantics", "High-contrast text ratios exceeding AAA for body copy", "Reduced motion support by default", "Low-bandwidth lightweight mode"],
  },
  {
    path: "/ai-transparency",
    label: "AI Transparency",
    title: "Know when AI is used — and where it can fail.",
    eyebrow: "ALGORITHMIC TRANSPARENCY",
    description: "Every AI-generated insight displays source evidence, model limitations, and verification checkboxes before consequential decisions.",
    kind: "policy",
    highlights: ["Explicit 'AI-Generated' labeling", "Visible peer-reviewed citations", "Continuous quarterly bias audits", "Practitioner-in-the-loop requirement", "No black-box decision making"],
  },
];

export const pageDefinitions = Object.fromEntries(pages.map((page) => [page.path, page])) as Record<string, PageDefinition>;

export const navigation = [
  { label: "Assessments", href: "/#assessments" },
  { label: "Health & Wellbeing", href: "/#wellness-domains" },
  { label: "AI Co-Pilot", href: "/#ai-copilot" },
  { label: "Evaluation", href: "/#evaluation" },
  { label: "University in a Box", href: "/#university-in-the-box" },
  { label: "Indigenous Health", href: "/#indigenous-health" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
] as const;

export const programPaths = pillars.map((pillar) => pillar.href);

export const allPublicPaths = ["/", "/about", ...programPaths, ...Object.keys(pageDefinitions)];
