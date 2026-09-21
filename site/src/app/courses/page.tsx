import type { Metadata } from "next";
import { BookOpenCheck, ArrowRight, Award } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import { brand, courses } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Courses and Workforce Learning",
  description: courses.description,
  alternates: { canonical: "/courses" },
  keywords: ["public health workforce learning"],
  openGraph: { title: `Courses and Workforce Learning | ${brand.displayName}`, description: courses.description, url: `${brand.url}/courses`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Courses and Workforce Learning | ${brand.displayName}`, description: courses.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

export default function CoursesPage() {
  return (
    <ProgramPage 
      label="Courses and Workforce Learning" 
      eyebrow={courses.eyebrow} 
      title={courses.title} 
      description={courses.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.tracks.map(({ title, text }, index) => (
          <div key={title} className="card-clean p-8 bg-white border border-[#0B3D5F]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-data font-bold text-[#1F8A8A] bg-[#1F8A8A]/10 px-2.5 py-1 rounded-full">
                  Track 0{index + 1}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#3E692D]">
                  <Award size={14} /> Micro-Credential
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B3D5F] mb-3">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed">
                {text || "Comprehensive applied curriculum designed with public health faculties and continuing education credits."}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#0B3D5F]/8 flex items-center justify-between">
              <span className="text-xs font-medium text-[#5D7185]">Self-paced &amp; Cohort Options</span>
              <a href="/contact?topic=courses" className="text-xs font-bold text-[#0B3D5F] hover:text-[#1F8A8A] flex items-center gap-1">
                <span>View Syllabus</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </ProgramPage>
  );
}
