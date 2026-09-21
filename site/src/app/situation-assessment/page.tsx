import type { Metadata } from "next";
import { Building2, CheckCircle2, HeartPulse, UsersRound, ArrowRight, ShieldCheck } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
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
    <ProgramPage 
      label="Situation Assessment" 
      eyebrow={situationAssessment.eyebrow} 
      title={situationAssessment.title} 
      description={situationAssessment.description}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {situationAssessment.modules.map(({ title, factors, outputs }, index) => {
            const Icon = icons[index] || HeartPulse;
            return (
              <div key={title} className="card-clean p-8 bg-white flex flex-col justify-between border border-[#0B3D5F]/10">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#0B3D5F] flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-mono-data font-bold text-[#5D7185] bg-black/[0.04] px-2.5 py-1 rounded-full">
                      Module 0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0B3D5F] mb-4">
                    {title}
                  </h3>

                  <ul className="space-y-2 text-xs text-[#33485C] mb-6">
                    {factors.map((factor) => (
                      <li key={factor} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-[#1F8A8A] shrink-0 mt-0.5" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {outputs && (
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#0B3D5F]/8 text-xs">
                    <span className="font-bold text-[#0B3D5F] block mb-1">Generated Output:</span>
                    <span className="text-[#5D7185] leading-relaxed">{outputs}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ProgramPage>
  );
}
