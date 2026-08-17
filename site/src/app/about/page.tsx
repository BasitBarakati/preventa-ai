import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import GlassCard from "@/components/ui/GlassCard";
import { brand, principles, strategicGoals } from "@/lib/site-content";

const description = "Seven principles every workflow is checked against, and four strategic goals that guide every program and platform decision at Preventa AI.";

export const metadata: Metadata = {
  title: "Principles and Strategic Goals",
  description,
  alternates: { canonical: "/about" },
  keywords: ["responsible AI principles", "public health AI governance", "AI transparency principles"],
  openGraph: { title: `Principles and Strategic Goals | ${brand.displayName}`, description, url: `${brand.url}/about`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Principles and Strategic Goals | ${brand.displayName}`, description, images: ["/brand/preventa-ai-social-preview.png"] },
};

export default function AboutPage() {
  return (
    <ProgramPage label="About" eyebrow="PRINCIPLES & GOALS" title="What governs us, and what we're building toward." description={description} parentLabel="Our purpose" parentHref="/#about" secondaryLabel="Back to home">
      <section className="lux-section" id="principles">
        <div className="container">
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
          <p className="lux-eyebrow lux-subheading"><span /> STRATEGIC GOALS</p>
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
    </ProgramPage>
  );
}
