import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import { brand, healthAndWellness, wellnessDomains } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Health and Wellness",
  description: healthAndWellness.description,
  alternates: { canonical: "/health-and-wellness" },
  openGraph: { title: `Health and Wellness | ${brand.displayName}`, description: healthAndWellness.description, url: `${brand.url}/health-and-wellness`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Health and Wellness | ${brand.displayName}`, description: healthAndWellness.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

export default function HealthAndWellnessPage() {
  return (
    <ProgramPage 
      label="Health and Wellness" 
      eyebrow={healthAndWellness.eyebrow} 
      title={healthAndWellness.title} 
      description={healthAndWellness.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wellnessDomains.map((domain, index) => (
          <div key={domain.id} className="card-clean p-6 bg-white flex flex-col justify-between border border-[#0B3D5F]/10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-data font-bold text-[#1F8A8A] bg-[#1F8A8A]/10 px-2.5 py-1 rounded-full">
                  Domain 0{index + 1}
                </span>
                <span className="text-[10px] font-bold text-[#5D7185] uppercase tracking-wider">
                  {domain.tag}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B3D5F] mb-2">
                {domain.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed mb-4">
                {domain.description}
              </p>
            </div>
            <div className="pt-3 border-t border-[#0B3D5F]/8 text-xs text-[#33485C]">
              <span className="font-bold text-[#0B3D5F] block mb-0.5">AI Co-Pilot:</span>
              <span className="text-[#5D7185]">{domain.aiCapability}</span>
            </div>
          </div>
        ))}
      </div>
    </ProgramPage>
  );
}
