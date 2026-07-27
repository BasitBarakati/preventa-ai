/**
 * Phronesis AI — launch checklist (backend handoff)
 * -------------------------------------------------
 * [x] POST /api/assessments  — free-assessment requests + newsletter (Postgres: inquiries)
 * [x] GET  /api/assessments  — aggregate waitlist counters
 * [ ] Swap SITE_URL in src/app/layout.tsx for the production domain before launch
 * [ ] Replace /og.jpg with a brand-approved 1200×630 asset if marketing refreshes it
 * [ ] Wire analytics (Plausible/Fathom) — currently none, by privacy-by-design choice
 * [ ] Rate-limit /api/assessments at the edge for public launch
 */
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Acronym from "@/components/Acronym";
import Manifesto from "@/components/Manifesto";
import Pillars from "@/components/Pillars";
import AssessSection from "@/components/AssessSection";
import Wellness from "@/components/Wellness";
import CapacityEval from "@/components/CapacityEval";
import Copilot from "@/components/Copilot";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Acronym />
      <Manifesto />
      <Pillars />
      <AssessSection />
      <Wellness />
      <CapacityEval />
      <Copilot />
      <Faq />
    </main>
  );
}
