"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Users, 
  Building2, 
  Globe2, 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  Layers, 
  Activity 
} from "lucide-react";
import { assessmentStreams } from "@/lib/site-content";

const streamIcons = {
  "individual-family": Users,
  "community": Globe2,
  "organization": Building2,
};

export default function AssessmentGrid() {
  const [selectedStreamId, setSelectedStreamId] = useState<string>(assessmentStreams[0].id);

  const selectedStream = assessmentStreams.find(s => s.id === selectedStreamId) || assessmentStreams[0];
  const Icon = streamIcons[selectedStream.id as keyof typeof streamIcons] || User;

  return (
    <section id="assessments" className="py-20 bg-[#FAF7F2] border-b border-[#0B3D5F]/8">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D5F]/10 text-[#0B3D5F] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers size={14} />
            <span>Multi-Level Situation Assessment</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D5F] tracking-tight mb-4">
            See the Whole Context <br className="hidden sm:inline" />
            <span className="text-[#1F8A8A] font-normal italic">Before Choosing the Next Move.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#33485C] leading-relaxed">
            Public health failure begins with partial diagnostics. Preventa AI connects individual lifestyle markers, intergenerational family networks, population equity scans, and institutional readiness into one continuous assessment continuum.
          </p>
        </div>

        {/* Stream Selector Buttons (3 Streams) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {assessmentStreams.map((stream) => {
            const StreamIcon = streamIcons[stream.id as keyof typeof streamIcons] || User;
            const isSelected = selectedStreamId === stream.id;

            return (
              <button
                key={stream.id}
                type="button"
                onClick={() => setSelectedStreamId(stream.id)}
                className={`text-left p-6 rounded-2xl transition-all border ${
                  isSelected 
                    ? "bg-white border-[#1F8A8A] shadow-md ring-2 ring-[#1F8A8A]/20 transform -translate-y-1" 
                    : "bg-white/60 hover:bg-white border-[#0B3D5F]/10 hover:border-[#0B3D5F]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-[#0B3D5F] text-white" : "bg-[#FAF7F2] text-[#0B3D5F]"
                  }`}>
                    <StreamIcon size={24} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isSelected ? "bg-[#1F8A8A]/10 text-[#1F8A8A]" : "bg-black/[0.04] text-[#5D7185]"
                  }`}>
                    {stream.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#0B3D5F] mb-1">
                  {stream.title}
                </h3>
                <p className="text-xs text-[#5D7185] line-clamp-2">
                  {stream.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Stream Focus Card */}
        <div className="card-clean p-8 lg:p-10 border-2 border-[#0B3D5F]/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#0B3D5F]/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0B3D5F] text-white flex items-center justify-center shrink-0">
                <Icon size={28} />
              </div>
              <div>
                <span className="badge-pill badge-teal mb-1.5">{selectedStream.badge} Assessment</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3D5F]">
                  {selectedStream.title}
                </h3>
              </div>
            </div>

            <Link
              href="/situation-assessment"
              className="btn-primary !py-2.5 !px-5 text-sm whitespace-nowrap"
            >
              <span>Explore Assessment Deep Dive</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Factors Evaluated */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D7185] flex items-center gap-2">
                <Activity size={15} className="text-[#1F8A8A]" />
                Primary Indicators &amp; Factors Evaluated:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedStream.factors.map((factor, index) => (
                  <div key={index} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#0B3D5F]/6 flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-[#1F8A8A] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#33485C] font-medium leading-relaxed">
                      {factor}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Co-Pilot Capabilities & Outputs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#EBF3E7] border border-[#7FB069]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#3E692D] font-bold text-xs uppercase tracking-wider">
                  <Cpu size={15} />
                  <span>AI Co-Pilot Integration</span>
                </div>
                <p className="text-xs text-[#33485C] leading-relaxed">
                  {selectedStream.aiFeature}
                </p>
                <div className="pt-2 border-t border-[#7FB069]/20">
                  <span className="text-[11px] font-bold text-[#0B3D5F] block mb-0.5">
                    Measurable Outputs:
                  </span>
                  <p className="text-xs text-[#5D7185]">
                    {selectedStream.outputs}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
