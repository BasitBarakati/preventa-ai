import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import { brand } from "@/lib/site-content";

const groups = [
  { title: "Site", links: [["Who we are", "/#top"], ["Our purpose", "/#about"], ["What we do", "/#programs"], ["Contact", "/contact"]] },
  { title: "Programs", links: [["Situation Assessment", "/situation-assessment"], ["Health and Wellness", "/health-and-wellness"], ["Indigenous Health and Wellbeing", "/indigenous-health"], ["Research and Risk Prediction", "/research"], ["Courses and Workforce Learning", "/courses"]] },
  { title: "Governance", links: [["AI transparency", "/ai-transparency"], ["Privacy", "/privacy"], ["Accessibility", "/accessibility"], ["Terms", "/terms"]] },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand"><Link href="/#top" prefetch={false} aria-label="PREVENTA AI home" className="footer-logo"><Logo variant="symbol" /></Link><strong>PREVENTA AI</strong><p>{brand.tagline}</p><span><ShieldCheck size={15} /> Responsible AI · Human oversight · Privacy by design</span></div>
        <div className="site-footer__links">{groups.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.links.map(([label, href]) => <Link key={href} href={href} prefetch={false}>{label}<ArrowUpRight size={12} /></Link>)}</div>)}</div>
      </div>
      <div className="container site-footer__bottom"><p>© {new Date().getFullYear()} PREVENTA AI. All rights reserved.</p><p>AI-enabled public health transformation platform · Canada</p></div>
    </footer>
  );
}
