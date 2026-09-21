"use client";

import { useState } from "react";
import { 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Workflow, 
  CheckSquare, 
  Cpu,
  Download,
  Share2
} from "lucide-react";
import { coPilotScenarios } from "@/lib/site-content";

export default function AICoPilotDemo() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(coPilotScenarios[0].id);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeScenario = coPilotScenarios.find(s => s.id === activeScenarioId) || coPilotScenarios[0];

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    setIsVerified(false);
    setCopied(false);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 450);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-copilot" className="py-24 bg-white border-b border-[#0B3D5F]/8">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 text-[#8C6D27] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles size={14} className="text-[#C5A059]" />
            <span>Interactive AI Co-Pilot Experience</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight mb-4">
            Evidence-Grounded. Citations Visible. <br />
            <span className="text-[#1F8A8A] font-normal italic">Always Human Overridable.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#2C3E50] leading-relaxed">
            Preventa AI never operates as an unverified black box. Test how our AI Co-Pilot assists public health practitioners with program logic models, equity scans, and readiness evaluations.
          </p>
        </div>

        {/* Co-Pilot Interactive Frame / Cockpit Window */}
        <div className="max-w-5xl mx-auto card-luxury overflow-hidden border border-[#0B3D5F]/15 shadow-2xl">
          {/* Top Window Control Bar */}
          <div className="bg-[#062235] px-5 py-3.5 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
              </div>
              <span className="text-white/40 text-xs">|</span>
              <span className="font-mono text-xs font-bold text-white/90 flex items-center gap-1.5">
                <Cpu size={14} className="text-[#17B8C4]" />
                preventa-copilot://canadian-public-health-rag
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10.5px] font-mono text-white/70">
              <span className="px-2 py-0.5 rounded bg-white/10 text-[#17B8C4] font-semibold">
                Latency: 128ms
              </span>
              <span className="px-2 py-0.5 rounded bg-[#0A4D34] text-white font-semibold">
                OCAP® Gate: Active
              </span>
            </div>
          </div>

          {/* Scenario Selector Ribbon */}
          <div className="bg-[#FAF8F5] p-4 sm:p-5 border-b border-[#0B3D5F]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#062235] uppercase tracking-wider">
              Select Public Health Scenario:
            </span>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {coPilotScenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScenario(s.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeScenarioId === s.id
                      ? "bg-[#062235] text-white shadow-md"
                      : "bg-white text-[#2C3E50] hover:bg-[#0B3D5F]/5 border border-[#0B3D5F]/10"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Display */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#0B3D5F]/8 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/10 flex items-center justify-center text-[#0B3D5F] shrink-0 mt-0.5 shadow-2xs">
              <FileText size={17} />
            </div>
            <div className="flex-1">
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#536474] block mb-1">
                Practitioner Prompt &bull; {activeScenario.category}
              </span>
              <p className="text-sm sm:text-base font-bold text-[#062235]">
                &ldquo;{activeScenario.prompt}&rdquo;
              </p>
            </div>
          </div>

          {/* AI Response Output Panel */}
          <div className="p-6 sm:p-8 bg-[#FAF8F5]/60 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#0B3D5F]/8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F8A8A] animate-pulse" />
                <span className="text-xs font-bold text-[#062235] font-mono-data">
                  SYNTHESIZED_LOGIC_MODEL &bull; PREVENTA_AI
                </span>
              </div>
              <span className="badge-pill badge-teal text-[11px] font-bold">
                Health Canada &bull; Ottawa Charter Corpus
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#062235]">
              {activeScenario.response.headline}
            </h3>

            {/* Structured Outputs */}
            {activeScenario.response.inputs && activeScenario.response.activities && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#0B3D5F]/8 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F8A8A] mb-3 flex items-center gap-1.5">
                    <Workflow size={15} /> Key Stakeholder Inputs &amp; Resources
                  </h4>
                  <ul className="space-y-2 text-xs text-[#2C3E50]">
                    {activeScenario.response.inputs.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#1F8A8A] font-bold">&bull;</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#0B3D5F]/8 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#062235] mb-3 flex items-center gap-1.5">
                    <CheckSquare size={15} /> Targeted Core Activities
                  </h4>
                  <ul className="space-y-2 text-xs text-[#2C3E50]">
                    {activeScenario.response.activities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#062235] font-bold">&bull;</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Findings if Equity Scan */}
            {activeScenario.response.findings && (
              <div className="p-6 rounded-2xl bg-white border border-[#0B3D5F]/8 space-y-3 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6D27]">
                  Stratified Health Inequities Identified:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#2C3E50]">
                  {activeScenario.response.findings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-[#FAF8F5] border border-[#C5A059]/30 text-[#8C6D27] font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Readiness Pillars if Governance */}
            {activeScenario.response.readinessPillars && (
              <div className="p-6 rounded-2xl bg-white border border-[#0B3D5F]/8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#062235]">
                    Systemic AI Governance Readiness
                  </h4>
                  <span className="badge-pill badge-sage text-xs font-bold">
                    Readiness Score: {activeScenario.response.score}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2C3E50]">
                  {activeScenario.response.readinessPillars.map((pillar, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/6 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#1F8A8A] shrink-0" />
                      <span className="font-semibold">{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Citation & Accountability Footer */}
            <div className="p-5 rounded-2xl bg-white border border-[#0B3D5F]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#062235]">
                  <BookOpen size={15} className="text-[#1F8A8A]" />
                  <span>{activeScenario.response.citation}</span>
                </div>
                <p className="text-[11px] text-[#536474]">
                  {activeScenario.response.verificationNote}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2.5 rounded-xl border border-[#0B3D5F]/15 hover:bg-[#FAF8F5] text-[#062235] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title="Copy synthesized logic model"
                >
                  <Share2 size={15} />
                  <span>{copied ? "Copied!" : "Share"}</span>
                </button>

                {isVerified ? (
                  <span className="badge-pill badge-sage py-2.5 px-4 text-xs font-bold">
                    <CheckCircle2 size={16} /> Practitioner Approved
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="px-4.5 py-2.5 rounded-xl bg-[#062235] hover:bg-[#0A4D34] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 size={15} className="text-[#17B8C4]" />
                    <span>{isVerifying ? "Verifying Gates..." : "Sign-off & Export Logic Model"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
