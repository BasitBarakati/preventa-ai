import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import GlassCard from "@/components/ui/GlassCard";
import { brand, healthAndWellness } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Health and Wellness",
  description: healthAndWellness.description,
  alternates: { canonical: "/health-and-wellness" },
  openGraph: { title: `Health and Wellness | ${brand.displayName}`, description: healthAndWellness.description, url: `${brand.url}/health-and-wellness`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Health and Wellness | ${brand.displayName}`, description: healthAndWellness.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

export default function HealthAndWellnessPage() {
  return (
    <ProgramPage label="Health and Wellness" eyebrow={healthAndWellness.eyebrow} title={healthAndWellness.title} description={healthAndWellness.description}>
      <section className="lux-section implementation-section" id="topics">
        <div className="container">
          <div className="lux-capability-grid" data-stagger>
            {healthAndWellness.topics.map((topic, index) => (
              <GlassCard key={topic} className="lit-edge" data-tilt data-cursor-label="View">
                <span className="tilt-sheen" aria-hidden="true" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <CheckCircle2 size={18} />
                <p>{topic}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </ProgramPage>
  );
}
