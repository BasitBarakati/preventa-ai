import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import GlowingButton from "./ui/GlowingButton";

export default function ProgramPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <main id="main-content" className="internal-page luxury-home">
      <section className="lux-page-hero">
        <div className="lux-hero__grid" aria-hidden="true" />
        <div className="lux-hero__aura" aria-hidden="true" />
        <div className="container lux-page-hero__inner">
          <nav className="lux-breadcrumbs" aria-label="Breadcrumb"><Link href="/" prefetch={false}>Home</Link><span aria-hidden="true">/</span><Link href="/#programs" prefetch={false}>What we do</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
          <p className="lux-eyebrow"><span /> {eyebrow}</p>
          <h1 data-split>{title}</h1>
          <p>{description}</p>
          <div className="lux-page-hero__actions">
            <GlowingButton href="/contact" data-magnetic>Get in touch<ArrowRight size={18} /></GlowingButton>
            <GlowingButton href="/#programs" variant="secondary" data-magnetic>All programs</GlowingButton>
          </div>
        </div>
      </section>

      {children}

      <section className="lux-final-cta"><div className="container" data-reveal><Sparkles /><p className="lux-eyebrow">PRACTICAL NEXT STEP</p><h2 data-split>Bring the right people into the conversation.</h2><p>Responsible implementation works best when public health, community partners, privacy, accessibility, evidence, technology, and leadership are involved early.</p><div><GlowingButton href="/contact" data-magnetic>Contact Preventa AI <ArrowRight size={17} /></GlowingButton></div></div></section>
    </main>
  );
}
