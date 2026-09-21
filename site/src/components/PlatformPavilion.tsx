"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Layers, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  HeartHandshake, 
  Users, 
  Globe2, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Sparkles,
  ChevronRight,
  Landmark
} from "lucide-react";
import { assessmentStreams, wellnessDomains, indigenousHealth } from "@/lib/site-content";
import { universityTracks } from "./UniversityInTheBox";

type PavilionTab = "assessment" | "wellness" | "indigenous" | "research" | "academy";

export default function PlatformPavilion() {
  const [activeTab, setActiveTab] = useState<PavilionTab>("assessment");
  const [selectedStreamId, setSelectedStreamId] = useState<string>("individual-family");

  return (
    <section id="platform" className="py-24 md:py-32 bg-[#FAF8F5] border-b border-[#0B3D5F]/6">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0B3D5F]/10 text-[#0B3D5F] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Layers size={14} className="text-[#0D9488]" />
            <span>The Preventa Architecture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight mb-4">
            Five Connected Programs. One Sovereign Continuum.
          </h2>
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Select any program to explore how Preventa AI translates diagnostics, community governance, evidence, and workforce learning into measurable health outcomes.
          </p>
        </div>

        {/* 5-Program Executive Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" role="tablist">
          {[
            { id: "assessment", label: "01 · Situation Assessment", icon: Activity },
            { id: "wellness", label: "02 · Health & Wellbeing", icon: Layers },
            { id: "indigenous", label: "03 · Indigenous Health (OCAP®)", icon: ShieldCheck },
            { id: "research", label: "04 · AI in Research & Risk", icon: Cpu },
            { id: "academy", label: "05 · University In The Box", icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id as PavilionTab)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 cursor-pointer border ${
                  isSelected
                    ? "bg-[#062235] text-white border-[#062235] shadow-md scale-[1.02]"
                    : "bg-white text-[#334155] hover:bg-[#FAF8F5] border-[#0B3D5F]/10 hover:border-[#0B3D5F]/20 shadow-2xs"
                }`}
              >
                <Icon size={16} className={isSelected ? "text-[#14B8A6]" : "text-[#0A4D34]"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Situation Assessment */}
        {activeTab === "assessment" && (
          <div className="card-executive p-8 sm:p-10 bg-white border border-[#0B3D5F]/10 shadow-sm animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#0B3D5F]/8 mb-8">
              <div>
                <span className="badge-pill badge-teal text-[10.5px] font-bold mb-2">
                  Program 01 &bull; Multilevel Diagnostics
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                  Multi-Level Situation Assessment
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
                  Public health failure begins with partial diagnostics. Preventa AI connects individual lifestyle markers, population equity scans, and institutional readiness into one continuous continuum.
                </p>
              </div>

              <Link
                href="/situation-assessment"
                className="btn-primary !py-2.5 !px-5 text-xs font-bold shrink-0"
              >
                <span>Full Assessment Deep Dive</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 3 Streams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assessmentStreams.map((stream) => {
                const streamIcons: Record<string, any> = {
                  "individual-family": Users,
                  "community": Globe2,
                  "organization": Building2,
                };
                const StreamIcon = streamIcons[stream.id] || Users;

                return (
                  <div 
                    key={stream.id} 
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white text-[#062235] border border-[#0B3D5F]/10 flex items-center justify-center shadow-2xs">
                          <StreamIcon size={20} className="text-[#0A4D34]" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#0D9488] border border-[#0D9488]/20">
                          {stream.badge}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-[#062235] mb-2">
                        {stream.title}
                      </h4>
                      <p className="text-xs text-[#475569] leading-relaxed mb-5">
                        {stream.description}
                      </p>

                      <div className="space-y-1.5 text-[11.5px] text-[#334155] border-t border-[#0B3D5F]/8 pt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                          Evaluated Indicators:
                        </span>
                        {stream.factors.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 size={13} className="text-[#0D9488] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#0B3D5F]/8 text-[11px] text-[#64748B] font-medium">
                      <strong className="text-[#062235]">Output:</strong> {stream.outputs}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Health & Wellbeing (8 Priority Domains) */}
        {activeTab === "wellness" && (
          <div className="card-executive p-8 sm:p-10 bg-white border border-[#0B3D5F]/10 shadow-sm animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#0B3D5F]/8 mb-8">
              <div>
                <span className="badge-pill badge-teal text-[10.5px] font-bold mb-2">
                  Program 02 &bull; Evidence-Informed Interventions
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                  Health &amp; Wellbeing: Eight Priority Domains
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
                  Moving beyond episodic medicine into continuous population wellness. Supported by COM-B behavior change coaching, Canadian clinical guidelines, and AI literacy adaptation.
                </p>
              </div>

              <Link
                href="/health-and-wellness"
                className="btn-primary !py-2.5 !px-5 text-xs font-bold shrink-0"
              >
                <span>Explore All 8 Domains</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 8 Domains Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wellnessDomains.map((d) => (
                <div key={d.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#0A4D34] border border-[#0A4D34]/15 mb-3 inline-block">
                      {d.tag}
                    </span>
                    <h4 className="font-display text-base font-bold text-[#062235] mb-1.5">
                      {d.title}
                    </h4>
                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-4">
                      {d.description}
                    </p>
                  </div>
                  <div className="text-[11px] text-[#0D9488] font-semibold border-t border-[#0B3D5F]/8 pt-2">
                    Framework: {d.framework}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Indigenous Health & OCAP® */}
        {activeTab === "indigenous" && (
          <div className="card-executive p-8 sm:p-10 bg-white border border-[#0B3D5F]/10 shadow-sm animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#0B3D5F]/8 mb-8">
              <div>
                <span className="badge-pill badge-forest text-[10.5px] font-bold mb-2">
                  Program 03 &bull; Sovereignty &amp; Cultural Safety
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                  Indigenous Health &amp; Wellbeing
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
                  Grounded in First Nations OCAP® principles and Two-Eyed Seeing (Etuaptmumk). Communities retain complete ownership, control, access, and possession over their health data.
                </p>
              </div>

              <Link
                href="/indigenous-health"
                className="btn-primary !py-2.5 !px-5 text-xs font-bold shrink-0"
              >
                <span>Read OCAP® Charter</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* OCAP 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { title: "Ownership", desc: "Community holds collective ownership of all cultural and health data." },
                { title: "Control", desc: "Band Council & Indigenous health leadership control research and modeling." },
                { title: "Access", desc: "Granular, role-based tokens governed strictly by community consent." },
                { title: "Possession", desc: "Data stored in encrypted, Canadian on-soil sovereign cloud enclaves." },
              ].map((p) => (
                <div key={p.title} className="p-5 rounded-2xl bg-[#FDF8F2] border border-[#C5A059]/30">
                  <div className="w-8 h-8 rounded-lg bg-white text-[#8C6D27] flex items-center justify-center font-bold text-xs mb-3 border border-[#C5A059]/30">
                    {p.title[0]}
                  </div>
                  <h4 className="font-display text-base font-bold text-[#062235] mb-1">{p.title}</h4>
                  <p className="text-xs text-[#536474] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0A4D34]/15 flex items-center justify-between text-xs text-[#334155]">
              <span className="font-medium">
                100% Subsidized for First Nations, Inuit, and Métis communities via the Sponsored Community Tier.
              </span>
              <Link href="/contact?tier=community" className="font-bold text-[#0A4D34] hover:underline shrink-0 ml-4">
                Request Community Access &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: AI in Research & Risk Prediction */}
        {activeTab === "research" && (
          <div className="card-executive p-8 sm:p-10 bg-white border border-[#0B3D5F]/10 shadow-sm animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#0B3D5F]/8 mb-8">
              <div>
                <span className="badge-pill badge-teal text-[10.5px] font-bold mb-2">
                  Program 04 &bull; Computational Epidemiology
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                  AI in Research &amp; Risk Prediction
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
                  Evidence generation paired with population disease surveillance, environmental risk modeling, and knowledge translation.
                </p>
              </div>

              <Link
                href="/research"
                className="btn-primary !py-2.5 !px-5 text-xs font-bold shrink-0"
              >
                <span>View Research Methods</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                <h4 className="font-display text-base font-bold text-[#062235] mb-2">
                  Disease Surveillance Architecture
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Real-time monitoring of chronic conditions, outbreak signals, and multi-morbidity risk clusters across demographic strata.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                <h4 className="font-display text-base font-bold text-[#062235] mb-2">
                  Automated Evidence Synthesis
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Rapid systematic review assistance referencing Canadian guidelines (PHAC, CIHR, CPHA) with transparent citations.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8">
                <h4 className="font-display text-base font-bold text-[#062235] mb-2">
                  Human Oversight Safeguards
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Mandatory human-in-the-loop sign-off before any model output is deployed into clinical or public health practice.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: University In The Box */}
        {activeTab === "academy" && (
          <div className="card-executive p-8 sm:p-10 bg-white border border-[#0B3D5F]/10 shadow-sm animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#0B3D5F]/8 mb-8">
              <div>
                <span className="badge-pill badge-gold text-[10.5px] font-bold mb-2">
                  Program 05 &bull; Workforce Capability
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                  University In The Box
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
                  Applied workforce training across Epidemiology, Health Promotion, Emergency Response, and AI Systems. Verifiable Canadian micro-credentials.
                </p>
              </div>

              <Link
                href="/courses"
                className="btn-primary !py-2.5 !px-5 text-xs font-bold shrink-0"
              >
                <span>View All 6 Tracks</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {universityTracks.map((track) => {
                const TrackIcon = track.icon;
                return (
                  <div key={track.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-white text-[#0A4D34] border border-[#0B3D5F]/10 flex items-center justify-center shadow-2xs">
                          <TrackIcon size={18} />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-[#8C6D27] border border-[#C5A059]/30">
                          {track.badge}
                        </span>
                      </div>
                      <h4 className="font-display text-base font-bold text-[#062235] mb-1.5">
                        {track.title}
                      </h4>
                      <p className="text-xs text-[#475569] leading-relaxed line-clamp-2 mb-3">
                        {track.description}
                      </p>
                    </div>
                    <div className="text-[11px] text-[#0A4D34] font-semibold pt-2 border-t border-[#0B3D5F]/8 flex items-center justify-between">
                      <span dangerouslySetInnerHTML={{ __html: track.hours }} />
                      <Award size={14} className="text-[#C5A059]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
