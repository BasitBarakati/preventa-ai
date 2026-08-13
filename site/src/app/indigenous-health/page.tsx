import type { Metadata } from "next";
import { Landmark, Sprout, Leaf } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import GlassCard from "@/components/ui/GlassCard";
import { brand, indigenousHealth } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Indigenous Health and Wellbeing",
  description: indigenousHealth.description,
  alternates: { canonical: "/indigenous-health" },
  keywords: ["Indigenous health data governance", "OCAP principles health data"],
  openGraph: { title: `Indigenous Health and Wellbeing | ${brand.displayName}`, description: indigenousHealth.description, url: `${brand.url}/indigenous-health`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Indigenous Health and Wellbeing | ${brand.displayName}`, description: indigenousHealth.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

const icons = [Sprout, Leaf, Landmark];

export default function IndigenousHealthPage() {
  return (
    <ProgramPage eyebrow={indigenousHealth.eyebrow} title={indigenousHealth.title} description={indigenousHealth.description}>
      <section className="lux-section indigenous-section" id="areas">
        <div className="container indigenous-layout">
          <div data-reveal>
            <p className="lux-eyebrow"><span /> COMMUNITY-GOVERNED</p>
            <h2 data-split>Guided by community, not built around it.</h2>
            <p>Preventa AI does not speak for any Nation or community. Every workflow in this program is designed for relationship-based co-design and community control over data and decisions.</p>
            <div className="governance-tags">{indigenousHealth.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          <div className="indigenous-framework" data-stagger>
            {indigenousHealth.areas.map(({ title, text }, index) => {
              const Icon = icons[index];
              return (
                <GlassCard key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></GlassCard>
              );
            })}
          </div>
        </div>
      </section>
    </ProgramPage>
  );
}
