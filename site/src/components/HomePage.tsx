import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight, BookOpenCheck, BrainCircuit, Building2, CheckCircle2, ClipboardList,
  CloudSun, Dna, FileSearch, FlaskConical, Gauge, GraduationCap, HandHeart, HeartPulse,
  Landmark, Leaf, LibraryBig, MapPinned, Network, Scale, ShieldCheck, Sparkles, Sprout,
  Syringe, UserCog, UsersRound,
} from "lucide-react";
import PersonaHero from "./PersonaHero";
import ProductPreview from "./ProductPreview";
import ResearchPreview from "./ResearchPreview";
import CoursePreview from "./CoursePreview";
import GlassCard from "./ui/GlassCard";
import GlowingButton from "./ui/GlowingButton";
import AssessmentWizard from "./ui/AssessmentWizard";
import { audiences, pillars } from "@/lib/site-content";

const pillarIcons: ComponentType<{ size?: number }>[] = [ClipboardList, BrainCircuit, HandHeart, FlaskConical, GraduationCap];

const assessmentModules = [
  { icon: HeartPulse, title: "Individual & Family Wellbeing", body: "A private reflection across six everyday wellbeing domains, followed by an accessible pattern view and practical next-step framework.", meta: ["6 wellbeing domains", "Anonymous option", "Printable summary"], href: "/situation-assessment/individual-and-family" },
  { icon: UsersRound, title: "Community Assessment", body: "Organize risks, protective factors, assets, priorities, equity considerations, services, partnerships, gaps, and program learning.", meta: ["Needs + strengths", "Partner mapping", "Gap analysis"], href: "/situation-assessment/community" },
  { icon: Building2, title: "Organization & Workplace", body: "Understand psychological safety, culture, leadership trust, burnout indicators, change readiness, and responsible AI capability.", meta: ["Workforce signals", "AI readiness", "Repeat measures"], href: "/situation-assessment/organization" },
] as const;

const implementationHubs = [
  { icon: BrainCircuit, title: "Transformation & Automation", text: "Governed workflows that reduce administrative burden while preserving accountability." },
  { icon: HeartPulse, title: "Mental Wellbeing", text: "Prevention, promotion, navigation, and trauma-aware planning without diagnosis." },
  { icon: HandHeart, title: "Substance Use & Addiction", text: "Non-stigmatizing evidence, harm-reduction resources, and service pathways." },
  { icon: CloudSun, title: "Healthy Environments", text: "Connect exposure, community context, equity, protective factors, and action." },
  { icon: Dna, title: "Healthy Sexuality", text: "Inclusive education, service navigation, and program-planning support." },
  { icon: Syringe, title: "Immunization", text: "Evidence-informed education, access analysis, program planning, and monitoring." },
] as const;

/* Blueprint §4 — the frameworks every workflow is actually built on. These
   are named explicitly because "evidence-informed" without a citable model
   behind it is marketing; a named framework is a verifiable claim. */
const frameworks = [
  { tag: "Behaviour", title: "Health Belief Model", text: "Structures every individual assessment around perceived susceptibility, severity, benefits, barriers, cues to action, and self-efficacy—so a plan targets the belief blocking change, not only the behaviour.", meta: ["6 constructs", "Stage-matched planning"] },
  { tag: "Equity", title: "Determinants of Health", text: "Income, education, employment, housing, food security, social support, early childhood, gender, racism, geography, and access to care are treated as context that tailors recommendations—never as a way to penalize a score.", meta: ["SDOH layer", "Never punitive"] },
  { tag: "Population", title: "Ottawa Charter", text: "Community assessment and health-promotion design follow the population-health approach: build public policy, create supportive environments, strengthen community action, develop personal skills, reorient services.", meta: ["5 action areas", "Population health"] },
  { tag: "Sovereignty", title: "OCAP® and Two-Eyed Seeing", text: "Ownership, Control, Access, and Possession govern all Indigenous content, data, and tools. Etuaptmumk pairs Indigenous knowledge systems with Western public-health methods as equals, not as a supplement.", meta: ["Community authority", "Etuaptmumk"] },
  { tag: "Safety", title: "WHO Responsible AI", text: "WHO guidance on the ethics and governance of AI for health sets the bar: transparency, fairness, human oversight, explainability, privacy-by-design, and accountability that stays with a named person.", meta: ["Human oversight", "Explainability"] },
  { tag: "Privacy", title: "PHIPA and PIPEDA alignment", text: "Designed for anonymous-by-default assessment, data minimization, plain-language consent, export and deletion rights, encryption in transit and at rest, role-based access, and audit logging.", meta: ["Anonymous default", "Canadian residency"] },
] as const;

/* Blueprint §11 — capabilities that cut across all five pillars. */
const crossCutting = [
  { icon: Sparkles, title: "Public Health AI Assistant", text: "Retrieval-grounded answers drawn only from curated, referenced platform content—with scoped guardrails, visible citations, crisis routing, and no diagnosis." },
  { icon: Gauge, title: "Dashboard Engine", text: "Reusable, accessible visualization components—trends, maps, equity stratifiers—powering community, organizational, and immunization dashboards." },
  { icon: FileSearch, title: "Report Generator", text: "Every assessment ends in an editable, branded report that separates source data, interpretation, uncertainty, and the human decision." },
  { icon: MapPinned, title: "Resource Matcher", text: "Connects assessment results to real local services through an admin-curated directory with geographic relevance." },
  { icon: UserCog, title: "Personalization Engine", text: "Role-aware experiences for individuals, professionals, community leaders, researchers, and organizations—without changing the evidence standard." },
  { icon: LibraryBig, title: "Resources & Toolkits", text: "Assessment guides, governance checklists, implementation templates, validation resources, and printable plain-language explainers." },
] as const;

/* Blueprint §16 — how success is actually measured. */
const evaluation = [
  { value: "6", suffix: "", label: "Evaluation domains tracked from day one", meta: "Reach · Engagement · Change" },
  { value: "30", suffix: "/90", label: "Day re-assessment windows for measuring real behaviour change", meta: "Repeat measures" },
  { value: "100", suffix: "%", label: "Of AI-supported outputs carry sources, limitations, and review status", meta: "Quality & safety" },
  { value: "2", suffix: "1 AA", label: "WCAG conformance target across every workflow and report", meta: "Accessibility" },
] as const;

/* Blueprint §14 — phased delivery. */
const roadmap = [
  { index: "00", time: "Months 1–3", title: "Foundation", text: "Governance setup, Indigenous partnership agreements, brand and information architecture, privacy impact assessment, content standards." },
  { index: "01", time: "Months 4–8", title: "Core platform", text: "Individual and family wellbeing assessment, core pillar content, the retrieval-grounded assistant, first course, and baseline dashboards." },
  { index: "02", time: "Months 9–14", title: "Professional tools", text: "Community assessment toolkit, organization assessment, report generator, additional courses, immunization and environment dashboards." },
  { index: "03", time: "Months 15–20", title: "Research & community hubs", text: "Evidence synthesis workspace, prediction sandbox, and the Indigenous health pillar—launched on partner-governed timelines." },
  { index: "04", time: "Months 21+", title: "Scale", text: "Organizational instances, API access, formal evaluation studies, and a sustainability model." },
] as const;

const researchTools = ["Literature screening", "Evidence synthesis", "Research summaries", "Qualitative support", "Protocol assistance", "Validation checklists", "Bias & fairness review", "Auditable exports"];

const courses = [
  ["AI in Research & Evidence Synthesis", "Frame, screen, synthesize, cite, and verify.", "/courses/ai-in-research-and-evidence-synthesis"],
  ["AI in Health Promotion", "Move from needs and evidence to responsible programs.", "/courses/ai-in-health-promotion"],
  ["AI in Epidemiology", "Understand data quality, modelling, bias, and uncertainty.", "/courses/ai-in-epidemiology"],
  ["AI in Knowledge Translation", "Create accessible products without losing nuance.", "/courses/ai-in-knowledge-translation"],
] as const;

const tickerItems = [
  "Health Belief Model", "Ottawa Charter", "OCAP® principles", "Two-Eyed Seeing", "WHO AI ethics guidance",
  "PHIPA aligned", "PIPEDA aligned", "WCAG 2.1 AA", "Social determinants of health", "Human oversight",
  "Visible citations", "Anonymous by default", "Canadian data residency", "Community data authority",
];

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="lux-section-intro" data-reveal>
      <p className="lux-eyebrow"><span /> {eyebrow}</p>
      <h2 data-split>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main id="main-content" className="luxury-home">
      <PersonaHero />

      <div className="container" aria-hidden="true">
        <div className="ticker">
          <div className="ticker__track">
            {[...tickerItems, ...tickerItems].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
          </div>
        </div>
      </div>

      <section className="lux-section pillar-overview" id="platform">
        <div className="container">
          <SectionIntro eyebrow="THE PREVENTA ECOSYSTEM" title="Five intelligence layers. One accountable path to action." text="Knowledge explains the context. Tools structure the work. Human-reviewed action turns insight into practical next steps." />
          <div className="lux-pillar-grid" data-stagger>
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <Link key={pillar.title} href={pillar.href} prefetch={false} className="lux-pillar-card lit-edge" data-tilt>
                  <span className="tilt-sheen" aria-hidden="true" />
                  <span className="lux-pillar-card__number">{pillar.number}</span>
                  <div className="lux-icon"><Icon size={23} /></div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <small>{pillar.signal}</small>
                  <ArrowRight className="lux-pillar-card__arrow" size={19} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="lux-section audience-section">
        <div className="container audience-layout">
          <SectionIntro eyebrow="ROLE-AWARE BY DESIGN" title="A clearer starting point for every level of public health." text="Choose a pathway in the navigation. The context changes, while evidence standards, accessibility, privacy, and human accountability remain consistent." />
          <div className="audience-orbit" data-stagger>
            <div className="audience-orbit__core"><Network size={28} /><strong>Shared public-health intelligence</strong></div>
            {audiences.map(([title, description], index) => (
              <GlassCard key={title} className={`audience-orbit__item audience-orbit__item--${index + 1}`} data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <span>0{index + 1}</span><h3>{title}</h3><p>{description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section framework-section" id="frameworks">
        <div className="container">
          <SectionIntro eyebrow="GROUNDED IN NAMED FRAMEWORKS" title="Every workflow traces back to a framework you can check." text="Responsible public-health AI is not a claim you make—it is a set of models, principles, and laws you can be held to. These are the six that shape how Preventa AI is built." />
          <div className="framework-grid" data-stagger>
            {frameworks.map(({ tag, title, text, meta }) => (
              <GlassCard key={title} className="framework-card lit-edge" data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <span className="framework-card__tag">{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="framework-card__meta">{meta.map((item) => <span key={item}>{item}</span>)}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section assessment-studio" id="assessment">
        <div className="container">
          <SectionIntro eyebrow="01 · SITUATION ASSESSMENT" title="See the whole context before choosing the next move." text="Structured workflows make needs, strengths, risks, services, readiness, and opportunities easier to review—without turning public-health complexity into a single opaque score." />
          <div className="assessment-module-grid" data-stagger>
            {assessmentModules.map(({ icon: Icon, title, body, meta, href }) => (
              <GlassCard key={title} glow="teal" className="assessment-module lit-edge" data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <div className="lux-icon"><Icon /></div><h3>{title}</h3><p>{body}</p>
                <ul>{meta.map((item) => <li key={item}><CheckCircle2 size={14} />{item}</li>)}</ul>
                <Link href={href} prefetch={false}>Explore module <ArrowRight size={16} /></Link>
              </GlassCard>
            ))}
          </div>
          <div className="assessment-demo" data-reveal>
            <div className="assessment-demo__heading">
              <div><p className="lux-eyebrow">INTERACTIVE PREVIEW</p><h3>Individual & Family Wellbeing Assessment</h3></div>
              <span><ShieldCheck size={16} /> Responses stay in this browser session</span>
            </div>
            <AssessmentWizard />
          </div>
        </div>
      </section>

      <section className="lux-section implementation-section" id="implementation">
        <div className="container">
          <SectionIntro eyebrow="02 · HEALTH & AI IMPLEMENTATION" title="From responsible concept to governed public-health workflow." text="Six implementation hubs connect purpose, evidence, readiness, privacy, oversight, evaluation, and the people affected by change." />
          <div className="implementation-grid" data-stagger>
            {implementationHubs.map(({ icon: Icon, title, text }, index) => (
              <GlassCard key={title} glow={index === 0 ? "violet" : "none"} className="implementation-card lit-edge" data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p>
                <div className="implementation-path"><i /><i /><i /><b>Review gate</b></div>
              </GlassCard>
            ))}
          </div>
          <div className="workflow-strip" data-reveal>
            <div><span>01</span><strong>Define</strong><p>Purpose, users, data, intended use, and boundaries.</p></div><ArrowRight />
            <div><span>02</span><strong>Govern</strong><p>Evidence, privacy, bias, access, and human authority.</p></div><ArrowRight />
            <div><span>03</span><strong>Implement</strong><p>Prototype, validate, train, monitor, and improve.</p></div>
          </div>
        </div>
      </section>

      <section className="lux-section indigenous-section" id="indigenous-health">
        <div className="container indigenous-layout">
          <div data-reveal>
            <p className="lux-eyebrow"><span /> 03 · INDIGENOUS HEALTH & WELLBEING</p>
            <h2 data-split>Community authority is the foundation—not a feature.</h2>
            <p>Preventa AI is being designed to support relationship-based co-design, culturally safe workflows, wholistic wellbeing, and community control over data and decisions. It does not speak for any Nation or community.</p>
            <div className="governance-tags"><span>OCAP® principles</span><span>Two-Eyed Seeing</span><span>Indigenous Advisory Circle</span><span>Community data authority</span></div>
            <GlowingButton href="/indigenous-health" variant="secondary">Explore the governance pathway <ArrowRight size={17} /></GlowingButton>
          </div>
          <div className="indigenous-framework" data-stagger>
            <div className="framework-line" aria-hidden="true" />
            {[{ icon: Sprout, title: "Wholistic health", text: "Physical, mental, emotional, spiritual, relational, and community wellbeing." }, { icon: Leaf, title: "Land", text: "Community-defined connections among land, identity, food, stewardship, and healing." }, { icon: Landmark, title: "Culture", text: "Language, teaching, identity, ceremony, relationships, and strengths—defined locally." }, { icon: Scale, title: "Social determinants", text: "Structural conditions, access, safety, discrimination, and community strengths in context." }].map(({ icon: Icon, title, text }) => (
              <GlassCard key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section research-section" id="research">
        <div className="container">
          <SectionIntro eyebrow="04 · AI IN RESEARCH & RISK PREDICTION" title="Accelerate evidence work. Keep verification visible." text="A controlled workspace for screening, synthesis, research support, and responsible population-level modelling—with explicit validation and fairness gates." />
          <div className="research-capabilities" data-stagger>
            {researchTools.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><CheckCircle2 size={16} /><strong>{item}</strong></div>)}
          </div>
          <div className="lux-product-shell" data-reveal><ResearchPreview /></div>
          <p className="research-boundary"><ShieldCheck size={16} /> Public-phase workspaces use synthetic, open, or explicitly approved data only. No live personal-health prediction is activated.</p>
        </div>
      </section>

      <section className="lux-section learning-section" id="learning">
        <div className="container">
          <SectionIntro eyebrow="05 · COURSES & WORKFORCE LEARNING" title="Build practical AI capability that stays with your team." text="Role-aware learning blends concise concepts, public-health scenarios, applied exercises, knowledge checks, reflection, and transparent certificate criteria." />
          <div className="course-grid-v2" data-stagger>
            {courses.map(([title, text, href], index) => (
              <Link key={title} href={href} prefetch={false} className="course-card-v2 lit-edge" data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <span>PATH 0{index + 1}</span><BookOpenCheck /><h3>{title}</h3><p>{text}</p>
                <div><small>4 MODULES · APPLIED EXERCISE · KNOWLEDGE CHECK</small><ArrowRight /></div>
              </Link>
            ))}
          </div>
          <div className="lux-product-shell course-shell" data-reveal><CoursePreview /></div>
        </div>
      </section>

      <section className="lux-section crosscutting-section" id="capabilities">
        <div className="container">
          <SectionIntro eyebrow="CROSS-CUTTING CAPABILITIES" title="Six shared systems every pillar draws on." text="The assistant, dashboards, reports, resource matching, personalization, and toolkits are built once and governed once—so every pillar inherits the same evidence and privacy standard." />
          <div className="capability-rail" data-stagger>
            {crossCutting.map(({ icon: Icon, title, text }) => (
              <GlassCard key={title} className="capability-tile lit-edge" data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <Icon size={26} /><h3>{title}</h3><p>{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section product-section">
        <div className="container">
          <SectionIntro eyebrow="CONNECTED PRODUCT EXPERIENCES" title="One governed workspace. Many public-health tasks." text="Explore interface concepts for dashboards, reporting, assistance, evidence, research, and learning. Development data is labelled and never presented as real impact." />
          <div className="lux-product-shell" data-reveal><ProductPreview /></div>
        </div>
      </section>

      <section className="lux-section evaluation-section" id="evaluation">
        <div className="container">
          <SectionIntro eyebrow="MEASURED, NOT ASSUMED" title="What we hold ourselves to." text="Reach, engagement, behaviour and practice change, quality and safety, equity, and long-term system impact—each with a defined measure and a review cadence rather than a marketing number." />
          <div className="metric-band" data-stagger>
            {evaluation.map(({ value, suffix, label, meta }) => (
              <div key={label}>
                <strong className="count-value">{value}{suffix}</strong>
                <span>{label}</span>
                <small>{meta}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section roadmap-section" id="roadmap">
        <div className="container">
          <SectionIntro eyebrow="PHASED, GOVERNED DELIVERY" title="Built in the order that keeps people safe." text="Governance and partnership agreements come before tooling. The Indigenous health pillar launches on partner-governed timelines, not ours." />
          <div className="roadmap-track" data-stagger>
            {roadmap.map(({ index, time, title, text }) => (
              <GlassCard key={index} className="roadmap-phase lit-edge">
                <div className="roadmap-phase__index">{index}</div>
                <p className="roadmap-phase__time">{time}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section trust-section">
        <div className="container trust-layout">
          <div data-reveal>
            <p className="lux-eyebrow"><span /> RESPONSIBLE BY DESIGN</p>
            <h2 data-split>Useful AI begins with boundaries people can inspect.</h2>
            <p>Preventa AI is designed to support PHIPA- and PIPEDA-aligned implementation. Formal compliance depends on deployment, contracts, configuration, operational controls, and legal review.</p>
            <GlowingButton href="/governance-and-ethics" variant="secondary">Review governance &amp; ethics <ArrowRight size={17} /></GlowingButton>
          </div>
          <div className="trust-grid" data-stagger>
            {["Evidence-grounded responses", "Visible citations", "Human review", "Data minimization", "Role-based access", "Encryption architecture", "Audit-log readiness", "Clear AI limitations", "No diagnosis", "Human escalation"].map((item) => (
              <div key={item}><ShieldCheck size={16} /><span>{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-final-cta">
        <div className="container" data-reveal>
          <Sparkles />
          <p className="lux-eyebrow">BUILD WITH ACCOUNTABILITY</p>
          <h2 data-split>Build the Next Generation of Public Health.</h2>
          <p>Bring responsible AI, practical assessment tools, evidence, and workforce learning into one trusted platform.</p>
          <div>
            <GlowingButton href="/create-account" data-magnetic>Request early access <ArrowRight size={17} /></GlowingButton>
            <GlowingButton href="/partnerships" variant="secondary" data-magnetic>Partner with Preventa AI</GlowingButton>
          </div>
        </div>
      </section>
    </main>
  );
}
