"use client";

import { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  Printer, 
  BarChart, 
  HeartHandshake 
} from "lucide-react";
import { interactiveQuestions } from "@/lib/site-content";

export default function AssessmentWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = interactiveQuestions[currentStep];

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQuestion.id]: score };
    setAnswers(updated);

    if (currentStep < interactiveQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate scores
  const scoreValues = Object.values(answers);
  const totalScore = scoreValues.length > 0 
    ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length) 
    : 0;

  const getScoreBand = (score: number) => {
    if (score >= 85) return { label: "Exceptional Wellness & Resilience", color: "text-[#3E692D]", bg: "bg-[#EBF3E7]", badge: "High Protective Factors" };
    if (score >= 65) return { label: "Moderate Vitality with Growth Opportunities", color: "text-[#1F8A8A]", bg: "bg-[#1F8A8A]/10", badge: "Balanced" };
    return { label: "Elevated Vulnerability · Targeted Action Advised", color: "text-[#A35B29]", bg: "bg-[#FDF3EB]", badge: "Needs Priority Support" };
  };

  const band = getScoreBand(totalScore);

  return (
    <section id="assessment-wizard" className="py-20 bg-white border-b border-[#0B3D5F]/8">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7FB069]/15 text-[#3E692D] text-xs font-bold uppercase tracking-wider mb-4">
            <HeartHandshake size={14} />
            <span>Interactive Self-Assessment Tool</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D5F] tracking-tight mb-4">
            Assess Your Wellbeing Vitality in 60 Seconds
          </h2>
          <p className="text-base sm:text-lg text-[#33485C] leading-relaxed">
            Grounded in the Health Belief Model (HBM) and the Precaution Adoption Process Model (PAPM). Completely anonymous. Evaluated strictly in local browser memory.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="max-w-3xl mx-auto card-clean p-6 sm:p-10 border-2 border-[#0B3D5F]/10 shadow-xl">
          {!isCompleted ? (
            <div>
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold text-[#5D7185] mb-2 uppercase tracking-wider">
                  <span>Question {currentStep + 1} of {interactiveQuestions.length}</span>
                  <span>{currentQuestion.category}</span>
                </div>
                <div className="h-2 w-full bg-[#FAF7F2] rounded-full overflow-hidden border border-[#0B3D5F]/10">
                  <div 
                    className="h-full bg-gradient-to-r from-[#1F8A8A] to-[#7FB069] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / interactiveQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Headline */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B3D5F] mb-6 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(option.score)}
                    className="w-full text-left p-4 sm:p-5 rounded-xl border border-[#0B3D5F]/12 hover:border-[#1F8A8A] hover:bg-[#FAF7F2] transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#1A2530] group-hover:text-[#0B3D5F]">
                      {option.label}
                    </span>
                    <span className="w-7 h-7 rounded-full border border-[#0B3D5F]/20 group-hover:border-[#1F8A8A] group-hover:bg-[#1F8A8A] group-hover:text-white flex items-center justify-center text-xs transition-colors shrink-0 ml-3">
                      →
                    </span>
                  </button>
                ))}
              </div>

              {/* Privacy Footer */}
              <div className="pt-4 border-t border-[#0B3D5F]/8 flex items-center justify-between text-xs text-[#5D7185]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#1F8A8A]" />
                  Zero server transmission · Privacy-first execution
                </span>
                {currentStep > 0 && (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-[#0B3D5F] font-bold hover:underline cursor-pointer"
                  >
                    ← Previous Question
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center pb-6 border-b border-[#0B3D5F]/10">
                <span className={`badge-pill ${band.bg} ${band.color} text-xs font-bold mb-3`}>
                  {band.badge}
                </span>
                <h3 className="font-display text-3xl font-bold text-[#0B3D5F] mb-2">
                  Your Personal Wellbeing Score: <span className="text-[#1F8A8A]">{totalScore}/100</span>
                </h3>
                <p className="text-sm sm:text-base text-[#33485C] font-medium max-w-lg mx-auto">
                  {band.label}
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D7185]">
                  Dimension Breakdown:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interactiveQuestions.map((q) => {
                    const score = answers[q.id] || 0;
                    return (
                      <div key={q.id} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#0B3D5F]/8 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B3D5F]">{q.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#1F8A8A] rounded-full"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono-data font-bold text-[#33485C] w-8 text-right">
                            {score}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#EBF3E7] border border-[#7FB069]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3E692D] mb-2 flex items-center gap-1.5">
                  <Sparkles size={14} /> Recommended Action Steps
                </h4>
                <ul className="text-xs sm:text-sm text-[#33485C] space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#1F8A8A] shrink-0 mt-0.5" />
                    <span>Explore our <strong>Comprehensive School &amp; Workplace Wellness</strong> module to sustain active coping.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#1F8A8A] shrink-0 mt-0.5" />
                    <span>Integrate the Canadian 24-Hour Movement Guidelines to stabilize sleep latency.</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0B3D5F]/10">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-[#0B3D5F]/20 text-xs font-bold text-[#0B3D5F] hover:bg-[#0B3D5F]/5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Retake Assessment</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#0B3D5F]/20 text-xs font-bold text-[#0B3D5F] hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print Summary</span>
                  </button>
                  <a
                    href="/contact"
                    className="btn-primary !py-2.5 !px-5 text-xs font-bold"
                  >
                    <span>Connect with Team</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
