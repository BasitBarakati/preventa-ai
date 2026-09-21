"use client";

import Link from "next/link";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Activity,
  Layers,
  Sparkles
} from "lucide-react";
import { universityTracks } from "./UniversityInTheBox";

export default function WorkforceAcademySection() {
  return (
    <section className="py-24 md:py-36 bg-[#FCFBF9] border-b border-[#0B3D5F]/8" id="academy">
      <div className="site-container max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[11px] font-extrabold uppercase tracking-widest mb-4">
              <GraduationCap size={13} />
              <span>National Workforce Infrastructure</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#062235] tracking-tight leading-[1.1] mb-6">
              University In The Box. <br />
              <span className="font-serif-italic font-normal text-[#0D9488]">
                Workforce Capability at Scale.
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#334155] font-normal leading-relaxed">
              Transforming local health units and frontline health practitioners into frontier AI practitioners. 180+ hours of accredited, CME-aligned curriculum with interactive sandbox simulation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link
              href="/courses"
              className="btn-primary !py-3.5 !px-6 text-xs font-bold inline-flex items-center gap-2"
            >
              <span>View All 6 Syllabus Tracks</span>
              <ArrowRight size={14} className="text-[#14B8A6]" />
            </Link>
          </div>
        </div>

        {/* 6 Tracks Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {universityTracks.map((track) => (
            <div
              key={track.id}
              className="p-7 rounded-2xl bg-white border border-[#0B3D5F]/8 hover:border-[#0D9488]/30 transition-all hover:shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-extrabold text-[#0D9488] bg-[#0D9488]/8 px-2.5 py-1 rounded-lg">
                    {track.badge}
                  </span>
                  <span className="text-xs font-mono text-[#64748B] font-semibold" dangerouslySetInnerHTML={{ __html: track.hours }} />
                </div>

                <h3 className="font-display text-lg font-bold text-[#062235] leading-snug mb-2 group-hover:text-[#0D9488] transition-colors">
                  {track.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-4">
                  {track.outcome}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0B3D5F]/6 flex items-center justify-between text-[11px] text-[#64748B]">
                <span className="font-semibold text-[#0A4D34] flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-[#14B8A6]" />
                  <span>CME / CE Micro-Credential</span>
                </span>
                <span className="font-mono text-[#94A3B8]">4 Modules</span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Accreditation Guarantee Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#062235] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#14B8A6] shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-0.5">
                Turnkey Health Unit &amp; University Deployment
              </h4>
              <p className="text-xs sm:text-sm text-white/70">
                Deployable as self-paced municipal staff training or credit-bearing academic partnerships across Canada.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="btn-primary !bg-[#14B8A6] !text-[#062235] hover:!bg-[#17B8C4] !py-3 !px-6 text-xs font-bold whitespace-nowrap shrink-0"
          >
            <span>Request Institutional Syllabus</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
