import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ClipboardList, Compass, FlaskConical, GraduationCap, HandHeart,
  HeartPulse, Sparkles, Target,
} from "lucide-react";
import Hero from "./Hero";
import EcosystemScene from "./EcosystemSceneLoader";
import ScrollStack from "./ScrollStack";
import GlassCard from "./ui/GlassCard";
import GlowingButton from "./ui/GlowingButton";
import { brand, pillars, principles, strategicGoals } from "@/lib/site-content";

const pillarIcons: ComponentType<{ size?: number }>[] = [ClipboardList, HeartPulse, HandHeart, FlaskConical, GraduationCap];

const faqs = [
  { q: "What is Preventa AI?", a: "Preventa AI is a public-health initiative building responsible, human-overseen AI for equitable, accountable communities." },
  { q: "What programs does Preventa AI offer?", a: "Five connected programs: Situation Assessment, Health and Wellness, Indigenous Health and Wellbeing, Research and Risk Prediction, and Courses and Workforce Learning." },
  { q: "How does Preventa AI approach governance and data ethics?", a: "We're guided by OCAP® principles, Two-Eyed Seeing, and PHIPA- and PIPEDA-aligned privacy practices, with human review at every consequential step." },
] as const;

const values = [
  { icon: Target, title: "Mission", text: brand.mission, accent: "teal" },
  { icon: Compass, title: "Vision", text: brand.tagline, accent: "gold" },
  { icon: HandHeart, title: "Strategic direction", text: "Governance first, community authority protected, human review at every consequential step.", accent: "green" },
] as const;

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="lux-section-intro" data-wipe>
      <p className="lux-eyebrow"><span /> {eyebrow}</p>
      <h2 data-split>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main id="main-content" className="luxury-home">
      <EcosystemScene className="ecosystem-backdrop" />
      <ScrollStack />

      <div className="stack-frame">
        <Hero />
      </div>

      <div className="stack-frame">
        <section className="lux-section lux-section--paper" id="about">
          <div className="container">
            <SectionIntro eyebrow="OUR PURPOSE" title="A public-health initiative built around one vision." text="Our vision, goals, and strategic direction — stated plainly, not buried in a deck." />
            <blockquote className="vision-statement" data-reveal>
              <Sparkles size={22} />
              <p>&ldquo;{brand.tagline}&rdquo;</p>
            </blockquote>
            <div className="values-grid" data-stagger>
              {values.map(({ icon: Icon, title, text, accent }) => (
                <GlassCard key={title} className="value-tab lit-edge" data-tilt data-accent={accent} data-cursor-label="Learn">
                  <span className="tilt-sheen" aria-hidden="true" />
                  <span className="value-tab__bar" aria-hidden="true" />
                  <div className="lux-icon value-tab__icon"><Icon size={26} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </GlassCard>
              ))}
            </div>
            <div className="governance-tags" data-reveal><span>OCAP® principles</span><span>Two-Eyed Seeing</span><span>PHIPA &amp; PIPEDA aligned</span><span>Human oversight</span></div>
          </div>
        </section>
      </div>

      <div className="stack-frame">
        <section className="lux-section" id="principles">
          <div className="container">
            <SectionIntro eyebrow="OUR PRINCIPLES" title="Seven principles that govern every AI initiative." text="Not aspirational language — the standard every workflow, partnership, and dataset is checked against." />
            <div className="framework-grid" data-stagger>
              {principles.map(({ title, description }, index) => (
                <GlassCard key={title} className="framework-card lit-edge" data-tilt>
                  <span className="tilt-sheen" aria-hidden="true" />
                  <span className="framework-card__tag">Principle 0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="stack-frame">
        <section className="lux-section lux-section--paper" id="strategic-goals">
          <div className="container">
            <SectionIntro eyebrow="STRATEGIC GOALS" title="What we are building toward." text="Four goals that guide every program, partnership, and platform decision." />
            <div className="lux-capability-grid" data-stagger>
              {strategicGoals.map((goal, index) => (
                <GlassCard key={goal} className="lit-edge" data-tilt data-cursor-label="View">
                  <span className="tilt-sheen" aria-hidden="true" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <CheckCircle2 size={18} />
                  <p>{goal}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="stack-frame stack-frame--last">
        <section className="lux-section" id="programs">
          <div className="container">
            <SectionIntro eyebrow="WHAT WE DO" title="Programs built for practical public-health action." text="Five connected programs, each grounded in a framework you can check." />
            <div className="lux-pillar-grid" data-stagger>
              {pillars.map((pillar, index) => {
                const Icon = pillarIcons[index];
                return (
                  <Link key={pillar.title} href={pillar.href} prefetch={false} className="lux-pillar-card lit-edge" data-tilt data-cursor-label="Explore">
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
            <div className="lux-faq lux-faq--centered" data-reveal>
              {faqs.map(({ q, a }) => (
                <details key={q} className="glass-card"><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
            <div className="lux-final-cta lux-final-cta--inline" data-reveal>
              <Sparkles />
              <p className="lux-eyebrow">BUILD WITH ACCOUNTABILITY</p>
              <h2 data-split>Build the Next Generation of Public Health.</h2>
              <p>One platform for responsible AI, evidence, and action.</p>
              <div>
                <GlowingButton href="/contact" data-magnetic>Request early access <ArrowRight size={17} /></GlowingButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
