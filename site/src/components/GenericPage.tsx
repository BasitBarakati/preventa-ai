import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { PageDefinition } from "@/lib/site-content";
import GlassCard from "./ui/GlassCard";
import GlowingButton from "./ui/GlowingButton";
import InquiryForm from "./InquiryForm";

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
          {!isContact && <div className="lux-page-hero__actions"><GlowingButton href="/contact" data-magnetic>Get in touch<ArrowRight size={18} /></GlowingButton><GlowingButton href="/#top" variant="secondary" data-magnetic>Back to the homepage</GlowingButton></div>}
        </div>
      </section>

      {page.notice && <div className="container lux-notice" role="note"><ShieldCheck size={20} /><p>{page.notice}</p></div>}

      <section className="lux-section">
        <div className="container">
          <div className="lux-capability-grid" data-stagger>{page.highlights.map((item, index) => <GlassCard key={item} className="lit-edge" data-tilt data-cursor-label="View"><span className="tilt-sheen" aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span><CheckCircle2 size={18} /><p>{item}</p></GlassCard>)}</div>
        </div>
      </section>

      {page.kind === "policy" && <section className="lux-section"><div className="container lux-policy-content" data-reveal><h2>Implementation commitments</h2><p>This page describes the intended product direction for the public preview. Production controls, policies, agreements, retention schedules, and compliance evidence will be finalized before personal or organizational data workflows are activated.</p><p>Questions, accessibility barriers, privacy requests, or concerns about AI-supported content can be directed through the <Link href="/contact">contact pathway</Link>.</p></div></section>}

      {isContact && <section className="lux-section" id="contact-form"><div className="container lux-contact-grid"><div data-reveal><p className="lux-eyebrow"><span /> YOUR CONTEXT</p><h2 data-split>Help us understand the work.</h2><p>We review every request. Share the intended public-health use, the people who need to be involved, and the governance questions that matter.</p><div className="lux-contact-note"><ShieldCheck size={20} /><span>Never submit personal health information through this form.</span></div></div><InquiryForm /></div></section>}

      {page.faqs && <section className="lux-section"><div className="container"><div className="lux-faq" data-reveal>{page.faqs.map((faq) => <details key={faq.question} className="glass-card"><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>}

      <section className="lux-final-cta"><div className="container" data-reveal><Sparkles /><p className="lux-eyebrow">PRACTICAL NEXT STEP</p><h2 data-split>Bring the right people into the conversation.</h2><p>Responsible implementation works best when public health, community partners, privacy, accessibility, evidence, technology, and leadership are involved early.</p><div><GlowingButton href="/contact" data-magnetic>Contact Preventa AI <ArrowRight size={17} /></GlowingButton></div></div></section>
    </main>
  );
}
