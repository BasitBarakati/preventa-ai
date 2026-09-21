"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart2, 
  Workflow, 
  Search, 
  LineChart, 
  PieChart, 
  ArrowRight, 
  CheckCircle2, 
  FileSpreadsheet, 
  Cpu 
} from "lucide-react";
import { evaluationStages } from "@/lib/site-content";

export default function EvaluationSuite() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const activeStage = evaluationStages[activeStageIndex];

  return (
    <section id="evaluation" className="py-20 bg-white border-b border-[#0B3D5F]/8">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D5F]/10 text-[#0B3D5F] text-xs font-bold uppercase tracking-wider mb-3">
            <BarChart2 size={14} />
            <span>Continuous Evidence Loop</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D5F] tracking-tight mb-4">
            Evaluation That Satisfies <br className="hidden sm:inline" />
            <span className="text-[#1F8A8A] font-normal italic">Funders, Communities &amp; Science.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#33485C] leading-relaxed">
            Evaluation is not an afterthought at the end of a multi-year project. Preventa AI auto-generates indicators, monitors fidelity in real time, and synthesizes mixed-methods reports aligned with WHO and PHAC standards.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {evaluationStages.map((stage, idx) => {
            const isSelected = activeStageIndex === idx;

            return (
              <button
                key={stage.stage}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`p-6 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#FAF7F2] border-[#0B3D5F] shadow-sm ring-2 ring-[#0B3D5F]/10"
                    : "bg-white hover:bg-[#FAF7F2]/60 border-[#0B3D5F]/10"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-2xl font-bold text-[#1F8A8A]">
                    {stage.stage}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/[0.04] text-[#5D7185]">
                    {stage.focus}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#0B3D5F] mb-1">
                  {stage.name}
                </h3>
                <p className="text-xs text-[#5D7185] line-clamp-2">
                  {stage.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Panel */}
        <div className="card-clean p-8 lg:p-10 border-2 border-[#0B3D5F]/10 bg-gradient-to-br from-white to-[#FAF7F2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="badge-pill badge-teal">Stage {activeStage.stage} Focus</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3D5F]">
                {activeStage.name}: {activeStage.focus}
              </h3>
              <p className="text-sm sm:text-base text-[#33485C] leading-relaxed">
                {activeStage.description}
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#0B3D5F]/10 flex items-start gap-3">
                <Cpu size={20} className="text-[#1F8A8A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#0B3D5F] block mb-0.5">
                    Preventa AI Automation:
                  </span>
                  <p className="text-xs text-[#5D7185] leading-relaxed">
                    {activeStage.aiTool}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white border border-[#0B3D5F]/10 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#0B3D5F]/8">
                  <span className="text-xs font-bold text-[#0B3D5F] flex items-center gap-1.5">
                    <FileSpreadsheet size={15} className="text-[#1F8A8A]" />
                    Indicator Bank Output Preview
                  </span>
                  <span className="text-[10px] font-mono-data text-[#3E692D] bg-[#EBF3E7] px-2 py-0.5 rounded">
                    Audit Ready
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] flex items-center justify-between">
                    <span className="text-[#33485C] font-medium">Program Reach (Stratified)</span>
                    <span className="font-bold text-[#0B3D5F]">87.4% Target</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] flex items-center justify-between">
                    <span className="text-[#33485C] font-medium">Implementation Fidelity Score</span>
                    <span className="font-bold text-[#1F8A8A]">94/100</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] flex items-center justify-between">
                    <span className="text-[#33485C] font-medium">Pre/Post Outcome Significance</span>
                    <span className="font-bold text-[#3E692D]">p &lt; 0.01</span>
                  </div>
                </div>

                <Link
                  href="/contact?topic=evaluation"
                  className="btn-primary !w-full justify-center !py-2.5 text-xs font-bold"
                >
                  <span>Request Full Evaluation Sample</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
