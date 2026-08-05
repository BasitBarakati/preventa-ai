import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { PageDefinition } from "@/lib/site-content";
import AssessmentExperience from "./AssessmentExperience";
import AssistantPreview from "./AssistantPreview";
import AuthPanel from "./AuthPanel";
import CoursePreview from "./CoursePreview";
import DashboardPreview from "./DashboardPreview";
import GlassCard from "./ui/GlassCard";
import GlowingButton from "./ui/GlowingButton";
import InquiryForm from "./InquiryForm";
import ResearchPreview from "./ResearchPreview";

function AssessmentVariant(path: string) {
  if (path.endsWith("/community")) return "community" as const;
  if (path.endsWith("/organization")) return "organization" as const;
  return "individual" as const;
}

export default function GenericPage({ page }: { page: PageDefinition }) {
  const isContact = page.path === "/contact";
  return (
    <main id="main-content" className="internal-page luxury-home">
      <section className="lux-page-hero">
        <div className="lux-hero__grid" aria-hidden="true" />
        <div className="lux-hero__aura" aria-hidden="true" />
        <div className="container lux-page-hero__inner">
          <nav className="lux-breadcrumbs" aria-label="Breadcrumb"><Link href="/" prefetch={false}>Home</Link><span aria-hidden="true">/</span><span>{page.title}</span></nav>
          <p className="lux-eyebrow"><span /> {page.eyebrow}</p>
          <h1 data-split>{page.title}</h1>
          <p>{page.description}</p>
          <div className="lux-page-hero__actions"><GlowingButton href={isContact ? "#contact-form" : "/contact"} data-magnetic>{isContact ? "Send a request" : "Request early access"}<ArrowRight size={18} /></GlowingButton><GlowingButton href="/platform" variant="secondary" data-magnetic>Explore the platform</GlowingButton></div>
        </div>
      </section>

      {page.notice && <div className="container lux-notice" role="note"><ShieldCheck size={20} /><p>{page.notice}</p></div>}

      <section className="lux-section">
        <div className="container">
          <div className="lux-section-intro" data-reveal><p className="lux-eyebrow"><span /> WHAT IT SUPPORTS</p><h2 data-split>Knowledge, tools, and accountable action.</h2><p>Every capability is designed to make context, sources, limits, review status, and next steps easier to understand.</p></div>
          <div className="lux-capability-grid" data-stagger>{page.highlights.map((item, index) => <GlassCard key={item} className="lit-edge" data-tilt><span className="tilt-sheen" aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span><CheckCircle2 size={18} /><p>{item}</p></GlassCard>)}</div>
        </div>
      </section>

      {page.sections && <section className="lux-section"><div className="container lux-cards-grid" data-stagger>{page.sections.map((section, index) => <GlassCard key={section.title} className="lit-edge" data-tilt><span className="tilt-sheen" aria-hidden="true" /><span>0{index + 1}</span><h2>{section.title}</h2><p>{section.body}</p></GlassCard>)}</div></section>}

      {page.kind === "assessment" && <section className="lux-section"><div className="container"><AssessmentExperience variant={AssessmentVariant(page.path)} /></div></section>}
      {page.kind === "assistant" && <section className="lux-section"><div className="container"><AssistantPreview /></div></section>}
      {page.kind === "research" && <section className="lux-section"><div className="container"><ResearchPreview /></div></section>}
      {page.kind === "dashboard" && <section className="lux-section"><div className="container"><DashboardPreview /></div></section>}
      {page.kind === "course" && <section className="lux-section"><div className="container"><CoursePreview /></div></section>}
      {page.kind === "auth" && <section className="lux-section"><div className="container"><AuthPanel create={page.path === "/create-account"} /></div></section>}
      {isContact && <section className="lux-section" id="contact-form"><div className="container lux-contact-grid"><div data-reveal><p className="lux-eyebrow"><span /> YOUR CONTEXT</p><h2 data-split>Help us understand the work.</h2><p>We review every request. Share the intended public-health use, the people who need to be involved, and the governance questions that matter.</p><div className="lux-contact-note"><ShieldCheck size={20} /><span>Never submit personal health information through this form.</span></div></div><InquiryForm /></div></section>}

      {page.kind === "policy" && <section className="lux-section"><div className="container lux-policy-content" data-reveal><h2>Implementation commitments</h2><p>This page describes the intended product direction for the public preview. Production controls, policies, agreements, retention schedules, and compliance evidence will be finalized before personal or organizational data workflows are activated.</p><p>Questions, accessibility barriers, privacy requests, or concerns about AI-supported content can be directed through the <Link href="/contact">contact and escalation pathway</Link>.</p></div></section>}

      {page.faqs && <section className="lux-section"><div className="container"><div className="lux-section-intro" data-reveal><p className="lux-eyebrow"><span /> FREQUENTLY ASKED</p><h2 data-split>Straight answers before you start.</h2></div><div className="lux-faq" data-reveal>{page.faqs.map((faq) => <details key={faq.question} className="glass-card"><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>}

      <section className="lux-final-cta"><div className="container" data-reveal><Sparkles /><p className="lux-eyebrow">PRACTICAL NEXT STEP</p><h2 data-split>Bring the right people into the conversation.</h2><p>Responsible implementation works best when public health, community partners, privacy, accessibility, evidence, technology, and leadership are involved early.</p><div><GlowingButton href="/partnerships" data-magnetic>Explore partnerships <ArrowRight size={17} /></GlowingButton></div></div></section>
    </main>
  );
}
