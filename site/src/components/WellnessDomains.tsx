"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HeartHandshake, 
  Activity, 
  Utensils, 
  Baby, 
  GraduationCap, 
  ShieldAlert, 
  Stethoscope, 
  HeartPulse, 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  ChevronRight
} from "lucide-react";
import { wellnessDomains } from "@/lib/site-content";

const domainIconMap: Record<string, any> = {
  HeartHandshake,
  Activity,
  Utensils,
  Baby,
  GraduationCap,
  ShieldAlert,
  Stethoscope,
  HeartPulse,
  Sprout,
};

export default function WellnessDomains() {
  const [filter, setFilter] = useState<string>("all");

  const filteredDomains = wellnessDomains.filter((d) => {
    if (filter === "all") return true;
    if (filter === "mental") return ["mental-wellbeing", "substance-use"].includes(d.id);
    if (filter === "environment") return ["environmental-health", "school-health"].includes(d.id);
    if (filter === "clinical") return ["immunization", "chronic-disease", "maternal-infant", "healthy-sexuality"].includes(d.id);
    return true;
  });

  return (
    <section id="wellness-domains" className="py-24 bg-[#FAF8F5] border-b border-[#0B3D5F]/8">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0B3D5F]/10 text-[#0B3D5F] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles size={14} className="text-[#1F8A8A]" />
              <span>Evidence-Informed Intervention Areas</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight">
              Health &amp; Wellbeing Domains
            </h2>
            <p className="text-base sm:text-lg text-[#2C3E50] mt-3 leading-relaxed">
              Moving beyond episodic care into population health promotion. Each domain is supported by AI-driven educational adaptation, COM-B behaviour change coaching, and Canadian public health validation.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All 8 Domains", key: "all" },
              { label: "Mental & Substance", key: "mental" },
              { label: "Environment & Schools", key: "environment" },
              { label: "Prevention & Clinical", key: "clinical" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.key
                    ? "bg-[#062235] text-white shadow-xs"
                    : "bg-white text-[#2C3E50] hover:bg-[#0B3D5F]/5 border border-[#0B3D5F]/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredDomains.map((domain) => {
            const Icon = domainIconMap[domain.icon] || HeartHandshake;
            const isHighlight = domain.highlight;

            return (
              <div
                key={domain.id}
                className={`card-luxury p-6 flex flex-col justify-between ${
                  isHighlight 
                    ? "border-2 border-[#C5A059] bg-gradient-to-br from-white via-white to-[#FDF8F2]" 
                    : "bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isHighlight ? "bg-[#8C6D27] text-white" : "bg-[#062235] text-white"
                    }`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isHighlight 
                        ? "bg-[#C5A059]/20 text-[#8C6D27]" 
                        : "bg-[#1F8A8A]/10 text-[#1F8A8A]"
                    }`}>
                      {domain.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#062235] mb-2">
                    {domain.title}
                  </h3>
                  <p className="text-xs text-[#536474] leading-relaxed mb-4 line-clamp-3">
                    {domain.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#0B3D5F]/8">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#0B3D5F]/6 text-[11.5px] text-[#2C3E50]">
                    <span className="font-bold text-[#1F8A8A] block mb-0.5">
                      AI Co-Pilot Capability:
                    </span>
                    <span className="leading-snug">{domain.aiCapability}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-[#536474] font-medium">
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} /> {domain.framework}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-[#0B3D5F]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-[#EAF4EE] text-[#0A4D34] flex items-center justify-center shrink-0">
              <Sprout size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#062235]">Looking for Land-Based Healing or Indigenous Data Sovereignty?</h4>
              <p className="text-xs text-[#536474]">Explore our dedicated Indigenous Health &amp; Wellbeing platform pathway grounded in OCAP®.</p>
            </div>
          </div>
          <Link href="/indigenous-health" className="btn-secondary !py-2.5 !px-5 text-xs font-bold shrink-0">
            <span>Explore Indigenous Pathway</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
