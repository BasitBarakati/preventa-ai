import type { Metadata } from "next";
import { ShieldCheck, FlaskConical, LineChart, CheckCircle2 } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
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
    <ProgramPage 
      label="Research and Risk Prediction" 
      eyebrow={research.eyebrow} 
      title={research.title} 
      description={research.description}
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {research.areas.map(({ title, text }, index) => (
            <div key={title} className="card-clean p-8 bg-white border border-[#0B3D5F]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#0B3D5F] flex items-center justify-center">
                    {index === 0 ? <FlaskConical size={24} /> : <LineChart size={24} />}
                  </div>
                  <span className="text-xs font-mono-data font-bold text-[#1F8A8A] bg-[#1F8A8A]/10 px-2.5 py-1 rounded-full">
                    Research Stream 0{index + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0B3D5F] mb-3">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#EBF3E7] border border-[#7FB069]/40 flex items-start gap-3 text-xs text-[#3E692D]">
          <ShieldCheck size={20} className="shrink-0 mt-0.5" />
          <p className="font-medium leading-relaxed">
            <strong>Controlled Research Guardrail:</strong> Public-phase sandboxes utilize approved synthetic benchmarks and open public data only. Live clinical prediction and individualized health scoring require reviewed institutional agreements.
          </p>
        </div>
      </div>
    </ProgramPage>
  );
}
