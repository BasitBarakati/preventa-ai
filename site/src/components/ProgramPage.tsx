import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Sparkles, Home, ChevronRight } from "lucide-react";
import GlowingButton from "./ui/GlowingButton";

export default function ProgramPage({
  label, 
  eyebrow, 
  title, 
  description, 
  children,
  parentLabel = "Programs", 
  parentHref = "/#programs", 
  secondaryLabel = "Explore All Programs",
}: { 
  label: string; 
  eyebrow: string; 
  title: string; 
  description: string; 
  children: ReactNode; 
  parentLabel?: string; 
  parentHref?: string; 
  secondaryLabel?: string; 
}) {
  return (
    <main id="main-content" className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section */}
      <section className="pt-12 pb-16 bg-white border-b border-[#0B3D5F]/8">
        <div className="site-container">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#5D7185] mb-6 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0B3D5F] flex items-center gap-1">
              <Home size={13} />
              <span>Home</span>
            </Link>
            <ChevronRight size={12} />
            <Link href={parentHref} className="hover:text-[#0B3D5F]">
              {parentLabel}
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#0B3D5F] font-bold">{label}</span>
          </nav>

          <span className="badge-pill badge-teal mb-4">{eyebrow}</span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D5F] tracking-tight max-w-3xl mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#33485C] max-w-2xl leading-relaxed mb-8">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <GlowingButton href="/contact" variant="primary">
              <span>Book Consultation</span>
              <ArrowRight size={16} />
            </GlowingButton>
            <GlowingButton href={parentHref} variant="secondary">
              {secondaryLabel}
            </GlowingButton>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="site-container py-16">
        {children}
      </div>

      {/* Bottom Conversion CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0B3D5F] to-[#062235] text-white border-t border-[#0B3D5F]/20">
        <div className="site-container text-center max-w-2xl">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 text-[#17B8C4]">
            <Sparkles size={24} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#17B8C4] block mb-2">
            Practical Next Step
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Bring the Right People into the Conversation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
            Responsible public health AI works best when community leadership, privacy authorities, and clinical practitioners align early.
          </p>
          <div className="flex justify-center">
            <GlowingButton href="/contact" className="btn-teal !py-3 !px-7">
              <span>Contact Preventa AI Advisory</span>
              <ArrowRight size={16} />
            </GlowingButton>
          </div>
        </div>
      </section>
    </main>
  );
}
