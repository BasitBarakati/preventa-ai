import type { Metadata } from "next";
import { Landmark, Sprout, Leaf, ShieldCheck } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import { brand, indigenousHealth } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Indigenous Health and Wellbeing",
  description: indigenousHealth.description,
  alternates: { canonical: "/indigenous-health" },
  keywords: ["Indigenous health data governance", "OCAP principles health data"],
  openGraph: { title: `Indigenous Health and Wellbeing | ${brand.displayName}`, description: indigenousHealth.description, url: `${brand.url}/indigenous-health`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Indigenous Health and Wellbeing | ${brand.displayName}`, description: indigenousHealth.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

const icons = [Sprout, Leaf, Landmark];

export default function IndigenousHealthPage() {
  return (
    <ProgramPage 
      label="Indigenous Health and Wellbeing" 
      eyebrow={indigenousHealth.eyebrow} 
      title={indigenousHealth.title} 
      description={indigenousHealth.description}
    >
      <div className="space-y-12">
        {/* Governance Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-white via-[#FAF7F2] to-[#FDF3EB] border-2 border-[#C38D6B]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-pill badge-amber">OCAP® Principles Aligned</span>
            <span className="badge-pill badge-amber">Two-Eyed Seeing</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3D5F] mb-3">
            Guided by Community Sovereignty, Not Imposed Upon It.
          </h2>
          <p className="text-xs sm:text-sm text-[#33485C] leading-relaxed max-w-3xl">
            This program is held to the highest standard of ethical accountability: respect for Indigenous knowledge systems, cultural safety, community self-determination, and data sovereignty. Indigenous leadership sets the research and transformation agenda; algorithms never speak for Nations.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {indigenousHealth.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white text-[#A35B29] border border-[#C38D6B]/30 text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Core Action Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {indigenousHealth.areas.map(({ title, text }, index) => {
            const Icon = icons[index] || Sprout;
            return (
              <div key={title} className="card-clean p-7 bg-white border border-[#0B3D5F]/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FDF3EB] text-[#C38D6B] flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0B3D5F] mb-2">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ProgramPage>
  );
}
