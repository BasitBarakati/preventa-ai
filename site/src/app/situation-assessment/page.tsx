import type { Metadata } from "next";
import { Building2, CheckCircle2, HeartPulse, UsersRound } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import GlassCard from "@/components/ui/GlassCard";
import { brand, situationAssessment } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Situation Assessment",
  description: situationAssessment.description,
  alternates: { canonical: "/situation-assessment" },
  openGraph: { title: `Situation Assessment | ${brand.displayName}`, description: situationAssessment.description, url: `${brand.url}/situation-assessment`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Situation Assessment | ${brand.displayName}`, description: situationAssessment.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

const icons = [HeartPulse, UsersRound, Building2];

export default function SituationAssessmentPage() {
  return (
    <ProgramPage label="Situation Assessment" eyebrow={situationAssessment.eyebrow} title={situationAssessment.title} description={situationAssessment.description}>
      <section className="lux-section assessment-studio" id="modules">
        <div className="container">
          <div className="assessment-module-grid" data-stagger>
            {situationAssessment.modules.map(({ title, factors, outputs }, index) => {
              const Icon = icons[index];
              return (
                <GlassCard key={title} glow="teal" className="assessment-module lit-edge" data-tilt>
                  <span className="tilt-sheen" aria-hidden="true" />
                  <div className="lux-icon"><Icon /></div>
                  <h3>{title}</h3>
                  <ul className="factor-list">
                    {factors.map((factor) => <li key={factor}><CheckCircle2 size={14} />{factor}</li>)}
                  </ul>
                  {outputs && <p className="assessment-module__outputs"><strong>Outputs:</strong> {outputs}</p>}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>
    </ProgramPage>
  );
}
