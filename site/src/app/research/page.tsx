import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import GlassCard from "@/components/ui/GlassCard";
import { brand, research } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Research and Risk Prediction",
  description: research.description,
  alternates: { canonical: "/research" },
  keywords: ["AI risk prediction public health"],
  openGraph: { title: `Research and Risk Prediction | ${brand.displayName}`, description: research.description, url: `${brand.url}/research`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Research and Risk Prediction | ${brand.displayName}`, description: research.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

export default function ResearchPage() {
  return (
    <ProgramPage label="Research and Risk Prediction" eyebrow={research.eyebrow} title={research.title} description={research.description}>
      <section className="lux-section research-section" id="areas">
        <div className="container">
          <div className="framework-grid" data-stagger>
            {research.areas.map(({ title, text }, index) => (
              <GlassCard key={title} className="framework-card lit-edge" data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <span className="framework-card__tag">Capability 0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </GlassCard>
            ))}
          </div>
          <p className="research-boundary"><ShieldCheck size={16} /> Public-phase workspaces use synthetic, open, or explicitly approved data only. No live personal-health prediction is activated.</p>
        </div>
      </section>
    </ProgramPage>
  );
}
