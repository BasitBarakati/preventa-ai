import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Target, Compass } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import { brand, principles, strategicGoals } from "@/lib/site-content";

const description = "Seven foundational principles every workflow is checked against, and four strategic goals that guide every program and platform decision at Preventa AI.";

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
    <ProgramPage 
      label="About" 
      eyebrow="PRINCIPLES &amp; GOALS" 
      title="What Governs Us, and What We're Building Toward." 
      description={description} 
      parentLabel="Home" 
      parentHref="/" 
      secondaryLabel="Back to Homepage"
    >
      {/* Guiding Principles */}
      <section className="mb-16">
        <div className="mb-8">
          <span className="badge-pill badge-teal mb-2">Seven Guiding Principles</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3D5F]">
            Our Foundational Ethics &amp; Governance Standards
          </h2>
          <p className="text-xs sm:text-sm text-[#5D7185] mt-1">
            Every capability, algorithmic output, and partner collaboration must adhere to these seven commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map(({ title, description }, index) => (
            <div key={title} className="card-clean p-6 bg-white border border-[#0B3D5F]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#1F8A8A] font-bold text-xs flex items-center justify-center border border-[#0B3D5F]/10 font-mono-data">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5D7185] bg-black/[0.03] px-2 py-0.5 rounded">
                    Principle
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#0B3D5F] mb-2">
                  {title}
                </h3>
                <p className="text-xs text-[#5D7185] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Four Strategic Goals */}
      <section>
        <div className="mb-8">
          <span className="badge-pill badge-sage mb-2">Strategic Direction</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3D5F]">
            Four Long-Term Transformation Goals
          </h2>
          <p className="text-xs sm:text-sm text-[#5D7185] mt-1">
            Our measurable objectives across healthcare systems, epidemiology, and public health equity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {strategicGoals.map((goal, index) => (
            <div key={goal} className="card-clean p-6 bg-white border border-[#0B3D5F]/10 flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-xl bg-[#EBF3E7] text-[#3E692D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                <Target size={16} />
              </span>
              <div>
                <span className="text-[10px] font-mono-data font-bold uppercase text-[#5D7185] block mb-1">
                  Strategic Goal 0{index + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#1A2530] font-semibold leading-relaxed">
                  {goal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ProgramPage>
  );
}
