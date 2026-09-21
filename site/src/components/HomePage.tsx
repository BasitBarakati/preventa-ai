"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown,
  ShieldCheck,
  Award,
  Landmark,
  FileText,
  Activity
} from "lucide-react";
import Hero from "./Hero";
import AssessmentGrid from "./AssessmentGrid";
import AssessmentWizard from "./AssessmentWizard";
import WellnessDomains from "./WellnessDomains";
import AICoPilotDemo from "./AICoPilotDemo";
import EvaluationSuite from "./EvaluationSuite";
import UniversityInTheBox from "./UniversityInTheBox";
import GovernanceTrust from "./GovernanceTrust";
import PricingTiers from "./PricingTiers";
import InquirySection from "./InquirySection";
import { brand, pillars, principles } from "@/lib/site-content";

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

const fourPillars = [
  {
    title: "Plan Smarter",
    description: "Analyzes local demographics, social determinants of health (SDOH), and community protective factors to rank evidence-informed interventions.",
    tag: "Population Diagnostics",
  },
  {
    title: "Educate Better",
    description: "Adapts population health literacy messaging by reading grade level, cultural safety context, and life-course stage.",
    tag: "Health Literacy",
  },
  {
    title: "Build Capacity",
    description: "Recommends accredited workforce learning pathways through University In The Box with verifiable Canadian micro-credentials.",
    tag: "Workforce Academy",
  },
  {
    title: "Evaluate Rigorously",
    description: "Auto-generates indicator banks, process monitors, and outcome reports aligned with WHO and PHAC standards.",
    tag: "Evidence Loop",
  },
];

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#FAF8F5]">
      {/* 1. Hero Cockpit */}
      <Hero />

      {/* 2. Institutional Framework Authority Strip (CPHA & National Benchmark) */}
      <section className="py-8 bg-[#062235] text-white border-b border-white/10" aria-label="National Framework Alignments">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left shrink-0">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#17B8C4] block mb-1">
                National Governance Alignment
              </span>
              <span className="text-xs font-semibold text-white/90">
                Built to Canadian Public Health Standards
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#17B8C4] shrink-0" />
                <span className="font-semibold text-white/80">First Nations OCAP®</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Landmark size={16} className="text-[#C5A059] shrink-0" />
                <span className="font-semibold text-white/80">CPHA Principles</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <FileText size={16} className="text-[#7FB069] shrink-0" />
                <span className="font-semibold text-white/80">Ottawa Charter SDOH</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Activity size={16} className="text-[#17B8C4] shrink-0" />
                <span className="font-semibold text-white/80">PHAC Competencies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Pillars of AI in Health Promotion */}
      <section className="py-20 bg-white border-b border-[#0B3D5F]/8">
        <div className="site-container">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#0B3D5F]/10 text-[#0B3D5F] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-[#1F8A8A]" />
              <span>Transformational Infrastructure</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#062235] tracking-tight">
              How AI Transforms Population Health
            </h2>
            <p className="text-sm sm:text-base text-[#536474] mt-2">
              Four connected capabilities that turn diagnostic data into measurable community wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="card-luxury p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#0A4D34] border border-[#0A4D34]/15 mb-4 inline-block">
                    {pillar.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#062235] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#536474] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Multi-Level Situation Assessment (3 Streams from File 2) */}
      <AssessmentGrid />

      {/* 5. Interactive Assessment Wizard (60-sec check) */}
      <AssessmentWizard />

      {/* 6. Eight Health & Wellness Domains */}
      <WellnessDomains />

      {/* 7. Interactive AI Co-Pilot Simulation */}
      <AICoPilotDemo />

      {/* 8. Four-Stage Evaluation Suite */}
      <EvaluationSuite />

      {/* 9. University In The Box (Workforce Learning & AI Systems) */}
      <UniversityInTheBox />

      {/* 10. Indigenous Health, OCAP & Sovereign Governance */}
      <GovernanceTrust />

      {/* 11. Equitable Subscription Tiers (5 Tiers from File 2) */}
      <PricingTiers />

      {/* 12. Frequently Asked Questions */}
      <section className="py-24 bg-[#FAF8F5] border-b border-[#0B3D5F]/8">
        <div className="site-container max-w-4xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0B3D5F]/10 text-[#0B3D5F] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <HelpCircle size={14} className="text-[#1F8A8A]" />
              <span>Clarity &amp; Assurance</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#536474] mt-2 max-w-xl mx-auto">
              Clear answers regarding algorithmic models, clinical boundaries, OCAP® data sovereignty, and Canadian privacy laws.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white p-6 sm:p-7 rounded-2xl border border-[#0B3D5F]/10 shadow-xs transition-all open:ring-2 open:ring-[#1F8A8A]/25"
              >
                <summary className="flex items-center justify-between font-display text-base sm:text-lg font-bold text-[#062235] cursor-pointer list-none select-none">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-[#1F8A8A] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4"
                  />
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-[#2C3E50] leading-relaxed border-t border-[#0B3D5F]/6 pt-4 font-normal">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Final Advisory & Consultation Inquiry Suite */}
      <InquirySection />
    </main>
  );
}
