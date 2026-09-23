"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  BookOpen, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  LineChart, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  FileCheck,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export const universityTracks = [
  {
    id: "public-health",
    title: "Public Health Foundations",
    badge: "Core Framework",
    icon: Activity,
    hours: "40 Hours &bull; 8 Modules",
    level: "Foundational to Intermediate",
    description: "Core population health, the Ottawa Charter for Health Promotion, social determinants of health, and health equity frameworks.",
    modules: [
      "Population Health Approach & Ottawa Charter Principles",
      "Social & Ecological Determinants of Health (SDOH)",
      "Health Equity Stratification & Vulnerability Indices",
      "Intersectoral Action & Policy Formulation in Canada"
    ],
    outcome: "Foundational Certificate in Population Health Strategy"
  },
  {
    id: "research",
    title: "Research & Knowledge Exchange",
    badge: "Evidence Synthesis",
    icon: BookOpen,
    hours: "35 Hours &bull; 6 Modules",
    level: "Intermediate to Advanced",
    description: "Ethical evidence generation, rapid literature synthesis, systematic scoping, and translating science into actionable health policy.",
    modules: [
      "Ethical Use of AI in Study Design & Systematic Reviews",
      "Knowledge Translation (KT) to Frontline Communities",
      "Rapid Evidence Synthesis & Citation Verification",
      "Participatory Action Research & Community Co-Design"
    ],
    outcome: "Knowledge Translation & Evidence Synthesis Badge"
  },
  {
    id: "epidemiology",
    title: "Epidemiology & Surveillance",
    badge: "Biostatistics",
    icon: LineChart,
    hours: "50 Hours &bull; 10 Modules",
    level: "Advanced Computational",
    description: "Disease incidence and prevalence modeling, chronic condition surveillance, demographic risk factors, and outbreak detection.",
    modules: [
      "Population-Level Disease Surveillance Architecture",
      "Multivariate Risk Prediction & Biomarker Stratification",
      "Equity-Stratified Incidence & Prevalence Mapping",
      "Bio-statistical Interpretation for Decision-Makers"
    ],
    outcome: "Epidemiological Surveillance Practitioner Credential"
  },
  {
    id: "health-promotion",
    title: "Health Promotion",
    badge: "Intervention Design",
    icon: Layers,
    hours: "45 Hours &bull; 8 Modules",
    level: "Applied Professional",
    description: "Designing, implementing, and evaluating high-impact prevention interventions across schools, workplaces, and municipalities.",
    modules: [
      "Logic Model Generation & Assumption Stress-Testing",
      "COM-B Model Behaviour Change Coaching",
      "Comprehensive School Health Planning & Metrics",
      "Community Asset Mapping & Strengths-Based Interventions"
    ],
    outcome: "Health Promotion Intervention Planning Credential"
  },
  {
    id: "emergency",
    title: "Emergency Preparedness, Response & Recovery",
    badge: "Crisis Leadership",
    icon: ShieldAlert,
    hours: "30 Hours &bull; 6 Modules",
    level: "Executive Readiness",
    description: "Outbreak intelligence, pandemic readiness, climate and environmental disaster response, and crisis communication.",
    modules: [
      "Public Health Outbreak Intelligence Feeds",
      "Pandemic & Epidemic Rapid Operational Readiness",
      "Environmental & Climate Crisis Health Adaptation",
      "Trauma-Informed Crisis Communication & Public Trust"
    ],
    outcome: "Public Health Emergency Response Competency Credential"
  },
  {
    id: "ai-training",
    title: "AI Training & Systems",
    badge: "Flagship AI",
    icon: Cpu,
    highlight: true,
    hours: "60 Hours &bull; 12 Modules",
    level: "Executive & Technical",
    description: "Applied generative AI, public health AI agents with governance safeguards, automated reporting, interactive dashboards, and modern public health portals.",
    modules: [
      "Generative AI & LLMs for Accessible Health Literacy",
      "Public Health AI Agent Architecture & Safeguards",
      "Automated Monitoring Dashboards & Heatmap Engines",
      "Next-Generation Web & Public Health Intelligence Portals"
    ],
    outcome: "Applied Health AI Systems Specialist Credential"
  }
];

export default function UniversityInTheBox() {
  const [selectedTrackId, setSelectedTrackId] = useState(universityTracks[5].id);

  const activeTrack = universityTracks.find(t => t.id === selectedTrackId) || universityTracks[5];
  const ActiveIcon = activeTrack.icon;

  return (
    <section id="university-in-the-box" className="py-24 bg-white border-b border-[#0A4D34]/8">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 text-[#8C6D27] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <GraduationCap size={15} className="text-[#C5A059]" />
              <span>Proprietary Workforce Academy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight">
              University In The Box
            </h2>
            <p className="text-base sm:text-lg text-[#2C3E50] mt-3 leading-relaxed">
              Empowering public health teams, regional health authorities, and scholars to build real, operational AI capability. Six complete career and system tracks with verifiable Canadian micro-credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="btn-secondary !py-3 !px-5 text-xs font-bold"
            >
              <span>Explore All 6 Curricula</span>
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/contact?topic=courses"
              className="btn-primary !bg-[#062235] hover:!bg-[#0A4D34] !py-3 !px-6 text-xs font-bold whitespace-nowrap shadow-md"
            >
              <span>Enroll Organization / Team</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 6 Track Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {universityTracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrackId === track.id;

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrackId(track.id)}
                className={`p-6 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#062235] text-white border-[#062235] shadow-xl ring-2 ring-[#17B8C4]/40 scale-[1.01]"
                    : track.highlight
                      ? "bg-gradient-to-br from-white via-white to-[#FAF8F5] border-[#C5A059]/40 hover:border-[#0A4D34] shadow-xs"
                      : "bg-[#FAF8F5] hover:bg-white border-[#0A4D34]/10 hover:border-[#0A4D34]/25 shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-[#17B8C4] text-[#062235]" : "bg-white text-[#0A4D34] shadow-xs border border-[#0A4D34]/10"
                    }`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isSelected ? "bg-white/15 text-[#17B8C4]" : "bg-white text-[#8C6D27] border border-[#C5A059]/30"
                    }`}>
                      {track.badge}
                    </span>
                  </div>

                  <h3 className={`font-display text-lg font-bold mb-2 ${isSelected ? "text-white" : "text-[#062235]"}`}>
                    {track.title}
                  </h3>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${isSelected ? "text-slate-300" : "text-[#536474]"}`}>
                    {track.description}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t text-[11px] font-bold flex items-center justify-between ${
                  isSelected ? "border-white/10 text-[#17B8C4]" : "border-[#0A4D34]/8 text-[#0A4D34]"
                }`}>
                  <span dangerouslySetInnerHTML={{ __html: track.hours }} />
                  <span>Curriculum &rarr;</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Track Detailed Showcase Card */}
        <div className="card-luxury p-8 lg:p-10 border-2 border-[#0A4D34]/15 bg-gradient-to-br from-white via-white to-[#FAF8F5] shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#0A4D34]/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0A4D34] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ActiveIcon size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-pill badge-gold text-[10.5px] font-bold">{activeTrack.badge}</span>
                  <span className="text-xs text-[#536474] font-mono-data">&bull; Level: {activeTrack.level}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                  {activeTrack.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF4EE] text-[#0A4D34] text-xs font-bold shrink-0 border border-[#0A4D34]/20 shadow-xs">
              <Award size={16} className="text-[#0A4D34]" />
              <span>{activeTrack.outcome}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#536474] flex items-center gap-2">
                <FileCheck size={16} className="text-[#0A4D34]" />
                <span>Structured Course Modules:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeTrack.modules.map((mod, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-[#0A4D34]/10 flex items-start gap-3 shadow-xs">
                    <span className="w-6 h-6 rounded-lg bg-[#FAF8F5] text-[#0A4D34] font-bold text-xs flex items-center justify-center shrink-0 font-mono-data border border-[#0A4D34]/12">
                      0{i + 1}
                    </span>
                    <span className="text-xs text-[#111E28] font-semibold leading-relaxed pt-0.5">
                      {mod}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#061A29] text-white space-y-4 shadow-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#17B8C4]">
                    Interactive Cohort Delivery
                  </span>
                  <span className="badge-pill bg-white/10 text-white text-[10px]">
                    Institutional Sandbox
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Delivered either self-paced or through university-partnered cohorts with hands-on sandbox labs, synthetic Canadian population health datasets, and peer-reviewed capstone projects.
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono-data text-slate-400">Professional Development Micro-Credentials</span>
                  <Link
                    href="/contact?topic=courses"
                    className="text-xs font-bold text-[#17B8C4] hover:underline flex items-center gap-1"
                  >
                    <span>Request Full Syllabus</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/20 flex items-center gap-3 text-xs text-[#536474]">
                <ShieldCheck size={18} className="text-[#8C6D27] shrink-0" />
                <span>
                  Aligned with Canadian public health core competencies and continuous professional development criteria.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
