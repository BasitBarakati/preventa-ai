"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Landmark, 
  FileText, 
  Activity, 
  HelpCircle, 
  ChevronDown 
} from "lucide-react";
import Hero from "./Hero";
import ExecutiveOverview from "./ExecutiveOverview";
import PlatformPavilion from "./PlatformPavilion";
import AICoPilotDemo from "./AICoPilotDemo";
import GuidingPrinciples from "./GuidingPrinciples";
import PricingTiers from "./PricingTiers";
import InquirySection from "./InquirySection";

const faqs = [
  {
    q: "What makes Preventa AI different from standard commercial health software?",
    a: "Preventa AI is purpose-engineered as Canada's sovereign public health intelligence infrastructure. Rather than calculating opaque proprietary risk scores, every single AI Co-Pilot synthesis cites verified Canadian and WHO peer-reviewed evidence, respects First Nations OCAP® principles, generates customizable Ottawa Charter logic models, and enforces mandatory human epidemiologist authorization before any consequential output is finalized.",
  },
  {
    q: "How does Preventa AI respect First Nations, Inuit, and Métis data sovereignty?",
    a: "We strictly enforce OCAP® principles (Ownership, Control, Access, and Possession) and the Two-Eyed Seeing (Etuaptmumk) conceptual framework. First Nations and Indigenous communities retain 100% legal ownership and sovereign possession of their data. We do not aggregate, monetize, or train commercial large language models on community-held health information.",
  },
  {
    q: "Is Preventa AI compliant with Canadian federal and provincial privacy legislation?",
    a: "Yes. Preventa AI's security architecture complies with Ontario's Personal Health Information Protection Act (PHIPA), the federal Personal Information Protection and Electronic Documents Act (PIPEDA), and provincial public sector privacy regulations. All data storage, computation, and encryption ledgers reside exclusively on Canadian soil in SOC 2 Type II certified sovereign cloud regions.",
  },
  {
    q: "How does the Sponsored Community Tier operate for grassroots organizations?",
    a: "Through our institutional equity cross-subsidy pool, non-profit community health organizations, grassroots public health initiatives, and First Nations health authorities can access Organization-tier features with zero subscription fees, funded through our enterprise and government partnerships.",
  },
  {
    q: "Does Preventa AI provide clinical diagnoses or replace emergency medical triage?",
    a: "No. Preventa AI is an evidence-informed public health, health promotion, and population epidemiology decision-support platform. It is engineered to assist healthcare executives, public health units, researchers, and community practitioners. It does not replace individual clinical medical diagnosis, prescription, or acute psychiatric emergency care.",
  },
];

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#FCFBF9]">
      
      {/* 1. Executive Hero & The Health Intelligence Continuum */}
      <Hero />

      {/* 2. National Framework Governance Strip */}
      <section className="py-7 bg-[#062235] text-white border-b border-white/10" aria-label="National Standards">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left shrink-0">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#14B8A6] block mb-0.5">
                National Governance Standards
              </span>
              <span className="text-xs font-semibold text-white/90">
                Built strictly to Canadian Public Health &amp; Indigenous Sovereignty Frameworks
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#14B8A6] shrink-0" />
                <span className="font-semibold text-white/90">First Nations OCAP®</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Landmark size={15} className="text-[#C5A059] shrink-0" />
                <span className="font-semibold text-white/90">CPHA Principles</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <FileText size={15} className="text-[#7FB069] shrink-0" />
                <span className="font-semibold text-white/90">Ottawa Charter SDOH</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Activity size={15} className="text-[#14B8A6] shrink-0" />
                <span className="font-semibold text-white/90">PHAC Competencies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive Overview: 3 Crucial Stakeholder Pathways */}
      <ExecutiveOverview />

      {/* 4. The Platform Pavilion (Consolidates all 5 Programs cleanly) */}
      <PlatformPavilion />

      {/* 5. Serene AI Co-Pilot Demonstration */}
      <AICoPilotDemo />

      {/* 6. Seven Guiding Principles & Strategic Goals */}
      <GuidingPrinciples />

      {/* 7. Equitable & Transparent Pricing Matrix */}
      <PricingTiers />

      {/* 8. Frequently Asked Questions */}
      <section className="py-24 md:py-32 bg-[#FAF8F5] border-b border-[#0B3D5F]/6">
        <div className="site-container max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest block mb-2">
              Clarity &amp; Assurance
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-xl mx-auto">
              Straightforward answers regarding our AI models, clinical boundaries, OCAP® data sovereignty, and Canadian privacy laws.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white p-6 sm:p-7 rounded-2xl border border-[#0B3D5F]/8 shadow-xs transition-all open:ring-2 open:ring-[#0D9488]/20"
              >
                <summary className="flex items-center justify-between font-display text-base sm:text-lg font-bold text-[#062235] cursor-pointer list-none select-none">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-[#0D9488] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4"
                  />
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-[#334155] leading-relaxed border-t border-[#0B3D5F]/6 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Executive Consultation Intake */}
      <InquirySection />

    </main>
  );
}
